using Dapper;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Org.BouncyCastle.Ocsp;
using System.Globalization;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using System.Text.Encodings.Web;
using System.Web;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.KetNoi.SLD;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Constant;
using Group = TD.DichVuCongApi.Domain.Catalog.Group;

namespace TD.DichVuCongApi.Infrastructure.KetNoi.SLD;
public class SyncSLDService : ISyncSLDService
{
    private readonly SyncSLDSettings _settings;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMinioService _minioService;
    private readonly IRepository<Domain.Business.ThanhPhanHoSo> _repositoryTPHS;
    private readonly IReadRepository<NgayNghi> _repositoryNgayNghi;
    private readonly IRepository<HoSo> _hoSoRepo;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoService;
    private readonly IInjectConfiguration _iInjectConfiguration;
    private readonly string HoSoTableName = SchemaNames.Business + "." + TableNames.HoSos;
    private readonly string UserTableName = SchemaNames.Identity + "." + TableNames.Users;
    private readonly string ThuTucTableName = SchemaNames.Catalog + "." + TableNames.ThuTucs;
    private readonly string TruongHopThuTucTableName = SchemaNames.Business + "." + TableNames.TruongHopThuTucs;
    private readonly string QuaTrinhXuLyTableName = SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos;
    private readonly string publicApiGetFileAccessKey;
    private readonly string domainName;
    private readonly string publicApiGetFile;
    private readonly string BaoTroXaHoi = "BaoTroXaHoi";
    private readonly string BaoTroXaHoiTinh = "BaoTroXaHoiTinh";
    private const string TimeFormat = "dd/MM/yyyy HH:mm:ss";
    private ILogger<SyncSLDService> _logger;
    public SyncSLDService(
        IReadRepository<NgayNghi> repositoryNgayNghi,
        IOptions<SyncSLDSettings> options,
        IDapperRepository dapperRepository,
        ILogger<SyncSLDService> logger,
        IMinioService minioService,
        IInjectConfiguration injectConfiguration,
        IRepository<Domain.Business.ThanhPhanHoSo> repositoryTPHS,
        INguoiXuLyHoSoService nguoiXuLyHoService,
        IRepository<HoSo> hoSoRepo)
    {
        _settings = options.Value;
        _dapperRepository = dapperRepository;
        _logger = logger;
        _minioService = minioService;
        _repositoryNgayNghi = repositoryNgayNghi;
        _repositoryTPHS = repositoryTPHS;
        _iInjectConfiguration = injectConfiguration;
        domainName = injectConfiguration.GetValue<string>("FileConfig:DOMAIN_FILE_NAME");
        publicApiGetFileAccessKey = injectConfiguration.GetValue<string>("FileConfig:ACCESS_FILE_KEY");
        publicApiGetFile = injectConfiguration.GetValue<string>("FileConfig:PUBLIC_API_GET_FILE_WITHOUT_ACCESS_KEY");
        _nguoiXuLyHoService = nguoiXuLyHoService;
        _hoSoRepo = hoSoRepo;
    }
    private class NgayThangNamSinhNguoiGui
    {
        public string Nam { get; set; }
        public string NgayThangNam { get; set; }
    }
    private class DiaChiChuHo
    {
        public string MaTinhThanh { get; set; }
        public string MaQuanHuyen { get; set; }
        public string MaPhuongXa { get; set; }
        public string TenTinhThanh { get; set; }
        public string TenQuanHuyen { get; set; }
        public string TenPhuongXa { get; set; }
        public string ChiTiet { get; set; }
        public string QuocGia { get; set; }
    }
    private class QuaTrinhXuLySelect
    {
        public string MaHoSo { get; set; }
        public string NguoiGui { get; set; }
        public string ThaoTac { get; set; }
        public string ThoiGian { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string PositionName { get; set; }
        public string NgayHetHanBuocXuLy { get; set; }
        public string OfficeName { get; set; }
        public string TrangThai { get; set; }
    }
    public async Task Push1Data(string maHoSo)
    {
        string sqlUpdateHoSoPushSucced = $"UPDATE {HoSoTableName} SET LoaiDuLieuKetNoi = '{BaoTroXaHoiTinh}' WHERE MaHoSo = @MaHoSo";
        string sqlGetHoSo = $@"SELECT Top 1 TinhThanhChuHoSo, QuanHuyenChuHoSo, XaPhuongChuHoSo, MaHoSo, MaTTHC, DonViId, SoGiayToChuHoSo, NguoiGui, MaLinhVuc, TenLinhVuc, TrichYeuHoSo, KenhThucHien, KenhThucHien, HinhThucTra, LoaiDoiTuong, ChuHoSo, NgayTiepNhan, DinhKemKetQua, Id
                from {HoSoTableName} WHERE NgayTiepNhan >= @DongBoLenHoSoTuNgay AND MaHoSo = @MaHoSo and DeletedOn is null and MaTTHC in @MaTTHCs and TrangThaiHoSoId = '10' AND (LoaiDuLieuKetNoi is null or LoaiDuLieuKetNoi = '')";
        string sqlGetThuTuc = $"SELECT Top 1 TenTTHC, MaTTHC, LinhVucChinh, MaLinhVucChinh from {ThuTucTableName} WHERE MaTTHC = @MaTTHC and DeletedOn is null";
        string sqlGetGroup = "SELECT TOP 1 GroupName FROM Catalog.Groups WHERE GroupCode = @GroupCode and DeletedOn is null";
        string sqlThanhPhanHoSo = "SELECT * FROM Business.ThanhPhanHoSos WHERE HoSo = @HoSo And DeletedOn is null";
        string sqlGetNguoiGui = $"SELECT TOP 1 NoiOHienTai, DanToc, Id,FullName,UserName,Email,PhoneNumber,SoCMND,SoDinhDanh,NgayThangNamSinh,NamSinh,GioiTinh,NoiDangKyKhaiSinh,QueQuan,ThuongTru,TaiKhoanHeThongQLVB,MaDinhDanhOfficeCode,ChucDanh FROM {UserTableName} WHERE UserName = @UserName And TypeUser = 'CongDan'";
        string sqlGetQuaTrinhXuLy = $@"SELECT qtxl.MaHoSo,qtxl.NguoiGui,qtxl.ThaoTac,qtxl.ThoiGian, qtxl.NgayHetHanBuocXuLy, u.OfficeName, u.UserName, u.FullName,
                                    u.PositionName FROM {QuaTrinhXuLyTableName} qtxl
                                    LEFT JOIN {UserTableName} u on qtxl.NguoiGui = u.id
                                    WHERE MaHoSo = @MaHoSo and qtxl.DeletedOn is null";
        HoSoBTXH hosoObj = new HoSoBTXH();
        var maThuTucDongBoDVCQG = _settings.DanhSachThuTucDongBoDVC.Values.Select(x => x).ToList();
        var maThuTucDongBoDVC = _settings.DanhSachThuTucDongBoDVC.Keys.Select(x => x).ToList();
        if (maThuTucDongBoDVC.Count == 0)
        {
            _logger.LogError($"{BaoTroXaHoiTinh}_ChuaCauHinhThuTuc_BTXH");
            throw new Exception("Chưa cấu hình thủ tục đồng bộ");
        }

        if (string.IsNullOrEmpty(_settings.DongBoLenHoSoTuNgay))
        {
            throw new Exception("Chưa cấu hình thời gian đồng bộ hồ sơ từ ngày");
        }

        var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlGetHoSo, new
        {
            MaHoSo = maHoSo,
            MaTTHCs = maThuTucDongBoDVC,
            DongBoLenHoSoTuNgay = _settings.DongBoLenHoSoTuNgay
        });

        var thuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<ThuTuc>(sqlGetThuTuc, new
        {
            MaTTHC = hoSo.MaTTHC
        });

        if (hoSo == null)
        {
            throw new Exception("Hồ sơ không ở trạng thái đã trả hoặc không nằm trong danh sách thủ tục đồng bộ");
        }

        var group = await _dapperRepository.QueryFirstOrDefaultAsync<Group>(sqlGetGroup, new
        {
            GroupCode = hoSo.DonViId
        });
        var nguoiGui = await _dapperRepository.QueryFirstOrDefaultAsync<UserSelect>(sqlGetNguoiGui, new
        {
            UserName = hoSo.NguoiGui,
        });
        if (string.IsNullOrEmpty(_settings.AcceptKey))
        {
            throw new Exception("Chưa cấu hình AcceptKey");
        }

        hosoObj.AcceptKey = _settings.AcceptKey;
        hosoObj.LoaiDuLieu = "100";
        hosoObj.MaHoSo = hoSo.MaHoSo;
        hosoObj.MaLinhVuc = hoSo.MaLinhVuc ?? thuTuc.MaLinhVucChinh;
        hosoObj.TenLinhVuc = hoSo.TenLinhVuc ?? thuTuc.LinhVucChinh;
        hosoObj.MaTTHC = _settings.DanhSachThuTucDongBoDVC[hoSo.MaTTHC];
        hosoObj.TenTTHC = thuTuc.TenTTHC ?? hoSo.TrichYeuHoSo ?? "";

        try
        {
            var ngayThangNamSinhNguoiGui = JsonConvert.DeserializeObject<NgayThangNamSinhNguoiGui>(nguoiGui.NgayThangNamSinh);
            DateTime ngaySinhChuHoSo = DateTime.ParseExact(ngayThangNamSinhNguoiGui.NgayThangNam, "yyyyMMdd", CultureInfo.InvariantCulture);
            hosoObj.NgayThangNamSinh = ngaySinhChuHoSo.ToString("dd/MM/yyyy");
        }
        catch { }
        string gioiTinh = nguoiGui.GioiTinh;
        string gioiTinhId = string.Empty;
        switch (gioiTinh)
        {
            case "1":
                gioiTinhId = "1034";
                break;
            case "2":
                gioiTinhId = "1035";
                break;
            default:
                gioiTinhId = "";
                break;
        }

