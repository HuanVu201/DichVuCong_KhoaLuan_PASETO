using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Globalization;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Reflection.Emit;
using System.Text;
using System.Transactions;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Classes;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Constant;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Application.Common.LTQVLB;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.DuThaoXuLyHoSo;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Infrastructure.Persistence.Repository;

namespace TD.DichVuCongApi.Infrastructure.LTQLVB;
public class SyncQLVBService : ISyncLTQLVBService
{
    private readonly LTQLVBSettings _settings;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepositoryWithEvents<HoSo> _repositoryHoSo;
    private readonly IMinioService _minioService;
    private readonly ILogger<SyncQLVBService> _logger;
    private readonly IMediator _mediator;
    private readonly IHttpClientFactory _clientFactory;
    private readonly IHoSoServices _hoSoServices;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _userService;
    private string loaiketquaDaKyDuyet = "04"; // chỉ lưu vết
    private string loaiketquaDaBanHanh = "01"; // chuyển bước kèm đính kèm thêm file quyết định
    private string loaiketquaKyKhongBanHanh = "02"; // chuyển bước
    private string loaiketquaKhongDuyet = "03"; // trả lại bước trước
    private readonly string LOGKEY = "LTQLVB";
    private readonly IEventPublisher _eventPublisher;
    private readonly string formatVanBanDiDatetime = "dd/MM/yyyy";
    private readonly double? gioiHanDungLuongUpload = null;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    public SyncQLVBService(INguoiXuLyHoSoService nguoiXuLyHoSoService, IEventPublisher eventPublisher, IUserService userService, IDapperRepository dapperRepository, IHoSoServices hoSoServices, IHttpClientFactory clientFactory, IOptions<LTQLVBSettings> options, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IRepositoryWithEvents<HoSo> repositoryHoSo, IMinioService minioService, IMediator mediator, ILogger<SyncQLVBService> logger)
    {
        _settings = options.Value;
        _hoSoServices = hoSoServices;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _repositoryHoSo = repositoryHoSo;
        _minioService = minioService;
        _mediator = mediator;
        _logger = logger;
        _clientFactory = clientFactory;
        _dapperRepository = dapperRepository;
        _userService = userService;
        _eventPublisher = eventPublisher;
        gioiHanDungLuongUpload = _settings.gioiHanDungLuongUpload;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }
    private void LogTrace(string maHoSo, string info)
    {
        _logger.LogTrace(LOGKEY + "_" + maHoSo + ": " + info);
    }
    private async Task UpdateHoanThanhXuLyQLVB(string docCode, HttpClient httpClient, string trangThai)
    {
        HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, $"{_settings.urlLienThongQLVB}/CapNhatTrangThaiVanBan");
        var requestBody = new
        {
            MaVanBan = docCode,
            TrangThai = trangThai,
        };
        request.Content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");

