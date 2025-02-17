using Amazon.Runtime.Internal.Transform;
using Dapper;
using DocumentFormat.OpenXml.Drawing.Charts;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.VariantTypes;
using Hangfire;
using iTextSharp.text;
using Mapster;
using MessagePack.Formatters;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Org.BouncyCastle.Ocsp;
using Syncfusion.XlsIO.Implementation.XmlSerialization;
using System.Globalization;
using System.Net.Http.Headers;
using System.Text;
using System.Transactions;
using System.Xml;
using System.Xml.Linq;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.EMC;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.KhaiSinhKhaiTu;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.KetNoi.SLD;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Infrastructure.Persistence.Repository;
using static Syncfusion.XlsIO.Parser.Biff_Records.ExternSheetRecord;
using static TD.DichVuCongApi.Domain.Business.Events.HoSo.HoSoEventUtils;

namespace TD.DichVuCongApi.Infrastructure.KetNoi.KhaiSinhKhaiTu;
public class KhaiSinhKhaiTuService : IKhaiSinhKhaiTuService
{
    private readonly IRepository<HoSoLienThong> _repositoryHoSoLienThong;
    private readonly IRepository<TrangThaiHoSoLienThong> _repositoryTrangThaiHoSoLienThong;
    private readonly IReadRepository<TruongHopThuTuc> _repositoryTruongHopThuTuc;
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IRepository<HoSo> _hoSoRepo;
    private readonly IInjectConfiguration _iInjectConfiguration;
    private readonly ILogger<KhaiSinhKhaiTuService> _logger;
    private readonly KhaiSinhKhaiTuSettings _settings;
    private readonly IMinioService _minioService;
    private readonly IEMCService _eMCService;
    private readonly ICurrentUser _currentUser;
    private readonly IGenerateMaHoSo _generateMaHoSo;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private string _token;
    private Dictionary<string, ThuTuc> thuTucMapper;
    private Dictionary<string, TruongHopThuTuc> truongHopThuTucMapper;
    private Dictionary<int, Group> groupMapper;
    private readonly string formatDateString = "dd/MM/yyyy HH:mm:ss";
    private readonly string LTKH = "LTKH";

    public KhaiSinhKhaiTuService(
        IRepository<HoSoLienThong> repositoryHoSoLienThong,
        IRepository<TrangThaiHoSoLienThong> repositoryTrangThaiHoSoLienThong,
        ILogger<KhaiSinhKhaiTuService> logger,
        IOptions<KhaiSinhKhaiTuSettings> options,
        IDapperRepository dapperRepository,
        IReadRepository<TruongHopThuTuc> repositoryTruongHopThuTuc,
        IReadRepository<NgayNghi> repositoryNgayNghi,
        IInjectConfiguration iInjectConfiguration,
        IMinioService minioService,
        IEMCService eMCService,
        ICurrentUser currentUser,
        IGenerateMaHoSo generateMaHoSo,
        IRepository<HoSo> hoSoRepo,
        INguoiXuLyHoSoService nguoiXuLyHoSoService
        )
    {
        thuTucMapper = new Dictionary<string, ThuTuc>();
        truongHopThuTucMapper = new Dictionary<string, TruongHopThuTuc>();
        groupMapper = new Dictionary<int, Group>();
        _repositoryHoSoLienThong = repositoryHoSoLienThong;
        _repositoryTrangThaiHoSoLienThong = repositoryTrangThaiHoSoLienThong;
        _logger = logger;
        _settings = options.Value;
        _dapperRepository = dapperRepository;
        _repositoryTruongHopThuTuc = repositoryTruongHopThuTuc;
        _repositoryNgayNghi = repositoryNgayNghi;
        _iInjectConfiguration = iInjectConfiguration;
        _minioService = minioService;
        _eMCService = eMCService;
        _currentUser = currentUser;
        _generateMaHoSo = generateMaHoSo;
        _hoSoRepo = hoSoRepo;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }


    private async Task<TRes> RequestHandler<TReq, TRes>(TReq req, string hostName, string token, HttpMethod method, string suffix)
    {
        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            if (!string.IsNullOrEmpty(token))
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }
            HttpRequestMessage httpRequest = new HttpRequestMessage(method, hostName + suffix);
            var reqContent = JsonConvert.SerializeObject(req);
            httpRequest.Content = new StringContent(reqContent, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));

            var res = await httpClient.SendAsync(httpRequest);
            var stringContent = await res.Content.ReadAsStringAsync();
            var jsonData = JsonConvert.DeserializeObject<TRes>(stringContent);
            return jsonData;
        }
    }
    private async Task<string> RequestHandlerReturnPlainText<TReq>(TReq req, string hostName, string token, HttpMethod method, string suffix)
    {
        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            if (!string.IsNullOrEmpty(token))
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }
            HttpRequestMessage httpRequest = new HttpRequestMessage(method, hostName + suffix);
            var reqContent = JsonConvert.SerializeObject(req);
            httpRequest.Content = new StringContent(reqContent, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));

            var res = await httpClient.SendAsync(httpRequest);
            var stringContent = await res.Content.ReadAsStringAsync();
            return stringContent;
        }
    }
    private class CheckHoSoExist
    {
        public Guid Id { get; set; }
        public string MaHoSo { get; set; }
        public string TrangThaiHoSoId { get; set; }
    }
    public void CheckThaoTac(string loaiDuLieuKetNoi)
    {
        if (loaiDuLieuKetNoi == "LTKS" || loaiDuLieuKetNoi == "LTKT")
        {
            throw new Exception("Hồ sơ thuộc VNeID, vui lòng không sử dụng chức năng này");
        }
    }

    private async Task CreateHoSoHandler(KhaiSinhKhaiTu_HoSo data, List<NgayNghi> ngayNghis)
    {
        string sqlGetTTHC = @"SELECT TOP 1 TenTTHC, MucDo, MaLinhVucChinh, LinhVucChinh, MaTTHC FROM [Catalog].[ThuTucs] WHERE DeletedOn is null AND MaTTHC Like @MaTTHC + '%'";
        string sqlGetNguoiTiepNhan = @"SELECT STRING_AGG (CONVERT(NVARCHAR(1000),NguoiTiepNhanId) , '##') as TaiKhoanTiepNhan FROM [Catalog].[DonViThuTucs]
            where MaTTHC = @MaTTHC and DeletedOn is null and DonViId = @DonViId";
        string sqlGetDonViXaId = "SELECT TOP 1 YeuCauXacNhanCoKetQua, GroupCode, MadinhDanh, Id FROM [Catalog].[Groups] WHERE MaXa = @MaDonVi and Catalog = 'xa-phuong' AND DeletedOn is null AND active = 1";
        string sqlGetDonViHuyenId = "SELECT TOP 1 YeuCauXacNhanCoKetQua, GroupCode, MadinhDanh, Id FROM [Catalog].[Groups] WHERE MaHuyen = @MaDonVi and Catalog = 'quan-huyen' AND DeletedOn is null AND active = 1";
        string sqlCheckMaDinhDanh = "SELECT Top 2 MaDinhDanh from [Catalog].[Groups] where MaDinhDanh = @MaDinhDanh AND DeletedOn is null";
        var sqlSoftDeleteThanhPhanHoSos = $"Update {SchemaNames.Business}.{TableNames.ThanhPhanHoSos} SET DeletedOn = GetDate() WHERE HoSo = @MaHoSo AND DeletedOn is null";
        var checkHoSoExistSql = $"SELECT TOP 1 Id, MaHoSo, TrangThaiHoSoId FROM {SchemaNames.Business}.{TableNames.HoSos} WHERE MaHoSoKhac = @MaHoSoKhac and (LoaiDuLieuKetNoi = 'LTKT' OR LoaiDuLieuKetNoi = 'LTKS') ";
        var loaiDuLieuKetNoi = data.module;
        if (string.IsNullOrEmpty(loaiDuLieuKetNoi))
        {
            _logger.LogError("LienThongKSKT_Loại dữ liệu kết nối không hợp lệ");
            return;
        }
        var laCapHuyen = data.maDonVi.ToString().Length == 3;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<CheckHoSoExist>(checkHoSoExistSql, new
        {
            MaHoSoKhac = data.maHoSo,
        });
        if (hoSo != null && hoSo.TrangThaiHoSoId != "5")
        {
            _logger.LogError($"{hoSo.MaHoSo}_CreateHoSoKhaiSinhKhaiTu_DaTonTaiHoSo_HoSoDaTonTai");
            await UpdateDaNhanHoSoLienThong(data.maHoSo);
            return;
        }
        
        ThuTuc thuTuc;
        var danhSachThuTucDongBo = _settings.DanhSachThuTucDongBoDVC;
        var danhSachThuTucDongBoCapXa = danhSachThuTucDongBo.CapXa;
        var danhSachThuTucDongBoCapHuyen = danhSachThuTucDongBo.CapHuyen;
        string suffixMaTTHCKey = laCapHuyen ? "CapHuyen" : "CapXa";
        string maTTHCKey = data.maTTHC + suffixMaTTHCKey;
        if (!thuTucMapper.TryGetValue(maTTHCKey, out thuTuc))
        {
            Dictionary<string,string> danhSachThuTucMapper = laCapHuyen ? danhSachThuTucDongBoCapHuyen : danhSachThuTucDongBoCapXa;
            thuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<ThuTuc>(sqlGetTTHC, new
            {
                MaTTHC = danhSachThuTucMapper[data.maTTHC]
            });
            thuTucMapper.Add(maTTHCKey, thuTuc);
        }
        if (thuTuc == null)
        {
            _logger.LogError($"{data.maHoSo}_LienThongKSKT_Thủ tục không tồn tại");
            return;
        }
        Group donVi;
        
        var sqlDonVi = laCapHuyen ? sqlGetDonViHuyenId : sqlGetDonViXaId;
        donVi = await _dapperRepository.QueryFirstOrDefaultAsync<Group>(sqlDonVi, new
        {
            MaDonVi = data.maDonVi
        });
        if (donVi == null)
        {
            _logger.LogError($"{data.maHoSo}_LienThongKSKT_Đơn vị chưa cấu hình mã xã hoặc không tồn tại");
            return; 
        }
        var trungMaDinhDanh = await _dapperRepository.QueryAsync<Group>(sqlCheckMaDinhDanh, new
        {
            MaDinhDanh = donVi.MaDinhDanh
        });
        if(trungMaDinhDanh != null && trungMaDinhDanh.Count > 1)
        {
            _logger.LogError($"{data.maHoSo}_LienThongKSKT_TrungMaDinhDanh_{donVi.MaDinhDanh}");
            return;
        }

        string maHoSoMCDT = string.Empty;
        if (hoSo != null) // đã có mã hồ sơ
        {
            maHoSoMCDT = hoSo.MaHoSo;
        }
        else // hồ sơ mới
        {
            maHoSoMCDT = await _generateMaHoSo.GenerateMaHoSo(donVi.MaDinhDanh, CancellationToken.None);
        }
        var nguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<TaiKhoanNguoiTiepNhan_Select>(sqlGetNguoiTiepNhan, new
        {
            MaTTHC = thuTuc.MaTTHC,
            DonViId = donVi.GroupCode
        });
        if (nguoiTiepNhan == null)
        {
            _logger.LogError($"{data.maHoSo}_LienThongKSKT_Chưa cấu hình người tiếp nhận cho thủ tục");
            return;
        } else if (nguoiTiepNhan != null && string.IsNullOrEmpty(nguoiTiepNhan.TaiKhoanTiepNhan))
        {
            _logger.LogError($"{data.maHoSo}_LienThongKSKT_Chưa cấu hình người tiếp nhận cho thủ tục");
            return;
        }
        TruongHopThuTuc truongHopThuTuc;
        if (!truongHopThuTucMapper.TryGetValue(thuTuc.MaTTHC, out truongHopThuTuc))
        {
            truongHopThuTuc = await _repositoryTruongHopThuTuc.GetBySpecAsync(new GetTruongHopThuTucByMaTTHCSpec(thuTuc.MaTTHC));
            truongHopThuTucMapper.Add(thuTuc.MaTTHC, truongHopThuTuc);
        }
        if (truongHopThuTuc == null)
        {
            _logger.LogError($"{data.maHoSo}_LienThongKSKT_Không tìm thấy trường hợp thủ tục");
            return;
        }


        var requestDetailHoSo = new object() { };
        var detailHoSo = await RequestHandler<object, KhaiSinhKhaiTu_DetailHoSo_Wrapper>(requestDetailHoSo, _settings.UrlDVCLT.Base, _token, HttpMethod.Get, $"/api/lienthongdvclt/hosolienthong/{data.id}");
        if (detailHoSo == null)
        {
            _logger.LogError($"{data.maHoSo}_LienThongKSKT_Không tìm thấy hồ sơ");
            return;
        }
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);


        var hoSoNopTrucTuyen = await CreateHoSoByModule(detailHoSo, data, data.module, nguoiTiepNhan, donVi, thuTuc, truongHopThuTuc, ngayNghis, maHoSoMCDT);
        if (hoSoNopTrucTuyen == null)
        {
            _logger.LogError($"{data.maHoSo}_LienThongKSKT_K Tạo được hoso");
            return;
        }
        
        var thanhPhanHoSos = new List<Domain.Business.ThanhPhanHoSo>();
        if (hoSoNopTrucTuyen.fileDinhKem != null && hoSoNopTrucTuyen.fileDinhKem.Count > 0)
        {

            for (int i = 0; i < hoSoNopTrucTuyen.fileDinhKem.Count; i++)
            {
                var fileDinhKem = hoSoNopTrucTuyen.fileDinhKem[i];
                string dinhKem = string.Empty;
                try
                {
                    dinhKem = await _minioService.UploadFileAsBase64Async(fileDinhKem.duLieuTepDinhKem, fileDinhKem.tenTepDinhKem, "", maHoSoMCDT);

                }
                catch (Exception ex)
                {
                    _logger.LogError($"{data.maHoSo}_LienThongKSKT_Tải file thất bại_IDFile{fileDinhKem.id}");
                }
                var thanhPhanHoSo = Domain.Business.ThanhPhanHoSo.Create(fileDinhKem.tenGiayTo, maHoSoMCDT, 1,
                        0, null, dinhKem, false, null, "0", thuTuc.MaTTHC, null, null, null, null, null, null);
                thanhPhanHoSo.SetDinhKemGoc(dinhKem);
                thanhPhanHoSos.Add(thanhPhanHoSo);
            }
        }
        try
        {
            var hoSolienThong = new HoSoLienThong(maHoSoMCDT, JsonConvert.SerializeObject(detailHoSo.data));
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(maHoSoMCDT, null, null, null, null, "", hoSoNopTrucTuyen.tenNYC, "", "", currentTime, trangThai: "1", thaoTac: "Nhận hồ sơ từ DVCLT");

            int insertedTPHSCount = 0;
            if(hoSo != null && hoSo.TrangThaiHoSoId == "5")
            {

                hoSoNopTrucTuyen.HoSo.SetId(hoSo.Id);
                int updateHoSoRow = await _dapperRepository.UpdateEntityAsync<HoSo>(hoSoNopTrucTuyen.HoSo, new
                {
                    MaHoSoUpdate = maHoSoMCDT
                }, SchemaNames.Business + "." + TableNames.HoSos, null, "MaHoSo = @MaHoSoUpdate");
                if (updateHoSoRow != 1)
                {
                    //transactionScope.Dispose();
                    return;
                }
                await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(nguoiTiepNhan.TaiKhoanTiepNhan, hoSo.Id);
                int updatedHoSoLienThongCount = await _dapperRepository.UpdateEntityAsync<HoSoLienThong>(hoSolienThong, new
                {
                    MaHoSoUpdate = maHoSoMCDT
                }, SchemaNames.Business + "." + TableNames.HoSoLienThongs, null, "MaHoSo = @MaHoSoUpdate");
                if (updatedHoSoLienThongCount != 1)
                {
                    //transactionScope.Dispose();
                    return;
                }
                await _dapperRepository.ExcuteAsync(sqlSoftDeleteThanhPhanHoSos, new
                {
                    MaHoSo = maHoSoMCDT
                });
            }
            else
            {
                //int insetedHoSoCount = await _dapperRepository.InsertEntityAsync<HoSo>(hoSoNopTrucTuyen.HoSo, SchemaNames.Business + "." + TableNames.HoSos);
                //if (insetedHoSoCount != 1)
                //{
                //    //transactionScope.Dispose();
                //    return;
                //}
                var hoSoId = Guid.NewGuid();
                hoSoNopTrucTuyen.HoSo.SetId(hoSoId);
                await _hoSoRepo.AddAsync(hoSoNopTrucTuyen.HoSo);
                await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(nguoiTiepNhan.TaiKhoanTiepNhan, hoSoId);
                int insertedHoSoLienThongCount = await _dapperRepository.InsertEntityAsync<HoSoLienThong>(hoSolienThong, SchemaNames.Business + "." + TableNames.HoSoLienThongs);
                if (insertedHoSoLienThongCount != 1)
                {
                    //transactionScope.Dispose();
                    return;
                }
                int insertedTrangThaiHoSoLienThongCount = await AddTrangThaiDVCLT(maHoSoMCDT, "1", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, hoSoNopTrucTuyen.HoSo.LoaiDuLieuKetNoi);
                if (insertedTrangThaiHoSoLienThongCount != 1)
                {
                    //transactionScope.Dispose();
                    return;
                }
            }
            insertedTPHSCount += await _dapperRepository.InsertMultipleEntityAsync<Domain.Business.ThanhPhanHoSo>(thanhPhanHoSos, SchemaNames.Business + "." + TableNames.ThanhPhanHoSos);

            if (insertedTPHSCount != thanhPhanHoSos.Count)
            {
                //transactionScope.Dispose();
                return;
            }
                
            int insertedQTXLCount = await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLyHoSo, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
            if (insertedQTXLCount != 1)
            {
                //transactionScope.Dispose();
                return;
            }
            await UpdateDaNhanHoSoLienThong(data.maHoSo);
            //transactionScope.Complete();
        }
        catch (Microsoft.Data.SqlClient.SqlException exx)
        {
            _logger.LogError($"{nameof(CreateHoSoHandler)}_{data.maHoSo}_{JsonConvert.SerializeObject(hoSoNopTrucTuyen)}_{exx.ToString()}");
            return;
        }
        catch (Exception ex)
        {
            _logger.LogError($"{nameof(CreateHoSoHandler)}_{data.maHoSo}_{ex.ToString()}");
        //transactionScope.Dispose();
            return;
        }
        //}
        await _eMCService.SendAction(new EMCRequestBody()
        {
            CodeProfile = maHoSoMCDT,
            CodeTTHC = thuTuc.MaTTHC,
            NameTTHC = thuTuc.TenTTHC ?? "",
            Status = hoSoNopTrucTuyen.HoSo.TrangThaiHoSoId,
            FormsReception = hoSoNopTrucTuyen.HoSo.KenhThucHien,
            Level = thuTuc.MucDo,
            IsFromDVCQG = hoSoNopTrucTuyen.HoSo.LoaiDuLieuKetNoi,
            MaHoSo = maHoSoMCDT,
            IsDVCBC = hoSoNopTrucTuyen.HoSo.DangKyNhanHoSoQuaBCCIData,
            User = hoSoNopTrucTuyen.HoSo.SoGiayToChuHoSo,
        });
    }
    private async Task UpdateDaNhanHoSoLienThong(string maHoSo)
    {
        var reqUpdateDaNhan = new
        {
            maHoSo = maHoSo,
            daNhan = true
        };
        var res = await RequestHandler<object, object>(reqUpdateDaNhan, _settings.UrlDVCLT.Base, _token, HttpMethod.Put, _settings.UrlDVCLT.CapNhatDaNhanHoSoUrl);
        var jsonRes = JsonConvert.SerializeObject(res);
        if(!jsonRes.ToLower().Contains("cập nhật thành công"))
        {
            _logger.LogError($"{nameof(UpdateDaNhanHoSoLienThong)}_capnhatdanhanthatbai_{jsonRes}");
        }
    }
    private class HoSo_Data
    {
        public HoSo HoSo { get; set; }
        public string tenNYC { get; set; }
        public List<KhaiSinhKhaiTu_FileDinhKem> fileDinhKem { get; set; }
    }
    private async Task<HoSo_Data?> CreateHoSoByModule(KhaiSinhKhaiTu_DetailHoSo_Wrapper detailHoSo, KhaiSinhKhaiTu_HoSo data, string module,
        TaiKhoanNguoiTiepNhan_Select nguoiTiepNhan, Group donVi, ThuTuc thuTuc, TruongHopThuTuc truongHopThuTuc, List<NgayNghi> ngayNghis, string maHoSoMCDT)
    {
        TrangThaiTraKetQuaHoSoConstant _trangThaiTraHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        var ngayHenTraCaNhan = TinhNgayHenTra(currentTime, ngayNghis);
        XmlDocument doc = new XmlDocument();
        KhaiSinhKhaiTu_DetailHoSo hoSoData = JsonConvert.DeserializeObject<KhaiSinhKhaiTu_DetailHoSo>(detailHoSo.data.data);
        doc.LoadXml(hoSoData.data);
        XmlNode hoTichNode = doc.GetElementsByTagName("hoTich")[0];
        string jsonDataHoSo = JsonConvert.SerializeXmlNode(hoTichNode);
        string trichYeuHoso = thuTuc.TenTTHC + " (" + data.maHoSo + ")";
        if (module == "KS")
        {
            KhaiSinh_DataHoSo objHoSo = JsonConvert.DeserializeObject<KhaiSinh_DataHoSo>(jsonDataHoSo);
            bool layThongTinNguoiNopLamChuHoSoKS = (_settings.LayThongTinNguoiNopLamChuHoSoKS == null || _settings.LayThongTinNguoiNopLamChuHoSoKS == false) ? false : true;
            var hoTich = objHoSo.hoTich;
            var ngaySinhList = hoTich.nksNgaySinh.Split(".");
            var ngaySinhNguoiYeuCau = string.Empty;
            var ngaySinh = "";
            var diaChiChuHoSo = !string.IsNullOrEmpty(hoTich.chaNoiCuTru) ? hoTich.chaNoiCuTru : !string.IsNullOrEmpty(hoTich.nksQueQuan) ? hoTich.nksQueQuan : !string.IsNullOrEmpty(hoTich.meNoiCuTru) ? hoTich.meNoiCuTru : string.Empty;
            try
            {
                ngaySinh = ngaySinhList[ngaySinhList.Length - 1];
                ngaySinhNguoiYeuCau = HoSo.GetBirthYearFromID(hoTich.nycSoGiayToTuyThan).ToString();
            }
            catch (Exception ex) { }
            var hoSoNopTrucTuyen = new HoSo(donVi.GroupCode, maHoSoMCDT, LoaiChuHoSoConstant.CongDan, hoTich.nksHoTen, hoTich.nycSoDienThoai, hoTich.nycEmail, "",
                null, ngaySinh, hoTich.nksNoiSinhDVHC, null, null, diaChiChuHoSo, hoTich.nycSoGiayToTuyThan,
                thuTuc.MaTTHC, truongHopThuTuc.Ma,
                truongHopThuTuc.Ten, truongHopThuTuc.Id.ToString(), JsonConvert.SerializeObject(hoTich), null, nguoiTiepNhan.TaiKhoanTiepNhan,
                trichYeuHoso, null, true, hoTich.nycHoTen, hoTich.nycSoDienThoai, hoTich.nycEmail, hoTich.nycSoGiayToTuyThan,
                null, null, null, diaChiChuHoSo, thuTuc.MaTTHC, currentTime, ngayHenTraCaNhan, thuTuc.MucDo, null, donViTraKq: donVi.GroupCode);
            hoSoNopTrucTuyen.UpdateLoaiDuLieuKetNoi("LTKS");
            hoSoNopTrucTuyen.SetLinhVuc(thuTuc.MaLinhVucChinh, thuTuc.LinhVucChinh);
            hoSoNopTrucTuyen.SetMaHoSoKhac(data.maHoSo);
            hoSoNopTrucTuyen.SetThoiGianThucHien(truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.ThoiGianThucHienTrucTuyen, truongHopThuTuc.LoaiThoiGianThucHien);
            if(layThongTinNguoiNopLamChuHoSoKS)
            {
                hoSoNopTrucTuyen.SetThongTinChuHoSoKhaiSinh(hoTich.nycHoTen, ngaySinhNguoiYeuCau, hoTich.nycSoGiayToTuyThan);
            }
            if (donVi?.YeuCauXacNhanCoKetQua == null || donVi?.YeuCauXacNhanCoKetQua == false)
            {
                hoSoNopTrucTuyen.SetTrangThaiTraKq(_trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ);
            }
            else
            {
                hoSoNopTrucTuyen.SetTrangThaiTraKq(_trangThaiTraHoSoConstant.CHO_XAC_NHAN);
            }
            return new HoSo_Data
            {
                HoSo = hoSoNopTrucTuyen,
                tenNYC = hoTich.nycHoTen,
                fileDinhKem = hoSoData.fileDinhKem
            };
        }
        else if (module == "KT")
        {
            KhaiTu_DataHoSo objHoSo = JsonConvert.DeserializeObject<KhaiTu_DataHoSo>(jsonDataHoSo);
            var hoTich = objHoSo.hoTich;
            var ngaySinhList = hoTich.nktNgaySinh.Split(".");
            var ngaySinh = "";
            try
            {
                ngaySinh = ngaySinhList[ngaySinhList.Length - 1];
            }
            catch (Exception ex) { }
            var hoSoNopTrucTuyen = new HoSo(donVi.GroupCode, maHoSoMCDT, LoaiChuHoSoConstant.CongDan, hoTich.nktHoTen, hoTich.nycSoDienThoai, hoTich.nycEmail, hoTich.nktSoGiayToTuyThan,
                null, ngaySinh, null, null, null, hoTich.nktNoiCuTru, hoTich.nycSoGiayToTuyThan,
                thuTuc.MaTTHC, truongHopThuTuc.Ma,
                truongHopThuTuc.Ten, truongHopThuTuc.Id.ToString(), JsonConvert.SerializeObject(hoTich), null, nguoiTiepNhan.TaiKhoanTiepNhan,
                trichYeuHoso, null, true, hoTich.nycHoTen, hoTich.nycSoDienThoai, hoTich.nycEmail, hoTich.nycSoGiayToTuyThan,
                null, null, null, hoTich.nktNoiCuTru, thuTuc.MaTTHC, currentTime, ngayHenTraCaNhan, thuTuc.MucDo, null, donViTraKq: donVi.GroupCode);
            hoSoNopTrucTuyen.UpdateLoaiDuLieuKetNoi("LTKT");
            hoSoNopTrucTuyen.SetLinhVuc(thuTuc.MaLinhVucChinh, thuTuc.LinhVucChinh);
            hoSoNopTrucTuyen.SetMaHoSoKhac(data.maHoSo);
            if (donVi?.YeuCauXacNhanCoKetQua == null || donVi?.YeuCauXacNhanCoKetQua == false)
            {
                hoSoNopTrucTuyen.SetTrangThaiTraKq(_trangThaiTraHoSoConstant.DA_CHUYEN_TRA_KQ);
            }
            else
            {
                hoSoNopTrucTuyen.SetTrangThaiTraKq(_trangThaiTraHoSoConstant.CHO_XAC_NHAN);
            }
            //hoSoNopTrucTuyen.SetThoiGianThucHien(truongHopThuTuc.ThoiGianThucHien, truongHopThuTuc.ThoiGianThucHienTrucTuyen, truongHopThuTuc.LoaiThoiGianThucHien);
            return new HoSo_Data
            {
                HoSo = hoSoNopTrucTuyen,
                tenNYC = hoTich.nycHoTen,
                fileDinhKem = hoSoData.fileDinhKem
            };
        }
        return null;
    }
    

    [DisableConcurrentExecution(timeoutInSeconds: 15 * 60)]
    public async Task GetDataAsync()
    {
        if (string.IsNullOrEmpty(_settings.UrlDVCLT.Password) || string.IsNullOrEmpty(_settings.UrlDVCLT.User) || string.IsNullOrEmpty(_settings.UrlDVCLT.Base) || string.IsNullOrEmpty(_settings.UrlBTPApi.Base))
        {
            return;
        }
        if (!_settings.EnableGetData)
        {
            return;
        }

        var tokenRequest = new KhaiSinhKhaiTu_GetTokenRequest()
        {
            password = _settings.UrlDVCLT.Password,
            userName = _settings.UrlDVCLT.User,
        };
        var resToken = await RequestHandler<KhaiSinhKhaiTu_GetTokenRequest, KhaiSinhKhaiTu_GetTokenResponse>(tokenRequest, _settings.UrlDVCLT.Base, "", HttpMethod.Post, _settings.UrlDVCLT.GetToken);
        if (resToken == null)
        {
            _logger.LogError("Sai thông tin lấy token");
            return;
        }
        _token = resToken.token;


        var request = new object { };
        var data = await RequestHandler<object, KhaiSinhKhaiTu_HoSo_Wrapper>(request, _settings.UrlDVCLT.Base, _token, HttpMethod.Get, _settings.UrlDVCLT.LayDanhSachHoSo);
        string sqlGetTTHC = @"SELECT TOP 1 TenTTHC, MucDo, MaLinhVucChinh, LinhVucChinh, MaTTHC FROM [Catalog].[ThuTucs] WHERE DeletedOn is null AND MaTTHC Like @MaTTHC + '%'";

        try
        {
            if (data != null && data.data != null)
            {
                var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year));
                for (int i = 0; i < data.data.Count; i++)
                {
                    var hoSo = data.data[i];
                    await CreateHoSoHandler(hoSo, ngayNghis);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("GetDataKSKT" + ex.ToString());
        }
    }
    private class PushToBTP_HoSoSelect
    {
        public DefaultIdType Id { get; set; }
        public string LoaiDuLieuKetNoi { get; set; }
        public string NgayTiepNhan { get; set; }
        public string Data { get; set; }
    }
    public async Task<Result<PushBTPResonse>> PushToBTP(string maHoSo)
    {
        string sqlGetHoSo = $@"SELECT Top 1 hs.Id, hs.LoaiDuLieuKetNoi, hs.NgayTiepNhan, hslt.Data from {SchemaNames.Business}.{TableNames.HoSos} hs INNER JOIN
                            {SchemaNames.Business}.{TableNames.HoSoLienThongs} hslt ON hs.MaHoSo = hslt.MaHoSo
                            WHERE hs.MaHoSo = @MaHoSo AND (LoaiDuLieuKetNoi = 'LTKS' OR LoaiDuLieuKetNoi = 'LTKT')";
        var hoSoLienThong = await _dapperRepository.QueryFirstOrDefaultAsync<PushToBTP_HoSoSelect>(sqlGetHoSo, new
        {
            MaHoSo = maHoSo
        });
        if (hoSoLienThong == null)
        {
            return Result<PushBTPResonse>.Fail("Không phải hồ sơ Dịch vụ công liên thông! Vui lòng không sử dụng chức năng này!");
        }
        if (string.IsNullOrEmpty(hoSoLienThong.NgayTiepNhan))
        {
            return Result<PushBTPResonse>.Fail("Hồ sơ không có ngày tiếp nhận, vui lòng liên hệ quản trị hệ thống");
        }
        try
        {
            var hoSoLienThongJsonData = JsonConvert.DeserializeObject<KhaiSinhKhaiTu_DetailHoSo>(hoSoLienThong.Data);
            DateTime ngayTiepNhan = DateTime.Parse(hoSoLienThong.NgayTiepNhan);
            if (hoSoLienThongJsonData.module == "KT")
            {
                KhaiSinhKhaiTu_DetailHoSo objHoSoLienThong = JsonConvert.DeserializeObject<KhaiSinhKhaiTu_DetailHoSo>(hoSoLienThongJsonData.data);
                XElement root = XElement.Parse(objHoSoLienThong.data);
                XElement hoTichElement = root.Element("hoTich");
                string json = JsonConvert.SerializeObject(hoTichElement);
                KhaiTu_DataHoSo objHoSo = JsonConvert.DeserializeObject<KhaiTu_DataHoSo>(json);
                //string jsonKTstr = JsonConvert.SerializeObject(jsonKT.hoTich);
                //hoSoLienThongJsonData.data = jsonKTstr;
                DateTime? ngayCapGBTDateTime;
                string? ngayCapGBT = null;
                try
                {
                    if (!string.IsNullOrEmpty(objHoSo?.hoTich.ngayCapGBT))
                    {
                        ngayCapGBTDateTime = DateTime.ParseExact(objHoSo.hoTich.ngayCapGBT, "yyyyMMdd", CultureInfo.InvariantCulture);
                        ngayCapGBT = ngayCapGBTDateTime?.ToString("dd.MM.yyyy");
                    }
                } catch (Exception ex) {
                }
                
                HoTichKhaiTu objHoSoHoTich = new HoTichKhaiTu()
                {
                    maGBT = objHoSo.hoTich.maGBT,
                    loaiDangKy = objHoSo.hoTich.loaiDangKy,
                    noiDangKy = objHoSo.hoTich.noiDangKy,
                    soLuongBanSao = objHoSo.hoTich.soLuongBanSao,
                    ngayCapGBT = ngayCapGBT,
                    nktHoTen = objHoSo.hoTich.nktHoTen,
                    nktGioiTinh = objHoSo.hoTich.nktGioiTinh,
                    nktNgaySinh = objHoSo.hoTich.nktNgaySinh,
                    nktDanToc = objHoSo.hoTich.nktDanToc,
                    nktDanTocKhac = objHoSo.hoTich.nktDanTocKhac,
                    nktQuocTich = objHoSo.hoTich.nktQuocTich,
                    nktLoaiCuTru = objHoSo.hoTich.nktLoaiCuTru,
                    nktLoaiGiayToTuyThan = objHoSo.hoTich.nktLoaiGiayToTuyThan,
                    nktGiayToKhac = objHoSo.hoTich.nktGiayToKhac,
                    nktSoGiayToTuyThan = objHoSo.hoTich.nktSoGiayToTuyThan,
                    nktNgayCapGiayToTuyThan = objHoSo.hoTich.nktNgayCapGiayToTuyThan,
                    nktNoiCapGiayToTuyThan = objHoSo.hoTich.nktNoiCapGiayToTuyThan,
                    nktNgayChet = objHoSo.hoTich.nktNgayChet,
                    nktGioPhutChet = objHoSo.hoTich.nktGioPhutChet,
                    nktNguyenNhanChet = objHoSo.hoTich.nktNguyenNhanChet,
                    nktXacThucThongTin = objHoSo.hoTich.nktXacThucThongTin,
                    gbtLoai = objHoSo.hoTich.gbtLoai,
                    gbtSo = objHoSo.hoTich.gbtSo,
                    gbtNgay = objHoSo.hoTich.gbtNgay,
                    gbtCoQuanCap = objHoSo.hoTich.gbtCoQuanCap,
                    nycHoTen = objHoSo.hoTich.nycHoTen,
                    nycQuanHe = objHoSo.hoTich.nycQuanHe,
                    nycLoaiGiayToTuyThan = objHoSo.hoTich.nycLoaiGiayToTuyThan,
                    nycGiayToKhac = objHoSo.hoTich.nycGiayToKhac,
                    nycSoGiayToTuyThan = objHoSo.hoTich.nycSoGiayToTuyThan,
                    nycNgayCapGiayToTuyThan = objHoSo.hoTich.nycNgayCapGiayToTuyThan,
                    nycNoiCapGiayToTuyThan = objHoSo.hoTich.nycNoiCapGiayToTuyThan,
                    nycSoDienThoai = objHoSo.hoTich.nycSoDienThoai,
                    nycEmail = objHoSo.hoTich.nycEmail,
                    nycXacThucThongTin = objHoSo.hoTich.nycXacThucThongTin,
                    nycNoiCuTru = new KhaiSinhKhaiTu_DiaChi()
                    {
                    },
                    nktNoiChet = new KhaiSinhKhaiTu_DiaChi()
                    {
                        dcChiTiet = objHoSo.hoTich.nktNoiChet
                    },
                    nktNoiCuTru = new KhaiSinhKhaiTu_DiaChi()
                    {
                        dcChiTiet = objHoSo.hoTich.nktNoiCuTru
                    }
                };

                DataHoTich objHoTich = new DataHoTich()
                {
                    module = "LTKT",
                    maHoSoMCDT = maHoSo,
                    maHoSoLT = objHoSoLienThong.maHoSo,
                    maDonVi = objHoSo.hoTich.noiDangKy.ToString(),
                    data = JsonConvert.SerializeObject(objHoSoHoTich),
                    ngayTiepNhan = ngayTiepNhan.ToString("dd/MM/yyyy HH:mm:ss"),
                    fileDinhKem = new List<KhaiSinhKhaiTu_FileDinhKem>()
                };
                objHoTich.fileDinhKem.Clear();
                if (objHoSoLienThong.fileDinhKem != null && objHoSoLienThong.fileDinhKem.Count > 0)
                {
                    foreach (KhaiSinhKhaiTu_FileDinhKem itemDinhKem in objHoSoLienThong.fileDinhKem)
                    {
                        if (itemDinhKem.huyGiayTo == 0)
                        {
                            objHoTich.fileDinhKem.Add(itemDinhKem);
                        }
                    }
                }
                var res = await RequestHandler<object, PushBTPResonse>(objHoTich, _settings.UrlBTPApi.Base, "", HttpMethod.Post, _settings.UrlBTPApi.NhanDKHT);
                if (res.status == "1" || (res.errorDescription != null && res.errorDescription.ToLower().Contains("đã được tiếp nhận")))
                {
                    string userId = _currentUser.GetUserId().ToString();
                    await UpdateTrangThaiHoSo(maHoSo, "4", nguoiDaXuLy: userId);
                    await _nguoiXuLyHoSoService.SetNguoiDangXuLyAsNguoiDaXuLy(hoSoLienThong.Id);
                    var quaTrinhXuLy = new QuaTrinhXuLyHoSo(maHoSo, null, null, null, null, userId, _currentUser.GetUserFullName(), "", "Hệ thống hộ tịch Bộ tư pháp", DateTime.Now, trangThai: "4", thaoTac: "Liên thông BTP");
                    await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                    await AddTrangThaiDVCLT(maHoSo, "7", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, hoSoLienThong.LoaiDuLieuKetNoi);
                    return Result<PushBTPResonse>.Success(data: res);
                }
                _logger.LogError($"{nameof(PushToBTP)}_LTKT_PUSHERORR_{maHoSo}_{JsonConvert.SerializeObject(res)}");
                return Result<PushBTPResonse>.Fail(res.errorDescription);
            }
            else if (hoSoLienThongJsonData.module == "KS")
            {
                KhaiSinhKhaiTu_DetailHoSo objHoSoLienThong = JsonConvert.DeserializeObject<KhaiSinhKhaiTu_DetailHoSo>(hoSoLienThongJsonData.data);
                XElement root = XElement.Parse(objHoSoLienThong.data);
                XElement hoTichElement = root.Element("hoTich");
                string json = JsonConvert.SerializeObject(hoTichElement);
                KhaiSinh_DataHoSo objHoSo = JsonConvert.DeserializeObject<KhaiSinh_DataHoSo>(json);
                DateTime? ngayCapGCSDateTime;
                string? ngayCapGCS = null;
                try
                {
                    if (!string.IsNullOrEmpty(objHoSo.hoTich.ngayCapGCS))
                    {
                        ngayCapGCSDateTime = DateTime.ParseExact(objHoSo.hoTich.ngayCapGCS, "yyyyMMdd", CultureInfo.InvariantCulture);
                        ngayCapGCS = ngayCapGCSDateTime?.ToString("dd.MM.yyyy");
                    }
                }
                catch (Exception ex)
                {
                }

                HoTichKhaiSinh objHoSoHoTich = new HoTichKhaiSinh()
                {
                    ngayCapGCS = ngayCapGCS,
                    loaiDangKy = objHoSo.hoTich.loaiDangKy,
                    noiDangKy = objHoSo.hoTich.noiDangKy,
                    soLuongBanSao = objHoSo.hoTich.soLuongBanSao,
                    nksHoTen = objHoSo.hoTich.nksHoTen,
                    nksGioiTinh = objHoSo.hoTich.nksGioiTinh,
                    nksNgaySinh = objHoSo.hoTich.nksNgaySinh,
                    nksNgaySinhBangChu = objHoSo.hoTich.nksNgaySinhBangChu,
                    nksNoiSinhNuocNgoai = objHoSo.hoTich.nksNoiSinhNuocNgoai,
                    nksDanToc = objHoSo.hoTich.nksDanToc,
                    nksDanTocKhac = objHoSo.hoTich.nksDanTocKhac,
                    nksQuocTich = objHoSo.hoTich.nksQuocTich,
                    nksLoaiKhaiSinh = objHoSo.hoTich.nksLoaiKhaiSinh,
                    nksLoaiGiayToTuyThan = "",
                    nksSoGiayToTuyThan = "",
                    nksNgayCapGiayToTuyThan = "",
                    nksNoiCapGiayToTuyThan = "",
                    meHoTen = objHoSo.hoTich.meHoTen,
                    meNgaySinh = objHoSo.hoTich.meNgaySinh,
                    meDanToc = objHoSo.hoTich.meDanToc,
                    meDanTocKhac = objHoSo.hoTich.meDanTocKhac,
                    meQuocTich = objHoSo.hoTich.meQuocTich,
                    meQuocTichKhac = objHoSo.hoTich.meQuocTichKhac,
                    meLoaiCuTru = objHoSo.hoTich.meLoaiCuTru,
                    meLoaiGiayToTuyThan = objHoSo.hoTich.meLoaiGiayToTuyThan,
                    meGiayToKhac = "",
                    meSoGiayToTuyThan = objHoSo.hoTich.meSoGiayToTuyThan,
                    meSoDDCN = "",
                    meXacThucThongTin = objHoSo.hoTich.meXacThucThongTin,
                    chaHoTen = objHoSo.hoTich.chaHoTen,
                    chaNgaySinh = objHoSo.hoTich.chaNgaySinh,
                    chaDanToc = objHoSo.hoTich.chaDanToc,
                    chaDanTocKhac = objHoSo.hoTich.chaDanTocKhac,
                    chaQuocTich = objHoSo.hoTich.chaQuocTich,
                    chaQuocTichKhac = objHoSo.hoTich.chaQuocTichKhac,
                    chaLoaiCuTru = objHoSo.hoTich.chaLoaiCuTru,
                    chaLoaiGiayToTuyThan = objHoSo.hoTich.chaLoaiGiayToTuyThan,
                    chaSoDDCN = "",
                    chaGiayToKhac = "",
                    chaSoGiayToTuyThan = objHoSo.hoTich.chaSoGiayToTuyThan,
                    chaXacThucThongTin = objHoSo.hoTich.chaXacThucThongTin,
                    nycHoTen = objHoSo.hoTich.nycHoTen,
                    nycQuanHe = objHoSo.hoTich.nycQuanHe,
                    nycLoaiGiayToTuyThan = objHoSo.hoTich.nycLoaiGiayToTuyThan,
                    nycSoDDCN = "",
                    nycGiayToKhac = objHoSo.hoTich.nycGiayToKhac,
                    nycSoGiayToTuyThan = objHoSo.hoTich.nycSoGiayToTuyThan,
                    nycNgayCapGiayToTuyThan = objHoSo.hoTich.nycNgayCapGiayToTuyThan,
                    nycNoiCapGiayToTuyThan = objHoSo.hoTich.nycNoiCapGiayToTuyThan,
                    nycSoDienThoai = objHoSo.hoTich.nycSoDienThoai,
                    nycEmail = objHoSo.hoTich.nycEmail,
                    nycLoaiCuTru = "",
                    nycXacThucThongTin = objHoSo.hoTich.nycXacThucThongTin,
                    soDangKyNuocNgoai = "",
                    ngayDangKyNuocNgoai = "",
                    cqNuocNgoaiDaDangKy = "",
                    qgNuocNgoaiDaDangKy = "",
                    nksNoiSinh = new KhaiSinhKhaiTu_DiaChi()
                    {
                        dcChiTiet = objHoSo.hoTich.nksNoiSinh,
                        maTinh = objHoSo.hoTich.nksNoiSinhDVHC
                    },
                    nksQueQuan = new KhaiSinhKhaiTu_DiaChi()
                    {
                        dcChiTiet = objHoSo.hoTich.nksQueQuan
                    },
                    meNoiCuTru = new KhaiSinhKhaiTu_DiaChi()
                    {
                        dcChiTiet = objHoSo.hoTich.meNoiCuTru
                    },
                    chaNoiCuTru = new KhaiSinhKhaiTu_DiaChi()
                    {
                        dcChiTiet = objHoSo.hoTich.chaNoiCuTru
                    }
                };
                DataHoTich objHoTich = new DataHoTich()
                {
                    module = "LTKS",
                    maHoSoMCDT = maHoSo,
                    maHoSoLT = objHoSoLienThong.maHoSo,
                    maDonVi = objHoSo.hoTich.noiDangKy.ToString(),
                    data = JsonConvert.SerializeObject(objHoSoHoTich),
                    ngayTiepNhan = ngayTiepNhan.ToString("dd/MM/yyyy HH:mm:ss"),
                    fileDinhKem = new List<KhaiSinhKhaiTu_FileDinhKem>()
                };
                objHoTich.fileDinhKem.Clear();
                if (objHoSoLienThong.fileDinhKem != null && objHoSoLienThong.fileDinhKem.Count > 0)
                {

                    foreach (KhaiSinhKhaiTu_FileDinhKem itemDinhKem in objHoSoLienThong.fileDinhKem)
                    {
                        if(itemDinhKem.huyGiayTo == 0)
                        {
                            objHoTich.fileDinhKem.Add(itemDinhKem);
                        }
                    }
                }
                var res = await RequestHandler<object, PushBTPResonse>(objHoTich, _settings.UrlBTPApi.Base, "", HttpMethod.Post, _settings.UrlBTPApi.NhanDKHT);
                if (res.status == "1" || (res.errorDescription != null && res.errorDescription.ToLower().Contains("đã được tiếp nhận")))
                {
                    string userId = _currentUser.GetUserId().ToString();
                    await UpdateTrangThaiHoSo(maHoSo, "4", nguoiDaXuLy: userId);
                    await _nguoiXuLyHoSoService.SetNguoiDangXuLyAsNguoiDaXuLy(hoSoLienThong.Id);
                    var quaTrinhXuLy = new QuaTrinhXuLyHoSo(maHoSo, null, null, null, null, userId, _currentUser.GetUserFullName(), "", "Hệ thống hộ tịch Bộ tư pháp", DateTime.Now, trangThai: "4", thaoTac: "Liên thông BTP");
                    await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                    await AddTrangThaiDVCLT(maHoSo, "7", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, hoSoLienThong.LoaiDuLieuKetNoi);
                    return Result<PushBTPResonse>.Success(data: res);
                }
                _logger.LogError($"{nameof(PushToBTP)}_LTKS_PUSHERORR_{maHoSo}_{JsonConvert.SerializeObject(res)}");
                return Result<PushBTPResonse>.Fail(res.errorDescription);
            }
            return Result<PushBTPResonse>.Fail("Không phải hồ sơ Dịch vụ công liên thông! Vui lòng không sử dụng chức năng này!");
        }
        catch (Exception ex)
        {
            return Result<PushBTPResonse>.Fail(ex.Message);
        }
    }

    private class PushToBTPDangKyKetHonSelect
    {
        public class HoSo
        {
            public DateTime? NgayTiepNhan { get; set; }
            public string MaHuyen { get; set; }
            public string MaXa { get; set; }
            public string MaTTHC { get; set; }
        }
        public class ThanhPhanHoSo
        {
            public string Ten { get; set; }
            public string DinhKem { get; set; }
        }
    }

    public async Task<Result<PushBTPResonse>> PushToBTPDangKyKetHon(LienThongBTPDangKyKetHonRequest req, CancellationToken cancellationToken = default)
    {
        string sqlGetHoSo = $@"SELECT
                    {nameof(Group.MaHuyen)},
                    {nameof(Group.MaXa)},
                    {nameof(HoSo.NgayTiepNhan)},
                    {nameof(HoSo.MaTTHC)}
                    FROM {SchemaNames.Business}.{TableNames.HoSos} hs INNER JOIN {SchemaNames.Catalog}.{TableNames.Groups} g ON hs.{nameof(HoSo.DonViId)} = g.{nameof(Group.GroupCode)} and hs.{nameof(HoSo.MaHoSo)} = @MaHoSo and hs.DeletedOn is null and g.DeletedOn Is null";
        string sqlGetTPHS = $@"SELECT
                    {nameof(ThanhPhanHoSo.Ten)},
                    {nameof(ThanhPhanHoSo.DinhKem)}
                    FROM {SchemaNames.Business}.{TableNames.ThanhPhanHoSos} where {nameof(ThanhPhanHoSo.HoSo)} = @MaHoSo and {nameof(ThanhPhanHoSo.DeletedOn)} is null";
        string maHoSo = req.MaHoSo;
        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<PushToBTPDangKyKetHonSelect.HoSo>(sqlGetHoSo, new
        {
            MaHoSo = maHoSo
        }, cancellationToken: cancellationToken);
        if(hoSo == null)
        {
            throw new NotFoundException($"hồ sơ với mã: {maHoSo} không tồn tại hoặc đơn vị chưa cấu hình mã địa bàn");
        }
        if(_settings.DanhSachMaThuTucKhaiSinh == null || !_settings.DanhSachMaThuTucKhaiSinh.Any())
        {
            throw new Exception($"Chưa cấu hình danh sách mã thủ tục đăng ký kết hôn, vui lòng liên hệ quản trị hệ thống");
        }
        var danhSachMaTTHCDKHT = _settings.DanhSachMaThuTucKhaiSinh.Select(x => x.ToLower()).ToList();
        if (danhSachMaTTHCDKHT.IndexOf(hoSo.MaTTHC.ToLower()) == -1)
        {
            throw new Exception($"Hồ sơ không thuộc thủ tục đăng ký kết hôn, vui lòng không thực hiện chức năng này");
        }
        if (string.IsNullOrEmpty(hoSo.MaXa) && string.IsNullOrEmpty(hoSo.MaHuyen))
        {
            throw new Exception($"Đơn vị tiếp nhận hồ sơ chưa được cấu hình mã địa bàn");
        }
        if(hoSo.NgayTiepNhan == null || hoSo.NgayTiepNhan == DateTime.MinValue)
        {
            throw new Exception("Hồ sơ không có ngày tiếp nhận, vui lòng liên hệ quản trị hệ thống");
        }
        string noiDangKy = hoSo.MaXa ?? hoSo.MaHuyen;
        DataDKKHEformWrapper? eFormDataParsed = null;
        try
        {
            eFormDataParsed = JsonConvert.DeserializeObject<DataDKKHEformWrapper>(req.EformBase64Data);
        } catch (Exception ex)
        {
            throw new Exception("Có lỗi xảy ra khi thực hiện lấy thông tin tờ khai");
        }
        try
        {
            var data = ConvertEformToDKKH(eFormDataParsed.Data, noiDangKy);
            DataHoTich objHoTich = new DataHoTich()
            {
                module = LTKH,
                maHoSoMCDT = maHoSo,
                maHoSoLT = maHoSo,
                maDonVi = noiDangKy,
                data = JsonConvert.SerializeObject(data),
                ngayTiepNhan = hoSo.NgayTiepNhan?.ToString("dd/MM/yyyy HH:mm:ss"),
                fileDinhKem = new List<KhaiSinhKhaiTu_FileDinhKem>()
            };
            var thanhPhanHoSos = await _dapperRepository.QueryAsync<PushToBTPDangKyKetHonSelect.ThanhPhanHoSo>(sqlGetTPHS, new
            {
                MaHoSo = maHoSo
            }, cancellationToken: cancellationToken);

            objHoTich.fileDinhKem.Clear();
            if (thanhPhanHoSos != null && thanhPhanHoSos.Any())
            {
                for (int i = 0; i < thanhPhanHoSos.Count; i++)
                {
                    var thanhPhanHoSo = thanhPhanHoSos[i];
                    if (string.IsNullOrEmpty(thanhPhanHoSo.DinhKem))
                    {
                        continue;
                    }
                    List<string> dinhKems = thanhPhanHoSo.DinhKem.Split("##", StringSplitOptions.RemoveEmptyEntries).ToList();
                    if (dinhKems != null && dinhKems.Any())
                    {
                        for (int j = 0; j < dinhKems.Count; j++)
                        {
                            string dinhKem = dinhKems[j];
                            Base64DataFile duLieuDinhKemBase64 = await _minioService.GetFileByKeyAsBase64Async(null, dinhKem);
                            objHoTich.fileDinhKem.Add(new KhaiSinhKhaiTu_FileDinhKem()
                            {
                                duLieuTepDinhKem = duLieuDinhKemBase64.Base64,
                                huyGiayTo = 0,
                                id = int.Parse(DateTime.Now.ToString("yyMMddHH")) + DateTime.Now.Minute + DateTime.Now.Second + DateTime.Now.Microsecond,
                                loaiGiayTo = 1,
                                tenGiayTo = thanhPhanHoSo.Ten,
                                tenTepDinhKem = Path.GetFileName(dinhKem)
                            });
                        }
                    }
                }
            }
            var res = await RequestHandler<object, PushBTPResonse>(objHoTich, _settings.UrlBTPTestApi.Base, "", HttpMethod.Post, _settings.UrlBTPTestApi.NhanDKHT);
            if (res.status == "1" || (res.errorDescription != null && res.errorDescription.ToLower().Contains("đã được tiếp nhận")))
            {
                string userId = _currentUser.GetUserId().ToString();
                await UpdateTrangThaiHoSo(maHoSo, "4", nguoiDaXuLy: userId, loaiDuLieuKetNoi: LTKH);
                var quaTrinhXuLy = new QuaTrinhXuLyHoSo(maHoSo, null, null, null, null, userId, _currentUser.GetUserFullName(), "", "Hệ thống hộ tịch Bộ tư pháp", DateTime.Now, trangThai: "4", thaoTac: "Liên thông BTP");
                await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                return Result<PushBTPResonse>.Success(data: res);
            }
            _logger.LogError($"{nameof(PushToBTPDangKyKetHon)}_LTKH_PUSHERORR_{maHoSo}_{JsonConvert.SerializeObject(res)}");
            return Result<PushBTPResonse>.Fail(res.errorDescription);
        } catch (Exception ex)
        {
            return Result<PushBTPResonse>.Fail(ex.Message);
        }
    }

    private static DataDKKH ConvertEformToDKKH(DataDKKHEform obj, string noiDangKy)
    {
        try
        {
            DataDKKH data = new DataDKKH();
            data.noiDangKy = noiDangKy;
            data.ghiChu = obj.ghiChu;
            data.soBanSao = obj.soBanSao;

            data.chongLoaiTinhTrangHonNhan = obj.chongLoaiTinhTrangHonNhan.Code;
            data.chongYeuCauXNTTHN = obj.chongYeuCauXNTTHN.Code;
            data.chongNoiXNTTHN = noiDangKy;
            data.chongTinhTrangHonNhan = obj.chongLoaiTinhTrangHonNhan.Name;
            data.chongHoTen = obj.chongHoTen;
            data.chongNgaySinh = DateTime.Parse(obj.chongNgaySinh).ToString("dd.MM.yyyy");//DateTime
            data.chongDanToc = obj.chongDanToc.Code;
            data.chongQuocTich = obj.chongQuocTich.Code;
            data.chongLoaiCuTru = obj.chongLoaiCuTru.Code;
            data.chongLoaiGiayToTuyThan = obj.chongLoaiGiayTo.Code;
            data.chongSoGiayToTuyThan = obj.chongSoGiayTo;
            data.chongNgayCapGiayToTuyThan = DateTime.Parse(obj.chongNgayCapGiayToTuyThan).ToString("dd.MM.yyyy");//DateTime
            data.chongNoiCapGiayToTuyThan = obj.chongNoiCapGiayToTuyThan;
            data.chongSoLanKH = obj.chongSoLanKH;
            data.chongNoiCuTru = new NoiCuTruDKKH()
            {
                maTinh = obj.chongNoiCuTruTinhThanh.maDiaBan,
                maHuyen = obj.chongNoiCuTruQuanHuyen.maDiaBan,
                maXa = obj.chongNoiCuTruXaPhuong.maDiaBan,
                dcChiTiet = obj.chongNoiCuTru
            };


            data.voLoaiTinhTrangHonNhan = obj.voLoaiTinhTrangHonNhan.Code;
            data.voTinhTrangHonNhan = obj.voLoaiTinhTrangHonNhan.Name;
            data.voNoiXNTTHN = noiDangKy;
            data.voYeuCauXNTTHN = obj.voYeuCauXNTTHN.Code;
            data.voHoTen = obj.voHoTen;
            data.voNgaySinh = DateTime.Parse(obj.voNgaySinh).ToString("dd.MM.yyyy");//DateTime
            data.voDanToc = obj.voDanToc.Code;
            data.voQuocTich = obj.voQuocTich.Code;
            data.voLoaiCuTru = obj.voLoaiCuTru.Code;
            data.voLoaiGiayToTuyThan = obj.voLoaiGiayTo.Code;
            data.voSoGiayToTuyThan = obj.voSoGiayTo;
            data.voNgayCapGiayToTuyThan = DateTime.Parse(obj.voNgayCapGiayToTuyThan).ToString("dd.MM.yyyy");//DateTime
            data.voNoiCapGiayToTuyThan = obj.voNoiCapGiayToTuyThan;
            data.voSoLanKH = obj.voSoLanKH;
            data.voNoiCuTru = new NoiCuTruDKKH()
            {
                maTinh = obj.voNoiCuTruTinhThanh.maDiaBan,
                maHuyen = obj.voNoiCuTruQuanHuyen.maDiaBan,
                maXa = obj.voNoiCuTruXaPhuong.maDiaBan,
                dcChiTiet = obj.voNoiCuTru
            };
            return data;
        } catch (Exception ex)
        {
            throw new Exception("Có lỗi xảy ra khi tạo dữ liệu liên thông, vui lòng liên hệ quản trị hệ thống");
        }
    }



    private class ScanResult_HoSoSelect
    {
        public string MaHoSo { get; set; }
    }
    public async Task<Result<List<KhaiSinhKhaiTu_PushManualResponse>>> ScanManual(IReadOnlyList<string> maHoSos)
    {
        string sqlGetHoSo = $@"SELECT TOP 1 LoaiDuLieuKetNoi, NguoiDangXuLy, TrangThaiHoSoId, MaHoSo, MaHoSoKhac FROM {SchemaNames.Business}.{TableNames.HoSos} WHERE
                               MaHoSo IN @MaHoSo and (LoaiDuLieuKetNoi = 'LTKS' OR LoaiDuLieuKetNoi = 'LTKT')";
        IReadOnlyList<HoSo>? hoSos = await _dapperRepository.QueryAsync<HoSo>(sqlGetHoSo, new
        {
            MaHoSo = maHoSos
        });
        if(hoSos == null)
        {
            return Result<List<KhaiSinhKhaiTu_PushManualResponse>>.Fail("Hồ sơ không tồn tại trên phần mềm MCĐT hoặc đã bị xóa!");
        }
        List<KhaiSinhKhaiTu_PushManualResponse> response = new List<KhaiSinhKhaiTu_PushManualResponse>();
        for (int i = 0; i < hoSos.Count; i++)
        {
            var hoSo = hoSos[i];
            string maHoSo = hoSo.MaHoSo;
            string maHoSoLT = hoSo.MaHoSoKhac;
            if (hoSo.LoaiDuLieuKetNoi != "LTKS" && hoSo.LoaiDuLieuKetNoi != "LTKT")
            {
                response.Add(new KhaiSinhKhaiTu_PushManualResponse()
                {
                    MoTa = $"Không phải hồ sơ Dịch vụ công liên thông! Vui lòng không sử dụng chức năng này!",
                    ThoiGianThucHien = string.Empty,
                    TrangThaiXuLy = string.Empty,
                    MaHoSoLT = string.Empty,
                    MaHoSoMCDT = maHoSo,
                });
                continue;
            }
            if(hoSo.TrangThaiHoSoId != "4")
            {
                response.Add(new KhaiSinhKhaiTu_PushManualResponse()
                {
                    MoTa = $"Hồ sơ đã được đồng bộ về MCĐT",
                    ThoiGianThucHien = string.Empty,
                    TrangThaiXuLy = string.Empty,
                    MaHoSoLT = string.Empty,
                    MaHoSoMCDT = maHoSo,
                });
                continue;
            }
            List<string> maDinhDanhHoSo = new List<string>() { maHoSo };
            try
            {
                if (hoSo.LoaiDuLieuKetNoi == "LTKS")
                {
                    var req = new ScanHoTichRequest()
                    {
                        maDinhDanhHoSo = maDinhDanhHoSo,
                        maTinh = _settings.MaTinh,
                        module = hoSo.LoaiDuLieuKetNoi,
                    };
                    var res = await RequestHandler<ScanHoTichRequest, ScanHoTichResponse<KhaiSinhKhaiTu_HoTich_KhaiSinh_BTPScanResponse>>(req, _settings.UrlBTPApi.Base, "", HttpMethod.Post, _settings.UrlBTPApi.LayKetQua);
                    if (res != null && res.status.ToString() == "1" && res.value.Count > 0)
                    {
                        await HandlerBtpScanKSResponse(res);
                        var data = res.value[0];
                        if (data.trangThai == "1")
                        {
                            response.Add(new KhaiSinhKhaiTu_PushManualResponse()
                            {
                                MoTa = $"Hồ sơ đã được gửi lên BTP và đang ở trạng thái chờ tiếp nhận.",
                                ThoiGianThucHien = $"thời gian nhận hồ sơ: {data.thoiGianThucHien}",
                                TrangThaiXuLy = data.trangThai,
                                MaHoSoLT = maHoSoLT,
                                MaHoSoMCDT = maHoSo,
                            });
                        }
                        else if (data.trangThai == "2")
                        {
                            response.Add(new KhaiSinhKhaiTu_PushManualResponse()
                            {
                                MoTa = $"Hồ sơ yêu cầu công dân bổ sung",
                                ThoiGianThucHien = $"thời gian yêu cầu: {data.thoiGianThucHien}",
                                TrangThaiXuLy = data.trangThai,
                                NoiDungChiTiet = data.noiDungXuLy ?? string.Empty,
                                MaHoSoLT = maHoSoLT,
                                MaHoSoMCDT = maHoSo,
                            });
                        }
                        else if (data.trangThai == "3")
                        {
                            response.Add( new KhaiSinhKhaiTu_PushManualResponse()
                            {
                                MoTa = $"Hồ sơ đang được xử lý.",
                                ThoiGianThucHien = $"thời gian tiếp nhận xử lý: {data.thoiGianThucHien}",
                                TrangThaiXuLy = data.trangThai,
                                MaHoSoLT = maHoSoLT,
                                MaHoSoMCDT = maHoSo,
                            });
                        }
                        else if (data.trangThai == "4")
                        {
                            response.Add(new KhaiSinhKhaiTu_PushManualResponse()
                            {
                                MoTa = $"Hồ sơ đã có kết quả BTP (Vui lòng kiểm tra mục chờ trả kết quả trên phần mềm MCĐT)",
                                ThoiGianThucHien = $"Thời gian kết thúc xử lý: {data.thoiGianThucHien}",
                                TrangThaiXuLy = data.trangThai,
                                MaHoSoLT = maHoSoLT,
                                MaHoSoMCDT = maHoSo,
                            });
                        }
                        else if (data.trangThai == "6")
                        {
                            response.Add(new KhaiSinhKhaiTu_PushManualResponse()
                            {
                                MoTa = $"Hồ sơ đã bị từ chối trên BTP.",
                                ThoiGianThucHien = $"Thời gian từ chối: {data.thoiGianThucHien}",
                                TrangThaiXuLy = data.trangThai,
                                NoiDungChiTiet = data.noiDungXuLy ?? data.ghiChu ?? string.Empty,
                                MaHoSoLT = maHoSoLT,
                                MaHoSoMCDT = maHoSo,
                            });
                        }
                        else if (!string.IsNullOrEmpty(data.trangThai))
                        {
                            response.Add(new KhaiSinhKhaiTu_PushManualResponse()
                            {
                                MoTa = $"Hồ sơ không tồn tại trên BTP",
                                ThoiGianThucHien = string.Empty,
                                TrangThaiXuLy = string.Empty,
                                NoiDungChiTiet = string.Empty,
                                MaHoSoLT = maHoSoLT,
                                MaHoSoMCDT = maHoSo,
                            });
                        }
                    }
                    if(response.Count == 0)
                    {
                        return Result<List<KhaiSinhKhaiTu_PushManualResponse>>.Fail($"Có lỗi xảy ra khi lấy dữ liệu.");
                    }
                }
                else if (hoSo.LoaiDuLieuKetNoi == "LTKT")
                {
                    var req = new ScanHoTichRequest()
                    {
                        maDinhDanhHoSo = maDinhDanhHoSo,
                        maTinh = _settings.MaTinh,
                        module = hoSo.LoaiDuLieuKetNoi,
                    };
                    var res = await RequestHandler<ScanHoTichRequest, ScanHoTichResponse<KhaiSinhKhaiTu_HoTich_KhaiTu_BTPScanResponse>>(req, _settings.UrlBTPApi.Base, "", HttpMethod.Post, _settings.UrlBTPApi.LayKetQua);
                    if (res != null && res.status.ToString() == "1" && res.value.Count > 0)
                    {
                        await HandlerBtpScanKTResponse(res);
                        var data = res.value[0];
                        if (data.trangThai == "1")
                        {
                            response.Add(new KhaiSinhKhaiTu_PushManualResponse()
                            {
                                MoTa = $"Hồ sơ đã được gửi lên BTP và đang ở trạng thái chờ tiếp nhận.",
                                ThoiGianThucHien = $"thời gian nhận hồ sơ: {data.thoiGianThucHien}",
                                TrangThaiXuLy = data.trangThai,
                                MaHoSoLT = maHoSoLT,
                                MaHoSoMCDT = maHoSo,
                            });
                        }
                        else if (data.trangThai == "2")
                        {
                            response.Add(new KhaiSinhKhaiTu_PushManualResponse()
                            {
                                MoTa = $"Hồ sơ đang trong trạng thái yêu cầu công dân bổ sung hồ sơ.",
                                ThoiGianThucHien = $"thời gian yêu cầu: {data.thoiGianThucHien}",
                                TrangThaiXuLy = data.trangThai,
                                NoiDungChiTiet = data.noiDungXuLy ?? string.Empty,
                                MaHoSoLT = maHoSoLT,
                                MaHoSoMCDT = maHoSo,
                            });
                        }
                        else if (data.trangThai == "3")
                        {
                            response.Add(new KhaiSinhKhaiTu_PushManualResponse()
                            {
                                MoTa = $"Hồ sơ đang được xử lý.",
                                ThoiGianThucHien = $"thời gian tiếp nhận xử lý: {data.thoiGianThucHien}",
                                TrangThaiXuLy = data.trangThai,
                                MaHoSoLT = maHoSoLT,
                                MaHoSoMCDT = maHoSo,
                            });
                        }
                        else if (data.trangThai == "4")
                        {
                            response.Add(new KhaiSinhKhaiTu_PushManualResponse()
                            {
                                MoTa = $"Hồ sơ đã được BTP ban hành kết quả (Vui lòng kiểm tra mục chờ trả kết quả tại phần mềm MCĐT).",
                                ThoiGianThucHien = $"Thời gian kết thúc xử lý: {data.thoiGianThucHien}",
                                TrangThaiXuLy = data.trangThai,
                                MaHoSoLT = maHoSoLT,
                                MaHoSoMCDT = maHoSo,
                            });
                        }
                        else if (data.trangThai == "6")
                        {
                            response.Add(new KhaiSinhKhaiTu_PushManualResponse()
                            {
                                MoTa = $"Hồ sơ đã bị từ chối trên BTP.",
                                ThoiGianThucHien = $"Thời gian từ chối: {data.thoiGianThucHien}",
                                TrangThaiXuLy = data.trangThai,
                                NoiDungChiTiet = data.noiDungXuLy ?? data.ghiChu ?? string.Empty,
                                MaHoSoLT = maHoSoLT,
                                MaHoSoMCDT = maHoSo,
                            });
                        }
                        else if (!string.IsNullOrEmpty(data.trangThai))
                        {
                            response.Add(new KhaiSinhKhaiTu_PushManualResponse()
                            {
                                MoTa = $"Hồ sơ không tồn tại trên BTP",
                                ThoiGianThucHien = string.Empty,
                                TrangThaiXuLy = string.Empty,
                                NoiDungChiTiet = string.Empty,
                                MaHoSoLT = maHoSoLT,
                                MaHoSoMCDT = maHoSo,
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"{nameof(ScanManual)}_{hoSo.LoaiDuLieuKetNoi}_{maHoSo}_{ex.ToString()}");
            }
        }
        return Result<List<KhaiSinhKhaiTu_PushManualResponse>>.Success(response);
    }

    [DisableConcurrentExecution(timeoutInSeconds: 10 * 60)]
    public async Task ScanResultLTKS()
    {
        if (!_settings.EnableScan)
        {
            return;
        }
        string sqlGetDanhSachHoSoDangTrenBo =
            $@"SELECT TOP {_settings.UrlBTPApi.SoLuongHoSoTraVe ?? "1000"} MaHoSo FROM {SchemaNames.Business}.{TableNames.HoSos} hs
                WHERE NguoiDangXuLy = '' AND TrangThaiHoSoId = '4' And LoaiDuLieuKetNoi = 'LTKS'";
        var danhSachHoSo = await _dapperRepository.QueryAsync<ScanResult_HoSoSelect>(sqlGetDanhSachHoSoDangTrenBo, new
        {

        });
        var danhSachLTKS = danhSachHoSo.Select(x => x.MaHoSo).ToList();
        if(danhSachLTKS != null && danhSachLTKS.Count > 0)
        {
            for (int i = 0; i < danhSachLTKS.Count; i += 3)
            {
                var chunk = danhSachLTKS.Skip(i).Take(3).ToList();
                var reqKS = new ScanHoTichRequest()
                {
                    maDinhDanhHoSo = chunk,
                    maTinh = _settings.MaTinh,
                    module = "LTKS"
                };
                try
                {
                    var resKS = await RequestHandler<ScanHoTichRequest, ScanHoTichResponse<KhaiSinhKhaiTu_HoTich_KhaiSinh_BTPScanResponse>>(reqKS, _settings.UrlBTPApi.Base, "", HttpMethod.Post, _settings.UrlBTPApi.LayKetQua);
                    await HandlerBtpScanKSResponse(resKS);
                }
                catch (Exception ex)
                {
                    _logger.LogError($"{nameof(ScanResultLTKS)}_KS_{string.Join("##", chunk)}_{ex.ToString()}");
                }
            }
        }
    }
    [DisableConcurrentExecution(timeoutInSeconds: 10 * 60)]
    public async Task ScanResultLTKT()
    {
        if (!_settings.EnableScan)
        {
            return;
        }
        string sqlGetDanhSachHoSoDangTrenBo =
            $@"SELECT TOP {_settings.UrlBTPApi.SoLuongHoSoTraVe ?? "1000"} MaHoSo FROM {SchemaNames.Business}.{TableNames.HoSos} hs
                WHERE NguoiDangXuLy = '' AND TrangThaiHoSoId = '4' And LoaiDuLieuKetNoi = 'LTKT'";
        var danhSachHoSo = await _dapperRepository.QueryAsync<ScanResult_HoSoSelect>(sqlGetDanhSachHoSoDangTrenBo, new
        {

        });
        var danhSachLTKT = danhSachHoSo.Select(x => x.MaHoSo).ToList();
       
        if (danhSachLTKT != null && danhSachLTKT.Count > 0)
        {
            for (int i = 0; i < danhSachLTKT.Count; i += 3)
            {
                var chunk = danhSachLTKT.Skip(i).Take(3).ToList();

                var reqKT = new ScanHoTichRequest()
                {
                    maDinhDanhHoSo = chunk,
                    maTinh = _settings.MaTinh,
                    module = "LTKT"
                };
                try
                {
                    var resKT = await RequestHandler<ScanHoTichRequest, ScanHoTichResponse<KhaiSinhKhaiTu_HoTich_KhaiTu_BTPScanResponse>>(reqKT, _settings.UrlBTPApi.Base, "", HttpMethod.Post, _settings.UrlBTPApi.LayKetQua);
                    await HandlerBtpScanKTResponse(resKT);
                }
                catch (Exception ex)
                {
                    _logger.LogError($"{nameof(ScanResultLTKT)}_KT_{string.Join("##", chunk)}_{ex.ToString()}");
                }
            }
        }
    }
    public async Task ScanResultLTKH()
    {
        if (!_settings.EnableScan)
        {
            return;
        }
        string sqlGetDanhSachHoSoDangTrenBo =
            $@"SELECT TOP {_settings.UrlBTPApi.SoLuongHoSoTraVe ?? "1000"} MaHoSo FROM {SchemaNames.Business}.{TableNames.HoSos} hs
                WHERE NguoiDangXuLy = '' AND TrangThaiHoSoId = '4' And LoaiDuLieuKetNoi = '{LTKH}'";
        var danhSachHoSo = await _dapperRepository.QueryAsync<ScanResult_HoSoSelect>(sqlGetDanhSachHoSoDangTrenBo, new
        {

        });
        var danhSachLTKH = danhSachHoSo.Select(x => x.MaHoSo).ToList();

        if (danhSachLTKH != null && danhSachLTKH.Count > 0)
        {
            for (int i = 0; i < danhSachLTKH.Count; i += 3)
            {
                var chunk = danhSachLTKH.Skip(i).Take(3).ToList();

                var reqKH = new ScanHoTichRequest()
                {
                    maDinhDanhHoSo = chunk,
                    maTinh = _settings.MaTinh,
                    module = LTKH
                };
                try
                {
                    var resKH = await RequestHandler<ScanHoTichRequest, ScanHoTichResponse<KhaiSinhKhaiTu_HoTich_KhaiTu_BTPScanResponse>>(reqKH, _settings.UrlBTPApi.Base, "", HttpMethod.Post, _settings.UrlBTPApi.LayKetQua);
                    await HandlerBtpScanKTResponse(resKH);
                }
                catch (Exception ex)
                {
                    _logger.LogError($"{nameof(ScanResultLTKT)}_KH_{string.Join("##", chunk)}_{ex.ToString()}");
                }
            }
        }
    }
    private async Task HandlerBtpScanKHResponse(ScanHoTichResponse<KhaiSinhKhaiTu_HoTich_KhaiSinh_BTPScanResponse> datas)
    {
        if (datas == null || datas.value == null || datas.value.Count == 0) return;
        for (int i = 0; i < datas.value.Count; i++)
        {
            var data = datas.value[i];
            DateTime ngayKetThucXuLy = DateTime.Now;
            if (!string.IsNullOrEmpty(data.thoiGianThucHien))
            {
                try
                {
                    ngayKetThucXuLy = DateTime.ParseExact(data.thoiGianThucHien, formatDateString, CultureInfo.InvariantCulture);
                }
                catch (Exception ex)
                {
                }
            }
            if (data.trangThai == "2") // hồ sơ cần bổ sung thông tin
            {
                await UpdateTrangThaiHoSo(data.maHoSoMCDT, "5", ngayYeuCauBoSung: ngayKetThucXuLy);
                var quaTrinhXuLy = new QuaTrinhXuLyHoSo(data.maHoSoMCDT, null, null, null, null, "", "Hệ thống BTP", "", "", DateTime.Now, trangThai: "5", noiDung: data.noiDungXuLy ?? data.ghiChu ?? string.Empty, thaoTac: "BTP yêu cầu bổ sung");
                await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                await AddTrangThaiDVCLT(data.maHoSoMCDT, "2", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, data.module, JsonConvert.SerializeObject(data));
            }
            else if (data.trangThai == "4") // đã hoàn thành đăng ký
            {
                var dinhKemKetQua = string.Empty;
                try
                {
                    dinhKemKetQua = await _minioService.UploadFileAsBase64Async(data.ketQuaXuLy.giayKhaiSinh, "giayKhaiSinh.pdf", null, "KetQuaLienThongKhaiSinh");
                    await UpdateTrangThaiHoSo(data.maHoSoMCDT, "9", ngayKetThucXuLy, dinhKemKetQua);
                    var quaTrinhXuLy = new QuaTrinhXuLyHoSo(data.maHoSoMCDT, null, null, null, null, "", "Hệ thống BTP", "", "", DateTime.Now, trangThai: "9", dinhKem: dinhKemKetQua, thaoTac: "BTP trả kết quả");
                    await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                    if (data.ketQuaXuLy != null)
                    {
                        data.ketQuaXuLy.giayKhaiSinh = string.Empty;
                    }
                    await AddTrangThaiDVCLT(data.maHoSoMCDT, "4", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, data.module, JsonConvert.SerializeObject(data));
                }
                catch (Exception ex)
                {
                    _logger.LogError($"{nameof(HandlerBtpScanKSResponse)}_{data.maHoSoMCDT}_{ex.ToString()}");
                }
            }
            else if (data.trangThai == "6") // từ chối tiếp nhận
            {
                await UpdateTrangThaiHoSo(data.maHoSoMCDT, "3"); // không được tiếp nhận
                var quaTrinhXuLy = new QuaTrinhXuLyHoSo(data.maHoSoMCDT, null, null, null, null, "", "Hệ thống BTP", "", "", ngayKetThucXuLy, trangThai: "3", noiDung: data.ghiChu ?? data.noiDungXuLy ?? string.Empty, thaoTac: "BTP từ chối xử lý");
                await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                await AddTrangThaiDVCLT(data.maHoSoMCDT, "6", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, data.module, JsonConvert.SerializeObject(data));
            }
        }
    }

    private async Task HandlerBtpScanKSResponse(ScanHoTichResponse<KhaiSinhKhaiTu_HoTich_KhaiSinh_BTPScanResponse> datas)
    {
        if (datas == null || datas.value == null || datas.value.Count == 0) return;
        for (int i = 0; i < datas.value.Count; i++)
        {
            var data = datas.value[i];
            DateTime ngayKetThucXuLy = DateTime.Now;
            if (!string.IsNullOrEmpty(data.thoiGianThucHien))
            {
                try
                {
                    ngayKetThucXuLy = DateTime.ParseExact(data.thoiGianThucHien, formatDateString, CultureInfo.InvariantCulture);
                }
                catch (Exception ex)
                {
                }
            }
            if (data.trangThai == "2") // hồ sơ cần bổ sung thông tin
            {
                await UpdateTrangThaiHoSo(data.maHoSoMCDT, "5", ngayYeuCauBoSung: ngayKetThucXuLy);
                var quaTrinhXuLy = new QuaTrinhXuLyHoSo(data.maHoSoMCDT, null, null, null, null, "", "Hệ thống BTP", "", "", DateTime.Now, trangThai: "5", noiDung: data.noiDungXuLy ?? data.ghiChu ?? string.Empty, thaoTac: "BTP yêu cầu bổ sung");
                await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                await AddTrangThaiDVCLT(data.maHoSoMCDT, "2", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, data.module, JsonConvert.SerializeObject(data));
            }
            else if (data.trangThai == "4") // đã hoàn thành đăng ký
            {
                var dinhKemKetQua = string.Empty;
                try
                {
                    DateTime? ngayBanHanhKetQua = DateTime.TryParseExact(
                       data.ketQuaXuLy?.ngayDangKy,
                       "dd/MM/yyyy",
                       CultureInfo.InvariantCulture,
                       DateTimeStyles.None,
                       out DateTime parsedDate
                   ) ? parsedDate : (DateTime?)null;
                    dinhKemKetQua = await _minioService.UploadFileAsBase64Async(data.ketQuaXuLy.giayKhaiSinh, "giayKhaiSinh.pdf", null, "KetQuaLienThongKhaiSinh");
                    await UpdateTrangThaiHoSo(data.maHoSoMCDT, "9", ngayKetThucXuLy, dinhKemKetQua, coQuanBanHanhKetQua: data.phongBanXuLy,
                        nguoiKyKetQua: data.nguoiXuLy, soKyHieuKetQua: data.ketQuaXuLy?.soDangKy, ngayBanHanhKetQua: ngayBanHanhKetQua);
                    await _nguoiXuLyHoSoService.SwapNguoiDangXuLyAndNguoiDaXuLyByNguoiNhanHoSo(data.maHoSoMCDT);
                    var quaTrinhXuLy = new QuaTrinhXuLyHoSo(data.maHoSoMCDT, null, null, null, null, "", "Hệ thống BTP", "", "", DateTime.Now, trangThai: "9", dinhKem: dinhKemKetQua, thaoTac: "BTP trả kết quả");
                    await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                    if(data.ketQuaXuLy != null)
                    {
                        data.ketQuaXuLy.giayKhaiSinh = string.Empty;
                    }
                    await AddTrangThaiDVCLT(data.maHoSoMCDT, "4", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, data.module, JsonConvert.SerializeObject(data));
                } catch(Exception ex) {
                    _logger.LogError($"{nameof(HandlerBtpScanKSResponse)}_{data.maHoSoMCDT}_{ex.ToString()}");
                }
            }
            else if (data.trangThai == "6") // từ chối tiếp nhận
            {
                await UpdateTrangThaiHoSo(data.maHoSoMCDT, "3"); // không được tiếp nhận
                var quaTrinhXuLy = new QuaTrinhXuLyHoSo(data.maHoSoMCDT, null, null, null, null, "", "Hệ thống BTP", "", "", ngayKetThucXuLy, trangThai: "3", noiDung: data.ghiChu ?? data.noiDungXuLy ?? string.Empty, thaoTac: "BTP từ chối xử lý");
                await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                await AddTrangThaiDVCLT(data.maHoSoMCDT, "6", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, data.module, JsonConvert.SerializeObject(data));
            }
        }
    }
    private async Task HandlerBtpScanKTResponse(ScanHoTichResponse<KhaiSinhKhaiTu_HoTich_KhaiTu_BTPScanResponse> datas)
    {
        if(datas == null || datas.value == null || datas.value.Count == 0) return;
        for (int i = 0; i < datas.value.Count; i++)
        {
            var data = datas.value[i];
            DateTime ngayKetThucXuLy = DateTime.Now;
            if (!string.IsNullOrEmpty(data.thoiGianThucHien))
            {
                try
                {
                    ngayKetThucXuLy = DateTime.ParseExact(data.thoiGianThucHien, formatDateString, CultureInfo.InvariantCulture);
                }
                catch (Exception ex)
                {
                }
            }
            if (data.trangThai == "2") // hồ sơ cần bổ sung thông tin
            {
                await UpdateTrangThaiHoSo(data.maHoSoMCDT, "5", ngayYeuCauBoSung: ngayKetThucXuLy);
                var quaTrinhXuLy = new QuaTrinhXuLyHoSo(data.maHoSoMCDT, null, null, null, null, "", "Hệ thống BTP", "", "", DateTime.Now, trangThai: "5", noiDung: data.noiDungXuLy ?? data.ghiChu ?? string.Empty, thaoTac: "BTP yêu cầu bổ sung");
                await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                await AddTrangThaiDVCLT(data.maHoSoMCDT, "2", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, data.module, JsonConvert.SerializeObject(data));
            }
            else if (data.trangThai == "3")// hồ sơ đủ đkiện giải quyết
            {
                //await AddTrangThaiDVCLT(data.maHoSoMCDT, "3", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, data.module);
            }
            else if (data.trangThai == "4") // đã hoàn thành đăng ký
            {
                if (data.ketQuaXuLy != null && !string.IsNullOrEmpty(data.ketQuaXuLy.giayKhaiTu))
                {
                    try
                    {
                        DateTime? ngayBanHanhKetQua = DateTime.TryParseExact(
                            data.thoiGianThucHien,
                            "dd/MM/yyyy",
                            CultureInfo.InvariantCulture,
                            DateTimeStyles.None,
                            out DateTime parsedDate
                        ) ? parsedDate : (DateTime?)null;
                        var dinhKemKetQua = await _minioService.UploadFileAsBase64Async(data.ketQuaXuLy.giayKhaiTu, "giayKhaiTu.pdf", null, "KetQuaLienThongKhaiTu");
                        await UpdateTrangThaiHoSo(data.maHoSoMCDT, "9", ngayKetThucXuLy, dinhKemKetQua, coQuanBanHanhKetQua: data.phongBanXuLy, nguoiKyKetQua: data.nguoiXuLy,
                            soKyHieuKetQua: data.ketQuaXuLy?.soDangKy, ngayBanHanhKetQua: ngayBanHanhKetQua);
                        await _nguoiXuLyHoSoService.SwapNguoiDangXuLyAndNguoiDaXuLyByNguoiNhanHoSo(data.maHoSoMCDT);
                        var quaTrinhXuLy = new QuaTrinhXuLyHoSo(data.maHoSoMCDT, null, null, null, null, "", "Hệ thống BTP", "", "", DateTime.Now, trangThai: "9", dinhKem: dinhKemKetQua, thaoTac: "BTP trả kết quả");
                        await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                        if (data.ketQuaXuLy != null)
                        {
                            data.ketQuaXuLy.giayKhaiTu = string.Empty;
                        }
                        await AddTrangThaiDVCLT(data.maHoSoMCDT, "4", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, data.module, JsonConvert.SerializeObject(data));
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError($"{nameof(HandlerBtpScanKTResponse)}_{data.maHoSoMCDT}_{ex.ToString()}");
                    }
                }
            }
            else if (data.trangThai == "6") // từ chối tiếp nhận
            {
                await UpdateTrangThaiHoSo(data.maHoSoMCDT, "3"); // không được tiếp nhận
                var quaTrinhXuLy = new QuaTrinhXuLyHoSo(data.maHoSoMCDT, null, null, null, null, "", "Hệ thống BTP", "", "", ngayKetThucXuLy, trangThai: "3", noiDung: data.ghiChu ?? data.noiDungXuLy ?? string.Empty, thaoTac: "BTP từ chối xử lý");
                await _dapperRepository.InsertEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLy, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
                await AddTrangThaiDVCLT(data.maHoSoMCDT, "6", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, data.module, JsonConvert.SerializeObject(data));
            }
        }
    }
    private async Task UpdateTrangThaiHoSo(string maHoSo, string trangThai, DateTime? ngayKetThucXuLy = null, string? dinhKemKetQua = null, string? nguoiDaXuLy = null,
        DateTime? ngayYeuCauBoSung = null, string? loaiDuLieuKetNoi = null, string? loaiVanBanKetQua = null, string? coQuanBanHanhKetQua = null, string? nguoiKyKetQua = null,
        string? soKyHieuKetQua = null, DateTime? ngayBanHanhKetQua = null, string? trichYeuKetQua = null)
    {
        string extraUpdateCols = string.Empty;
        if (trangThai == "5" || trangThai == "4")
        {
            extraUpdateCols += ", NguoiDangXuLy = ''";
        } else if (trangThai == "9" || trangThai == "3")
        {
            extraUpdateCols += ", NguoiDangXuLy = NguoiNhanHoSo";
        }
        if (ngayKetThucXuLy != null && ngayKetThucXuLy.HasValue && ngayKetThucXuLy != DateTime.MinValue)
        {
            extraUpdateCols += ", NgayKetThucXuLy = @NgayKetThucXuLy";
        }
        if (ngayYeuCauBoSung != null && ngayYeuCauBoSung.HasValue && ngayYeuCauBoSung != DateTime.MinValue)
        {
            extraUpdateCols += ", NgayYeuCauBoSung = @NgayYeuCauBoSung";
        }
        if (!string.IsNullOrEmpty(dinhKemKetQua))
        {
            extraUpdateCols += ", DinhKemKetQua = @DinhKemKetQua";
        }
        if (!string.IsNullOrEmpty(nguoiDaXuLy))
        {
            extraUpdateCols += ", NguoiDaXuLy = @NguoiDaXuLy";
        }
        if (!string.IsNullOrEmpty(loaiDuLieuKetNoi))
        {
            extraUpdateCols += ", LoaiDuLieuKetNoi = @LoaiDuLieuKetNoi";
        }
        if (!string.IsNullOrEmpty(loaiVanBanKetQua))
        {
            extraUpdateCols += ", LoaiVanBanKetQua = @LoaiVanBanKetQua";
        }
        if (!string.IsNullOrEmpty(coQuanBanHanhKetQua))
        {
            extraUpdateCols += ", CoQuanBanHanhKetQua = @CoQuanBanHanhKetQua";
        }
        if (!string.IsNullOrEmpty(nguoiKyKetQua))
        {
            extraUpdateCols += ", NguoiKyKetQua = @NguoiKyKetQua";
        }
        if (!string.IsNullOrEmpty(soKyHieuKetQua))
        {
            extraUpdateCols += ", SoKyHieuKetQua = @SoKyHieuKetQua";
        }
        if (ngayBanHanhKetQua != null)
        {
            extraUpdateCols += ", NgayBanHanhKetQua = @NgayBanHanhKetQua";
        }
        if (!string.IsNullOrEmpty(trichYeuKetQua))
        {
            trichYeuKetQua += ", TrichYeuKetQua = @TrichYeuKetQua";
        }
        string sqlUpdateHoSo = $"UPDATE {SchemaNames.Business}.{TableNames.HoSos} SET TrangThaiHoSoId = @TrangThaiHoSoId, TrangThaiDongBoDVC = '0' {extraUpdateCols} WHERE MaHoSo = @MaHoSo";
        int updateCount = await _dapperRepository.ExcuteAsync(sqlUpdateHoSo, new
        {
            MaHoSo = maHoSo,
            TrangThaiHoSoId = trangThai,
            NgayKetThucXuLy = ngayKetThucXuLy,
            DinhKemKetQua = dinhKemKetQua,
            NguoiDaXuLy = nguoiDaXuLy,
            NgayYeuCauBoSung = ngayYeuCauBoSung,
            LoaiDuLieuKetNoi = loaiDuLieuKetNoi,
            LoaiVanBanKetQua = loaiVanBanKetQua,
            CoQuanBanHanhKetQua = coQuanBanHanhKetQua,
            NguoiKyKetQua = nguoiKyKetQua,
            SoKyHieuKetQua = soKyHieuKetQua,
            NgayBanHanhKetQua = ngayBanHanhKetQua,
            TrichYeuKetQua = trichYeuKetQua
        });
    }

    public async Task<int> DaChuyenBTP(string maHoSo)
    {
        string sql = $"UPDATE {SchemaNames.Business}.{TableNames.HoSoLienThongs} SET {nameof(HoSoLienThong.DaChuyenThanhCong)} = 1, {nameof(HoSoLienThong.Data)} = '' where MaHoSo = @MaHoSo";
        int res = await _dapperRepository.ExcuteAsync(sql, new
        {
            MaHoSo = maHoSo
        });
        return res;
    }

    public async Task<int> AddTrangThaiDVCLT(string maHoSo, string trangThai, string trangThaiDongBoDVC, string loaiDuLieuKetNoi, string duLieuBTP = "")
    {
        if (loaiDuLieuKetNoi == "LTKT" || loaiDuLieuKetNoi == "LTKS")
        {
            var trangThaiHoSoLienThong = new TrangThaiHoSoLienThong(maHoSo, trangThai, trangThaiDongBoDVC, duLieuBTP);
            trangThaiHoSoLienThong.CreatedBy = _currentUser.GetUserId();
            return await _dapperRepository.InsertEntityAsync<TrangThaiHoSoLienThong>(trangThaiHoSoLienThong, SchemaNames.Business + "." + TableNames.TrangThaiHoSoLienThongs);
        }
        return 0;
    }
    private async Task<int> UpdateTrangThaiDVCLT(string Id, string trangThai)
    {
        return await _dapperRepository.ExcuteAsync($"Update {SchemaNames.Business}.{TableNames.TrangThaiHoSoLienThongs} SET TrangThaiDongBoDVC = @TrangThaiDongBoDVC WHERE Id = @Id", new
        {
            TrangThaiDongBoDVC = trangThai,
            Id = Id
        });
    }

    private class CapNhatTrangThaiDVCLT_HoSoSelect : TrangThaiHoSoLienThong
    {
        public string MaTTHC { get; set; }
        public string NgayTiepNhan { get; set; }
        public string NgayHenTra { get; set; }
        public string LoaiDuLieuKetNoi { get; set; }
        public string DinhKemKetQua { get; set; }
        public string NgayNopHoSo { get; set; }
        public string LyDoBoSung { get; set; }
        public string LyDoTuChoi { get; set; }
        public string? FullName { get; set; }
        public string MaHoSoKhac { get; set; }
        public string DataHoSoLienThong { get; set; }
        public string MaKetQuaChinh { get; set; }
    }
    [DisableConcurrentExecution(timeoutInSeconds: 15 * 60)]
    public async Task CapNhatTrangThaiDVCLT()
    {
        if (!_settings.EnableUpdateStatus)
        {
            return;
        }
        var tokenRequest = new KhaiSinhKhaiTu_GetTokenRequest()
        {
            password = _settings.UrlDVCLT.Password,
            userName = _settings.UrlDVCLT.User,
        };
        var resToken = await RequestHandler<KhaiSinhKhaiTu_GetTokenRequest, KhaiSinhKhaiTu_GetTokenResponse>(tokenRequest, _settings.UrlDVCLT.Base, "", HttpMethod.Post, _settings.UrlDVCLT.GetToken);
        if (resToken == null)
        {
            _logger.LogError("Sai thông tin lấy token");
            return;
        }
        _token = resToken.token;


        string sqlDanhSachTrangThaiHoSoLienThong =
            $@"SELECT TOP {_settings.UrlDVCLT.SoLuongGuiTrangThaiDVCLT ?? "20"} tthslt.*, u.FullName, hs.DinhKemKetQua, hs.MaHoSoKhac, hs.MaTTHC, hs.NgayTiepNhan, hs.LoaiDuLieuKetNoi, hs.NgayNopHoSo, hs.LyDoBoSung, hs.LyDoTuChoi, hslt.Data as DataHoSoLienThong, tt.MaKetQuaChinh FROM {SchemaNames.Business}.{TableNames.TrangThaiHoSoLienThongs} tthslt
            INNER JOIN {SchemaNames.Business}.{TableNames.HoSos} hs ON tthslt.MaHoSo = hs.MaHoSo
            INNER JOIN {SchemaNames.Business}.{TableNames.HoSoLienThongs} hslt ON tthslt.MaHoSo = hslt.MaHoSo
            INNER JOIN {SchemaNames.Catalog}.{TableNames.ThuTucs} tt ON tt.MaTTHC = hs.MaTTHC
            LEFT JOIN {SchemaNames.Identity}.{TableNames.Users} u ON tthslt.CreatedBy = u.Id
            WHERE tthslt.TrangThaiDongBoDVC = @TrangThaiDongBoDVC
            ORDER BY tthslt.CreatedOn";
        
        var timeStartHoSo = DateTime.Now;
        var danhSach = await _dapperRepository.QueryAsync<CapNhatTrangThaiDVCLT_HoSoSelect>(sqlDanhSachTrangThaiHoSoLienThong, new
        {
            TrangThaiDongBoDVC = TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo
        });
        var timeEndHoSo = DateTime.Now;
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year));

        for (int i = 0; i < danhSach.Count; i++)
        {
            var data = danhSach[i];
            string ngayBatDau = string.Empty;
            string ngayKetThucTheoQuyDinh = string.Empty;
            string ngayNopHoSo = string.Empty;
            var hoSoLienThong = JsonConvert.DeserializeObject<KhaiSinhKhaiTu_DetailHoSo>(data.DataHoSoLienThong);
            DateTime createdTrangThaiOn = (data.CreatedOn != null && data.CreatedOn != DateTime.MinValue) ? (DateTime)data.CreatedOn : DateTime.Now;
            if (!string.IsNullOrEmpty(data.NgayTiepNhan))
            {
                try
                {
                    ngayBatDau = DateTime.Parse(data.NgayTiepNhan).ToString(formatDateString);
                }
                catch (Exception ex)
                {
                }
            }
            if (!string.IsNullOrEmpty(data.NgayHenTra))
            {
                try
                {
                    ngayKetThucTheoQuyDinh = DateTime.Parse(data.NgayHenTra).ToString(formatDateString);
                }
                catch (Exception ex)
                {
                }
            }
            if (!string.IsNullOrEmpty(data.NgayNopHoSo))
            {
                try
                {
                    ngayNopHoSo = DateTime.Parse(data.NgayNopHoSo).ToString(formatDateString);
                }
                catch (Exception ex)
                {
                }
            }
            
            if (data.LoaiDuLieuKetNoi == "LTKS")
            {
                try
                {
                    var duLieuBTP = !string.IsNullOrEmpty(data.DuLieuBTP) ? JsonConvert.DeserializeObject<KhaiSinhKhaiTu_HoTich_KhaiSinh_BTPScanResponse>(data.DuLieuBTP) : null;
                    KhaiSinhKhaiTu_DVCLT_CapNhatTrangThaiRequest reqBody = new KhaiSinhKhaiTu_DVCLT_CapNhatTrangThaiRequest()
                    {
                        maTTHC = hoSoLienThong.maTTHC,
                        coQuanXuLy = 5,
                        maHoSo = data.MaHoSo, // mã từ trangthaihosolienthong.mahoso là mã ở 1 cửa lúc thêm mới
                        soHoSoLT = data.MaHoSoKhac,
                        thoiGianThucHien = createdTrangThaiOn.ToString(formatDateString),
                    };
                    if (data.TrangThai == "1")
                    {
                        reqBody.trangThai = 1;
                        reqBody.ngayBatDau = reqBody.thoiGianThucHien;
                        reqBody.ngayKetThucTheoQuyDinh = TinhNgayHenTra(createdTrangThaiOn, ngayNghis).ToString(formatDateString);
                    }
                    else if (data.TrangThai == "2")
                    {
                        string ghiChu = string.Empty;
                        string nguoiXuLy = string.Empty;
                        if (!string.IsNullOrEmpty(duLieuBTP?.ghiChu))
                        {
                            ghiChu = duLieuBTP?.ghiChu;
                        }
                        if (!string.IsNullOrEmpty(data.LyDoBoSung))
                        {
                            ghiChu = data.LyDoBoSung;
                        }
                        if (!string.IsNullOrEmpty(duLieuBTP?.nguoiXuLy))
                        {
                            nguoiXuLy = duLieuBTP?.nguoiXuLy;
                        }
                        if (!string.IsNullOrEmpty(data?.FullName))
                        {
                            nguoiXuLy = data?.FullName;
                        }
                        reqBody.trangThai = 2;
                        reqBody.ngayBatDau = reqBody.thoiGianThucHien;
                        reqBody.noiDungXuLy = !string.IsNullOrEmpty(duLieuBTP?.noiDungXuLy) ? duLieuBTP.noiDungXuLy : (data?.LyDoBoSung ?? "");
                        reqBody.ghiChu = ghiChu;
                        reqBody.nguoiXuLy = nguoiXuLy;
                        reqBody.hanBoSungHoSo = duLieuBTP?.hanBoSungHoSo ?? TinhNgayHenTra(createdTrangThaiOn, ngayNghis, 7).ToString(formatDateString);
                    }
                    else if (data.TrangThai == "3")
                    {
                        reqBody.trangThai = 3;
                        reqBody.noiDungXuLy = "MCĐT Tiếp nhận hồ sơ";
                        reqBody.nguoiXuLy = data?.FullName ?? ""; ;
                        reqBody.ngayBatDau = ngayBatDau;
                        reqBody.ngayKetThucTheoQuyDinh = ngayKetThucTheoQuyDinh;
                    }
                    else if (data.TrangThai == "7")
                    {
                        reqBody.trangThai = 7;
                        reqBody.noiDungXuLy = "Gửi hồ sơ qua hệ thống BTP";
                        reqBody.nguoiXuLy = data?.FullName ?? "";
                        reqBody.ngayKetThucTheoQuyDinh = createdTrangThaiOn.AddDays(1).ToString(formatDateString);
                    }
                    else if (data.TrangThai == "4")
                    {
                        reqBody.trangThai = 4;
                        var base64PhieuBTP = await _minioService.GetFileByKeyAsBase64Async(null, data.DinhKemKetQua);
                        var ketQuaXuLy = new LienThong_KhaiSinh_KetQuaXuLy()
                        {
                            soDinhDanh = duLieuBTP.ketQuaXuLy.soDinhDanh,
                            ngayDangKy = duLieuBTP.ketQuaXuLy.ngayDangKy,
                            ndkksMaTinh = duLieuBTP.ketQuaXuLy.ndkksMaTinh,
                            ndkksMaHuyen = duLieuBTP.ketQuaXuLy.ndkksMaHuyen,
                            ndkksMaXa = duLieuBTP.ketQuaXuLy.ndkksMaXa,
                            nksHoTen = duLieuBTP.ketQuaXuLy.nksHoTen,
                            nksGioiTinh = duLieuBTP.ketQuaXuLy.nksGioiTinh,
                            nksNgaySinh = duLieuBTP.ketQuaXuLy.nksNgaySinh,
                            nksNgaySinhBangChu = duLieuBTP.ketQuaXuLy.nksNgaySinhBangChu,
                            nksDanToc = duLieuBTP.ketQuaXuLy.nksDanToc,
                            nksQueQuan = duLieuBTP.ketQuaXuLy.nksQueQuan?.dcChiTiet ?? "",
                            nksQuocTich = duLieuBTP.ketQuaXuLy.nksQuocTich,
                            nksNoiSinhMaTinh = duLieuBTP.ketQuaXuLy?.nksNoiSinh?.maTinh ?? "",
                            nksNoiSinh = duLieuBTP.ketQuaXuLy.nksNoiSinh?.dcChiTiet ?? "",
                            meHoTen = duLieuBTP.ketQuaXuLy.meHoTen,
                            meNgaySinh = duLieuBTP.ketQuaXuLy.meNgaySinh,
                            meDanToc = duLieuBTP.ketQuaXuLy.meDanToc,
                            meQuocTich = duLieuBTP.ketQuaXuLy.meQuocTich,
                            meLoaiCuTru = duLieuBTP.ketQuaXuLy.meLoaiCuTru,
                            meNoiCuTru = duLieuBTP.ketQuaXuLy.meNoiCuTru?.dcChiTiet ?? "",
                            meSoGiayTo = duLieuBTP.ketQuaXuLy.meSoGiayTo,
                            chaHoTen = duLieuBTP.ketQuaXuLy.chaHoTen,
                            chaNgaySinh = duLieuBTP.ketQuaXuLy.chaNgaySinh,
                            chaDanToc = duLieuBTP.ketQuaXuLy.chaDanToc,
                            chaQuocTich = duLieuBTP.ketQuaXuLy.chaQuocTich,
                            chaLoaiCuTru = duLieuBTP.ketQuaXuLy.chaLoaiCuTru,
                            chaNoiCuTru = duLieuBTP.ketQuaXuLy.chaNoiCuTru?.dcChiTiet ?? "",
                            chaSoGiayTo = duLieuBTP.ketQuaXuLy.chaSoGiayTo,
                            nycHoTen = duLieuBTP.ketQuaXuLy.nycHoTen,
                            nycQuanHe = duLieuBTP.ketQuaXuLy.nycQuanHe,
                            nycSoGiayTo = duLieuBTP.ketQuaXuLy.nycSoGiayTo,
                            giayKhaiSinh = base64PhieuBTP.Base64,
                            soDangKy = duLieuBTP.ketQuaXuLy.soDangKy,
                            quyenSo = duLieuBTP.ketQuaXuLy.quyenSo,
                            trangSo = duLieuBTP.ketQuaXuLy.trangSo,
                            maGiayToKetQua = !string.IsNullOrEmpty(data.MaKetQuaChinh) ? data.MaKetQuaChinh : "KQ.G15.000031"
                        };
                        if (string.IsNullOrEmpty(ketQuaXuLy.chaNoiCuTru))
                        {
                            ketQuaXuLy.chaNoiCuTru = "Không có thông tin";
                        }
                        if (ketQuaXuLy.chaLoaiCuTru == 0)
                        {
                            ketQuaXuLy.chaLoaiCuTru = 1;
                        }
                        if (string.IsNullOrEmpty(ketQuaXuLy.meNoiCuTru))
                        {
                            ketQuaXuLy.meNoiCuTru = "Không có thông tin";
                        }
                        if (ketQuaXuLy.meLoaiCuTru == 0 || ketQuaXuLy.meLoaiCuTru == null)
                        {
                            ketQuaXuLy.meLoaiCuTru = 1;
                        }
                        reqBody.ketQuaXuLy = JsonConvert.SerializeObject(ketQuaXuLy);
                        reqBody.ngayKetThucTheoQuyDinh = createdTrangThaiOn.AddDays(1).ToString(formatDateString);
                    }
                    else if (data.TrangThai == "5")
                    {
                        reqBody.trangThai = 5;
                        reqBody.noiDungXuLy = "Trả kết quả";
                        reqBody.nguoiXuLy = data?.FullName ?? "";
                        reqBody.ngayKetThucTheoQuyDinh = createdTrangThaiOn.AddDays(1).ToString(formatDateString);
                    }
                    else if (data.TrangThai == "6")
                    {
                        string ghiChu = string.Empty;
                        string nguoiXuLy = string.Empty;
                        if (!string.IsNullOrEmpty(duLieuBTP?.ghiChu))
                        {
                            ghiChu = duLieuBTP?.ghiChu;
                        }
                        if (!string.IsNullOrEmpty(data.LyDoTuChoi))
                        {
                            ghiChu = data.LyDoTuChoi;
                        }
                        if (!string.IsNullOrEmpty(duLieuBTP?.nguoiXuLy))
                        {
                            nguoiXuLy = duLieuBTP?.nguoiXuLy;
                        }
                        if (!string.IsNullOrEmpty(data?.FullName))
                        {
                            nguoiXuLy = data?.FullName;
                        }
                        reqBody.trangThai = 6;
                        reqBody.ngayBatDau = reqBody.thoiGianThucHien ?? "";
                        reqBody.noiDungXuLy = !string.IsNullOrEmpty(duLieuBTP?.noiDungXuLy) ? duLieuBTP.noiDungXuLy : "";
                        reqBody.nguoiXuLy = nguoiXuLy;
                        reqBody.ghiChu = ghiChu;
                        reqBody.hanBoSungHoSo = duLieuBTP?.hanBoSungHoSo;
                        reqBody.phongBanXuLy = duLieuBTP?.phongBanXuLy ?? "";
                        reqBody.chucDanh = duLieuBTP?.chucDanh ?? "";
                    }
                    var timeStartApi = DateTime.Now;
                    var res = await RequestHandlerReturnPlainText<KhaiSinhKhaiTu_DVCLT_CapNhatTrangThaiRequest>(reqBody, _settings.UrlDVCLT.Base, _token, HttpMethod.Post, _settings.UrlDVCLT.SendStatusUrl);

                    if (res.ToLower().Contains("thành công") || res.ToLower().Contains("bị từ chối. không thể cập nhật trạng thái") || res.ToLower().Contains("đã tồn tại trong một cửa điện tử") || res.ToLower().Contains("không tồn tại") || res.ToLower().Contains("đã trả kết quả, không được cập nhật trạng thái") || res.ToLower().Contains("đã có kết quả xử lý. Không thể cập nhật trạng thái") || res.ToLower().Contains("đã hoàn thành đăng ký, không được cập nhật trạng thái"))
                    {
                        await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ThanhCong);
                        if(reqBody.trangThai == 5 || reqBody.trangThai == 6)
                        {
                            await DaChuyenBTP(reqBody.maHoSo);
                        }
                    }
                    else if (res.ToLower().Contains("chưa cập nhật trạng thái") || res.ToLower().Contains("chưa được gửi không thể cập nhật trạng thái") || res.ToLower().Contains("có lỗi trong quá trình thêm mới") || res.ToLower().Contains("client received soap fault") || res.ToLower().Contains("server error"))
                    {
                        if (reqBody.ketQuaXuLy != null)
                        {
                            if (!string.IsNullOrEmpty(reqBody.ketQuaXuLy))
                            {
                                var ketQuaXuLyParse = JsonConvert.DeserializeObject<LienThong_KhaiTu_KetQuaXuLy>(reqBody.ketQuaXuLy);
                                ketQuaXuLyParse.giayKhaiTu = string.Empty;
                                reqBody.ketQuaXuLy = JsonConvert.SerializeObject(ketQuaXuLyParse);
                            }
                        }
                        _logger.LogError($"{nameof(CapNhatTrangThaiDVCLT)}_LTKS_req:{JsonConvert.SerializeObject(reqBody)}_res:{JsonConvert.SerializeObject(res)}");
                        await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo);
                    }
                    else if(res.ToLower().Contains("logic xử lý không hợp lệ"))
                    {
                        if (reqBody.ketQuaXuLy != null)
                        {
                            if (!string.IsNullOrEmpty(reqBody.ketQuaXuLy))
                            {
                                var ketQuaXuLyParse = JsonConvert.DeserializeObject<LienThong_KhaiTu_KetQuaXuLy>(reqBody.ketQuaXuLy);
                                ketQuaXuLyParse.giayKhaiTu = string.Empty;
                                reqBody.ketQuaXuLy = JsonConvert.SerializeObject(ketQuaXuLyParse);
                            }
                        }
                        _logger.LogError($"{nameof(CapNhatTrangThaiDVCLT)}_LTKS_req:{JsonConvert.SerializeObject(reqBody)}_res:{JsonConvert.SerializeObject(res)}");
                        await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ThatBai);
                    }
                    else
                    {
                        if (reqBody.ketQuaXuLy != null)
                        {
                            if (!string.IsNullOrEmpty(reqBody.ketQuaXuLy))
                            {
                                var ketQuaXuLyParse = JsonConvert.DeserializeObject<LienThong_KhaiTu_KetQuaXuLy>(reqBody.ketQuaXuLy);
                                ketQuaXuLyParse.giayKhaiTu = string.Empty;
                                reqBody.ketQuaXuLy = JsonConvert.SerializeObject(ketQuaXuLyParse);
                            }
                        }
                        var timeEndApi = DateTime.Now;
                        _logger.LogError($"{nameof(CapNhatTrangThaiDVCLT)}_{data.MaHoSo}_QueryTime:{timeEndHoSo - timeStartHoSo}_ApiTime:{timeEndApi - timeStartApi}_URL:{_settings.UrlDVCLT.Base}{_settings.UrlDVCLT.SendStatusUrl}_req:{JsonConvert.SerializeObject(reqBody)}_res:{JsonConvert.SerializeObject(res)}");
                        await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo);
                    }
                }
                catch (Exception ex )
                {
                    _logger.LogError($"CapNhatTranThaiDVCLT_LTKS_{data.MaHoSo}_{ex.ToString()}");
                    await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo);
                }
            } else if(data.LoaiDuLieuKetNoi == "LTKT")
            {
                try
                {
                    var duLieuBTP = !string.IsNullOrEmpty(data.DuLieuBTP) ? JsonConvert.DeserializeObject<KhaiSinhKhaiTu_HoTich_KhaiTu_BTPScanResponse>(data.DuLieuBTP) : null;
                    KhaiSinhKhaiTu_DVCLT_CapNhatTrangThaiRequest reqBody = new KhaiSinhKhaiTu_DVCLT_CapNhatTrangThaiRequest()
                    {
                        maTTHC = hoSoLienThong.maTTHC,
                        coQuanXuLy = 5,
                        maHoSo = data.MaHoSo, // mã từ trangthaihosolienthong.mahoso là mã ở 1 cửa lúc thêm mới
                        soHoSoLT = data.MaHoSoKhac,
                        thoiGianThucHien = createdTrangThaiOn.ToString(formatDateString),
                    };
                    if (data.TrangThai == "1")
                    {
                        reqBody.trangThai = 1;
                        reqBody.ngayBatDau = reqBody.thoiGianThucHien;
                        reqBody.ngayKetThucTheoQuyDinh = TinhNgayHenTra(createdTrangThaiOn, ngayNghis).ToString(formatDateString);
                    }
                    else if (data.TrangThai == "2")
                    {
                        string ghiChu = string.Empty;
                        string nguoiXuLy = string.Empty;
                        if (!string.IsNullOrEmpty(duLieuBTP?.ghiChu))
                        {
                            ghiChu = duLieuBTP?.ghiChu;
                        }
                        if (!string.IsNullOrEmpty(data.LyDoBoSung))
                        {
                            ghiChu = data.LyDoBoSung;
                        }
                        if (!string.IsNullOrEmpty(duLieuBTP?.nguoiXuLy))
                        {
                            nguoiXuLy = duLieuBTP?.nguoiXuLy;
                        }
                        if (!string.IsNullOrEmpty(data?.FullName))
                        {
                            nguoiXuLy = data?.FullName;
                        }
                        reqBody.trangThai = 2;
                        reqBody.ngayBatDau = reqBody.thoiGianThucHien;
                        reqBody.noiDungXuLy = !string.IsNullOrEmpty(duLieuBTP?.noiDungXuLy) ? duLieuBTP.noiDungXuLy : (data?.LyDoBoSung ?? "");
                        reqBody.ghiChu = ghiChu;
                        reqBody.nguoiXuLy = nguoiXuLy;
                        reqBody.hanBoSungHoSo = duLieuBTP?.hanBoSungHoSo ?? TinhNgayHenTra(createdTrangThaiOn, ngayNghis, 7).ToString(formatDateString);
                    }
                    else if (data.TrangThai == "3")
                    {
                        reqBody.trangThai = 3;
                        reqBody.noiDungXuLy = "MCĐT Tiếp nhận hồ sơ";
                        reqBody.nguoiXuLy = data?.FullName ?? ""; ;
                        reqBody.ngayBatDau = ngayBatDau;
                        reqBody.ngayKetThucTheoQuyDinh = ngayKetThucTheoQuyDinh;
                    }
                    else if (data.TrangThai == "7")
                    {
                        reqBody.trangThai = 7;
                        reqBody.noiDungXuLy = "Gửi hồ sơ qua hệ thống BTP";
                        reqBody.nguoiXuLy = data?.FullName ?? "";
                        reqBody.ngayKetThucTheoQuyDinh = createdTrangThaiOn.AddDays(1).ToString(formatDateString);
                    }
                    else if (data.TrangThai == "4")
                    {
                        reqBody.trangThai = 4;
                        var base64PhieuBTP = await _minioService.GetFileByKeyAsBase64Async(null, data.DinhKemKetQua);
                        var ketQuaXuLy = new LienThong_KhaiTu_KetQuaXuLy()
                        {
                            nktHoTen = duLieuBTP.ketQuaXuLy.nktHoTen,
                            nktGioiTinh = duLieuBTP.ketQuaXuLy.nktGioiTinh,
                            nktNgaySinh = duLieuBTP.ketQuaXuLy.nktNgaySinh,
                            nktDanToc = duLieuBTP.ketQuaXuLy.nktDanToc,
                            nktQuocTich = duLieuBTP.ketQuaXuLy.nktQuocTich,
                            nktLoaiCuTru = duLieuBTP.ketQuaXuLy.nktLoaiCuTru,
                            nktSoGiayTo = duLieuBTP.ketQuaXuLy.nktSoGiayTo,
                            nktNgayChet = duLieuBTP.ketQuaXuLy.nktNgayChet,
                            nktNguyenNhanChet = duLieuBTP.ketQuaXuLy.nktNguyenNhanChet,
                            giayBaoTuLoai = duLieuBTP.ketQuaXuLy.giayBaoTuLoai,
                            giayBaoTuSo = duLieuBTP.ketQuaXuLy.giayBaoTuSo,
                            nycHoTen = duLieuBTP.ketQuaXuLy.nycHoTen,
                            nycQuanHe = duLieuBTP.ketQuaXuLy.nycQuanHe,
                            nycSoGiayTo = duLieuBTP.ketQuaXuLy.nycSoGiayTo,
                            soDangKy = duLieuBTP.ketQuaXuLy.soDangKy,
                            quyenSo = duLieuBTP.ketQuaXuLy.quyenSo,
                            trangSo = duLieuBTP.ketQuaXuLy.trangSo,
                            giayKhaiTu = base64PhieuBTP.Base64,
                            nktNoiCuTru = duLieuBTP.ketQuaXuLy.nktNoiCuTru.dcChiTiet,
                            nktNoiChet = duLieuBTP.ketQuaXuLy.nktNoiChet.dcChiTiet,
                            maGiayToKetQua = !string.IsNullOrEmpty(data.MaKetQuaChinh) ? data.MaKetQuaChinh : "KQ.G15.000034"
                        };
                        if (string.IsNullOrEmpty(ketQuaXuLy.giayKhaiTu))
                        {
                            ketQuaXuLy.giayKhaiTu = "Không có thông tin";
                        }
                        reqBody.ketQuaXuLy = JsonConvert.SerializeObject(ketQuaXuLy);
                        reqBody.ngayKetThucTheoQuyDinh = createdTrangThaiOn.AddDays(1).ToString(formatDateString);
                    }
                    else if (data.TrangThai == "5")
                    {
                        reqBody.trangThai = 5;
                        reqBody.noiDungXuLy = "Trả kết quả";
                        reqBody.nguoiXuLy = data?.FullName ?? "";
                        reqBody.ngayKetThucTheoQuyDinh = createdTrangThaiOn.AddDays(1).ToString(formatDateString);
                    }
                    else if (data.TrangThai == "6")
                    {
                        string ghiChu = string.Empty;
                        string nguoiXuLy = string.Empty;
                        if (!string.IsNullOrEmpty(duLieuBTP?.ghiChu))
                        {
                            ghiChu = duLieuBTP?.ghiChu;
                        }
                        if (!string.IsNullOrEmpty(data.LyDoTuChoi))
                        {
                            ghiChu = data.LyDoTuChoi;
                        }
                        if (!string.IsNullOrEmpty(duLieuBTP?.nguoiXuLy))
                        {
                            nguoiXuLy = duLieuBTP?.nguoiXuLy;
                        }
                        if (!string.IsNullOrEmpty(data?.FullName))
                        {
                            nguoiXuLy = data?.FullName;
                        }
                        reqBody.trangThai = 6;
                        reqBody.ngayBatDau = reqBody.thoiGianThucHien ?? "";
                        reqBody.noiDungXuLy = !string.IsNullOrEmpty(duLieuBTP?.noiDungXuLy) ? duLieuBTP.noiDungXuLy : "";
                        reqBody.nguoiXuLy = nguoiXuLy;
                        reqBody.ghiChu = ghiChu;
                        reqBody.hanBoSungHoSo = duLieuBTP?.hanBoSungHoSo;
                        reqBody.phongBanXuLy = duLieuBTP?.phongBanXuLy ?? "";
                        reqBody.chucDanh = duLieuBTP?.chucDanh ?? "";
                    }

                    var timeStartApi = DateTime.Now;
                    var res = await RequestHandlerReturnPlainText<KhaiSinhKhaiTu_DVCLT_CapNhatTrangThaiRequest>(reqBody, _settings.UrlDVCLT.Base, _token, HttpMethod.Post, _settings.UrlDVCLT.SendStatusUrl);
                    if (res.ToLower().Contains("thành công") || res.ToLower().Contains("bị từ chối. không thể cập nhật trạng thái") || res.ToLower().Contains("đã tồn tại trong một cửa điện tử") || res.ToLower().Contains("không tồn tại")|| res.ToLower().Contains("đã trả kết quả, không được cập nhật trạng thái") || res.ToLower().Contains("đã có kết quả xử lý. Không thể cập nhật trạng thái") || res.ToLower().Contains("đã hoàn thành đăng ký, không được cập nhật trạng thái"))
                    {
                        await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ThanhCong);
                        if (reqBody.trangThai == 5 || reqBody.trangThai == 6)
                        {
                            await DaChuyenBTP(reqBody.maHoSo);
                        }
                    }
                    else if (res.ToLower().Contains("chưa cập nhật trạng thái") || res.ToLower().Contains("chưa được gửi không thể cập nhật trạng thái") || res.ToLower().Contains("có lỗi trong quá trình thêm mới") || res.ToLower().Contains("client received soap fault") || res.ToLower().Contains("server error"))
                    {
                        if (reqBody.ketQuaXuLy != null)
                        {
                            if (!string.IsNullOrEmpty(reqBody.ketQuaXuLy))
                            {
                                var ketQuaXuLyParse = JsonConvert.DeserializeObject<LienThong_KhaiTu_KetQuaXuLy>(reqBody.ketQuaXuLy);
                                ketQuaXuLyParse.giayKhaiTu = string.Empty;
                                reqBody.ketQuaXuLy = JsonConvert.SerializeObject(ketQuaXuLyParse);
                            }
                        }
                        _logger.LogError($"{nameof(CapNhatTrangThaiDVCLT)}_LTKT_req:{JsonConvert.SerializeObject(reqBody)}_res:{JsonConvert.SerializeObject(res)}");
                        await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo);
                    }
                    else if (res.ToLower().Contains("logic xử lý không hợp lệ"))
                    {
                        if (reqBody.ketQuaXuLy != null)
                        {
                            if (!string.IsNullOrEmpty(reqBody.ketQuaXuLy))
                            {
                                var ketQuaXuLyParse = JsonConvert.DeserializeObject<LienThong_KhaiTu_KetQuaXuLy>(reqBody.ketQuaXuLy);
                                ketQuaXuLyParse.giayKhaiTu = string.Empty;
                                reqBody.ketQuaXuLy = JsonConvert.SerializeObject(ketQuaXuLyParse);
                            }
                        }
                        _logger.LogError($"{nameof(CapNhatTrangThaiDVCLT)}_LTKS_req:{JsonConvert.SerializeObject(reqBody)}_res:{JsonConvert.SerializeObject(res)}");
                        await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ThatBai);
                    }
                    else
                    {
                        if (reqBody.ketQuaXuLy != null)
                        {
                            if (!string.IsNullOrEmpty(reqBody.ketQuaXuLy))
                            {
                                var ketQuaXuLyParse = JsonConvert.DeserializeObject<LienThong_KhaiTu_KetQuaXuLy>(reqBody.ketQuaXuLy);
                                ketQuaXuLyParse.giayKhaiTu = string.Empty;
                                reqBody.ketQuaXuLy = JsonConvert.SerializeObject(ketQuaXuLyParse);
                            }
                        }
                        var timeEndApi = DateTime.Now;
                        _logger.LogError($"{nameof(CapNhatTrangThaiDVCLT)}_{data.MaHoSo}_QueryTime:{timeEndHoSo - timeStartHoSo}_ApiTime:{timeEndApi - timeStartApi}_URL:{_settings.UrlDVCLT.Base}{_settings.UrlDVCLT.SendStatusUrl}_req:{JsonConvert.SerializeObject(reqBody)}_res:{JsonConvert.SerializeObject(res)}");
                        await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError($"CapNhatTranThaiDVCLT_LTKT_{data.MaHoSo}_{ex.ToString()}");
                    await UpdateTrangThaiDVCLT(data.Id.ToString(), TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo);
                }
            }
        }
       
    }
    private class FakeTuChoiBTP_Select : HoSo
    {
        public string Data { get; set; }
    }
    public async Task<Result<string>> FakeTuChoiBTP(string maHoSo)
    {
        if(string.IsNullOrEmpty(maHoSo))
        {
            return Result<string>.Fail("Vui lòng cung cấp mã hồ sơ");
        }
        string sqlCheckHoSo = $@"SELECT hs.LoaiDuLieuKetNoi, hs.MaHoSo, hs.MaHoSoKhac, hslt.Data from {SchemaNames.Business}.{TableNames.HoSos} hs
                                 INNER JOIN {SchemaNames.Business}.{TableNames.HoSoLienThongs} hslt ON hs.MaHoSo = hslt.MaHoSo
                                WHERE hs.MaHoSo = @MaHoSo";
        FakeTuChoiBTP_Select? hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<FakeTuChoiBTP_Select>(sqlCheckHoSo, new
        {
            MaHoSo = maHoSo
        });
        if(hoSo == null)
        {
            return Result<string>.Fail("Hồ sơ không phải Dịch vụ công liên thông! Vui lòng không sử dụng chức năng này!");
        }
        if(hoSo.LoaiDuLieuKetNoi != "LTKS" && hoSo.LoaiDuLieuKetNoi != "LTKT")
        {
            return Result<string>.Fail("Không phải hồ sơ Dịch vụ công liên thông! Vui lòng không sử dụng chức năng này!");
        }
        var hoSoLienThong = JsonConvert.DeserializeObject<KhaiSinhKhaiTu_DetailHoSo>(hoSo.Data);

        DateTime now = DateTime.Now;
        List<QuaTrinhXuLyHoSo> quaTrinhXuLyHoSos = new List<QuaTrinhXuLyHoSo>();
        quaTrinhXuLyHoSos.Add(new QuaTrinhXuLyHoSo(maHoSo, null, null, null, null, _currentUser.GetUserId().ToString(), _currentUser.GetUserFullName(), "", "", now, trangThai: "4", noiDung: "", thaoTac: "Liên thông BTP"));
        quaTrinhXuLyHoSos.Add(new QuaTrinhXuLyHoSo(maHoSo, null, null, null, null, "", "Hệ thống BTP", "", "", now, trangThai: "6", noiDung: "Dữ liệu không hợp lệ", thaoTac: "BTP từ chối hồ sơ"));
        await _dapperRepository.InsertMultipleEntityAsync<QuaTrinhXuLyHoSo>(quaTrinhXuLyHoSos, SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos);
        KhaiSinhKhaiTu_HoTich_KhaiTu_BTPScanResponse dataBTPJson = new KhaiSinhKhaiTu_HoTich_KhaiTu_BTPScanResponse()
        {
            maDonVi = hoSoLienThong.maDonVi.ToString(),
            chucDanh = "Công chức tư pháp-hộ tịch",
            errors = null,
            ghiChu = "Hồ sơ có trường thông tin không hợp lệ",
            hanBoSungHoSo = null,
            ketQuaXuLy = null,
            maHoSoLT = hoSo.MaHoSoKhac,
            maHoSoMCDT = hoSo.MaHoSo,
            maTinh = _settings.MaTinh,
            module = hoSo.LoaiDuLieuKetNoi,
            nguoiXuLy = "Cán bộ tư pháp",
            noiDungXuLy = null,
            phongBanXuLy = "Bộ phận tư pháp",
            thoiGianThucHien = now.ToString(formatDateString),
            trangThai = "6"
        };
        await AddTrangThaiDVCLT(maHoSo, "7", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, hoSo.LoaiDuLieuKetNoi, string.Empty);
        await AddTrangThaiDVCLT(maHoSo, "6", TrangThaiHoSoLienThongConstant.TrangThaiDongBo_ChuaDongBo, hoSo.LoaiDuLieuKetNoi, JsonConvert.SerializeObject(dataBTPJson));
        await UpdateTrangThaiHoSo(maHoSo, "3");
        return Result<string>.Success("Thao tác thành công");
    }

    public DateTime TinhNgayHenTra(DateTime thoiGianTao, List<NgayNghi> ngayNghiList, double? boQuaSoNgayLamViecTiep = null)
    {
        // Thời gian hẹn trả là 17h
        TimeSpan gioHenTra = new TimeSpan(17, 0, 0);

        // Ngày hẹn trả ban đầu là ngày tạo
        DateTime ngayHenTra;

        // Kiểm tra nếu thời gian tạo < 15h thì hẹn trả vào 17h cùng ngày, ngược lại hẹn trả vào 17h ngày hôm sau
        if (thoiGianTao.TimeOfDay < new TimeSpan(15, 0, 0))
        {
            ngayHenTra = thoiGianTao.Date + gioHenTra;
        }
        else
        {
            ngayHenTra = thoiGianTao.Date.AddDays(1) + gioHenTra;
        }

        // Nếu boQuaSoNgayLamViecTiep không phải là null và lớn hơn 0, xử lý bỏ qua ngày làm việc
        if (boQuaSoNgayLamViecTiep.HasValue && boQuaSoNgayLamViecTiep.Value > 0)
        {
            double soNgayConLai = boQuaSoNgayLamViecTiep.Value;

            while (soNgayConLai > 0)
            {
                if (ngayHenTra.DayOfWeek == DayOfWeek.Saturday || ngayHenTra.DayOfWeek == DayOfWeek.Sunday || ngayNghiList.Any(n => n.Date.Date == ngayHenTra.Date))
                {
                    ngayHenTra = ngayHenTra.AddDays(1);
                }
                else
                {
                    ngayHenTra = ngayHenTra.AddDays(1);
                    soNgayConLai--;
                }
            }

            // Sau khi bỏ qua số ngày làm việc, kiểm tra lại nếu ngày hẹn trả rơi vào ngày nghỉ hoặc cuối tuần
            while (ngayNghiList.Any(n => n.Date.LocalDateTime.Date == ngayHenTra.Date) || ngayHenTra.DayOfWeek == DayOfWeek.Saturday || ngayHenTra.DayOfWeek == DayOfWeek.Sunday)
            {
                ngayHenTra = ngayHenTra.AddDays(1).Date + gioHenTra;
            }
        }
        else
        {
            // Kiểm tra nếu ngày hẹn trả rơi vào ngày nghỉ hoặc cuối tuần
            while (ngayNghiList.Any(n => n.Date.LocalDateTime.Date == ngayHenTra.Date) || ngayHenTra.DayOfWeek == DayOfWeek.Saturday || ngayHenTra.DayOfWeek == DayOfWeek.Sunday)
            {
                ngayHenTra = ngayHenTra.AddDays(1).Date + gioHenTra;
            }
        }

        return ngayHenTra;
    }
}