        hosoObj.GioiTinhId = gioiTinhId;

        hosoObj.DanTocId = (!string.IsNullOrEmpty(nguoiGui.DanToc) && nguoiGui.DanToc.StartsWith("0")) ? nguoiGui.DanToc.Substring(1) : nguoiGui.DanToc;
        hosoObj.CMND = nguoiGui.SoDinhDanh ?? hoSo.NguoiGui;
        // ngay cap cmnd
        //try
        //{
        //    var ngayThangNamSinhNguoiGui = JsonConvert.DeserializeObject<NgayThangNamSinhNguoiGui>(nguoiGui.NgayThangNamSinh);
        //    DateTime ngaySinhChuHoSo = DateTime.ParseExact(ngayThangNamSinhNguoiGui.NgayThangNam, "yyyyMMdd", CultureInfo.InvariantCulture);
        //    hosoObj.NgayThangNamSinh = ngaySinhChuHoSo.ToString("dd/MM/yyyy");
        //}
        //catch { }

        // noi cap
        //string noiCapCMND = DVCCommon.GetNodeValue(xDoc, "NoiCapCMNDChuHoSo");
        //string noiCapCMNDID = "";
        //if (noiCapCMND.ToLower().Contains("cục cảnh sát"))
        //{
        //    noiCapCMNDID = "1047";
        //}
        //else if (noiCapCMND.ToLower().Contains("thanh hóa"))
        //{
        //    noiCapCMNDID = "1219";
        //}
        //else
        //{
        //    if (hosoObj.CMND != null && hosoObj.CMND.Length == 12)
        //    {
        //        noiCapCMNDID = "1047";
        //    }
        //}
        // hosoObj.CMND_NoiCap = noiCapCMNDID;

        hosoObj.SoDienThoai = nguoiGui.PhoneNumber; //1
        hosoObj.Email = nguoiGui.Email;
        var noht = !string.IsNullOrEmpty(nguoiGui.NoiOHienTai) ? JsonConvert.DeserializeObject<DiaChiChuHo>(nguoiGui.NoiOHienTai) : null;
        var hktt = !string.IsNullOrEmpty(nguoiGui.ThuongTru) ? JsonConvert.DeserializeObject<DiaChiChuHo>(nguoiGui.ThuongTru) : null;
        string? quanHuyenChuHoSo = !string.IsNullOrEmpty(hoSo.QuanHuyenChuHoSo) ? hoSo.QuanHuyenChuHoSo.Replace(hoSo.TinhThanhChuHoSo + ".", "") : null;
        string? xaPhuongChuHoSo = !string.IsNullOrEmpty(hoSo.XaPhuongChuHoSo) ? hoSo.XaPhuongChuHoSo.Replace(hoSo.QuanHuyenChuHoSo + ".", "") : null;
        hosoObj.MaTinh = hoSo.TinhThanhChuHoSo ?? noht?.MaTinhThanh ?? hktt.MaTinhThanh;
        hosoObj.MaHuyen = quanHuyenChuHoSo ?? noht?.MaQuanHuyen ?? hktt.MaQuanHuyen;
        hosoObj.MaXa = xaPhuongChuHoSo ?? noht?.MaPhuongXa ?? hktt.MaPhuongXa;
        hosoObj.HKTT_MaTinh = hktt?.MaTinhThanh;
        hosoObj.HKTT_MaHuyen = hktt?.MaQuanHuyen;
        hosoObj.HKTT_MaXa = hktt?.MaPhuongXa;
        hosoObj.HKTT_MaThon = "";
        hosoObj.HKTT_ChiTiet = hktt?.ChiTiet;

        hosoObj.NOHT_MaTinh = noht?.MaTinhThanh;
        hosoObj.NOHT_MaHuyen = noht?.MaQuanHuyen;
        hosoObj.NOHT_MaXa = noht?.MaPhuongXa;
        hosoObj.NOHT_MaThon = "";
        hosoObj.NOHT_ChiTiet = noht?.ChiTiet;
        hosoObj.KenhThucHien = hoSo.KenhThucHien;
        hosoObj.HinhThucTra = hoSo.HinhThucTra;
        hosoObj.LoaiDoiTuong = "1";
        hosoObj.HoVaTen = hoSo.ChuHoSo;
        hosoObj.NgayTiepNhan = hoSo.NgayTiepNhan?.ToString("dd/MM/yyyy HH:mm:ss");
        hosoObj.DonViXuLy = group?.GroupName;
        hosoObj.NoiNopHoSo = "2";
        hosoObj.TaiKhoanDuocXacThucVoiVNeID = "1";
        if (hoSo.NguoiGui.Length == 9)
        {
            hosoObj.LoaiDinhDanh = "2";
        }
        else
        {
            hosoObj.LoaiDinhDanh = "1";
        }
        hosoObj.SoDinhDanh = nguoiGui.SoDinhDanh ?? hoSo.NguoiGui;
        hosoObj.MaCSDL = "1";
        hosoObj.StatusId = "10";
        hosoObj.SubmitedDate = hosoObj.NgayTiepNhan;
        hosoObj.UrlDetail = string.Empty;
        #region TaiLieuNop
        var thanhPhanHoSos = await _dapperRepository.QueryAsync<Domain.Business.ThanhPhanHoSo>(sqlThanhPhanHoSo, new
        {
            HoSo = hoSo.MaHoSo
        });
        bool isCoThanhPhanDinhKem = false;
        string xmlThanhPhan = string.Empty;
        if (thanhPhanHoSos.Count > 0)
        {
            isCoThanhPhanDinhKem = true;
            foreach (var itemThanhPhan in thanhPhanHoSos)
            {
                string tenThanhPhan = itemThanhPhan.Ten;
                string duocTaiSuDung = itemThanhPhan.TrangThaiSoHoa == "2" ? "1" : "0";
                string maketquathaythe = string.Empty;
                if (duocTaiSuDung == "True" || duocTaiSuDung == "1")
                {
                    maketquathaythe = itemThanhPhan.MaKetQuaThayThe;
                    if (string.IsNullOrEmpty(maketquathaythe))
                    {
                        duocTaiSuDung = "1";
                        maketquathaythe = "";
                    }
                    else
                    {
                        duocTaiSuDung = "2";
                    }
                }
                else
                {
                    duocTaiSuDung = "0";
                    maketquathaythe = "";
                }
                string duocLayTuKhoDMQG = (itemThanhPhan.DuocLayTuKhoDMQuocGia != null && itemThanhPhan.DuocLayTuKhoDMQuocGia == true) ? itemThanhPhan.DuocLayTuKhoDMQuocGia.ToString() : "0";
                if (duocLayTuKhoDMQG == "True" || duocLayTuKhoDMQG == "1")
                {
                    duocLayTuKhoDMQG = "1";
                }
                else
                    duocLayTuKhoDMQG = "0";

                string dinhkemThanhPhan = itemThanhPhan.DinhKem;
                string[] dinhkemthanhphanArr = dinhkemThanhPhan?.Split(new string[] { "##" }, StringSplitOptions.None);
                foreach (string dinhkem in dinhkemthanhphanArr)
                {
                    if (!string.IsNullOrEmpty(dinhkem))
                    {
                        string[] arrGiayTo = dinhkem.Split(new string[] { "/" }, StringSplitOptions.None);
                        string tenGiayTo = arrGiayTo[arrGiayTo.Length - 1];
                        string urlDinhKem = domainName + publicApiGetFile + "?Path=" + dinhkem;

                        xmlThanhPhan += "<TaiLieuNop><TepDinhKemId>" + "1" + "</TepDinhKemId><TenTepDinhKem>" + HttpUtility.HtmlEncode(tenGiayTo) + "</TenTepDinhKem><IsDeleted>0</IsDeleted><MaThanhPhanHoSo>" + HttpUtility.HtmlEncode(tenThanhPhan) + "</MaThanhPhanHoSo><DuongDanTaiTepTin>" + urlDinhKem + "</DuongDanTaiTepTin><DuocSoHoa>1</DuocSoHoa><DuocTaiSuDung>" + duocTaiSuDung + "</DuocTaiSuDung><DuocLayTuKhoDMQG>" + duocLayTuKhoDMQG + "</DuocLayTuKhoDMQG><MaKetQuaThayThe>" + maketquathaythe + "</MaKetQuaThayThe></TaiLieuNop>";
                    }
                }


            }
        }
        if (isCoThanhPhanDinhKem == true)
            hosoObj.HoSoCoThanhPhanSoHoa = "1";
        else
            hosoObj.HoSoCoThanhPhanSoHoa = "0";
        #endregion TaiLieuNop

