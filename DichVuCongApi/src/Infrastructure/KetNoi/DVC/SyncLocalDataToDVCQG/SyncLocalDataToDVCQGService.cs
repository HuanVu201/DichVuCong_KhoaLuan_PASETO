using TD.DichVuCongApi.Application.Common.KetNoi.DVC.SyncLocalDataToDVCQG;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using Microsoft.Extensions.Logging;
using TD.DichVuCongApi.Domain.Constant;
using Microsoft.Extensions.Options;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using Microsoft.Extensions.Configuration;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Common;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using DocumentFormat.OpenXml.Office2010.Excel;
using Amazon.Runtime.Internal.Transform;
using DocumentFormat.OpenXml.VariantTypes;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using Mapster;
using Dapper;
using TD.DichVuCongApi.Domain.Portal;
using Microsoft.Extensions.Hosting;
using static TD.DichVuCongApi.Application.Common.KetNoi.DVC.SyncLocalDataToDVCQG.SyncDataToDVCQG;
using Org.BouncyCastle.Ocsp;
using TD.DichVuCongApi.Application.Common.Models;
using System;
using System.Globalization;

namespace TD.DichVuCongApi.Infrastructure.KetNoi.DVC.SyncLocalDataToDVCQG;
public class SyncLocalDataToDVCQGService : ISyncLocalDataToDVCQGService
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IConfiguration _configuration;
    private readonly ILogger<SyncLocalDataToDVCQGService> _logger;
    private readonly SyncLocalDataToDVCQGSetting _settings;
    private readonly string HoSoTableName = SchemaNames.Business + "." + TableNames.HoSos;
    private readonly string QuaTrinhXuLyTableName = SchemaNames.Business + "." + TableNames.QuaTrinhXuLyHoSos;
    private readonly string ThanhPhanHoSoTableName = SchemaNames.Business + "." + TableNames.ThanhPhanHoSos;
    private readonly string YeuCauThanhToanTableName = SchemaNames.Business + "." + TableNames.YeuCauThanhToans;
    private readonly string ThuTucTableName = SchemaNames.Catalog + "." + TableNames.ThuTucs;
    private readonly string GroupTableName = SchemaNames.Catalog + "." + TableNames.Groups;
    private readonly string UserTableName = SchemaNames.Identity + "." + TableNames.Users;
    private readonly string KETNOIMOTCUAQUOCGIA_DOWNLOAD_URL;
    private readonly YeuCauThanhToanConstants trangThaiThanhToan = new YeuCauThanhToanConstants();
    public SyncLocalDataToDVCQGService(
        IDapperRepository dapperRepository,
        ILogger<SyncLocalDataToDVCQGService> logger,
        IOptions<SyncLocalDataToDVCQGSetting> options,
        IConfiguration configuration)
    {
        _dapperRepository = dapperRepository;
        _logger = logger;
        _settings = options.Value;
        KETNOIMOTCUAQUOCGIA_DOWNLOAD_URL = configuration.GetValue<string>("FileConfig:KETNOIMOTCUAQUOCGIA_DOWNLOAD_URL");
    }


    private async Task<TRes> RequestHandler<TReq, TRes>(TReq req, string suffix)
    {
        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpRequestMessage httpRequest = new HttpRequestMessage(HttpMethod.Post, _settings.Base + suffix);
            var reqContent = JsonConvert.SerializeObject(req);
            httpRequest.Content = new StringContent(reqContent, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));

            var res = await httpClient.SendAsync(httpRequest);
            var stringContent = await res.Content.ReadAsStringAsync();
            var jsonData = JsonConvert.DeserializeObject<TRes>(stringContent);
            return jsonData;
        }
    }
    private async Task<string> RequestHandlerReturnPlainText<TReq>(TReq req, string suffix)
    {
        using (HttpClient httpClient = new HttpClient())
        {
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpRequestMessage httpRequest = new HttpRequestMessage(HttpMethod.Post, _settings.Base + suffix);
            var reqContent = JsonConvert.SerializeObject(req);
            httpRequest.Content = new StringContent(reqContent, Encoding.UTF8, new MediaTypeHeaderValue("application/json"));

            var res = await httpClient.SendAsync(httpRequest);
            var stringContent = await res.Content.ReadAsStringAsync();
            return stringContent;
        }
    }
    private class GetMaHoSosSelect
    {
        public string MaHoSo { get; set; }
    }
    private async Task<List<GetMaHoSosSelect>>? GetMaHoSos(string? ngayTiepNhanFrom, string? ngayTiepNhanTo)
    {
        List<string> where = new List<string>();
        where.Add($" (hs.ViTriDeHoSo IS NULL OR hs.ViTriDeHoSo != 'Convert') and hs.NgayTiepNhan is not null and hs.TrangThaiDongBoDVC = '{HoSo_TrangThaiDongBoDVC.ChuaDongBo}' and hs.DeletedOn is null");
        if (!string.IsNullOrEmpty(ngayTiepNhanFrom))
            where.Add("hs.NgayTiepNhan >= @NgayTiepNhanFrom");
        if (!string.IsNullOrEmpty(ngayTiepNhanTo))
            where.Add("hs.NgayTiepNhan < @NgayTiepNhanTo");
        string cond = string.Join(" AND ", where);
        string sql = $"SELECT {nameof(HoSo.MaHoSo)} FROM {SchemaNames.Business}.{TableNames.HoSos} hs WHERE {cond}";
        var maHoSos = await _dapperRepository.QueryAsync<GetMaHoSosSelect>(sql, param: new
        {
            NgayTiepNhanFrom = ngayTiepNhanFrom,
            NgayTiepNhanTo = ngayTiepNhanTo,
        });
        if(maHoSos != null)
            return maHoSos.ToList();
        return null;
    }

    private string GetQuery(string? ngayTiepNhanFrom, string? ngayTiepNhanTo, string? maHoSo)
    {
        string where = " (hs.ViTriDeHoSo IS NULL OR hs.ViTriDeHoSo != 'Convert') and hs.NgayTiepNhan is not null and (hs.TrangThaiDongBoDVC is null or hs.TrangThaiDongBoDVC = '0') and hs.DeletedOn is null";
        if (!string.IsNullOrEmpty(ngayTiepNhanFrom))
            where += " AND hs.NgayTiepNhan >= @NgayTiepNhanFrom";
        if (!string.IsNullOrEmpty(ngayTiepNhanTo))
            where += " AND hs.NgayTiepNhan < @NgayTiepNhanTo";
        if (!string.IsNullOrEmpty(maHoSo))
            where = " hs.MaHoSo = @MaHoSo";
        string queryBase = @$"SELECT 
            hs.Id as Id, hs.MaHoSo, hs.MaTTHC, hs.MaHoSoKhac, hs.MaLinhVuc, hs.NgayYeuCauBoSung, hs.TenLinhVuc, hs.KenhThucHien, hs.ChuHoSo, hs.LoaiDoiTuong, hs.UyQuyen,
            hs.EmailChuHoSo, hs.EmailNguoiUyQuyen, hs.SoDienThoaiChuHoSo as SoDienThoai, hs.SoDienThoaiNguoiUyQuyen, hs.TrichYeuHoSo, hs.NgayTiepNhan, hs.NgayHenTra,
            hs.TrangThaiHoSoId as TrangThaiHoSo, hs.NgayTra, hs.HinhThucTra as HinhThuc, hs.NgayKetThucXuLy, hs.DonViId, '2' as NoiNopHoSo, hs.NgayTuChoi,
            hs.DinhKemKetQua, hs.NgayTiepNhan as NgayNopHoSo, '0' as TaiKhoanDuocXacThucVoiVNeID, '0' as DuocThanhToanTrucTuyen, hs.SoGiayToChuHoSo, g.GroupName as DonViXuLy, g.MaDinhDanh,
            u.TechID as MaDoiTuong,tt.MaKetQuaChinh, tt.TenTTHC, hs.TrangThaiDongBoDVC, hs.SoDinhDanh, hs.LaHoSoChungThuc,
            
            
            qtxl.Id as Id, qtxl.MaHoSo, qtxl.NguoiXuLy, qtxl.ThoiDiemXuLy, qtxl.NoiDungXuLy, qtxl.TrangThai,
            qtxl.NgayKetThucTheoQuyDinh,

            tphs.Id as Id, tphs.TenTepDinhKem, tphs.IsDeleted, tphs.MaThanhPhanHoSo, tphs.DuongDanTaiTepTin, tphs.DuocSoHoa, tphs.DuocTaiSuDung,
            tphs.DuocLayTuKhoDMQG, tphs.MaKetQuaThayThe, tphs.DinhKemGoc,

            yctt.Id as Id, yctt.TenPhiLePhi, yctt.MaPhiLePhi, yctt.HinhThucThu, yctt.Gia, yctt.LoaiPhiLePhi, yctt.TrangThai

            
            
            FROM {HoSoTableName} hs
            LEFT JOIN (SELECT qtxl.Id, qtxl.MaHoSo, qtxl.TenNguoiGui as NguoiXuLy, qtxl.ThoiGian as ThoiDiemXuLy, qtxl.ThaoTac as NoiDungXuLy,
            qtxl.TrangThai, qtxl.NgayHetHanBuocXuLy as NgayKetThucTheoQuyDinh FROM {QuaTrinhXuLyTableName} qtxl WHERE qtxl.DeletedOn is null AND (qtxl.TrangThaiDongBoDVCQuocGia is null or qtxl.TrangThaiDongBoDVCQuocGia = '0'))
            qtxl ON hs.MaHoSo = qtxl.MaHoSo

            LEFT JOIN (SELECT tphs.Id, tphs.HoSo, tphs.Ten as TenTepDinhKem, (CASE WHEN tphs.DeletedOn is null THEN 0 ELSE 1 END) as IsDeleted,
            tphs.MaGiayTo as MaThanhPhanHoSo, tphs.DinhKem as DuongDanTaiTepTin, '1' as DuocSoHoa,
            (CASE WHEN tphs.TrangThaiSoHoa = '2' THEN '1' WHEN tphs.TrangThaiSoHoa = '3' THEN '2' ELSE '0' END) as DuocTaiSuDung,
            tphs.DuocLayTuKhoDMQuocGia as DuocLayTuKhoDMQG, tphs.MaKetQuaThayThe, tphs.DinhKemGoc FROM {ThanhPhanHoSoTableName} tphs WHERE tphs.DinhKem is not null and tphs.DinhKem <> '') tphs ON hs.MaHoSo = tphs.HoSo

            LEFT JOIN (SELECT yctt.Id, yctt.MaHoSo, yctt.GhiChuThanhToan as TenPhiLePhi, '1' as MaPhiLePhi, '1' as HinhThucThu, yctt.SoTien as Gia, '1' as LoaiPhiLePhi,
            yctt.TrangThai FROM {YeuCauThanhToanTableName} yctt where TrangThai = N'Đã thanh toán' And SoTien > 0 ) yctt ON yctt.MaHoSo = hs.MaHoSo

            LEFT JOIN (SELECT MaKetQuaChinh, TenTTHC, MaTTHC FROM {ThuTucTableName} tt where tt.DeletedOn is null) tt ON hs.MaTTHC = tt.MaTTHC

            LEFT JOIN (SELECT GroupName, GroupCode, MaDinhDanh FROM {GroupTableName} g where g.DeletedOn is null) g on G.GroupCode = hs.DonViId

            LEFT JOIN (SELECT JSON_VALUE(UserInfoDVCQG, '$.TechID') as TechID, UserName FROM {UserTableName} WHERE ISJSON(UserInfoDVCQG) > 0 AND TypeUser = 'CongDan') u ON u.UserName = hs.NguoiGui

            WHERE {where}
            ORDER BY hs.MaHoSo, qtxl.ThoiDiemXuLy
            ";
        return queryBase;
    }
    public async Task<Result<string>> PushDataByMaHoSo(string maHoSo)
    {
        var data = await GetData("", "", maHoSo);
        if(data == null || data.Count == 0)
        {
            return Result<string>.Fail("Không tồn tại dữ liệu");
        }
        var res = await PushData(data[0]);
        return Result<string>.Success(data: res);

    }
    private class GetMaHoSoResponse
    {
        public string MaHoSo { get; set; }
        public bool LaMaRandom { get; set; } = false;
    }
    private GetMaHoSoResponse GetMaHoSo(string maHoSo, string? maHoSoKhac, string ngayTiepNhan, string? maDinhDanhDonVi)
    {
        string maHoSoDongBo = maHoSo;
        if (string.IsNullOrEmpty(_settings.MaDinhDanhTinh) || string.IsNullOrEmpty(maDinhDanhDonVi))
        {
            return new GetMaHoSoResponse()
            {
                MaHoSo = maHoSoDongBo,
            };
        }
        List<string> maHoSoSplit = maHoSoDongBo.Split("-").ToList();
        if(maHoSoSplit.Count == 0)
        {
            return new GetMaHoSoResponse()
            {
                MaHoSo = maHoSoDongBo,
            };
        }
        string part1 = maHoSoSplit[0];
        if (part1.Contains(_settings.MaDinhDanhTinh))
        {
            return new GetMaHoSoResponse()
            {
                MaHoSo = maHoSoDongBo,
            };
        }
        else
        {
            if (!string.IsNullOrEmpty(maHoSoKhac))
            {
                return new GetMaHoSoResponse()
                {
                    MaHoSo = maHoSoKhac,
                };
            }
            try
            {
                DateTime ngayTiepNhanDate = DateTime.ParseExact(ngayTiepNhan, "yyyyMMddHHmmss", CultureInfo.InvariantCulture);
                Random random = new Random();
                return new GetMaHoSoResponse()
                {
                    MaHoSo = maDinhDanhDonVi + "-" + ngayTiepNhanDate.ToString("yyMMdd") + "-" + random.Next(10000, 99999),
                    LaMaRandom = true
                };
            }
            catch (Exception ex)
            {
                return new GetMaHoSoResponse()
                {
                    MaHoSo = maHoSoDongBo
                };
            }
        }
    }

    private async Task<List<SyncDataToDVCQG.HoSoDto>> GetData(string? ngayTiepNhanFrom, string? ngayTiepNhanTo, string? maHoSo)
    {
        var hoSoDic = new Dictionary<Guid, SyncDataToDVCQG.HoSoDto>();
        var taiLieuNop = new Dictionary<Guid, SyncDataToDVCQG.TepDinhKem>();
        var lePhi = new Dictionary<Guid, SyncDataToDVCQG.LePhi>();
        var hoSoBoSung = new Dictionary<Guid, SyncDataToDVCQG.HoSoBoSung>();
        var danhSachGiayToKetQua = new Dictionary<string, SyncDataToDVCQG.GiayToKetQua>();
        var quaTrinhXuLyHoSo = new Dictionary<Guid, SyncDataToDVCQG.QuaTrinhXuLyHoSo>();
        var dinhDanhCHS = new Dictionary<Guid, SyncDataToDVCQG.DinhDanhCHS>();

        var sql = GetQuery(ngayTiepNhanFrom, ngayTiepNhanTo, maHoSo);
        var datas = await _dapperRepository.QueryAsync<SyncDataToDVCQG.HoSoDto, SyncDataToDVCQG.QuaTrinhXuLyHoSo, SyncDataToDVCQG.TepDinhKem, SyncDataToDVCQG.LePhi, SyncDataToDVCQG.HoSoDto>(sql,
            (hs, qtxl, tphs, yctt) =>
            {
                if (!hoSoDic.TryGetValue(hs.Id, out var hoSo))
                {
                    hoSoDic.Add(hs.Id, hoSo = hs);
                    hoSo.NgayTiepNhan = DateTime.Parse(hoSo.NgayTiepNhan).ToString("yyyyMMddHHmmss");
                    string loaiDoiTuong = "1";
                    if (!string.IsNullOrEmpty(hoSo.LoaiDoiTuong))
                    {
                        if(hoSo.LoaiDoiTuong == "Doanh nghiệp")
                        {
                            loaiDoiTuong = "2";
                        }
                        else if (hoSo.LoaiDoiTuong == "Cơ quan nhà nước")
                        {
                            loaiDoiTuong = "3";
                        }
                        else if (hoSo.LoaiDoiTuong == "Tổ chức" || hoSo.LoaiDoiTuong == "Khác")
                        {
                            loaiDoiTuong = "4";
                        }
                    }
                    if(hoSo.TrangThaiHoSo == "5" || hoSo.TrangThaiHoSo == "6" || hoSo.TrangThaiHoSo == "8")
                    {
                        hoSo.TrangThaiHoSo = "9";
                    }
                    hoSo.HoSoCoThanhPhanSoHoa = "0";
                    hoSo.ThongTinTra = "";
                    hoSo.LoaiDoiTuong = loaiDoiTuong;
                    hoSo.MaDoiTuong = hoSo.MaDoiTuong;
                    if(hoSo.KenhThucHien != "2")
                    {
                        hoSo.MaDoiTuong = null;
                    }
                    hoSo.TrichYeuHoSo = string.IsNullOrEmpty(hs.TrichYeuHoSo) ? "Dinhkem" : hs.TrichYeuHoSo.Length > 1000 ? hs.TrichYeuHoSo.Substring(0, 995) + "..." : hs.TrichYeuHoSo;

                    if (!string.IsNullOrEmpty(hoSo.NgayHenTra))
                    {
                        hoSo.NgayHenTra = DateTime.Parse(hoSo.NgayHenTra).ToString("yyyyMMddHHmmss");
                    }
                    if (!string.IsNullOrEmpty(hoSo.NgayTra))
                    {
                        hoSo.NgayTra = DateTime.Parse(hoSo.NgayTra).ToString("yyyyMMddHHmmss");
                    }
                    if (!string.IsNullOrEmpty(hoSo.NgayYeuCauBoSung))
                    {
                        hoSo.NgayYeuCauBoSung = DateTime.Parse(hoSo.NgayYeuCauBoSung).ToString("yyyyMMddHHmmss");
                    }
                    if (!string.IsNullOrEmpty(hoSo.NgayKetThucXuLy))
                    {
                        hoSo.NgayKetThucXuLy = DateTime.Parse(hoSo.NgayKetThucXuLy).ToString("yyyyMMddHHmmss");
                    }
                    if (!string.IsNullOrEmpty(hoSo.NgayTuChoi))
                    {
                        hoSo.NgayTuChoi = DateTime.Parse(hoSo.NgayTuChoi).ToString("yyyyMMddHHmmss");
                    }
                    if (!string.IsNullOrEmpty(hoSo.NgayNopHoSo))
                    {
                        hoSo.NgayNopHoSo = DateTime.Parse(hoSo.NgayNopHoSo).ToString("yyyyMMddHHmmss");
                    }
                    if (!string.IsNullOrEmpty(hs.SoGiayToChuHoSo))
                    {
                        SyncDataToDVCQG.DinhDanhCHS loaiDinhDanh = new SyncDataToDVCQG.DinhDanhCHS();
                        if (hs.SoGiayToChuHoSo.Length == 9)
                        {
                            loaiDinhDanh.LoaiDinhDanh = "2";
                            loaiDinhDanh.SoDinhDanh = hs.SoGiayToChuHoSo;
                        }
                        else if (hs.SoGiayToChuHoSo.Length == 12)
                        {
                            loaiDinhDanh.LoaiDinhDanh = "1";
                            loaiDinhDanh.SoDinhDanh = hs.SoGiayToChuHoSo;
                        } else
                        {
                            loaiDinhDanh.SoDinhDanh = "000000001";
                            loaiDinhDanh.LoaiDinhDanh = "2";
                        }
                        hoSo.DinhDanhCHS.Add(loaiDinhDanh);
                        if (!dinhDanhCHS.TryGetValue(hs.Id, out var dinhDanhCHSData))
                        {
                            dinhDanhCHS.Add(hs.Id, dinhDanhCHSData = loaiDinhDanh);
                        }
                    }
                    if (hoSo.DinhDanhCHS.Count == 0)
                    {
                        SyncDataToDVCQG.DinhDanhCHS dinhdanh = new SyncDataToDVCQG.DinhDanhCHS();
                        dinhdanh.SoDinhDanh = "000000001";
                        dinhdanh.LoaiDinhDanh = "2";
                        hoSo.DinhDanhCHS.Add(dinhdanh);
                        if (!dinhDanhCHS.TryGetValue(hs.Id, out var dinhDanhCHSData))
                        {
                            dinhDanhCHS.Add(hs.Id, dinhDanhCHSData = dinhdanh);
                        }
                    }
                    hoSo.DSKetNoiCSDL.Add(new DSKetNoiCSDL { MaCSDL = "7" });
                }
                
                if (qtxl != null)
                {
                    if (!quaTrinhXuLyHoSo.TryGetValue(qtxl.Id, out var quaTrinhXuLy))
                    {
                        if (!string.IsNullOrEmpty(qtxl.ThoiDiemXuLy))
                        {
                            qtxl.ThoiDiemXuLy = DateTime.Parse(qtxl.ThoiDiemXuLy).ToString("yyyyMMddHHmmss");
                        }
                        if (!string.IsNullOrEmpty(qtxl.NgayBatDau))
                        {
                            qtxl.NgayBatDau = DateTime.Parse(qtxl.NgayBatDau).ToString("yyyyMMddHHmmss");
                        }
                        if (!string.IsNullOrEmpty(qtxl.NgayKetThucTheoQuyDinh))
                        {
                            qtxl.NgayKetThucTheoQuyDinh = DateTime.Parse(qtxl.NgayKetThucTheoQuyDinh).ToString("yyyyMMddHHmmss");
                        }
                        if (string.IsNullOrEmpty(qtxl.NguoiXuLy))
                        {
                            qtxl.NguoiXuLy = "Chuyên viên";
                        } else
                        {
                            if(qtxl.NguoiXuLy.Length > 50)
                            {
                                qtxl.NguoiXuLy = qtxl.NguoiXuLy.Substring(0, 46) + "...";
                            }
                        }
                        qtxl.TrangThai = !string.IsNullOrEmpty(qtxl.TrangThai) ? qtxl.TrangThai : "4";
                        hoSo.QuaTrinhXuLyHoSos.Add(qtxl);
                        quaTrinhXuLyHoSo.Add(qtxl.Id, quaTrinhXuLy = qtxl);
                    }
                }
                if (tphs != null)
                {
                    if (!taiLieuNop.TryGetValue(tphs.Id, out var thanhPhanHoSo))
                    {
                        tphs.MaThanhPhanHoSo = string.IsNullOrEmpty(tphs.MaThanhPhanHoSo) ? "" : tphs.MaThanhPhanHoSo;
                        tphs.TenTepDinhKem = string.IsNullOrEmpty(tphs.TenTepDinhKem) ? "Dinhkem" : tphs.TenTepDinhKem.Length > 4000 ? tphs.TenTepDinhKem.Substring(0, 3995) + "..." : tphs.TenTepDinhKem;
                        if (hoSo.LaHoSoChungThuc == true)
                        {
                            tphs.DuongDanTaiTepTin = KETNOIMOTCUAQUOCGIA_DOWNLOAD_URL + tphs.DinhKemGoc;
                        } else
                        {
                            tphs.DuongDanTaiTepTin = KETNOIMOTCUAQUOCGIA_DOWNLOAD_URL + tphs.DuongDanTaiTepTin;
                        }
                        if (!string.IsNullOrEmpty(hoSo.SoDinhDanh) && hoSo.TaiLieuNop != null && hoSo.TaiLieuNop.Count == 0)
                        {
                            tphs.DuocTaiSuDung = "1";
                        }
                        if (!string.IsNullOrEmpty(tphs.DuocSoHoa))
                        {
                            hoSo.HoSoCoThanhPhanSoHoa = "1";
                        }
                        if (!string.IsNullOrEmpty(tphs.DuongDanTaiTepTin))
                        {
                            var listTPHS = tphs.DuongDanTaiTepTin.Split("##");
                            if(listTPHS.Length > 0)
                            {
                                tphs.DuongDanTaiTepTin = listTPHS[0];
                            }
                        }
                        tphs.DuocLayTuKhoDMQG = (tphs.DuocLayTuKhoDMQG  == null || tphs.DuocLayTuKhoDMQG == "0") ? "0" : "1";
                        hoSo.TaiLieuNop.Add(tphs);
                        taiLieuNop.Add(tphs.Id, thanhPhanHoSo = tphs);
                    }
                }
                if (yctt != null)
                {
                    if (!lePhi.TryGetValue(yctt.Id, out var yeuCauThanhToan))
                    {
                        yctt.TenPhiLePhi = !string.IsNullOrEmpty(yctt.TenPhiLePhi) ? yctt.TenPhiLePhi : hoSo.MaHoSo;
                        hoSo.DanhSachLePhi.Add(yctt);
                        if(yctt.TrangThai == trangThaiThanhToan.TRANG_THAI.DA_THANH_TOAN)
                        {
                            hoSo.DuocThanhToanTrucTuyen = "1";
                        } else
                        {
                            hoSo.DuocThanhToanTrucTuyen = "3";
                        }
                        lePhi.Add(yctt.Id, yeuCauThanhToan = yctt);
                    }
                }
                hoSo.TenTTHC = hoSo.TenTTHC;
                if (!string.IsNullOrEmpty(hoSo.MaKetQuaChinh) && !string.IsNullOrEmpty(hoSo.DinhKemKetQua))
                {
                    var dinhKemArr = hoSo.DinhKemKetQua.Split("##");
                    for (int i = 0; i < dinhKemArr.Length; i++)
                    {
                        var dinhKem = dinhKemArr[i];
                        if (!string.IsNullOrEmpty(dinhKem))
                        {
                            SyncDataToDVCQG.GiayToKetQua giayToKetQua = new SyncDataToDVCQG.GiayToKetQua()
                            {
                                TenGiayTo = Path.GetFileName(dinhKem),
                                MaGiayToKetQua = hoSo.MaKetQuaChinh,
                                DuongDanTepTinKetQua = KETNOIMOTCUAQUOCGIA_DOWNLOAD_URL + dinhKem,
                            };
                            if (!danhSachGiayToKetQua.TryGetValue(dinhKem, out var giayToKetQuaData))
                            {
                                hoSo.DanhSachGiayToKetQua.Add(giayToKetQua);
                                danhSachGiayToKetQua.Add(dinhKem, giayToKetQua);
                            }
                        }
                    }
                } else if(!string.IsNullOrEmpty(hoSo.MaKetQuaChinh) && hoSo.TaiLieuNop.Count > 0)
                {
                    string tenTepDinhKem = hoSo.TaiLieuNop[0].TenTepDinhKem;
                    string tenGiayTo = string.IsNullOrEmpty(tenTepDinhKem) ? "DinhKemKetQua" : tenTepDinhKem.Length >= 2000 ? tenTepDinhKem.Substring(0, 1995) + "..." : tenTepDinhKem;

                    SyncDataToDVCQG.GiayToKetQua giayToKetQua = new SyncDataToDVCQG.GiayToKetQua()
                    {
                        TenGiayTo = tenGiayTo,
                        MaGiayToKetQua = hoSo.MaKetQuaChinh,
                        DuongDanTepTinKetQua = hoSo.TaiLieuNop[0].DuongDanTaiTepTin,
                    };
                    if (!danhSachGiayToKetQua.TryGetValue(hoSo.TaiLieuNop[0].DuongDanTaiTepTin, out var giayToKetQuaData))
                    {
                        hoSo.DanhSachGiayToKetQua.Add(giayToKetQua);
                        danhSachGiayToKetQua.Add(hoSo.TaiLieuNop[0].DuongDanTaiTepTin, giayToKetQua);
                    }
                }

                return hoSo;
            }, param: new
            {
                NgayTiepNhanFrom = ngayTiepNhanFrom,
                NgayTiepNhanTo = ngayTiepNhanTo,
                MaHoSo = maHoSo,
            }, splitOn: "Id,Id,Id,Id");

        return hoSoDic.Values.ToList();
    }

    public async Task<string> PushData(SyncDataToDVCQG.HoSoDto hoSo)
    {
        string updateStatusQTXLSync = $"Update {SchemaNames.Business}.{TableNames.QuaTrinhXuLyHoSos} SET TrangThaiDongBoDVCQuocGia = @TrangThaiDongBoDVCQuocGia WHERE Id In @Ids";
        string trangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        string noiDungDongBo = string.Empty;
        bool hoSoKhongCoNgayHenTra = string.IsNullOrEmpty(hoSo.NgayHenTra);
        var formatedData = FormatData(hoSo);
        var hoSoObj = formatedData.hoSo;
        var tienTrinhDongBo = formatedData.tienTrinhDongBo;
        var reqHoSoBody = new List<SyncDataToDVCQG.HoSoDongBoDVC>() { };
        var maHoSoRes = GetMaHoSo(hoSo.MaHoSo, hoSo.MaHoSoKhac, hoSo.NgayTiepNhan, hoSo.MaDinhDanh);
        hoSoObj.MaHoSo = maHoSoRes.MaHoSo;
        string updateMaHoSoKhac = string.Empty;
        if (maHoSoRes.LaMaRandom)
        {
            updateMaHoSoKhac = ", MaHoSoKhac = @MaHoSoKhac";
        }
        reqHoSoBody.Add(hoSoObj);
        string updateStatusSync = $"Update {SchemaNames.Business}.{TableNames.HoSos} SET TrangThaiDongBoDVC = @TrangThaiDongBoDVC {updateMaHoSoKhac} WHERE MaHoSo = @MaHoSo";
        try
        {
            if(string.IsNullOrEmpty(hoSo.TrangThaiDongBoDVC) || hoSo.TrangThaiDongBoDVC == HoSo_TrangThaiDongBoDVC.ChuaDongBo)
            {
                var responseThemMoi = await RequestHandler<List<SyncDataToDVCQG.HoSoDongBoDVC>, SyncDataToDVCQG.ResultHoSoDongBoDVCQuocGia>(reqHoSoBody, _settings.URLThemMoi);
                if (responseThemMoi.error_code == "0" || responseThemMoi.error_code == "3" || responseThemMoi.error_code == "-3")
                {
                    //_logger.LogError($"DVCQG_LOGSUCCESS:_{hoSo.MaHoSo}_{JsonConvert.SerializeObject(reqHoSoBody)}_response:{JsonConvert.SerializeObject(responseThemMoi)}");
                    if (responseThemMoi.message.Contains("đã tồn tại"))
                    {
                        var responseCapNhat = await RequestHandler<List<SyncDataToDVCQG.HoSoDongBoDVC>, SyncDataToDVCQG.ResultHoSoDongBoDVCQuocGia>(reqHoSoBody, _settings.URLCapNhat);
                        if (responseCapNhat.error_code == "0")
                        {
                            if (responseCapNhat.message.ToLower().Contains("thành công"))
                            {
                                trangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.DaDongBo;
                                noiDungDongBo = "Dong bo Thanh cong";
                            }
                        }
                    }
                    else
                    {
                        if (responseThemMoi.error_code == "0" && responseThemMoi.message.ToLower().Contains("thành công"))
                        {
                            trangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.DaDongBo;
                        }
                        else
                        {
                            noiDungDongBo = "Dong bo that bai" + JsonConvert.SerializeObject(responseThemMoi);
                        }
                    }
                }
                if (trangThaiDongBoDVC == HoSo_TrangThaiDongBoDVC.DaDongBo)
                {

                    tienTrinhDongBo.Insert(0, new QuaTrinhXuLyDongBoDVC()
                    {
                        MaHoSo = hoSoObj.MaHoSo,
                        ChucDanh = "",
                        NguoiXuLy = "Cán bộ một cửa",
                        NoiDungXuLy = "Tiếp nhận hồ sơ",
                        ThoiDiemXuLy = hoSo.NgayTiepNhan,
                        TrangThai = "2",
                        NgayBatDau = "",
                        NgayKetThucTheoQuyDinh = "",
                        PhongBanXuLy = ""
                    });
                    if (hoSo.TrangThaiHoSo == "9" || hoSo.TrangThaiHoSo == "10")
                    {
                        var ngayKetThuc = hoSo.NgayTiepNhan;
                        try
                        {
                            if (!string.IsNullOrEmpty(hoSo.NgayKetThucXuLy))
                            {
                                ngayKetThuc = hoSo.NgayKetThucXuLy;
                            }
                        }
                        catch (Exception ex) { }
                        tienTrinhDongBo.Add(new QuaTrinhXuLyDongBoDVC()
                        {
                            MaHoSo = hoSoObj.MaHoSo,
                            ChucDanh = "",
                            NguoiXuLy = "Cán bộ một cửa",
                            NoiDungXuLy = "Kết thúc xử lý hồ sơ",
                            ThoiDiemXuLy = ngayKetThuc,
                            TrangThai = "9",
                            NgayBatDau = "",
                            NgayKetThucTheoQuyDinh = "",
                            PhongBanXuLy = ""
                        });
                    }
                    else if(hoSo.TrangThaiHoSo == "5" || hoSo.TrangThaiHoSo == "6" || hoSo.TrangThaiHoSo == "8")
                    {
                        var ngayKetThuc = hoSo.NgayTiepNhan;
                        try
                        {
                            if (!string.IsNullOrEmpty(hoSo.NgayYeuCauBoSung))
                            {
                                ngayKetThuc = hoSo.NgayYeuCauBoSung;
                            }
                        }
                        catch (Exception ex) { }
                        string noiDungXuLy = hoSo.TrangThaiHoSo == "5" ? "Cán bộ trả hồ sơ bổ sung" : hoSo.TrangThaiHoSo == "6" ? "Công dân thực hiện NVTC" : hoSo.TrangThaiHoSo == "8" ? "Cán bộ trả bổ sung hồ sơ" : string.Empty;
                        tienTrinhDongBo.Add(new QuaTrinhXuLyDongBoDVC()
                        {
                            MaHoSo = hoSoObj.MaHoSo,
                            ChucDanh = "",
                            NguoiXuLy = "Cán bộ một cửa",
                            NoiDungXuLy = noiDungXuLy,
                            ThoiDiemXuLy = ngayKetThuc,
                            TrangThai = "9",
                            NgayBatDau = "",
                            NgayKetThucTheoQuyDinh = "",
                            PhongBanXuLy = ""
                        });
                    }
                    else  
                    {
                        if (hoSoKhongCoNgayHenTra)
                        {
                            tienTrinhDongBo.Add(new QuaTrinhXuLyDongBoDVC()
                            {
                                MaHoSo = hoSoObj.MaHoSo,
                                ChucDanh = "",
                                NguoiXuLy = "Cán bộ một cửa",
                                NoiDungXuLy = "Hồ sơ không có ngày hẹn trả",
                                ThoiDiemXuLy = hoSo.NgayTiepNhan,
                                TrangThai = "9",
                                NgayBatDau = "",
                                NgayKetThucTheoQuyDinh = "",
                                PhongBanXuLy = ""
                            });
                        }
                    }
                    if(tienTrinhDongBo != null && tienTrinhDongBo.Count > 0)
                    {
                        for (int i = 0; i < tienTrinhDongBo.Count; i += 10)
                        {
                            string trangThaiDongBoQTXLDVC = QuaTrinhXuLyHoSoConstant.ChuaDongBo;
                            var chunk = tienTrinhDongBo.Skip(i).Take(10).ToList();
                            chunk = chunk?.Select(x => new QuaTrinhXuLyDongBoDVC()
                            {
                                MaHoSo = hoSoObj.MaHoSo,
                                ChucDanh = x.ChucDanh,
                                NgayBatDau = x.NgayBatDau,
                                NgayKetThucTheoQuyDinh = x.NgayKetThucTheoQuyDinh,
                                NguoiXuLy = x.NguoiXuLy,
                                NoiDungXuLy = x.NoiDungXuLy,
                                PhongBanXuLy = x.PhongBanXuLy,
                                ThoiDiemXuLy = x.ThoiDiemXuLy,
                                TrangThai = x.TrangThai
                            }).ToList();
                            var chunkIds = hoSo.QuaTrinhXuLyHoSos?.Skip(i).Take(10).Select(x => x.Id).ToList();
                            var responseTienTrinh = await RequestHandlerReturnPlainText<List<SyncDataToDVCQG.QuaTrinhXuLyDongBoDVC>>(chunk, _settings.URLDongBoTienTrinh);
                            bool isSucceed = responseTienTrinh.ToLower().Contains("thành công");
                            if (isSucceed)
                            {
                                trangThaiDongBoQTXLDVC = QuaTrinhXuLyHoSoConstant.DaDongBo;
                                if (chunkIds != null && chunkIds.Count > 0)
                                {
                                    var updateCountQTXL = await _dapperRepository.ExcuteAsync(updateStatusQTXLSync, new
                                    {
                                        TrangThaiDongBoDVCQuocGia = trangThaiDongBoQTXLDVC,
                                        Ids = chunkIds.Select(id => id.ToString()).ToArray()
                                    });
                                    if (updateCountQTXL == 0)
                                    {
                                        _logger.LogError($"{nameof(PushData)}DVCQG_tienTrinh_{hoSo.MaHoSo}_randommhs{hoSoObj.MaHoSo}_{string.Join(",", chunkIds ?? [])}_{trangThaiDongBoQTXLDVC}_Capnhat tien trinh that bai");
                                    }
                                }
                            }
                            else
                            {
                                _logger.LogError($"{nameof(PushData)}DVCQG_DongBoTienTrinh_start:{i}_{hoSo.MaHoSo}_randommhs{hoSoObj.MaHoSo}_{string.Join(",", chunkIds ?? [])}_{tienTrinhDongBo.Count}_{responseTienTrinh.ToString()}");
                            }
                        }
                    }
                    else
                    {
                        //var responseTienTrinh = await RequestHandlerReturnPlainText<List<SyncDataToDVCQG.QuaTrinhXuLyDongBoDVC>>(tienTrinhDongBo, _settings.URLDongBoTienTrinh);
                        //if (responseTienTrinh.ToLower().Contains("thành công"))
                        //{
                        //    trangThaiDongBoQTXLDVC = QuaTrinhXuLyHoSoConstant.DaDongBo;
                        //}
                        //else
                        //{
                        //    _logger.LogError($"{nameof(PushData)}DVCQG_DongBoTienTrinh_elseCase_{hoSo.MaHoSo}_{tienTrinhDongBo.Count}_{responseTienTrinh.ToString()}");
                        //}
                        _logger.LogError($"{nameof(PushData)}DVCQG_DongBoTienTrinh_KhongCoDuLieu_{hoSo.MaHoSo}_{tienTrinhDongBo.Count}");
                    }
                }
                else
                {
                    _logger.LogError($"{nameof(PushData)}_DVCQG_DongBoHoSo1_{hoSo.MaHoSo}_{noiDungDongBo}");
                }
            } 
        }
        catch (Exception ex)
        {
            _logger.LogError($"{nameof(PushData)}_LOIDONGBODVCQG_{hoSo.MaHoSo}_{trangThaiDongBoDVC}_{ex.ToString()}");
        }
        var updateCount = await _dapperRepository.ExcuteAsync(updateStatusSync, new
        {
            TrangThaiDongBoDVC = trangThaiDongBoDVC,
            MaHoSo = hoSo.MaHoSo,
            MaHoSoKhac = maHoSoRes.MaHoSo
        });
        if (updateCount == 0)
        {
            _logger.LogError($"{nameof(PushData)}DVCQG1_{hoSo.MaHoSo}_{trangThaiDongBoDVC}_Khong cap nhat duoc trang thai thanh cong");
        }
        //if(tienTrinhDongBo.Count > 0)
        //{
        //    var updateCountQTXL = await _dapperRepository.ExcuteAsync(updateStatusQTXLSync, new
        //    {
        //        TrangThaiDongBoDVCQuocGia = trangThaiDongBoQTXLDVC,
        //        MaHoSo = hoSo.MaHoSo
        //    });
        //    if (updateCountQTXL == 0)
        //    {
        //        _logger.LogError($"{nameof(PushData)}DVCQG_tienTrinh_{hoSo.MaHoSo}_{trangThaiDongBoQTXLDVC}_Capnhat tien trinh that bai");
        //    }
        //}
        return "trangThaiDongBoDVC:" + trangThaiDongBoDVC;
    }

    public async Task<Result> CapNhatChuaDongBoMaHoSoLois(IReadOnlyList<string> maHoSos)
    {
        string sql = $@"update Business.Hosos set TrangThaiDongBoDVC = '0' where MaHoSo in (
                select distinct hs.MaHoso from Business.Hosos hs inner join Business.QuaTrinhXuLyHoSos qtxl on hs.MaHoSo = qtxl.MaHoSo
                where hs.TrangThaiDongBoDVC = 1 and MaHoSo IN @MaHoSos and (qtxl.TrangThaiDongBoDVCQuocGia is null or qtxl.TrangThaiDongBoDVCQuocGia = '0'))";
        if (!maHoSos.Any())
        {
            return (Result)Result.Fail("Vui lòng cung cấp mã hồ sơ");
        }
        int updateCount = await _dapperRepository.ExcuteAsync(sql, new
        {
            MaHoSos = maHoSos
        });
        return (Result)Result.Success($"Cập nhật chưa đồng bộ thành công {updateCount}/{maHoSos.Count()} hồ sơ");
    }

    public async Task<object> GetDataDB(NgayTiepNhanDongBoDVCQG req)
    {
        return  await GetData(req.ngayTiepNhanFrom, req.ngayTiepNhanTo, req.maHoSo);
    }
    public async Task<object> SyncData(string ngayTiepNhanFrom, string ngayTiepNhanTo)
    {
        if (!_settings.Enable)
        {
            return new {};
        }
        if (string.IsNullOrEmpty(KETNOIMOTCUAQUOCGIA_DOWNLOAD_URL))
        {
            throw new Exception("Chưa cấu hình KETNOIMOTCUAQUOCGIA_DOWNLOAD_URL");
        }
        var maHoSos = await GetMaHoSos(ngayTiepNhanFrom, ngayTiepNhanTo);
        if(maHoSos != null && maHoSos.Count > 0)
        {
            for (int i = 0; i < maHoSos.Count; i++)
            {
                var maHoSo = maHoSos[i].MaHoSo;
                var hoSos = await GetData("", "", maHoSo);
                if (hoSos != null && hoSos.Count > 0)
                {
                    var hoSo = hoSos[0];
                    await PushData(hoSo);
                }
            }
        }
        return new
        {
            total = maHoSos.Count
        };
        //var datas = await GetData(ngayTiepNhanFrom, ngayTiepNhanTo, "");
        //if (datas != null && datas.Count > 0)
        //{
        //    for (int i = 0; i < datas.Count; i++)
        //    {
        //        await PushData(datas[i]);
        //    }
        //}
        //return datas;
    }
    
    public SyncDataToDVCQG.FormatDataDVC FormatData(SyncDataToDVCQG.HoSoDto hoSoDto)
    {
        var hoSoObj = hoSoDto.Adapt<SyncDataToDVCQG.HoSoDongBoDVC>();
        var tienTrinhDongBo = new List<SyncDataToDVCQG.QuaTrinhXuLyDongBoDVC>();
        if (hoSoDto.QuaTrinhXuLyHoSos != null && hoSoDto.QuaTrinhXuLyHoSos.Count > 0)
        {
            tienTrinhDongBo = hoSoDto.QuaTrinhXuLyHoSos.Adapt<List<SyncDataToDVCQG.QuaTrinhXuLyDongBoDVC>>();
        }
        return new SyncDataToDVCQG.FormatDataDVC()
        {
            hoSo = hoSoObj,
            tienTrinhDongBo = tienTrinhDongBo,
        };
        //await PushData(hoSoDto);
    }
}