        var httpResponse = await httpClient.SendAsync(request);
        _logger.LogInformation($"req:{JsonConvert.SerializeObject(requestBody)}_res:{httpResponse.ToString()}");
    }
    private async Task<HoSo> UpdateHoSo(LTQLVBSignedDocResponse signedData, string docCode, HttpClient httpClient)
    {
        var hoSoQueryBuilder = new HoSoQueryBuilder();
        var hoSoSelect = hoSoQueryBuilder.select;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(hoSoSelect.GetHoSoByMaHoSoSql, new
        {
            MaHoSo = signedData.MaHoSo
        });
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string dinhKemDuThao = string.Empty;
        string buocXuLyTiepTheo = string.Empty;
        bool updateHoSoSucceed = false;
        

        LienThongQLVB_ThamSoAn thamSoAn = JsonConvert.DeserializeObject<LienThongQLVB_ThamSoAn>(signedData.ThamSoAn);
        if (hoSo != null)
        {
            string nguoiXuLyTiep = hoSo.NguoiXuLyTiep;

            if (hoSo.BuocXuLyTiep.Contains("##"))
            {
                buocXuLyTiepTheo = hoSo.BuocXuLyTiep.Split("##")[0]; // lấy bước xử lý đầu tiên
            } else if (!string.IsNullOrEmpty(hoSo.BuocXuLyTiep))
            {
                buocXuLyTiepTheo = hoSo.BuocXuLyTiep;
            }
            if(hoSo.TrangThaiHoSoId == "9" || hoSo.TrangThaiHoSoId == "10")
            {
                await UpdateHoanThanhXuLyQLVB(docCode, httpClient, "04");
                _logger.LogError($"UpdateHoSo_QLVB_{hoSo.MaHoSo}_hoSoDaTraKetQua");
                return hoSo;
            }
            // chuyển base64 sang dạng stream để gửi lên minio server
            if (signedData.VanBanDi != null && signedData.VanBanDi.DinhKem != null && signedData.VanBanDi.DinhKem.Count > 0)
            {
                for (int i = 0; i < signedData.VanBanDi.DinhKem.Count; i++)
                {
                    var dinhKem = signedData.VanBanDi.DinhKem[i];
                    IFormFile formFile = _minioService.ConvertBase64ToIFormFile(dinhKem.Base64, dinhKem.Ten);
                    if (string.IsNullOrEmpty(dinhKemDuThao))
                    {
                        var uploadedFileUrl = await _minioService.UploadFileServerAsync(formFile, null, "DinhKemKetQua/" + Guid.NewGuid().ToString(), gioiHanDungLuongUpload);
                        dinhKemDuThao = uploadedFileUrl;
                    }
                    else
                    {
                        dinhKemDuThao = dinhKemDuThao + "##" + await _minioService.UploadFileAsync(formFile, null, "DinhKemKetQua/" + Guid.NewGuid().ToString());
                    }
                }
            }
            try
            {
                var nguoiKy = signedData.VanBanDi != null && !string.IsNullOrEmpty(signedData.VanBanDi.NguoiKy) ? signedData.VanBanDi.NguoiKy : "Hệ thống quản lý văn bản";

                if (signedData.LoaiKetQua == "04")
                {
                    DateTime ngayKy = DateTime.Now;
                    try
                    {
                        ngayKy = DateTime.ParseExact(signedData.VanBanDi.NgayKy, formatVanBanDiDatetime, CultureInfo.InvariantCulture);
                    }
                    catch (Exception ex) { }
                    updateHoSoSucceed = await LuuVetHoSo(hoSo, ngayKy, nguoiKy);
                }
                else if (signedData.LoaiKetQua == "01")
                {
                    if (thamSoAn != null && !string.IsNullOrEmpty(thamSoAn.DuThao) && !string.IsNullOrEmpty(thamSoAn.DuThaoId))
                    {
                        
                        updateHoSoSucceed = await CapNhatDuThaoXuLyHoSo(hoSo, currentTime, nguoiKy, thamSoAn, dinhKemDuThao, signedData);
                    }
                    else
                    {

                        DateTime? ngayBanHanh = null;
                        DateTime? ngayKy = null;
                        try
                        {
                            ngayKy = DateTime.ParseExact(signedData.VanBanDi.NgayKy, formatVanBanDiDatetime, CultureInfo.InvariantCulture);
                        }
                        catch (Exception ex) { }
                        try
                        {
                            ngayBanHanh = DateTime.ParseExact(signedData.VanBanDi.NgayBanHanh, formatVanBanDiDatetime, CultureInfo.InvariantCulture);
                        }
                        catch (Exception ex) { }

                        var chuyenBuocXuLyCommand = new ChuyenBuocXuLyQLVB()
                        {
                            BuocHienTai = buocXuLyTiepTheo,
                            TrichYeuKetQua = signedData.VanBanDi.TrichYeu,
                            DinhKemKetQua = dinhKemDuThao,
                            YKienNguoiChuyenXuLy = signedData.VanBanDi.TrichYeu,
                            DinhKemYKienNguoiChuyenXuLy = dinhKemDuThao,
                            NguoiXuLyTiep = nguoiXuLyTiep, // ở HoSoSevices có trả về LaBuocChuyenLTQLVB => từ đó node chuyển ltqlvb sẽ có giá trị trên hoSo.NguoiXuLyTiep
                            LoaiVanBanKetQua = signedData.VanBanDi?.LoaiVanBan ?? null,
                            SoKyHieuKetQua = signedData.VanBanDi.SoKyHieu,
                            NguoiKyKetQua = signedData.VanBanDi.NguoiKy,
                            CoQuanBanHanhKetQua = signedData.DonVi.Ten,
                            TenNguoiGui = "Văn thư đơn vị",
                            NgayBanHanhKetQua = ngayBanHanh,
                            NgayKy = ngayKy
                        };
                        updateHoSoSucceed = await _hoSoServices.ChuyenBuocXuLyQuanLyVanBan(chuyenBuocXuLyCommand, hoSo, true);
                    };
                    
                }
                else if (signedData.LoaiKetQua == "02")
                {
                    if (thamSoAn != null && !string.IsNullOrEmpty(thamSoAn.DuThao) && !string.IsNullOrEmpty(thamSoAn.DuThaoId))
                    {
                        updateHoSoSucceed = await CapNhatDuThaoXuLyHoSo(hoSo, currentTime, nguoiKy, thamSoAn, dinhKemDuThao, signedData);
                    } else
                    {
                        var chuyenBuocXuLyCommand = new ChuyenBuocXuLyQLVB()
                        {
                            BuocHienTai = buocXuLyTiepTheo,
                            TenNguoiGui = nguoiKy,
                            TrichYeuKetQua = signedData.VanBanDi?.TrichYeu ?? "",
                            DinhKemYKienNguoiChuyenXuLy = dinhKemDuThao,
                            DinhKemKetQua = dinhKemDuThao,
                            LoaiVanBanKetQua = signedData.VanBanDi?.LoaiVanBan ?? null,
                            SoKyHieuKetQua = signedData.VanBanDi?.SoKyHieu ?? null,
                            NguoiKyKetQua = signedData.VanBanDi?.NguoiKy ?? null,
                            CoQuanBanHanhKetQua = signedData.DonVi.Ten,
                            NguoiXuLyTiep = nguoiXuLyTiep, // ở HoSoSevices có trả về LaBuocChuyenLTQLVB => từ đó node chuyển ltqlvb sẽ có giá trị trên hoSo.NguoiXuLyTiep
                        };
                        //await _mediator.Send(chuyenBuocXuLyCommand);
                        updateHoSoSucceed = await _hoSoServices.ChuyenBuocXuLyQuanLyVanBan(chuyenBuocXuLyCommand, hoSo);
                    }
                }
                else if (signedData.LoaiKetQua == "03")
                {
                    if (thamSoAn != null && !string.IsNullOrEmpty(thamSoAn.DuThao) && !string.IsNullOrEmpty(thamSoAn.DuThaoId))
                    {
                        var updateDuThaoXuLyHoSoCount = await _dapperRepository.ExcuteAsync($"UPDATE {SchemaNames.Business}.{TableNames.DuThaoXuLyHoSos} SET TrangThai = @TrangThai WHERE Id = @Id", new
                        {
                            Id = thamSoAn.DuThaoId,
                            TrangThai = DuThaoXuLyHoSoConstant.TrangThai_DaXuLy,
                        });
                        updateHoSoSucceed = updateDuThaoXuLyHoSoCount > 0;
                    } else
                    {
                        string noiDung = string.Empty;
                        if (signedData.VanBanDi != null && !string.IsNullOrEmpty(signedData.VanBanDi.TrichYeu))
                        {
                            noiDung = signedData.VanBanDi.TrichYeu;
                        }

                        updateHoSoSucceed = await TraLaiBuocTruoc(hoSo, noiDung, currentTime);
                    }
                }
                await UpdateHoanThanhXuLyQLVB(docCode, httpClient, updateHoSoSucceed == true ? "03" : "04");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString(), new { module = "LTQLVB" });
            }

        }
        return hoSo;
    }

    public async Task SyncDataFromLTQLVB()
    {
        var startTime = DateTime.Now;
        var totalItem = 0;
        try
        {
            if (string.IsNullOrEmpty(_settings.urlLienThongQLVB))
            {
                return;
            }
            var httpClient = _clientFactory.CreateClient();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(_settings.authorizationSchema, _settings.tokenLienThongQLVB);

            HttpRequestMessage requestSignedDocCodes = new HttpRequestMessage(HttpMethod.Get, $"{_settings.urlLienThongQLVB}/LayDanhSachGoiTinVanBan?maDonViCha={_settings.maDonViDongBo}&top={_settings.gioiHanSoLuongXuLy}");

            var httpResponse = await httpClient.SendAsync(requestSignedDocCodes);
            var response = await httpResponse.Content.ReadFromJsonAsync<LTQLVBResponse<List<string>>>();
            
            var updatedHoSos = new List<HoSo>();
            if (response.data != null && response.data.Count > 0)
            {
                totalItem = response.data.Count;
                for (int i = 0; i < response.data.Count; i++)
                {
                    var docCode = response.data[i];
                    HttpRequestMessage requestSignedDocData = new HttpRequestMessage(HttpMethod.Get, $"{_settings.urlLienThongQLVB}/LayGoiTinVanBan?MaVanBan={docCode}");
                    try
                    {
                        var signedDocData = await httpClient.SendAsync(requestSignedDocData);
                         var responseGoiTinVanBan = await signedDocData.Content.ReadFromJsonAsync<LTQLVBResponse<LTQLVBSignedDocResponse>>();
                        var hoSo = await UpdateHoSo(responseGoiTinVanBan.data, docCode, httpClient);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError("docCode:"+ docCode + ex.ToString());
                        await UpdateHoanThanhXuLyQLVB(docCode, httpClient, "04");
                    }
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
        } finally
        {
            var endTime = DateTime.Now;
            _logger.LogWarning($"ThoiGianXuLy_{totalItem}_GoiTin: {endTime - startTime}");
        }

    }

    public async Task<bool> LuuVetHoSo(HoSoQLVB hoSo, DateTime currentTime, string tenNguoiGui)
    {
        try
        {
            bool updateSucceed = false;
            var quaTrinhXuLyHoSoSql = HoSoCommandBuilder.GetQuaTrinhXuLyHoSoQLVB();
            string nguoiGui = string.Empty;
            if (!string.IsNullOrEmpty(hoSo.NguoiDangXuLy))
            {
                if (hoSo.NguoiDangXuLy.Contains("##"))
                {
                    nguoiGui = hoSo.NguoiDangXuLy.Split("##")[0];
                }
                else
                {
                    nguoiGui = hoSo.NguoiDangXuLy;
                }
            }
            if(nguoiGui.Length > 50)
            {
                nguoiGui = nguoiGui.Substring(0, 50);
            }
            var quaTrinhXuLy = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, hoSo.BuocHienTai, null, null, hoSo.NgayHenTraCaNhan, nguoiGui, tenNguoiGui ?? "Hệ thống quản lý văn bản", "", "", currentTime, null, null, "Ký duyệt, chuyển văn thư đơn vị", hoSo.TrangThaiHoSoId);
            var resAddQTXL = await _dapperRepository.ExcuteAsync(quaTrinhXuLyHoSoSql, quaTrinhXuLy);
            if (resAddQTXL == 1)
            {
                updateSucceed = true;
            }
            return updateSucceed;
        } catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return false;
        }
    }

    public async Task<bool> CapNhatDuThaoXuLyHoSo(HoSoQLVB hoSo, DateTime currentTime, string nguoiKy, LienThongQLVB_ThamSoAn thamSoAn, string dinhKemDuThao, LTQLVBSignedDocResponse response)
    {
        bool updateSucceed = false;
        var duThaoXuLyHoSo = await _dapperRepository.QueryFirstOrDefaultAsync<DuThaoXuLyHoSo>($"SELECT {nameof(DuThaoXuLyHoSo.Id)}, {nameof(DuThaoXuLyHoSo.FileDinhKem)}, {nameof(DuThaoXuLyHoSo.NguoiXuLy)}  FROM {SchemaNames.Business}.{TableNames.DuThaoXuLyHoSos} WHERE Id = @Id ", new
        {
            Id = thamSoAn.DuThaoId,
        });
        try
        {
            if(duThaoXuLyHoSo == null)
            {
                LogTrace(hoSo.MaHoSo, "DuThaoXuLyHoSoDaXuLy " + "Dự thảo đã được xử lý");
                return true;
            }
            #region signed data
            var soKyHieu = response.VanBanDi?.SoKyHieu ?? "";
            var trichYeu = response.VanBanDi?.TrichYeu ?? "";
            var loaiVanBan = response.VanBanDi?.LoaiVanBan ?? "";
            DateTime? ngayBanHanh = null;
            DateTime? ngayKy = null;
            try
            {
                if (!string.IsNullOrEmpty(response.VanBanDi.NgayBanHanh))
                {
                    ngayBanHanh = DateTime.ParseExact(response.VanBanDi.NgayBanHanh, formatVanBanDiDatetime, CultureInfo.InvariantCulture);
                }
            }
            catch (Exception ex) { }
            try
            {
                if (!string.IsNullOrEmpty(response.VanBanDi.NgayKy))
                {
                    ngayKy = DateTime.ParseExact(response.VanBanDi.NgayKy, formatVanBanDiDatetime, CultureInfo.InvariantCulture);
                }
            } catch (Exception ex) { }  
            string coQuanBanHanh = response.DonVi.Ten ?? "";
            #endregion
            #region dữ liệu kết quả hồ sơ hiện tại
            var dinhKemKetQuaCu = hoSo.DinhKemKetQua;
            var trichYeuKetQuaCu = hoSo.TrichYeuKetQua;
            var soKyHieuKetQuaCu = hoSo.SoKyHieuKetQua;
            var loaiVanBanKetQuaCu = hoSo.LoaiVanBanKetQua;
            var nguoiKyKetQuaCu = hoSo.NguoiKyKetQua;
            var coQuanBanHanhKetQuaCu = hoSo.CoQuanBanHanhKetQua;
            var ngayBanHanhKetQuaCu = hoSo.NgayBanHanhKetQua;
            var ngayKyKetQuaCu = hoSo.NgayKyKetQua;
            #endregion

            if (thamSoAn != null && thamSoAn.DuThao == DuThaoXuLyHoSoConstant.Loai_BoSung)
            {
                var yeuCauMotCuaBoSung = new MotCuaYeuCauBoSungCommand()
                {
                    Id = hoSo.Id,
                    LyDoBoSung = trichYeu,
                    DinhKemBoSung = dinhKemDuThao,
                    NoiDungBoSung = "",
                    ThanhPhanBoSung = null,
                    ThoiHanBoSung = null
                };
                if (!string.IsNullOrEmpty(dinhKemDuThao))
                {
                    var ketQuaLienQuan = new KetQuaLienQuan(hoSo.MaHoSo, loaiVanBanKetQuaCu, soKyHieuKetQuaCu, trichYeuKetQuaCu, ngayKyKetQuaCu, nguoiKy, coQuanBanHanhKetQuaCu, ngayBanHanhKetQuaCu, null, null, dinhKemKetQuaCu);
                    int updatedRows = await _dapperRepository.InsertEntityAsync<KetQuaLienQuan>(ketQuaLienQuan, SchemaNames.Business + "." + TableNames.KetQuaLienQuans);
                    updateSucceed = updatedRows > 0;
                    hoSo.SetDataDuThao(trichYeu, dinhKemDuThao, loaiVanBan, soKyHieu, nguoiKy, coQuanBanHanh, ngayBanHanh, ngayKy);
                }
                updateSucceed = await _hoSoServices.YeuCauMotCuaBoSungHoSo(yeuCauMotCuaBoSung, hoSo, currentTime, nguoiKy, duThaoXuLyHoSo.NguoiXuLy, null);
            }
            else if (thamSoAn != null && thamSoAn.DuThao == DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut)
            {
                var trangThaiThanhToan = new YeuCauThanhToanConstants();
                string sqlUpdateYcct = $@"Update {SchemaNames.Business}.{TableNames.YeuCauThanhToans} SET TrangThai = N'{trangThaiThanhToan.TRANG_THAI.HUY}'
                            WHERE (TrangThai = N'{trangThaiThanhToan.TRANG_THAI.CHO_THANH_TOAN}' OR TrangThai = N'{trangThaiThanhToan.TRANG_THAI.CHUA_THANH_TOAN}')
                            AND MaHoSo = @MaHoSo And DeletedOn is null";

                await _dapperRepository.ExcuteAsync(sqlUpdateYcct, new
                {
                    MaHoSo = hoSo.MaHoSo
                });

                var chuyenTraHoSoCommand = new ChuyenTraHoSoCommand()
                {
                    Id = hoSo.Id,
                    DinhKemYKienNguoiChuyenXuLy = dinhKemDuThao,
                    YKienNguoiChuyenXuLy = trichYeu,
                };

                if (!string.IsNullOrEmpty(dinhKemDuThao))
                {
                    var ketQuaLienQuan = new KetQuaLienQuan(hoSo.MaHoSo, loaiVanBanKetQuaCu, soKyHieuKetQuaCu, trichYeuKetQuaCu, ngayKyKetQuaCu, nguoiKy, coQuanBanHanhKetQuaCu, ngayBanHanhKetQuaCu, null, null, dinhKemKetQuaCu);
                    int updatedRows = await _dapperRepository.InsertEntityAsync<KetQuaLienQuan>(ketQuaLienQuan, SchemaNames.Business + "." + TableNames.KetQuaLienQuans);
                    updateSucceed = updatedRows > 0;
                    hoSo.SetDataDuThao(trichYeu, dinhKemDuThao, loaiVanBan, soKyHieu, nguoiKy, coQuanBanHanh, ngayBanHanh, ngayKy);
                }
                updateSucceed = await _hoSoServices.ChuyenTraHoSo(chuyenTraHoSoCommand, hoSo, currentTime, nguoiKy, "Phát hành văn bản");
            }
            else if (thamSoAn != null && thamSoAn.DuThao == DuThaoXuLyHoSoConstant.Loai_XinLoi)
            {
                var duThaoXinLoiResponse = new DuThaoXinLoiResponse()
                {
                    Id = hoSo.Id,
                    DinhKemYKienNguoiChuyenXuLy = dinhKemDuThao,
                    YKienNguoiChuyenXuLy = trichYeu
                };
                var dinhKemDuThaoXinLoi = duThaoXuLyHoSo.FileDinhKem;
                if (!string.IsNullOrEmpty(dinhKemDuThao))
                {
                    dinhKemDuThaoXinLoi = dinhKemDuThao;
                }
                updateSucceed = await _hoSoServices.DuThaoXinLoi(duThaoXinLoiResponse, hoSo, currentTime, nguoiKy, thamSoAn.NgayHenTraMoi);
                await _eventPublisher.PublishAsync(new DuThaoXinLoiEvent(hoSo, hoSo.NgayHenTra, thamSoAn.NgayHenTraMoi, hoSo.TenDonVi, hoSo.NgayTiepNhan, hoSo.TrichYeuHoSo, hoSo.MaHoSo, dinhKemDuThaoXinLoi));
            }
            var updateDuThaoXuLyHoSoCount = await _dapperRepository.ExcuteAsync($"UPDATE {SchemaNames.Business}.{TableNames.DuThaoXuLyHoSos} SET TrangThai = @TrangThai WHERE Id = @Id", new
            {
                Id = thamSoAn.DuThaoId,
                TrangThai = DuThaoXuLyHoSoConstant.TrangThai_DaXuLy,
            });
            if (updateDuThaoXuLyHoSoCount == 0)
            {
                return false;
            }
            return updateSucceed;
        }
        catch(Exception ex)
        {
            _logger.LogError(hoSo.MaHoSo + " DuThaoXuLyHoSo " + ex.ToString());
            return false;
        }
    }

    public async Task<bool> TraLaiBuocTruoc(HoSoQLVB hoSo, string? noiDung, DateTime currentTime)
    {
        var nguoiXuLyTruoc = hoSo.NguoiXuLyTruoc;
        var nguoiDangXuLy = hoSo.NguoiDangXuLy;
        bool updateSucceed = false;

        var sqlTruongHopThuTuc = "SELECT Ten,Ma, Id, NodeQuyTrinh, EdgeQuyTrinh, ThoiGianThucHien, LoaiThoiGianThucHien FROM Business.TruongHopThuTucs WHERE Ma = @MaTruongHop";
        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlTruongHopThuTuc, new
        {
            hoSo.MaTruongHop
        });
        try
        {
            if (string.IsNullOrEmpty(hoSo.BuocXuLyTruoc))
            {
                _logger.LogError($"{hoSo.MaHoSo}_Không có bước xử lý trước");
                return false;
            }
            if (hoSo.TrangThaiHoSoId == "4")
            {
                if (hoSo.ChuyenNoiBo == false)
                {
                        
                    var nodeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowNodeQuyTrinhXuLy>>(truongHopThuTuc.NodeQuyTrinh);
                    var edgeQuyTrinhs = JsonConvert.DeserializeObject<List<ReactFlowEdgeQuyTrinhXuLy>>(truongHopThuTuc.EdgeQuyTrinh);
                    var currentNode = nodeQuyTrinhs.Find(node => node.id == hoSo.BuocHienTai);
                    var beforeCurrentNode = nodeQuyTrinhs.Find(node => node.id == hoSo.BuocXuLyTruoc);
                    var updateHoSoSql = HoSoCommandBuilder.GetTraLaiHoSoSql(nguoiXuLyTruoc, nguoiDangXuLy, "", beforeCurrentNode.data.maTrangThaiHoSo, hoSo.BuocXuLyTruoc, beforeCurrentNode.data.tenBuocXuLy, currentTime);

                    var updatedRowUpdateHoSo = await _dapperRepository.ExcuteAsync(updateHoSoSql, new
                    {
                        NguoiDangXuLy = nguoiXuLyTruoc,
                        NguoiXuLyTruoc = nguoiDangXuLy,
                        BuocXuLyTruoc = "",
                        TrangThaiHoSoId = beforeCurrentNode.data.maTrangThaiHoSo,
                        BuocHienTai = hoSo.BuocXuLyTruoc,
                        TenBuocHienTai = beforeCurrentNode.data.tenBuocXuLy,
                        NgayTiepNhanCaNhan = currentTime,
                        Id = hoSo.Id
                    });
                    if(updatedRowUpdateHoSo == 1)
                    {
                        updateSucceed = true;
                        await _nguoiXuLyHoSoService.SwapNguoiDangXuLyAndNguoiDaXuLy(hoSo.Id, nguoiXuLyTruoc, NguoiXuLyHoSo.NguoiXuLyHoSo_TrangThai.TrungGian);
                    }

                    //await _repositoryHoSo.UpdateAsync(updatedHoSo, cancellationToken);
                    var quaTrinhXuLyHoSoSql = HoSoCommandBuilder.GetQuaTrinhXuLyHoSoQLVB();
                    var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, nguoiDangXuLy ?? "", "Hệ thống quản lý văn bản", nguoiXuLyTruoc, "", currentTime, noiDung, null, "Trả lại hồ sơ", "");
                    //await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
                    var insertedRowQTXL = await _dapperRepository.ExcuteAsync(quaTrinhXuLyHoSoSql, quaTrinhXuLyHoSo);
                    if(insertedRowQTXL == 1)
                    {
                        updateSucceed = true;
                    }
                    if(updateSucceed == true)
                    {
                        //transactionScope.Complete();
                        return true;
                    } else
                    {
                        //transactionScope.Dispose();
                        return false;
                    }
                }
            }
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError("Hồ sơ đang không trong trạng thái đang xử lý");
            return false;
        }
    }

    public async Task<bool> YeuCauMotCuaBoSung()
    {
        return false;
    }

    public async Task<bool> XinRutTraKetQuaDuThao()
    {
        return false;
    }
}