        #region GiayToKetQua
        string xmlKetQua = string.Empty;
        string dinhkemketqua = hoSo.DinhKemKetQua;
        string magiaytoketqua = thuTuc.MaTTHC;
        if (!string.IsNullOrEmpty(magiaytoketqua) && !string.IsNullOrEmpty(dinhkemketqua))
        {
            string[] dinhkemketquaArr = dinhkemketqua.Split(new string[] { "##" }, StringSplitOptions.None);
            foreach (string dinhkem in dinhkemketquaArr)
            {
                if (!string.IsNullOrEmpty(dinhkem))
                {
                    string[] arrGiayTo = dinhkem.Split(new string[] { "/" }, StringSplitOptions.None);
                    string tenGiayTo = arrGiayTo[arrGiayTo.Length - 1];
                    string urlDinhKem = domainName + publicApiGetFile + "?Path=" + dinhkem;

                    xmlKetQua += "<GiayToKetQua><TenGiayTo>" + HttpUtility.HtmlEncode(tenGiayTo) + "</TenGiayTo><MaThanhPhanHoSo>0</MaThanhPhanHoSo><GiayToId>" + "1" + "</GiayToId><DuongDanTepTinKetQua>" + urlDinhKem + "</DuongDanTepTinKetQua><MaGiayToKetQua>" + magiaytoketqua + "</MaGiayToKetQua></GiayToKetQua>";
                }
            }


        }
        #endregion GiayToKetQua
        hosoObj.CertificateExtentData = "<ExtentData><DanhSachTaiLieuNop>" + xmlThanhPhan + "</DanhSachTaiLieuNop><DanhSachGiayToKetQua>" + xmlKetQua + "</DanhSachGiayToKetQua></ExtentData>";

        hosoObj.DuocThanhToanTrucTuyen = "0";

        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpRequestMessage httpRequest = new HttpRequestMessage(HttpMethod.Post, _settings.UrlPushData + "/apiBTXH/DongBoDVC");
            string reqContent = JsonConvert.SerializeObject(hosoObj);
            httpRequest.Content = new StringContent(reqContent, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));

