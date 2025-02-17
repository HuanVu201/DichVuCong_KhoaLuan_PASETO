using Hangfire.Logging;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Org.BouncyCastle.Ocsp;
using System.Diagnostics.Eventing.Reader;
using System.Globalization;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Transactions;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Queries;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Classes;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.BGTVT;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Infrastructure.Minio;

namespace TD.DichVuCongApi.Infrastructure.KetNoi.BGTVT;
public class GPLXService : IGPLXService
{
    private readonly GPLXSetting _settings;
    private readonly IRepository<HoSo> _hoSoRepository;
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<TruongHopThuTuc> _repositoryTruongHopThuTuc;
    private readonly IReadRepository<ThuTuc> _repositoryThuTuc;
    private readonly IInjectConfiguration _injectConfiguration;
    private readonly IHoSoServices _hoSoServices;
    private readonly IReadRepository<NgayNghi> _ngayNghiRepository;
    private readonly IReadRepository<ThanhPhanThuTuc> _repositoryThanhPhanThuTuc;
    private readonly IRepository<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IRepository<Domain.Business.ThanhPhanHoSo> _repositoryThanhPhanHoSo;
    private readonly ILogger<GPLXService> _logger;
    private readonly IMinioService _minioService;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private string session = "";
    private readonly string LOAIDULIEUKETNOI_SYNCGPLX = "SyncGPLX";
    private readonly IGenerateMaHoSo _generateMaHoSo;
    private void SetSession(string value)
    {
        session = value;
    }
    public GPLXService(
        IMinioService minioService,
        IOptions<GPLXSetting> options,
        ILogger<GPLXService> logger,
        IRepository<HoSo> hoSoRepository,
        IReadRepository<TruongHopThuTuc> repositoryTruongHopThuTuc,
        IReadRepository<ThuTuc> repositoryThuTuc,
         IInjectConfiguration injectConfiguration,
         IReadRepository<NgayNghi> ngayNghiRepository,
         IHoSoServices hoSoServices,
        IDapperRepository dapperRepository,
         IReadRepository<ThanhPhanThuTuc> repositoryThanhPhanThuTuc,
         IRepository<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo,
         IRepository<Domain.Business.ThanhPhanHoSo> repositoryThanhPhanHoSo,
         IGenerateMaHoSo generateMaHoSo,
         INguoiXuLyHoSoService nguoiXuLyHoSoService
    )
    {
        _minioService = minioService;
        _settings = options.Value;
        _hoSoRepository = hoSoRepository;
        _hoSoServices = hoSoServices;
        _dapperRepository = dapperRepository;
        _repositoryTruongHopThuTuc = repositoryTruongHopThuTuc;
        _repositoryThuTuc = repositoryThuTuc;
        _injectConfiguration = injectConfiguration;
        _ngayNghiRepository = ngayNghiRepository;
        _repositoryThanhPhanThuTuc = repositoryThanhPhanThuTuc;
        _repositoryThanhPhanHoSo = repositoryThanhPhanHoSo;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _logger = logger;
        _generateMaHoSo = generateMaHoSo;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }
    private class UserDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }
    }

    public async Task<Result<string>> AddGPLX(GPLXParams req, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(_settings.MaDonVi))
        {
            throw new Exception("Chưa cấu hình MaDonVi");
        }
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string sqlGetMaDinhDanh = @"SELECT Top 1 Id, MaDinhDanh, DonViQuanLy from Catalog.Groups where GroupCode = @DonViId";
        var group = await _dapperRepository.QueryFirstOrDefaultAsync<Group>(sqlGetMaDinhDanh, new
        {
            DonViId = _settings.MaDonVi
        });
        var maHoSo = await _generateMaHoSo.GenerateMaHoSo(group.MaDinhDanh, cancellationToken: cancellationToken);
        if (string.IsNullOrEmpty(maHoSo))
        {
            throw new Exception("tạo mã hồ sơ thất bại");
        }
        var thuTuc = await _repositoryThuTuc.GetBySpecAsync(new GetThuTucByMaTTHCSpec(req.ThuTuc));
        var caculateTime = new CaculateTime(_injectConfiguration);
        //, TruongHopThuTuc_LoaiDuLieuKetNoi.DoiGPLXXeMay
        var truongHopThuTucs = await _repositoryTruongHopThuTuc.ListAsync(new GetTruongHopThuTucsByMaTTHCSpec(req.ThuTuc));
        if(truongHopThuTucs == null || truongHopThuTucs.Count == 0)
        {
            _logger.LogError($"{req.MaHoSo}_API_TaoGPLX_KhongTimThayTHTT_req:{JsonConvert.SerializeObject(req)}");
            return Result<string>.Fail($"Không tồn tại trường hợp thủ tục tương ứng với mã thủ tục: {req.ThuTuc}");
        }
        var truongHopThuTuc = truongHopThuTucs.Find(x => x.LoaiDuLieuKetNoi == req.LoaiDuLieuKetNoi);
        if(truongHopThuTuc == null)
        {
            truongHopThuTuc = truongHopThuTucs[0];
        }
        var firstNode = _hoSoServices.GetFirstNode(truongHopThuTuc);

        double thoiGianXuLy = caculateTime.GetThoiGianXuLy(firstNode, "1");
        var ngayNghis = await _ngayNghiRepository.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year));
        var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, thoiGianXuLy, truongHopThuTuc.LoaiThoiGianThucHien);

        string donViQuanLy = !string.IsNullOrEmpty(group.DonViQuanLy) ? group.DonViQuanLy : _settings.MaDonVi;


        var nguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<UserDto>($"SELECT Top 1 Id, FullName FROM {SchemaNames.Identity}.{TableNames.Users} WHERE TypeUser = 'CanBo' AND UserName = @UserName", new
        {
            UserName = req.NguoiNhan
        });
        var thanhPhanThuTucs = await _repositoryThanhPhanThuTuc.ListAsync(new GetThanhPhanThuTucByMaTTHCSpec(truongHopThuTuc.Ma));
        DateTime? ngayHenTra = truongHopThuTuc.KhongCoNgayHenTra == true ? null : caculateTime.TinhNgayHenTra(ngayNghis, currentTime, (int)truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.LoaiThoiGianThucHien);

        try
        {
            string mucDo = thuTuc.MucDo;
            if (truongHopThuTuc.KhongNopTrucTuyen != null && truongHopThuTuc.KhongNopTrucTuyen == true)
            {
                mucDo = "2";
            }
            var hoSo = new HoSo(_settings.MaDonVi, maHoSo, LoaiChuHoSoConstant.CongDan, req.ChuHoSo, req.SoDienThoai, null, req.CMND, LoaiChuHoSoConstant.CongDan, req.NgaySinh, null, null, null, req.DiaChiThuongTru,
                req.CMND, req.ThuTuc, truongHopThuTuc.Ma, truongHopThuTuc.Ten, truongHopThuTuc.Id.ToString(), null, null, nguoiTiepNhan.Id, thuTuc.TenTTHC + " (" + "Hạng " + req.HangGPLX + ")", currentTime, null,
                null, null, null, null, null, null, null, null, req.ThuTuc, currentTime, ngayHenTraCaNhan, mucDo, "0", donViTraKq: donViQuanLy);
            hoSo.AddGPLX(thuTuc.MaLinhVucChinh, thuTuc.TenTTHC, ngayHenTra, nguoiTiepNhan.Id, firstNode.id, req.KenhThucHien);
            hoSo.SetThoiGianThucHien(truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.ThoiGianThucHienTrucTuyen, truongHopThuTuc.LoaiThoiGianThucHien);
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(maHoSo, null, null, null, null, nguoiTiepNhan?.Id ?? "", nguoiTiepNhan.FullName ?? "", "", null, currentTime, trangThai: "2");

            var thanhPhanHoSos = new List<Domain.Business.ThanhPhanHoSo>();
            for (int i = 0; i < thanhPhanThuTucs.Count; i++)
            {
                var thanhPhanThuTuc = thanhPhanThuTucs[i];
                var thanhPhanHoSo = new Domain.Business.ThanhPhanHoSo(thanhPhanThuTuc.Ten, maHoSo, thanhPhanThuTuc.SoBanChinh, thanhPhanThuTuc.SoBanSao, thanhPhanThuTuc.MaGiayToKhoQuocGia,
                    "", null, null, null, thanhPhanThuTuc.Ma, null, null, null, null, null, null);
                thanhPhanHoSos.Add(thanhPhanHoSo);
            }

            await _hoSoRepository.AddAsync(hoSo, cancellationToken);
            await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(nguoiTiepNhan.Id, hoSo.Id, cancellationToken: cancellationToken);
            await _repositoryThanhPhanHoSo.AddRangeAsync(thanhPhanHoSos, cancellationToken);
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
            return Result<string>.Success(data: maHoSo);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
    private async Task<TRes> RequestHandler<TReq, TRes>(TReq req, string suffix)
    {
        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            if (!string.IsNullOrEmpty(_settings.Token))
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _settings.Token);
            }

            HttpRequestMessage httpRequest = new HttpRequestMessage(HttpMethod.Post, _settings.SyncApiUrl + suffix);
            var reqContent = JsonConvert.SerializeObject(req);
            httpRequest.Content = new StringContent(reqContent, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));

            var res = await httpClient.SendAsync(httpRequest);
            var stringContent = await res.Content.ReadAsStringAsync();
            var jsonData = JsonConvert.DeserializeObject<TRes>(stringContent);
            return jsonData;
        }
    }

    public async Task SyncGPLX()
    {
        if (_settings.Enable == false)
        {
            return;
        }
        string userName = _settings.UserName;
        string password = _settings.Password;
        if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
        {
            throw new Exception("Chưa cấu hình UserName hoặc Password");
        }
        if (string.IsNullOrEmpty(_settings.SyncApiUrl))
        {
            throw new Exception("Chưa cấu hình ApiUrl");
        }
        if (string.IsNullOrEmpty(_settings.MaDonViXuLy))
        {
            throw new Exception("Chưa cấu hình MaDonViXuLy");
        }
        DataLoginInput inputLogin = new DataLoginInput()
        {
            password = password,
            username = userName,
        };
        var dataLogin = await RequestHandler<DataLoginInput, DataLogin>(inputLogin, "/apiDVC-GPLX/tcdbdvcdata/mapi/login");
        SetSession(dataLogin.session);
        try
        {
            DateTime now = DateTime.Now;
            DateTime fromDay = now.AddDays(-3);
            DateTime toDay = now;
            await DongBoTiepNhanHoSoGPLX(fromDay, toDay);
        }
        catch (Exception ex) {
            throw;
        }
    }
    private async Task DongBoTiepNhanHoSoGPLX(DateTime fromDay, DateTime toDay)
    {
        DataGPLXInput inputDanhSach = new DataGPLXInput()
        {
            session = session,
            service = "DanhSachHoSo",
            donViXuLy = _settings.MaDonViXuLy,
            ngayNhan1 = fromDay.ToString("yyyy-MM-dd"),
            ngayNhan2 = toDay.ToString("yyyy-MM-dd"),
        };
        var dataDanhSach = await RequestHandler<DataGPLXInput, DataGPLX>(inputDanhSach, "/apiDVC-GPLX/tcdbdvcdata/mapi/g");
        var ngayNghis = await _ngayNghiRepository.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year));
        string sqlGetMaDinhDanh = @"SELECT Top 1 Id,DonViQuanLy from Catalog.Groups where GroupCode = @DonViId";
        var group = await _dapperRepository.QueryFirstOrDefaultAsync<Group>(sqlGetMaDinhDanh, new
        {
            DonViId = _settings.MaDonVi
        });

        string donViQuanLy = !string.IsNullOrEmpty(group.DonViQuanLy) ? group.DonViQuanLy : _settings.MaDonVi;

        foreach (HoSoGPLX data in dataDanhSach.data)
        {
            try
            {
                
                if (!string.IsNullOrEmpty(data.ngayNhanHoSo) && !string.IsNullOrEmpty(data.ngayHenTraGplx))
                {
                    try
                    {
                        DataGPLXChiTietInput inputChiTiet = new DataGPLXChiTietInput();
                        inputChiTiet.session = session;
                        inputChiTiet.service = "TraCuuHoSo";
                        inputChiTiet.donViXuLy = _settings.MaDonViXuLy;
                        inputChiTiet.mahoso = data.maHoSo;
                        DataGPLXChiTiet resChiTiet = await RequestHandler<DataGPLXChiTietInput, DataGPLXChiTiet>(inputChiTiet, "/apiDVC-GPLX/tcdbdvcdata/mapi/g");
                        if (resChiTiet.data != null && resChiTiet.data.Count > 0)
                        {
                            HoSoGPLXChiTiet dataChiTiet = resChiTiet.data[0];
                            await ImportHoSo(data, dataChiTiet, ngayNghis, donViQuanLy);
                        }
                    }
                    catch (Exception exx)
                    {
                        _logger.LogError(exx.ToString(), "Loi Import " + data.maHoSo);
                    }
                }
                else
                {
                    _logger.LogError("Tu Choi " + data.maHoSo);
                }
                
            }
            catch (Exception exxxx)
            {
                _logger.LogError(exxxx.ToString(), "Loi " + data.maHoSo);
            }
        }
    }
    private class CheckHoSoExist
    {
        public string MaHoSo { get; set; }
    }
    private class DiaChiChuHoSo
    {
        public string TenDiaBan { get; set; }
    }

    private class BCCIData
    {
        public string hoVaTen { get; set; }
        public string soDienThoai { get; set; }
        public string email { get; set; }
        public string diaChi { get; set; }
        public string tinhThanh { get; set; }
        public string quanHuyen { get; set; }
        public string xaPhuong { get; set; }
    }
    private async Task ImportHoSo(HoSoGPLX data, HoSoGPLXChiTiet chiTiet, List<NgayNghi> ngayNghis, string donViQuanLy)
    {
        var maHoSo = data.maHoSo;
        var checkHoSoExistSql = $"SELECT TOP 1 MaHoSo FROM {SchemaNames.Business}.{TableNames.HoSos} WHERE MaHoSo = @MaHoSo and LoaiDuLieuKetNoi = @LoaiDuLieuKetNoi";

        if (string.IsNullOrEmpty(chiTiet.NgayTiepNhan))
        {
            return;
        }

        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<CheckHoSoExist>(checkHoSoExistSql, new
        {
            MaHoSo = maHoSo,
            LoaiDuLieuKetNoi = LOAIDULIEUKETNOI_SYNCGPLX
        });
        if (hoSo != null)
        {
            return;
        }
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);

        string formatVanBanDiDatetime = "yyyy-mm-dd";
        DateTime ngaySinhChuHoSo = DateTime.ParseExact(data.ngaySinh, formatVanBanDiDatetime, CultureInfo.InvariantCulture);
        string maTinh = data.dvhcNoiCuTru.Substring(0, 2);
        string maHuyen = data.dvhcNoiCuTru.Substring(0, 5);
        string maXa = data.dvhcNoiCuTru.Substring(5, data.dvhcNoiCuTru.Length - 5);
        var tinhThanhChuHoSo = maTinh;
        var quanHuyenChuHoSo = maTinh + "." + maHuyen;
        var xaPhuongChuHoSo = maTinh + "." + maHuyen + "." + maXa;
        var ngayTiepNhan = DateTime.ParseExact(chiTiet.NgayTiepNhan, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
        var ngayHenTra = DateTime.ParseExact(chiTiet.NgayHenTra, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
        var ngayNop = DateTime.ParseExact(chiTiet.NgayNop, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);

        var caculateTime = new CaculateTime(_injectConfiguration);
        //
        var truongHopThuTucs = await _repositoryTruongHopThuTuc.ListAsync(new GetTruongHopThuTucsByMaTTHCSpec(chiTiet.MaTTHC));
        if (truongHopThuTucs == null || truongHopThuTucs.Count == 0)
        {
            _logger.LogError($"{maHoSo}_JobDongBoGPLX_KhongTimThayTHTT_req:{JsonConvert.SerializeObject(chiTiet)}");
            return;
        }

        var truongHopThuTuc = truongHopThuTucs.Find(x => x.LoaiDuLieuKetNoi == TruongHopThuTuc_LoaiDuLieuKetNoi.DoiGPLXOto);
        if (truongHopThuTuc == null)
        {
            truongHopThuTuc = truongHopThuTucs[0];
        }

        var firstNode = _hoSoServices.GetFirstNode(truongHopThuTuc);

        double thoiGianXuLy = caculateTime.GetThoiGianXuLy(firstNode, "1");
        var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, thoiGianXuLy, truongHopThuTuc.LoaiThoiGianThucHien);


        var thuTuc = await _repositoryThuTuc.GetBySpecAsync(new GetThuTucByMaTTHCSpec(chiTiet.MaTTHC));

        var danhSachCanBo = await _dapperRepository.QueryAsync<UserDto>($@"
                    SELECT u.Id, u.FullName FROM {SchemaNames.Catalog}.{TableNames.DonViThuTucs} dvtt INNER Join
                    {SchemaNames.Identity}.{TableNames.Users} u ON dvtt.NguoiTiepNhanId Like '%' + u.Id  + '%'
                    WHERE DonViId = @DonViId AND MaTTHC = @MaTTHC", new
        {
            DonViId = _settings.MaDonVi,
            MaTTHC = chiTiet.MaTTHC,
        });
        if (danhSachCanBo == null || danhSachCanBo.Count == 0)
        {
            _logger.LogError($"SyncGPLX_{maHoSo}" + "Chưa cấu hình người tiếp nhận");
            return;
        }
        var nguoiTiepNhan = danhSachCanBo[0].Id;
        var nguoiDangXuLy = string.Join("##", danhSachCanBo.Select(x => x.Id));

        var thanhPhanThuTucs = await _repositoryThanhPhanThuTuc.ListAsync(new GetThanhPhanThuTucByMaTTHCSpec(truongHopThuTuc.Ma));


        string sqlGetDiaChi = @"SELECT STRING_AGG (CONVERT(NVARCHAR(500),TenDiaBan) , ', ')
            WITHIN GROUP ( ORDER BY Len(MaDiaBan) DESC ) AS TenDiaBan  FROM [Catalog].[DiaBans]
            where MaDiaBan = @Xa or MaDiaBan = @Huyen or MaDiaBan = @Tinh";
        var diaChiChuHoSo = await _dapperRepository.QueryFirstOrDefaultAsync<DiaChiChuHoSo>(sqlGetDiaChi, new
        {
            Xa = xaPhuongChuHoSo,
            Huyen = quanHuyenChuHoSo,
            Tinh = tinhThanhChuHoSo,
        });
        string? bcciData = null;
        var hinhThucTra = chiTiet.HinhThucNhanKQ == "1" ? "1" : "0";
        if (hinhThucTra == "1")
        {
            bcciData = JsonConvert.SerializeObject(new BCCIData()
            {
                diaChi = diaChiChuHoSo.TenDiaBan,
                email = "",
                soDienThoai = "",
                hoVaTen = data.hoTen,
                quanHuyen = quanHuyenChuHoSo,
                tinhThanh = tinhThanhChuHoSo,
                xaPhuong = xaPhuongChuHoSo
            });
        }
        string urlGiayTo = string.Empty;
        
        foreach (HoSoDinhKem itemHoSoDinhKem in data.hoSoDinhKem)
        {
            string duongdanteptin = itemHoSoDinhKem.filedinhkem;

            LayTaiLieuInput inputLayTaiLieu = new LayTaiLieuInput();
            inputLayTaiLieu.session = session;
            inputLayTaiLieu.service = "LayTaiLieuHoSo";
            inputLayTaiLieu.donViXuLy = _settings.MaDonViXuLy;
            inputLayTaiLieu.duongdanteptin = duongdanteptin;
            TepTinDinhKemData dataTaiLieu = await RequestHandler<LayTaiLieuInput, TepTinDinhKemData>(inputLayTaiLieu, "/apiDVC-GPLX/tcdbdvcdata/mapi/g");
            if (dataTaiLieu.TepTinDinhKem.Count > 0)
            {
                string urlFile = await _minioService.UploadFileAsBase64Async(dataTaiLieu.TepTinDinhKem[0].Base64, itemHoSoDinhKem.tengiayto, null, "SyncGPLX");
                urlGiayTo += urlFile + "##";
            }

        }
        
        try
        {

            var newHoSo = new HoSo(_settings.MaDonVi, maHoSo, LoaiChuHoSoConstant.CongDan, data.hoTen, "", "", data.soCmnd, null, ngaySinhChuHoSo.ToString("yyyy"), tinhThanhChuHoSo,
                quanHuyenChuHoSo, xaPhuongChuHoSo, diaChiChuHoSo.TenDiaBan ?? "", data.soCmnd, thuTuc.MaTTHC, truongHopThuTuc.Ma, truongHopThuTuc.Ten, truongHopThuTuc.Id.ToString(),
                null, bcciData, nguoiDangXuLy, thuTuc.TenTTHC + " (" + data.lyDoDoiGplx + ")", ngayTiepNhan, null, null, null, null, null, null, null,
                null, null, thuTuc.MaTTHC, ngayNop, ngayHenTraCaNhan, thuTuc.MucDo, hinhThucTra, donViTraKq: donViQuanLy);
            newHoSo.SyncGPLX(thuTuc.MaLinhVucChinh, thuTuc.TenTTHC, ngayHenTra, nguoiTiepNhan, firstNode.id);
            newHoSo.SetThoiGianThucHien(truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.ThoiGianThucHienTrucTuyen, truongHopThuTuc.LoaiThoiGianThucHien);


            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(maHoSo, null, null, null, null, "", "", nguoiDangXuLy, null, currentTime, trangThai: "2");
            var hoSoId = Guid.NewGuid();
            newHoSo.SetId(hoSoId);
            int insetedHoSoCount = await _dapperRepository.InsertEntityAsync<HoSo>(newHoSo, SchemaNames.Business + "." + TableNames.HoSos);
            if (insetedHoSoCount != 1)
            {
                return;
            }
            await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(nguoiDangXuLy, hoSoId);

            int insertedTPHSCount = 0;
            for (int i = 0; i < thanhPhanThuTucs.Count; i++)
            {
                var thanhPhanThuTuc = thanhPhanThuTucs[i];
                var thanhPhanHoSo = new Domain.Business.ThanhPhanHoSo(thanhPhanThuTuc.Ten, maHoSo, thanhPhanThuTuc.SoBanChinh, thanhPhanThuTuc.SoBanSao, thanhPhanThuTuc.MaGiayToKhoQuocGia,
                    i == 0 ? urlGiayTo : null, null, null, null, thanhPhanThuTuc.Ma, null, null, null, null, null, null);
                thanhPhanHoSo.SetDinhKemGoc(i == 0 ? urlGiayTo : null);
                insertedTPHSCount += await _dapperRepository.InsertEntityAsync<Domain.Business.ThanhPhanHoSo>(thanhPhanHoSo, SchemaNames.Business + "." + TableNames.ThanhPhanHoSos);
            }
            if (insertedTPHSCount != thanhPhanThuTucs.Count)
            {
                return;
            }
            int insertedQTXLCount = await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLyHoSo, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
            if (insertedQTXLCount != 1)
            {
                return;
            }

        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString(), new
            {
                Service = "SyncGPLXERROR"
            });
        }
    }
    public async Task SyncDataManual(SyncDataManualRequest req)
    {
        if (string.IsNullOrEmpty(req.From) || string.IsNullOrEmpty(req.To))
        {
            return;
        }
        string userName = _settings.UserName;
        string password = _settings.Password;
        if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
        {
            throw new Exception("Chưa cấu hình UserName hoặc Password");
        }
        if (string.IsNullOrEmpty(_settings.SyncApiUrl))
        {
            throw new Exception("Chưa cấu hình ApiUrl");
        }
        if (string.IsNullOrEmpty(_settings.MaDonViXuLy))
        {
            throw new Exception("Chưa cấu hình MaDonViXuLy");
        }
        DataLoginInput inputLogin = new DataLoginInput()
        {
            password = password,
            username = userName,
        };
        var dataLogin = await RequestHandler<DataLoginInput, DataLogin>(inputLogin, "/apiDVC-GPLX/tcdbdvcdata/mapi/login");
        SetSession(dataLogin.session);
        try
        {
            DateTime fromDay = DateTime.ParseExact(req.From, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            DateTime toDay = DateTime.ParseExact(req.To, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            await DongBoTiepNhanHoSoGPLX(fromDay, toDay);
        }
        catch (Exception ex)
        {
            throw new Exception(JsonConvert.SerializeObject(ex));
        }
    }
}