            var res = await httpClient.SendAsync(httpRequest);
            string stringContent = await res.Content.ReadAsStringAsync();
            var responseObj = JsonConvert.DeserializeObject<ResponseAPIDongBoHoSo>(stringContent);
            if (responseObj.error_code != "0")
            {
                throw new Exception($"Đồng bộ dữ liệ thất bại: {responseObj.message}");
            }
            else
            {
                int updateHoSo = await _dapperRepository.ExcuteAsync(sqlUpdateHoSoPushSucced, new
                {
                    MaHoSo = hoSo.MaHoSo
                });
                if (updateHoSo == 0)
                {
                    throw new Exception("Cập nhật LoaiDuLieuKetNoi Hồ sơ thất bại");
                }

                var quaTrinhXuLys = await _dapperRepository.QueryAsync<QuaTrinhXuLySelect>(sqlGetQuaTrinhXuLy, new
                {
                    MaHoSo = hoSo.MaHoSo
                });
                if (quaTrinhXuLys != null && quaTrinhXuLys.Count > 0)
                {
                    for (int iTienTrinh = 0; iTienTrinh < quaTrinhXuLys.Count; iTienTrinh++)
                    {
                        var quaTrinhXuLy = quaTrinhXuLys[iTienTrinh];
                        TienTrinhHoSoBTXH tienTrinhDongBo = new TienTrinhHoSoBTXH();
                        tienTrinhDongBo.AcceptKey = _settings.AcceptKey;
                        tienTrinhDongBo.MaHoSo = hoSo.MaHoSo;
                        tienTrinhDongBo.NguoiXuLy = quaTrinhXuLy.FullName;
                        tienTrinhDongBo.TaiKhoanXuLy = quaTrinhXuLy.UserName;
                        tienTrinhDongBo.ChucDanh = quaTrinhXuLy.PositionName;
                        tienTrinhDongBo.DonViXuLy = quaTrinhXuLy.OfficeName;
                        tienTrinhDongBo.NoiDungXuLy = quaTrinhXuLy.ThaoTac;
                        tienTrinhDongBo.ThoiDiemXuLy = DateTime.Parse(quaTrinhXuLy.ThoiGian + "").ToString("dd/MM/yyyy HH:mm:ss");
                        tienTrinhDongBo.NgayBatDau = DateTime.Parse(quaTrinhXuLy.ThoiGian + "").ToString("dd/MM/yyyy HH:mm:ss");
                        if (!string.IsNullOrEmpty(quaTrinhXuLy.NgayHetHanBuocXuLy))
                        {
                            tienTrinhDongBo.NgayKetThucTheoQuyDinh = DateTime.Parse(quaTrinhXuLy.NgayHetHanBuocXuLy).ToString("dd/MM/yyyy HH:mm:ss");
                        }
                        else
                        {
                            tienTrinhDongBo.NgayKetThucTheoQuyDinh = DateTime.Now.AddDays(1).ToString("dd/MM/yyyy HH:mm:ss");
                        }

                        tienTrinhDongBo.StatusId = quaTrinhXuLy?.TrangThai ?? "2";
                        HttpRequestMessage httpRequestQTXL = new HttpRequestMessage(HttpMethod.Post, _settings.UrlPushData + "/apiBTXH/XuLyHoSo");
                        string postSyncTienTrinh = JsonConvert.SerializeObject(tienTrinhDongBo);
                        httpRequestQTXL.Content = new StringContent(postSyncTienTrinh, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));
                        var resQTXL = await httpClient.SendAsync(httpRequestQTXL);
                        var stringQTXLContent = await res.Content.ReadAsStringAsync();
                        _logger.LogInformation($"{hoSo.MaHoSo}_DongboTienTrinh_{postSyncTienTrinh}");
                    }
                }
            }
        }

        return;
    }

    private class HoSoSelect : HoSo
    {
        public string TenTTHC { get; set; }
        public string LoaiBaoTroXaHoi { get; set; }
        public string GroupName { get; set; }
        public string MaTinh { get; set; }
        public string MaHuyen { get; set; }
        public string MaXa { get; set; }
    }

    private HoSoBTXH? SetThongTinDoiTuong(HoSoBTXH hoSo, string eFormData, string loaiBaoTroXaHoi)
    {
        if(loaiBaoTroXaHoi == TruongHopThuTuc_LoaiBaoTroXaHoi.TroGiupXaHoiKhanCapMaiTang)
        {
            // chưa có eform
        } else if(loaiBaoTroXaHoi == TruongHopThuTuc_LoaiBaoTroXaHoi.ChiTraTroCapHangThang)
        {
            // là 1 với cái dưới?
        }
        else if(loaiBaoTroXaHoi == TruongHopThuTuc_LoaiBaoTroXaHoi.ThoiHuongTroCapXaHoi)
        {
            try
            {
                var data = JsonConvert.DeserializeObject<BaoTroXaHoiTinhEFormData.ThoiHuongTroCapXaHoi>(eFormData);
                hoSo.HoVaTen = data.HoVaTen;
                hoSo.CMND = data.SoGiayTo;
                string noiCapCMND = data.NoiCapGiayTo?.Name ?? string.Empty;
                string noiCapCMNDID = "";
                if (noiCapCMND.ToLower().Contains("cục cảnh sát"))
                {
                    noiCapCMNDID = "1047";
                }
                else if (noiCapCMND.ToLower().Contains("thanh hóa"))
                {
                    noiCapCMNDID = "1219";
                }
                else
                {
                    if (hoSo.CMND != null && hoSo.CMND.Length == 12)
                    {
                        noiCapCMNDID = "1047";
                    }
                }
                hoSo.CMND_NoiCap = noiCapCMNDID;
                if (DateTime.TryParse(data.NgayCapGiayTo, out var ngayCapGiayTo))
                {
                    hoSo.CMND_NgayCap = ngayCapGiayTo.ToString("dd/MM/yyyy");
                }
                hoSo.DanTocId = data.DanToc?.Code ?? string.Empty;
                hoSo.Email = data.Email;
                hoSo.GioiTinhId = data.GioiTinh?.Code ?? string.Empty;
                hoSo.SoDienThoai = data.SoDienThoai;
                hoSo.SoDinhDanh = data.SoGiayTo;
                if (DateTime.TryParse(data.NgaySinh, out var ngaySinh))
                {
                    hoSo.NgayThangNamSinh = ngaySinh.ToString("dd/MM/yyyy");
                }
            } catch(Exception ex)
            {
                _logger.LogError($"{hoSo.MaHoSo}_SetThongTinDoiTuong_BaoTroXaHoiTinh_ThoiHuongTroCapXaHoi_{ex.ToString()}");
                return null;
            }
        } else if(loaiBaoTroXaHoi == TruongHopThuTuc_LoaiBaoTroXaHoi.HoTroMaiTangPhi)
        {
            try
            {
                var data = JsonConvert.DeserializeObject<BaoTroXaHoiTinhEFormData.HoTroMaiTangPhi>(eFormData);
                hoSo.HoVaTen = data.HoVaTen ?? data.HoVaTenDuoi;
                hoSo.CMND = data.SoGiayTo;
                string noiCapCMND = data.NoiCapGiayTo?.Name ?? string.Empty;
                string noiCapCMNDID = "";
                if (noiCapCMND.ToLower().Contains("cục cảnh sát"))
                {
                    noiCapCMNDID = "1047";
                }
                else if (noiCapCMND.ToLower().Contains("thanh hóa"))
                {
                    noiCapCMNDID = "1219";
                }
                else
                {
                    if (hoSo.CMND != null && hoSo.CMND.Length == 12)
                    {
                        noiCapCMNDID = "1047";
                    }
                }
                hoSo.CMND_NoiCap = noiCapCMNDID;
                if (DateTime.TryParse(data.NgayCapGiayTo, out var ngayCapGiayTo))
                {
                    hoSo.CMND_NgayCap = ngayCapGiayTo.ToString("dd/MM/yyyy");
                }
                hoSo.DanTocId = data.nktDanToc?.Code ?? string.Empty;
                hoSo.Email = data.Email;
                hoSo.SoDienThoai = data.SoDienThoai;
                hoSo.SoDinhDanh = data.SoGiayTo;
                if (DateTime.TryParse(data.NgaySinh, out var ngaySinh))
                {
                    hoSo.NgayThangNamSinh = ngaySinh.ToString("dd/MM/yyyy");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"{hoSo.MaHoSo}_SetThongTinDoiTuong_BaoTroXaHoiTinh_HoTroMaiTangPhi_{ex.ToString()}");
                return null;
            }
        }
        return hoSo;
    }

    public async Task PushData()
    {
        if (!_settings.EnablePush)
        {
            return;
        }
        var sqlUpdateHoSoPushSucced = $"UPDATE {HoSoTableName} SET LoaiDuLieuKetNoi = '{BaoTroXaHoiTinh}' WHERE MaHoSo = @MaHoSo";
        var sqlGetHoSos = $@"SELECT TOP 150 hs.EformData, hs.TinhThanhChuHoSo, hs.QuanHuyenChuHoSo, hs.XaPhuongChuHoSo, hs.LoaiVanBanKetQua, hs.SoKyHieuKetQua, hs.CoQuanBanHanhKetQua, hs.TrichYeuKetQua,
                            hs.NgayBanHanhKetQua, hs.MaHoSo, hs.MaTTHC, hs.DonViId, hs.NgaySinhChuHoSo, hs.DiaChiChuHoSo, hs.SoGiayToChuHoSo, hs.NguoiGui, hs.MaLinhVuc, hs.TenLinhVuc,
                            hs.TrichYeuHoSo, hs.KenhThucHien, hs.HinhThucTra, hs.LoaiDoiTuong, hs.ChuHoSo, hs.NgayTiepNhan, hs.DinhKemKetQua, hs.Id, tt.TenTTHC as TrichYeuHoSo, thtt.LoaiBaoTroXaHoi, g.GroupName, g.MaTinh,
                            g.MaHuyen, g.MaXa
                            from {HoSoTableName} hs inner join {ThuTucTableName} tt on hs.MaTTHC = tt.MaTTHC
                            Inner join {TruongHopThuTucTableName} thtt on hs.MaTruongHop = thtt.Ma
                            Inner join Catalog.Groups g on hs.DonViId = g.GroupCode
                            WHERE NgayTiepNhan >= @DongBoLenHoSoTuNgay AND hs.DeletedOn is null and hs.MaTTHC in @MaTTHCs and TrangThaiHoSoId = '10' AND (hs.LoaiDuLieuKetNoi is null or hs.LoaiDuLieuKetNoi = '')";
        var sqlThanhPhanHoSo = "SELECT * FROM Business.ThanhPhanHoSos WHERE HoSo = @HoSo And DeletedOn is null";
        var sqlKetQuaLienQuan = "SELECT * FROM Business.KetQuaLienQuans WHERE MaHoSo = @HoSo And DeletedOn is null";
        var sqlGetNguoiGui = $"SELECT TOP 1 NoiOHienTai, DanToc, Id,FullName,UserName,Email,PhoneNumber,SoCMND,SoDinhDanh,NgayThangNamSinh,NamSinh,GioiTinh,NoiDangKyKhaiSinh,QueQuan,ThuongTru,TaiKhoanHeThongQLVB,MaDinhDanhOfficeCode,ChucDanh FROM {UserTableName} WHERE UserName = @UserName And TypeUser = 'CongDan'";
        var sqlGetQuaTrinhXuLy = $@"SELECT qtxl.MaHoSo,qtxl.NguoiGui,qtxl.ThaoTac,qtxl.ThoiGian, qtxl.NgayHetHanBuocXuLy, u.OfficeName, u.UserName, u.FullName,
                                    u.PositionName FROM {QuaTrinhXuLyTableName} qtxl
                                    LEFT JOIN {UserTableName} u on qtxl.NguoiGui = u.id
                                    WHERE MaHoSo = @MaHoSo and qtxl.DeletedOn is null";
        var maThuTucDongBoDVCQG = _settings.DanhSachThuTucDongBoDVC.Values.Select(x => x).ToList();
        var maThuTucDongBoDVC = _settings.DanhSachThuTucDongBoDVC.Keys.Select(x => x).ToList();
        if (maThuTucDongBoDVC.Count == 0)
        {
            _logger.LogError($"{BaoTroXaHoiTinh}_ChuaCauHinhThuTuc_BTXH");
            return;
        }
        string dongBoTuNgay = _settings.DongBoLenHoSoTuNgay;

        if (string.IsNullOrEmpty(dongBoTuNgay))
        {
            dongBoTuNgay = DateTime.Now.Subtract(TimeSpan.FromDays(7)).Date.ToString("yyyy-MM-dd HH:mm:ss");
        }

        var hoSos = await _dapperRepository.QueryAsync<HoSoSelect>(sqlGetHoSos, new
        {
            MaTTHCs = maThuTucDongBoDVC,
            DongBoLenHoSoTuNgay = dongBoTuNgay
        });
        for (int i = 0; i < hoSos.Count; i++)
        {
            var hoSo = hoSos[i];
            try
            {
                HoSoBTXH hosoObj = new HoSoBTXH();

                if (hoSo == null)
                {
                    _logger.LogError($"{BaoTroXaHoiTinh}_{hoSo.MaHoSo}_HoSoKhongTonTai");
                    continue;
                }
                if (string.IsNullOrEmpty(hoSo.EFormData))
                {
                    _logger.LogError($"{BaoTroXaHoiTinh}_{hoSo.MaHoSo}_HoSoKhongCoThongTinEformData");
                    continue;
                }
                if (string.IsNullOrEmpty(hoSo.LoaiBaoTroXaHoi))
                {
                    _logger.LogError($"{BaoTroXaHoiTinh}_{hoSo.MaHoSo}_TruongHopHoSoKhongCoThongTinLoaiBaoTroXaHoi");
                    continue;
                }
                var nguoiGui = await _dapperRepository.QueryFirstOrDefaultAsync<UserSelect>(sqlGetNguoiGui, new
                {
                    UserName = hoSo.NguoiGui,
                });
                if (string.IsNullOrEmpty(_settings.AcceptKey))
                {
                    _logger.LogError($"BTXH_AcceptKey_null");
                    continue;
                }
                hosoObj.AcceptKey = _settings.AcceptKey;
                hosoObj.LoaiDuLieu = "100";
                hosoObj.MaHoSo = hoSo?.MaHoSo;
                hosoObj.MaLinhVuc = hoSo?.MaLinhVuc;
                hosoObj.TenLinhVuc = hoSo?.TenLinhVuc;
                hosoObj.MaTTHC = _settings.DanhSachThuTucDongBoDVC[hoSo.MaTTHC];
                hosoObj.TenTTHC = hoSo?.TenTTHC ?? hoSo.TrichYeuHoSo ?? string.Empty;
                hosoObj.LoaiKetQua = hoSo?.LoaiVanBanKetQua ?? string.Empty;
                hosoObj.SoQuyetDinh = hoSo?.SoKyHieuKetQua ?? string.Empty;
                hosoObj.CoQuanBanHanh = hoSo?.CoQuanBanHanhKetQua ?? string.Empty;
                hosoObj.TrichYeu = hoSo?.TrichYeuKetQua ?? string.Empty;
                hosoObj.NgayBanHanh = hoSo?.NgayBanHanhKetQua?.ToString("dd/MM/yyyy") ?? string.Empty;
                HoSoBTXH? newHoSoObj = SetThongTinDoiTuong(hosoObj, hoSo.EFormData, hoSo.LoaiBaoTroXaHoi);
                if(newHoSoObj == null)
                {
                    continue;
                }
                hosoObj = newHoSoObj;
                string gioiTinh = newHoSoObj.GioiTinhId ?? nguoiGui?.GioiTinh ?? string.Empty;
                string gioiTinhId = string.Empty;
                switch (gioiTinh)
                {
                    case "1":
                        gioiTinhId = "1034";
                        break;
                    case "2":
                        gioiTinhId = "1035";
                        break;
                    default:
                        gioiTinhId = string.Empty;
                        break;
                }
                hosoObj.GioiTinhId = gioiTinhId;
                if (nguoiGui != null)
                {
                    //hosoObj.DanTocId?.Length > 2 dùng cho dữ liệu cũ nhập sai danh mục
                    if (!string.IsNullOrEmpty(nguoiGui.DanToc) && nguoiGui.DanToc.StartsWith("0") && hosoObj.DanTocId?.Length > 2)
                    {
                        hosoObj.DanTocId = nguoiGui.DanToc.Substring(1);
                    }
                    else
                    {
                        hosoObj.DanTocId ??= string.Empty;
                    }
                }
                var noht = nguoiGui != null && !string.IsNullOrEmpty(nguoiGui.NoiOHienTai) ? JsonConvert.DeserializeObject<DiaChiChuHo>(nguoiGui.NoiOHienTai) : null;
                var hktt = nguoiGui != null && !string.IsNullOrEmpty(nguoiGui.ThuongTru) ? JsonConvert.DeserializeObject<DiaChiChuHo>(nguoiGui.ThuongTru) : null;
                var quanHuyenChuHoSo = !string.IsNullOrEmpty(hoSo?.QuanHuyenChuHoSo) ? hoSo?.QuanHuyenChuHoSo.Replace(hoSo.TinhThanhChuHoSo + ".", "") : null;
                var xaPhuongChuHoSo = !string.IsNullOrEmpty(hoSo?.XaPhuongChuHoSo) ? hoSo?.XaPhuongChuHoSo.Replace(hoSo.QuanHuyenChuHoSo + ".", "") : null;
                hosoObj.MaTinh = hoSo.MaTinh ?? hoSo?.TinhThanhChuHoSo ?? noht?.MaTinhThanh ?? hktt?.MaTinhThanh ?? string.Empty;
                hosoObj.MaHuyen = hoSo.MaHuyen ?? quanHuyenChuHoSo ?? noht?.MaQuanHuyen ?? hktt?.MaQuanHuyen ?? string.Empty;
                hosoObj.MaXa = hoSo.MaXa ?? xaPhuongChuHoSo ?? noht?.MaPhuongXa ?? hktt?.MaPhuongXa ?? string.Empty;
                hosoObj.HKTT_MaTinh = hktt?.MaTinhThanh ?? hoSo.TinhThanhChuHoSo ?? string.Empty;
                hosoObj.HKTT_MaHuyen = hktt?.MaQuanHuyen ?? quanHuyenChuHoSo ?? string.Empty;
                hosoObj.HKTT_MaXa = hktt?.MaPhuongXa ?? xaPhuongChuHoSo ?? string.Empty;
                hosoObj.HKTT_MaThon = string.Empty;
                hosoObj.HKTT_ChiTiet = hktt?.ChiTiet ?? hoSo.DiaChiChuHoSo ?? string.Empty;

                hosoObj.NOHT_MaTinh = noht?.MaTinhThanh ?? hoSo.TinhThanhChuHoSo ?? string.Empty;
                hosoObj.NOHT_MaHuyen = noht?.MaQuanHuyen ?? quanHuyenChuHoSo ?? string.Empty;
                hosoObj.NOHT_MaXa = noht?.MaPhuongXa ?? xaPhuongChuHoSo ?? string.Empty;
                hosoObj.NOHT_MaThon = "";
                hosoObj.NOHT_ChiTiet = noht?.ChiTiet ?? hoSo.DiaChiChuHoSo ?? "";
                hosoObj.KenhThucHien = hoSo.KenhThucHien;
                hosoObj.HinhThucTra = hoSo.HinhThucTra;
                hosoObj.LoaiDoiTuong = "1";
                hosoObj.NgayTiepNhan = hoSo.NgayTiepNhan?.ToString("dd/MM/yyyy HH:mm:ss");
                hosoObj.DonViXuLy = hoSo.GroupName;
                hosoObj.NoiNopHoSo = "2";
                hosoObj.TaiKhoanDuocXacThucVoiVNeID = "1";
                if (hoSo.NguoiGui?.Length == 9)
                {
                    hosoObj.LoaiDinhDanh = "2";
                }
                else
                {
                    hosoObj.LoaiDinhDanh = "1";
                }
                hosoObj.SoDinhDanh = hosoObj.SoDinhDanh ?? hoSo.SoGiayToChuHoSo ?? string.Empty;
                hosoObj.MaCSDL = "1";
                hosoObj.StatusId = "10";
                hosoObj.SubmitedDate = hosoObj.NgayTiepNhan;
                hosoObj.UrlDetail = string.Empty;
                #region TaiLieuNop
                var thanhPhanHoSos = await _dapperRepository.QueryAsync<Domain.Business.ThanhPhanHoSo>(sqlThanhPhanHoSo, new
                {
                    HoSo = hoSo.MaHoSo
                });
                bool isCoThanhPhanDinhKem = false;
                string xmlThanhPhan = string.Empty;
                if (thanhPhanHoSos !=null && thanhPhanHoSos.Count > 0)
                {
                    isCoThanhPhanDinhKem = true;
                    foreach (var itemThanhPhan in thanhPhanHoSos)
                    {
                        string tenThanhPhan = !string.IsNullOrEmpty(itemThanhPhan.Ten) ? itemThanhPhan.Ten : "0";
                        string duocTaiSuDung = itemThanhPhan.TrangThaiSoHoa == "2" ? "1" : "0";
                        string maketquathaythe = string.Empty;
                        if (duocTaiSuDung == "True" || duocTaiSuDung == "1")
                        {
                            maketquathaythe = itemThanhPhan.MaKetQuaThayThe;
                            if (string.IsNullOrEmpty(maketquathaythe))
                            {
                                duocTaiSuDung = "1";
                                maketquathaythe = "";
                            }
                            else
                            {
                                duocTaiSuDung = "2";
                            }
                        }
                        else
                        {
                            duocTaiSuDung = "0";
                            maketquathaythe = "";
                        }
                        string duocLayTuKhoDMQG = (itemThanhPhan.DuocLayTuKhoDMQuocGia != null && itemThanhPhan.DuocLayTuKhoDMQuocGia == true) ? itemThanhPhan.DuocLayTuKhoDMQuocGia.ToString() : "0";
                        if (duocLayTuKhoDMQG == "True" || duocLayTuKhoDMQG == "1")
                        {
                            duocLayTuKhoDMQG = "1";
                        }
                        else
                            duocLayTuKhoDMQG = "0";

                        string dinhkemThanhPhan = itemThanhPhan.DinhKem;
                        if (!string.IsNullOrEmpty(dinhkemThanhPhan))
                        {
                            string[] dinhkemthanhphanArr = dinhkemThanhPhan.Split(new string[] { "##" }, StringSplitOptions.None);
                            foreach (string dinhkem in dinhkemthanhphanArr)
                            {
                                if (!string.IsNullOrEmpty(dinhkem))
                                {
                                    string[] arrGiayTo = dinhkem.Split(new string[] { "/" }, StringSplitOptions.None);
                                    string tenGiayTo = arrGiayTo[arrGiayTo.Length - 1];
                                    string urlDinhKem = domainName + publicApiGetFile + "?Path=" + dinhkem;

                                    xmlThanhPhan += "<TaiLieuNop><TepDinhKemId>" + "1" + "</TepDinhKemId><TenTepDinhKem>" + tenGiayTo + "</TenTepDinhKem><IsDeleted>0</IsDeleted><MaThanhPhanHoSo>" + HttpUtility.HtmlEncode(tenThanhPhan) + "</MaThanhPhanHoSo><DuongDanTaiTepTin>" + urlDinhKem + "</DuongDanTaiTepTin><DuocSoHoa>1</DuocSoHoa><DuocTaiSuDung>" + duocTaiSuDung + "</DuocTaiSuDung><DuocLayTuKhoDMQG>" + duocLayTuKhoDMQG + "</DuocLayTuKhoDMQG><MaKetQuaThayThe>" + maketquathaythe + "</MaKetQuaThayThe></TaiLieuNop>";
                                }
                            }
                        }
                    }
                }
                if (isCoThanhPhanDinhKem == true)
                    hosoObj.HoSoCoThanhPhanSoHoa = "1";
                else
                    hosoObj.HoSoCoThanhPhanSoHoa = "0";
                #endregion TaiLieuNop


                #region GiayToKetQua
                string xmlKetQua = string.Empty;
                string dinhkemketqua = hoSo.DinhKemKetQua;
                string magiaytoketqua = hoSo.MaTTHC;
                if (!string.IsNullOrEmpty(magiaytoketqua) && !string.IsNullOrEmpty(dinhkemketqua))
                {
                    var maThanhPhanHoSo = hoSo.TrichYeuKetQua;
                    if (string.IsNullOrEmpty(maThanhPhanHoSo))
                    {
                        maThanhPhanHoSo = hoSo.SoKyHieuKetQua;
                    }
                    
                    string[] dinhkemketquaArr = dinhkemketqua.Split(new string[] { "##" }, StringSplitOptions.None);
                    foreach (string dinhkem in dinhkemketquaArr)
                    {
                        if (!string.IsNullOrEmpty(dinhkem))
                        {
                            string[] arrGiayTo = dinhkem.Split(new string[] { "/" }, StringSplitOptions.None);
                            string tenGiayTo = arrGiayTo[arrGiayTo.Length - 1];
                            if (string.IsNullOrEmpty(maThanhPhanHoSo))
                            {
                                maThanhPhanHoSo = tenGiayTo;
                            }
                            maThanhPhanHoSo += " (Kết quả chính)";
                            string urlDinhKem = domainName + publicApiGetFile + "?Path=" + dinhkem;

                            xmlKetQua += "<GiayToKetQua><TenGiayTo>" + tenGiayTo + "</TenGiayTo><MaThanhPhanHoSo>" + HttpUtility.HtmlEncode(maThanhPhanHoSo) + "</MaThanhPhanHoSo><GiayToId>" + "1" + "</GiayToId><DuongDanTepTinKetQua>" + urlDinhKem + "</DuongDanTepTinKetQua><MaGiayToKetQua>" + magiaytoketqua + "</MaGiayToKetQua></GiayToKetQua>";
                        }
                    }
                }
                var ketQuaLienQuans = await _dapperRepository.QueryAsync<Domain.Business.KetQuaLienQuan>(sqlKetQuaLienQuan, new
                {
                    HoSo = hoSo.MaHoSo
                });
                if (!string.IsNullOrEmpty(magiaytoketqua) && ketQuaLienQuans != null && ketQuaLienQuans.Count > 0)
                {
                    foreach (var item in ketQuaLienQuans)
                    {
                        if (!string.IsNullOrEmpty(item.DinhKem))
                        {
                            string trichYeu = !string.IsNullOrEmpty(item.TrichYeu) ? item.TrichYeu : string.Empty;
                            var dinhKemList = item.DinhKem.Split("##").ToList();
                            foreach(var d in dinhKemList)
                            {
                                if (!string.IsNullOrEmpty(d) && d.ToLower().EndsWith(".pdf"))
                                {
                                    string[] arrGiayTo = d.Split(new string[] { "/" }, StringSplitOptions.None);
                                    string tenGiayTo = arrGiayTo[arrGiayTo.Length - 1];
                                    string urlDinhKem = domainName + publicApiGetFile + "?Path=" + d;
                                    if (string.IsNullOrEmpty(trichYeu))
                                    {
                                        trichYeu = !string.IsNullOrEmpty(item.CoQuanBanHanh) ? item.CoQuanBanHanh : tenGiayTo;
                                    } 
                                    trichYeu += " (Kết quả liên quan)";

                                    xmlKetQua += "<GiayToKetQua><TenGiayTo>" + tenGiayTo + "</TenGiayTo><MaThanhPhanHoSo>" + HttpUtility.HtmlEncode(trichYeu) + "</MaThanhPhanHoSo><GiayToId>" + "1" + "</GiayToId><DuongDanTepTinKetQua>" + urlDinhKem + "</DuongDanTepTinKetQua><MaGiayToKetQua>" + magiaytoketqua + "</MaGiayToKetQua></GiayToKetQua>";
                                }
                            }
                        }
                    }
                    //var dinhKemKetQuaLienQuan = string.Join("##", ketQuaLienQuans.Select(x => x.DinhKem)).Split("##").ToList();
                    //foreach (var dinhKem in dinhKemKetQuaLienQuan)
                    //{
                    //    if (!string.IsNullOrEmpty(dinhKem))
                    //    {
                    //        string[] arrGiayTo = dinhKem.Split(new string[] { "/" }, StringSplitOptions.None);
                    //        string tenGiayTo = arrGiayTo[arrGiayTo.Length - 1];
                    //        if(tenGiayTo.ToLower().EndsWith(".pdf"))
                    //        {
                    //            string urlDinhKem = domainName + publicApiGetFile + "?Path=" + dinhKem;
                    //            xmlKetQua += "<GiayToKetQua><TenGiayTo>" + tenGiayTo + "</TenGiayTo><MaThanhPhanHoSo>0</MaThanhPhanHoSo><GiayToId>" + "1" + "</GiayToId><DuongDanTepTinKetQua>" + urlDinhKem + "</DuongDanTepTinKetQua><MaGiayToKetQua>" + magiaytoketqua + "</MaGiayToKetQua></GiayToKetQua>";
                    //        }
                    //    }
                    //}

                }

                #endregion GiayToKetQua
                hosoObj.CertificateExtentData = "<ExtentData><DanhSachTaiLieuNop>" + xmlThanhPhan + "</DanhSachTaiLieuNop><DanhSachGiayToKetQua>" + xmlKetQua + "</DanhSachGiayToKetQua></ExtentData>";
                hosoObj.DuocThanhToanTrucTuyen = "0";

                using (HttpClient httpClient = new HttpClient())
                {
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpRequestMessage httpRequest = new HttpRequestMessage(HttpMethod.Post, _settings.UrlPushData + "/apiBTXH/DongBoDVC");
                    var reqContent = JsonConvert.SerializeObject(hosoObj);
                    httpRequest.Content = new StringContent(reqContent, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));

                    var res = await httpClient.SendAsync(httpRequest);
                    var stringContent = await res.Content.ReadAsStringAsync();
                    var responseObj = JsonConvert.DeserializeObject<ResponseAPIDongBoHoSo>(stringContent);
                    if (responseObj.error_code != "0")
                    {
                        _logger.LogError($"{hoSo.MaHoSo}_baotroxahoi_dongbohosothatbai_res:{stringContent}_req:{reqContent}");
                    }
                    else
                    {
                        int updateHoSo = await _dapperRepository.ExcuteAsync(sqlUpdateHoSoPushSucced, new
                        {
                            MaHoSo = hoSo.MaHoSo
                        });
                        if (updateHoSo == 0)
                        {
                            _logger.LogError($"{hoSo.MaHoSo}_UpdateBaoTroXaHoiTinhFailed");
                        }
                        var quaTrinhXuLys = await _dapperRepository.QueryAsync<QuaTrinhXuLySelect>(sqlGetQuaTrinhXuLy, new
                        {
                            MaHoSo = hoSo.MaHoSo
                        });
                        if (quaTrinhXuLys != null && quaTrinhXuLys.Count > 0)
                        {
                            for (int iTienTrinh = 0; iTienTrinh < quaTrinhXuLys.Count; iTienTrinh++)
                            {
                                var quaTrinhXuLy = quaTrinhXuLys[iTienTrinh];
                                TienTrinhHoSoBTXH tienTrinhDongBo = new TienTrinhHoSoBTXH();
                                tienTrinhDongBo.AcceptKey = _settings.AcceptKey;
                                tienTrinhDongBo.MaHoSo = hoSo.MaHoSo;
                                tienTrinhDongBo.NguoiXuLy = quaTrinhXuLy.FullName;
                                tienTrinhDongBo.TaiKhoanXuLy = quaTrinhXuLy.UserName;
                                tienTrinhDongBo.ChucDanh = quaTrinhXuLy.PositionName;
                                tienTrinhDongBo.DonViXuLy = quaTrinhXuLy.OfficeName;
                                tienTrinhDongBo.NoiDungXuLy = quaTrinhXuLy.ThaoTac;
                                tienTrinhDongBo.ThoiDiemXuLy = DateTime.Parse(quaTrinhXuLy.ThoiGian + "").ToString("dd/MM/yyyy HH:mm:ss");
                                tienTrinhDongBo.NgayBatDau = DateTime.Parse(quaTrinhXuLy.ThoiGian + "").ToString("dd/MM/yyyy HH:mm:ss");
                                if (!string.IsNullOrEmpty(quaTrinhXuLy.NgayHetHanBuocXuLy))
                                {
                                    tienTrinhDongBo.NgayKetThucTheoQuyDinh = DateTime.Parse(quaTrinhXuLy.NgayHetHanBuocXuLy).ToString("dd/MM/yyyy HH:mm:ss");
                                }
                                else
                                {
                                    tienTrinhDongBo.NgayKetThucTheoQuyDinh = DateTime.Now.AddDays(1).ToString("dd/MM/yyyy HH:mm:ss");
                                }

                                tienTrinhDongBo.StatusId = quaTrinhXuLy?.TrangThai ?? "2";
                                HttpRequestMessage httpRequestQTXL = new HttpRequestMessage(HttpMethod.Post, _settings.UrlPushData + "/apiBTXH/XuLyHoSo");
                                string postSyncTienTrinh = JsonConvert.SerializeObject(tienTrinhDongBo);
                                httpRequestQTXL.Content = new StringContent(postSyncTienTrinh, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));
                                var resQTXL = await httpClient.SendAsync(httpRequestQTXL);
                                var stringQTXLContent = await res.Content.ReadAsStringAsync();
                                _logger.LogInformation($"{hoSo.MaHoSo}_DongboTienTrinh_{postSyncTienTrinh}");
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"{hoSo.MaHoSo}_DongBoThatBai_{ex.ToString()}");
            }
        }


        return;
    }

    private class UploadFileRefs
    {
        public Dictionary<string, string> DinhKemKetQua { get; set; }
        public Dictionary<string, string> ThanhPhanHoSo { get; set; }
    }
    private class SelectThuTuc
    {
        public string MaTTHC { get; set; }
        public string DonViId { get; set; }
    }

    private async Task<UploadFileRefs> GetDinhKem(SyncSLDResponseWrapper response)
    {
        Dictionary<string, string> DKKQfileReferences = new Dictionary<string, string>();
        Dictionary<string, string> TPHSfileReferences = new Dictionary<string, string>();

        List<Task> outerTasks = new List<Task>();
        response.result.data.ForEach(item =>
        {
            var parsedXmlData = Xml2Json.Parse<XmlResponseSLD>(item.certificateExtentData, new List<string>() { "TaiLieuNop", "GiayToKetQua" });
            var giayToKetQuas = (parsedXmlData.ExtentData != null && parsedXmlData.ExtentData.DanhSachGiayToKetQua != null) ? parsedXmlData.ExtentData.DanhSachGiayToKetQua.GiayToKetQua : null;
            var dinhKemTPHS = (parsedXmlData.ExtentData != null && parsedXmlData.ExtentData.DanhsachTaiLieuNop != null) ? parsedXmlData.ExtentData.DanhsachTaiLieuNop.TaiLieuNop : null;

            var taskDKKQs = giayToKetQuas?.Select(async giayTo =>
            {
                try
                {
                    var base64Str = await _minioService.GetFileInExternalResource(giayTo.DuongDanTepTinKetQua);

                    var dinhKem = await _minioService.UploadFileAsBase64Async(base64Str, giayTo.TenGiayTo, "", "DongBoThanhPhanHoSo");

                    if (DKKQfileReferences.ContainsKey(item.maTTHC))
                    {
                        DKKQfileReferences[item.maTTHC] += "##" + dinhKem;
                    }
                    else
                    {
                        DKKQfileReferences[item.maTTHC] = dinhKem;
                    }
                }
                catch (Exception ex)
                {
                    if (DKKQfileReferences.ContainsKey(item.maTTHC))
                    {
                        DKKQfileReferences[item.maTTHC] += "##" + giayTo.DuongDanTepTinKetQua;
                    }
                    else
                    {
                        DKKQfileReferences[item.maTTHC] = giayTo.DuongDanTepTinKetQua;
                    }
                }
            });

            var taskTPHSs = dinhKemTPHS?.Select(async giayTo =>
            {
                try
                {
                    var base64Str = await _minioService.GetFileInExternalResource(giayTo.DuongDanTaiTepTin);

                    var dinhKem = await _minioService.UploadFileAsBase64Async(base64Str, giayTo.DuongDanTaiTepTin, "", "DongBoThanhPhanHoSo");
                    if (TPHSfileReferences.ContainsKey(item.maHoSo))
                    {
                        TPHSfileReferences[item.maHoSo] += "##" + dinhKem;
                    }
                    else
                    {
                        TPHSfileReferences[item.maHoSo] = dinhKem;
                    }
                }
                catch (Exception ex)
                {
                    if (TPHSfileReferences.ContainsKey(item.maHoSo))
                    {
                        TPHSfileReferences[item.maHoSo] += "##" + giayTo.DuongDanTaiTepTin;
                    }
                    else
                    {
                        TPHSfileReferences[item.maHoSo] = giayTo.DuongDanTaiTepTin;
                    }
                }
            });

            if (taskDKKQs != null)
            {
                outerTasks.AddRange(taskDKKQs);
            }
            if (taskTPHSs != null)
            {
                outerTasks.AddRange(taskTPHSs);
            }

        });
        try
        {
            await Task.WhenAll(outerTasks);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
        }
        return new UploadFileRefs()
        {
            DinhKemKetQua = DKKQfileReferences,
            ThanhPhanHoSo = TPHSfileReferences,
        };
    }
    // chạy tách rời với hàm chính và chạy tiến trình song song cho hiệu suất tốt hơn thay vì async await trên từng lần lặp
    private async Task AddThanhPhanHoSo(Dictionary<string, string> thanhPhanHoSoDic)
    {
        List<Domain.Business.ThanhPhanHoSo> thanhPhanHoSos = new List<Domain.Business.ThanhPhanHoSo>();
        foreach (var item in thanhPhanHoSoDic)
        {
            // tạo List<ThanhPhanHoSo> và AddRangeAsync;
            Domain.Business.ThanhPhanHoSo thanhPhanHoSo = new Domain.Business.ThanhPhanHoSo("Thành phần hồ sơ", item.Key, 1, 0, null, item.Value, null, null, null, null, null, null, null, null, null, null);
            thanhPhanHoSo.SetDinhKemGoc(item.Value);
            thanhPhanHoSos.Add(thanhPhanHoSo);
        }
        try
        {
            await _repositoryTPHS.AddRangeAsync(thanhPhanHoSos);
        }
        catch (Exception ex)
        {
        }
    }

    private async Task AddHoSo(SyncSLDResponseData hoSoReq, IReadOnlyList<ThuTuc> thuTucs, IReadOnlyList<Group> donVis)
    {
        string sqlGetTruongHopThuTuc = $"SELECT TOP 1 Ten, Ma, Id From {SchemaNames.Business}.{TableNames.TruongHopThuTucs} WHERE DeletedOn is null and ThuTucId = @ThuTucId";
        string sqlGetNguoiTiepNhan = @"SELECT STRING_AGG (CONVERT(NVARCHAR(1000),NguoiTiepNhanId) , '##') as TaiKhoanTiepNhan FROM [Catalog].[DonViThuTucs]
            where MaTTHC = @MaTTHC and DeletedOn is null and DonViId = @DonViId";
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string maTTHC = hoSoReq.maTTHC;
        string maTinh = hoSoReq.maTinh;
        string maHuyen = hoSoReq.maHuyen;
        string maXa = hoSoReq.maXa;
        string formatDate = "dd/MM/yyyy";
        string formatDatetime = "dd/MM/yyyy HH:mm:ss";
        var tinhThanh = hoSoReq.nohT_MaTinh ?? hoSoReq.hktT_MaTinh ?? "";
        var quanHuyen = hoSoReq.nohT_MaHuyen ?? hoSoReq.hktT_MaHuyen ?? "";
        var xaPhuong = hoSoReq.nohT_MaXa ?? hoSoReq.hktT_MaXa ?? "";
        string tinhThanhChuHoSo = tinhThanh;
        string quanHuyenChuHoSo = tinhThanh + "." + quanHuyen;
        string xaPhuongChuHoSo = tinhThanh + "." + quanHuyen + "." + xaPhuong;
        string diaChiChuHoSo = hoSoReq.nohT_ChiTiet ?? hoSoReq.hktT_ChiTiet ?? "";
        DateTime ngaySinhChuHoSo = DateTime.ParseExact(hoSoReq.ngayThangNamSinh, formatDate, CultureInfo.InvariantCulture);
        DateTime? ngayBanHanh = null;
        DateTime? ngayTiepNhan = null;
        DateTime? ngayHenTra = null;
        DateTime? ngayKetThucXuLy = null;
        if (!string.IsNullOrEmpty(hoSoReq.ngayBanHanh))
        {
            ngayBanHanh = DateTime.ParseExact(hoSoReq.ngayBanHanh, formatDate, CultureInfo.InvariantCulture);
            ngayTiepNhan = DateTime.ParseExact(hoSoReq.ngayTiepNhan, formatDatetime, CultureInfo.InvariantCulture);
            ngayHenTra = DateTime.ParseExact(hoSoReq.ngayHenTra, formatDatetime, CultureInfo.InvariantCulture);
            ngayKetThucXuLy = DateTime.ParseExact(hoSoReq.ngayKetThucXuLy_ThucTe, formatDatetime, CultureInfo.InvariantCulture);
        }
        var thuTuc = thuTucs.FirstOrDefault(x => x.MaTTHC.Contains(hoSoReq.maTTHC));
        var donVi = donVis.FirstOrDefault(x => x.MaTinh == maTinh && x.MaHuyen == maHuyen && x.MaXa == maXa);

        if (donVi == null)
        {
            return;
        }

        var nguoiTiepNhan = await _dapperRepository.QueryFirstOrDefaultAsync<TaiKhoanNguoiTiepNhan_Select>(sqlGetNguoiTiepNhan, new
        {
            MaTTHC = thuTuc.MaTTHC,
            DonViId = donVi.GroupCode
        });
        if (nguoiTiepNhan == null)
        {
            _logger.LogError($"{hoSoReq.maHoSo}_SLD_không có người tiếp nhận");
            return;
        }
        var truongHopThuTuc = await _dapperRepository.QueryFirstOrDefaultAsync<TruongHopThuTuc>(sqlGetTruongHopThuTuc, new
        {
            ThuTucId = thuTuc.MaTTHC
        });
        if (truongHopThuTuc == null)
        {
            _logger.LogError($"{hoSoReq.maHoSo}_SLD_không có trường hợp thủ tục");
            return;
        }
        var ngayNghis = await _repositoryNgayNghi.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year));
        var caculateTime = new CaculateTime(_iInjectConfiguration);
        var ngayHenTraCaNhan = caculateTime.TinhNgayHenTra(ngayNghis, currentTime, 8, "Ngày làm việc");
        var parsedXmlData = Xml2Json.Parse<XmlResponseSLD>(hoSoReq.certificateExtentData, new List<string>() { "TaiLieuNop", "GiayToKetQua" });
        var giayToKetQuas = (parsedXmlData.ExtentData != null && parsedXmlData.ExtentData.DanhSachGiayToKetQua != null) ? parsedXmlData.ExtentData.DanhSachGiayToKetQua.GiayToKetQua : null;
        var dinhKemTPHS = (parsedXmlData.ExtentData != null && parsedXmlData.ExtentData.DanhsachTaiLieuNop != null) ? parsedXmlData.ExtentData.DanhsachTaiLieuNop.TaiLieuNop : null;
        string urlGiayToDKKQ = string.Empty;
        string urlGiayToTPHS = string.Empty;
        if (giayToKetQuas != null && giayToKetQuas.Count > 0)
        {
            for (int j = 0; j < giayToKetQuas.Count; j++)
            {
                var giayTo = giayToKetQuas[j];
                var base64Str = await _minioService.GetFileInExternalResourceByGetMethod(giayTo.DuongDanTepTinKetQua);
                var dinhKem = await _minioService.UploadFileAsBase64Async(base64Str, giayTo.TenGiayTo, "", "BaoTroXaHoi");
                if (j > 0)
                {
                    urlGiayToDKKQ += "##";
                }
                urlGiayToDKKQ += dinhKem;

            }
        }
        if (dinhKemTPHS != null && dinhKemTPHS.Count > 0)
        {
            for (int j = 0; j < dinhKemTPHS.Count; j++)
            {
                var dinhkemTPHS = dinhKemTPHS[j];
                var base64Str = await _minioService.GetFileInExternalResourceByGetMethod(dinhkemTPHS.DuongDanTaiTepTin);
                var dinhKem = await _minioService.UploadFileAsBase64Async(base64Str, dinhkemTPHS.DuongDanTaiTepTin, "", "BaoTroXaHoi");
                //var trangThaiSoHoa = dinhkemTPHS.DuocSoHoa == "1" ? "1" : dinhkemTPHS.DuocTaiSuDung == "1" ? "2" : null;
                if (j > 0)
                {
                    urlGiayToTPHS += "##";
                }
                urlGiayToTPHS += dinhKem;
            }
        }

        //using (var transactionScope = new TransactionScope(TransactionScopeOption.Suppress, new TransactionOptions
        //{
        //    IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted,
        //}, TransactionScopeAsyncFlowOption.Enabled))
        //{
        try
        {
            var thanhPhanHoSo = new Domain.Business.ThanhPhanHoSo("Thành phần hồ sơ", hoSoReq.maHoSo, 1, 0, null,
                        urlGiayToTPHS, null, null, "1", thuTuc.MaTTHC, false, "0", null, null, null, null);
            thanhPhanHoSo.SetDinhKemGoc(urlGiayToTPHS);

            var hoSo = new HoSo(donVi.GroupCode, hoSoReq.maHoSo, LoaiChuHoSoConstant.CongDan, hoSoReq.hoVaTen, hoSoReq.soDienThoai, hoSoReq.email, hoSoReq.cmnd,
            null, ngaySinhChuHoSo.ToString("yyyy"), tinhThanhChuHoSo, quanHuyenChuHoSo, xaPhuongChuHoSo, diaChiChuHoSo, hoSoReq.cmnd, thuTuc.MaTTHC,
            truongHopThuTuc.Ma, truongHopThuTuc.Ten, truongHopThuTuc.Id.ToString(), null, null, nguoiTiepNhan.TaiKhoanTiepNhan, hoSoReq.tenTTHC, null, null, null, null, null, null, null, null,
            null, null, thuTuc.MaTTHC, currentTime, ngayHenTraCaNhan, thuTuc.MucDo, "0");
            hoSo.UpdateLoaiDuLieuKetNoi("BaoTroXaHoi");
            var taiKhoanTiepNhan = nguoiTiepNhan.TaiKhoanTiepNhan.Contains("##") ? nguoiTiepNhan.TaiKhoanTiepNhan.Split("##")[0] : nguoiTiepNhan.TaiKhoanTiepNhan;
            hoSo.SetDataBaoTroXaHoi(hoSoReq.statusId, ngayTiepNhan, ngayHenTra, ngayKetThucXuLy, taiKhoanTiepNhan);
            hoSo.SetKetQuaChinh(urlGiayToDKKQ, hoSoReq.loaiKetQua, hoSoReq.soQuyetDinh, hoSoReq.coQuanBanHanh, ngayBanHanh, hoSoReq.trichYeu);
            hoSo.SetLinhVuc(thuTuc.MaLinhVucChinh, thuTuc.LinhVucChinh);

            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSoReq.maHoSo, null, null, null, null, "", "", nguoiTiepNhan.TaiKhoanTiepNhan, null, currentTime, trangThai: "1", thaoTac: "Đồng bộ từ hệ thống bảo trợ xã hội");
            //int insetedHoSoCount = await _dapperRepository.InsertEntityAsync<HoSo>(hoSo, SchemaNames.Business + "." + TableNames.HoSos);
            //if (insetedHoSoCount != 1)
            //{
            //    //transactionScope.Dispose();
            //    return;
            //}
            await _hoSoRepo.AddAsync(hoSo);
            await _nguoiXuLyHoService.AddNguoiXuLyHoSos(nguoiTiepNhan.TaiKhoanTiepNhan, hoSo.Id);
            int insertedTPHSCount = await _dapperRepository.InsertEntityAsync<Domain.Business.ThanhPhanHoSo>(thanhPhanHoSo, SchemaNames.Business + "." + TableNames.ThanhPhanHoSos);
            if (insertedTPHSCount != 1)
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
            //transactionScope.Complete();
        }
        catch (Exception ex)
        {
            _logger.LogError(JsonConvert.SerializeObject(new
            {
                MaHoSo = hoSoReq.maHoSo,
                Module = "SLD",
                Err = JsonConvert.SerializeObject(ex)
            }));
        }
        //}
    }
    private async Task UpdateOrAddHoSo(SyncSLDResponseWrapper wrapperResponse)
    {
        string sqlCheckHoSoExists = $"SELECT TOP 1 MaHoSo FROM {HoSoTableName} WHERE LoaiDuLieuKetNoi = '{BaoTroXaHoi}' AND MaHoSo = @MaHoSo And DeletedOn is null";
        var response = wrapperResponse.result;
        if (response == null || response.data.Count == 0)
        {
            return;
        }
        #region lấy mã thủ tục trong db
        var maThuTucParams = new Dictionary<string, object>();
        var maThuTucDVCQGs = response.data.DistinctBy(x => x.maTTHC).Select(x => x.maTTHC).ToList();
        var thuTucWhere = new List<string>() { };
        for (int i = 0; i < maThuTucDVCQGs.Count; i++)
        {
            var maTTHC = maThuTucDVCQGs[i];
            thuTucWhere.Add($"MaTTHC LIKE @MaTTHC{i} +'%'");
            maThuTucParams.Add($"MaTTHC{i}", maTTHC);
        }
        var sqlThuTuc = $@"SELECT tt.MaTTHC, tt.MucDo, tt.MaLinhVucChinh FROM Catalog.ThuTucs tt WHERE {string.Join(" OR ", thuTucWhere)}";
        var thuTucs = await _dapperRepository.QueryAsync<ThuTuc>(sqlThuTuc, new DynamicParameters(maThuTucParams));
        #endregion

        #region lấy đơn vị trong db
        var maDonViParams = new Dictionary<string, object>();
        var donViWhere = new List<string>() { };
        var distinctMaDonVi = response.data
        .GroupBy(item => new { item.maTinh, item.maHuyen, item.maXa })
        .Select(group => group.First())
        .ToList();
        for (int i = 0; i < distinctMaDonVi.Count; i++)
        {
            var maDonVi = distinctMaDonVi[i];
            string where = string.Empty;
            if (!string.IsNullOrEmpty(maDonVi.maXa))
            {
                where += $" AND MaXa = @MaXa{i}";
                maDonViParams.Add($"MaXa{i}", maDonVi.maXa);
            }
            if (!string.IsNullOrEmpty(maDonVi.maHuyen))
            {
                where += $" AND MaHuyen = @MaHuyen{i}";
                maDonViParams.Add($"MaHuyen{i}", maDonVi.maHuyen);
            }
            if (!string.IsNullOrEmpty(maDonVi.maTinh))
            {
                where += $" AND MaTinh = @MaTinh{i}";
                maDonViParams.Add($"MaTinh{i}", maDonVi.maTinh);
            }
            where = where.TrimStart();
            if (where.StartsWith("AND"))
            {
                where = where.Substring("AND".Length);
            }
            where = "(" + where + ")";
            donViWhere.Add(where);
        }
        var sqlDonVi = $@"SELECT GroupCode, MaTinh, MaHuyen, MaXa FROM Catalog.Groups WHERE {string.Join(" OR ", donViWhere)}";
        var donVis = await _dapperRepository.QueryAsync<Group>(sqlDonVi, new DynamicParameters(maDonViParams));
        #endregion
        for (int i = 0; i < response.data.Count; i++)
        {
            List<string> valueList = new();
            var hoSoReq = response.data[i];
            var hoSoExists = await _dapperRepository.QueryFirstOrDefaultAsync<HoSo>(sqlCheckHoSoExists, new
            {
                MaHoSo = hoSoReq.maHoSo
            });
            if (hoSoExists == null)
            {
                await AddHoSo(hoSoReq, thuTucs, donVis);
            }
        }
    }

    public async Task PullData()
    {
        if (!_settings.EnablePull)
        {
            return;
        }
        using HttpClient client = new HttpClient();
        DateTime tuNgay = DateTime.Today.AddDays(-1);
        DateTime denNgay = DateTime.Today.AddDays(1).AddSeconds(-1);
        string url = $"https://{_settings.URLEndPoint}";
        HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, url);
        if (_settings.AcceptKey != null)
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _settings.AcceptKey);
        }
        else if (!string.IsNullOrEmpty(_settings.Token.DynamicToken.Url) && !string.IsNullOrEmpty(_settings.Token.DynamicToken.Password) && !string.IsNullOrEmpty(_settings.Token.DynamicToken.User))
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Common.GetDynamicToken(new Application.Common.KetNoi.Classes.DynamicTokenSettings()
            {
                Url = _settings.Token.DynamicToken.Url,
                Password = _settings.Token.DynamicToken.Password,
                User = _settings.Token.DynamicToken.User,
            }));
        }
        var content = new
        {
            AcceptKey = _settings.AcceptKey,
            LoaiDuLieu = _settings.LoaiDuLieu,
            MaTinh = _settings.MaTinh,
            MaHuyen = _settings.MaHuyen,
            MaXa = _settings.MaXa,
            ThoiGianBatDau = tuNgay.ToString("dd/MM/yyyy HH:mm:ss"),
            ThoiGianKetThuc = denNgay.ToString("dd/MM/yyyy HH:mm:ss")
        };
        httpRequestMessage.Content = new StringContent(JsonConvert.SerializeObject(content), Encoding.UTF8, new MediaTypeHeaderValue("application/json"));
        try
        {

            HttpResponseMessage httpResponseMessage = await client.SendAsync(httpRequestMessage);
            if (httpResponseMessage.IsSuccessStatusCode)
            {
                string responseBodyStr = await httpResponseMessage.Content.ReadAsStringAsync();
                SyncSLDResponseWrapper hoSoBGTVTResponse = JsonConvert.DeserializeObject<SyncSLDResponseWrapper>(responseBodyStr);
                await UpdateOrAddHoSo(hoSoBGTVTResponse);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
        }
    }
    private class UserSelect
    {
        public string? DanToc { get; set; }
        public string Id { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? SoCMND { get; set; }
        public string? SoDinhDanh { get; set; }
        public string NgayThangNamSinh { get; set; }
        public string NamSinh { get; set; }
        public string GioiTinh { get; set; }
        public string? NoiDangKyKhaiSinh { get; set; }
        public string? NoiOHienTai { get; set; }
        public string? QueQuan { get; set; }
        public string? ThuongTru { get; set; }
        public string? TaiKhoanHeThongQLVB { get; set; }
        public string? MaDinhDanhOfficeCode { get; set; }
        public string? ChucDanh { get; set; }
    }
}
