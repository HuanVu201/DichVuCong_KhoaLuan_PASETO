using System.Collections.Generic;
using System.Dynamic;
using System.Reflection;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Constant;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Constant;
using TD.DichVuCongApi.Domain.Portal;
using HoSoEntity = TD.DichVuCongApi.Domain.Business.HoSo;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;

public class NhacViecResponse
{
    public int moiDangKy { get; set; }
    public int duocTiepNhan { get; set; }
    //public int khongDuocTiepNhan { get; set; }
    public int dangXuLy { get; set; }
    public int tiepNhanPhiDiaGioi { get; set; }
    public int hoSoToiHan { get; set; }
    public int hoSoQuaHan { get; set; }
    public int choMotCuaBoSung { get; set; }
    public int choCongDanBoSung { get; set; }
    //public int daGuiBoSung { get; set; }
    //public int hoanThanhBoSung { get; set; }
    public int yeuCauThucHienNghiaVuTaiChinh { get; set; }
    //public int daChuyenXuLy { get; set; }
    //public int daChuyenXuLyCoKetQua { get; set; }
    public int congDanYeuCauRutHoSo { get; set; }
    public int dungXuLy { get; set; }
    public int choTraKetQua { get; set; }
    public int choTraBCCI { get; set; }
    public int choTraBCCITTHCC { get; set; }
    public int moiDangKyChungThuc { get; set; }
    public int duocTiepNhanChungThuc { get; set; }
    public int dangXuLyChungThuc { get; set; }
    public int choTraKetQuaChungThuc { get; set; }
    public int duThaoXinLoiChoThongQua { get; set; }
    public int duThaoBoSungChoThongQua { get; set; }
    public int duThaoTraLaiXinRutChoThongQua { get; set; }
}
public class NhacViecQueryHandler : IQueryHandler<NhacViecQuery, object>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly TrangThaiTraKetQuaHoSoConstant _trangThaiTraKetQuaHoSoConstant;

    public NhacViecQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _trangThaiTraKetQuaHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();

    }


    private string GenerateSelect(List<string> menus)
    {
        string nguoiDangXuLyCond = " NguoiDangXuLy LIKE '%' + @UserId + '%'";
        string nguoiDangXuLyEqualCond = " NguoiDangXuLy = @UserId ";
        string laHoSoChungThucCond = " LaHoSoChungThuc = 1";
        string khongLaHoSoChungThucCond = " LaHoSoChungThuc = 0";
        string nguoiDaXuLyCond = " NguoiDaXuLy Like '%' + @UserId + '%'";
        Dictionary<string, string> keyValuePairs = new Dictionary<string, string>();
        List<string> selectClause = new List<string>();
        keyValuePairs.Add("moiDangKy", $"SUM (CASE WHEN TrangThaiHoSoId = '1' AND {nguoiDangXuLyCond} AND {khongLaHoSoChungThucCond} THEN 1 ELSE 0 END) as moiDangKy");
        keyValuePairs.Add("tiepNhanPhiDiaGioi", $"SUM (CASE WHEN TrangThaiPhiDiaGioi = '1' AND TrangThaiHoSoId = '1' AND {nguoiDangXuLyEqualCond} AND {khongLaHoSoChungThucCond} THEN 1 ELSE 0 END) as tiepNhanPhiDiaGioi");
        keyValuePairs.Add("duocTiepNhan", $"SUM (CASE WHEN TrangThaiHoSoId = '2' AND {nguoiDangXuLyCond} AND {khongLaHoSoChungThucCond} AND ChoBanHanh = 0 THEN 1 ELSE 0 END) as duocTiepNhan");
        keyValuePairs.Add("dangXuLy", $"SUM (CASE WHEN TrangThaiHoSoId = '4' AND {nguoiDangXuLyCond} AND {khongLaHoSoChungThucCond} AND ChoBanHanh = 0 THEN 1 ELSE 0 END) as dangXuLy");
        keyValuePairs.Add("hoSoToiHan", $"SUM (CASE WHEN TrangThaiHoSoId in ('4', '2') AND NguoiNhanHoSo = @UserId AND NgayHenTra >= CAST(GETDATE() AS DATE) AND LaHoSoChungThuc = 0 AND (CONVERT(DATE, NgayHenTra) BETWEEN CONVERT(DATE, GETDATE()) AND CONVERT(DATE, DATEADD(DAY, 3, GETDATE())))  THEN 1 ELSE 0 END) as hoSoToiHan");
        keyValuePairs.Add("hoSoQuaHan", $"SUM (CASE WHEN TrangThaiHoSoId in ('4', '2') AND NguoiNhanHoSo = @UserId AND NgayHenTra <= CAST(GETDATE() AS DATE) AND LaHoSoChungThuc = 0 THEN 1 ELSE 0 END) as hoSoQuaHan");
        keyValuePairs.Add("choMotCuaBoSung", $"SUM (CASE WHEN TrangThaiHoSoId = '5' AND TrangThaiBoSung = N'Yêu cầu một cửa bổ sung' AND {nguoiDangXuLyCond} AND {khongLaHoSoChungThucCond} AND (TrangThaiTraKq = '{_trangThaiTraKetQuaHoSoConstant.DA_CHUYEN_TRA_KQ}' OR TrangThaiTraKq IS NULL OR TrangThaiTraKq = '') THEN 1 ELSE 0 END) as choMotCuaBoSung");
        keyValuePairs.Add("choCongDanBoSung", $"SUM (CASE WHEN TrangThaiHoSoId = '5' AND TrangThaiBoSung = N'Yêu cầu công dân bổ sung' AND {nguoiDangXuLyCond} AND {khongLaHoSoChungThucCond}  THEN 1 ELSE 0 END) as choCongDanBoSung");
        keyValuePairs.Add("yeuCauThucHienNghiaVuTaiChinh", $"SUM (CASE WHEN TrangThaiHoSoId = '6' AND {nguoiDangXuLyCond} AND {khongLaHoSoChungThucCond} THEN 1 ELSE 0 END) as yeuCauThucHienNghiaVuTaiChinh");
        keyValuePairs.Add("congDanYeuCauRutHoSo", $"SUM (CASE WHEN TrangThaiHoSoId = '7' AND {nguoiDangXuLyCond} AND {khongLaHoSoChungThucCond} THEN 1 ELSE 0 END) as congDanYeuCauRutHoSo");
        keyValuePairs.Add("dungXuLy", $"SUM (CASE WHEN TrangThaiHoSoId = '8' AND {nguoiDangXuLyCond} AND {khongLaHoSoChungThucCond}  THEN 1 ELSE 0 END) as dungXuLy");
        keyValuePairs.Add("choTraKetQua", $"SUM (CASE WHEN TrangThaiHoSoId = '9' AND (KenhThucHien = '2' or KenhThucHien = '1')  AND HinhThucTra = '0' AND TrangThaiTraKq = '3' AND {khongLaHoSoChungThucCond} AND DonViTraKq = @DonViTraKq THEN 1 ELSE 0 END)  as choTraKetQua");
        keyValuePairs.Add("choTraBCCI", $"SUM (CASE WHEN TrangThaiHoSoId = '9' AND  HinhThucTra = '1' AND TrangThaiTraKq = '3' AND {khongLaHoSoChungThucCond} AND DonViTraKq = @DonViTraKq THEN 1 ELSE 0 END)  as choTraBCCI");
        keyValuePairs.Add("choTraBCCITTHCC", $"SUM (CASE WHEN TrangThaiHoSoId = '9' AND HinhThucTra = '1' AND (TrangThaiTraKq = '3' OR TrangThaiTraKq IS NULL OR TrangThaiTraKq = '') AND DonViTraKq = @DonViTraKq THEN 1 ELSE 0 END)  as choTraBCCITTHCC");

        keyValuePairs.Add("moiDangKyChungThuc", $"SUM (CASE WHEN TrangThaiHoSoId = '1' AND {nguoiDangXuLyCond} AND {laHoSoChungThucCond} THEN 1 ELSE 0 END) as moiDangKyChungThuc");
        keyValuePairs.Add("duocTiepNhanChungThuc", $"SUM (CASE WHEN TrangThaiHoSoId = '2' AND {nguoiDangXuLyCond} AND {laHoSoChungThucCond} THEN 1 ELSE 0 END) as duocTiepNhanChungThuc");
        keyValuePairs.Add("dangXuLyChungThuc", $"SUM (CASE WHEN TrangThaiHoSoId = '4' AND {nguoiDangXuLyCond} AND {laHoSoChungThucCond} THEN 1 ELSE 0 END) as dangXuLyChungThuc");
        keyValuePairs.Add("choTraKetQuaChungThuc", $"SUM (CASE WHEN TrangThaiHoSoId = '9' AND DonViTraKq = @DonViTraKq AND HinhThucTra = '0' AND (TrangThaiTraKq = '3' OR TrangThaiTraKq IS NULL OR TrangThaiTraKq = '') AND NguoiNhanHoSo = @UserId AND {laHoSoChungThucCond} THEN 1 ELSE 0 END) as choTraKetQuaChungThuc");

        for (int i = 0; i < menus.Count; i++)
        {
            string menuName = menus[i];
            if (keyValuePairs.TryGetValue(menuName, out var sql))
            {
                selectClause.Add(sql);
            }
        }

        return string.Join(", ", selectClause);
    }

    private string GenerateSelectChoDuyetThongQua(List<string> menus)
    {
        string nguoiDangXuLyCond = " LanhDaoThongQua = @UserId ";
        string loaiXinLoi = DuThaoXuLyHoSoConstant.Loai_XinLoi;
        string loaiBoSung = DuThaoXuLyHoSoConstant.Loai_BoSung;
        string loaiTraLaiXinRut = DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut;
        string trangThaiChoKyDuyet = DuThaoXuLyHoSoConstant.TrangThai_ChoKyDuyet;
        Dictionary<string, string> keyValuePairs = new Dictionary<string, string>();
        List<string> selectClause = new List<string>();
        keyValuePairs.Add("duThaoXinLoiChoThongQua", $"SUM (CASE WHEN Loai = N'{loaiXinLoi}' AND TrangThai = N'{trangThaiChoKyDuyet}' THEN 1 ELSE 0 END) as duThaoXinLoiChoThongQua");
        keyValuePairs.Add("duThaoBoSungChoThongQua", $"SUM (CASE WHEN Loai = N'{loaiBoSung}' AND TrangThai = N'{trangThaiChoKyDuyet}' THEN 1 ELSE 0 END) as duThaoBoSungChoThongQua");
        keyValuePairs.Add("duThaoTraLaiXinRutChoThongQua", $"SUM (CASE WHEN Loai = N'{loaiTraLaiXinRut}' AND TrangThai = N'{trangThaiChoKyDuyet}' THEN 1 ELSE 0 END) as duThaoTraLaiXinRutChoThongQua");


        for (int i = 0; i < menus.Count; i++)
        {
            string menuName = menus[i];
            if (keyValuePairs.TryGetValue(menuName, out var sql))
            {
                selectClause.Add(sql);
            }
        }

        return string.Join(", ", selectClause);
    }

    public async Task<Result<object>> Handle(NhacViecQuery request, CancellationToken cancellationToken)
    {
        NhacViecResponse nhacViecResponse = new NhacViecResponse();
        var currentUserId = _currentUser.GetUserId();
        var currentUserOfficeCode = _currentUser.GetUserOfficeCode();
        //string selectClause = GenerateSelect(request.Menus);
        string selectChoDuyetThongQuaClause = GenerateSelectChoDuyetThongQua(request.Menus);
        //string sql = @$"SELECT 
        //                {selectClause}
        //                FROM Business.HoSos WITH (NOLOCK) WHERE DeletedOn is null AND NguoiDangXuLy Like '%' + @UserId + '%' 
        //                Group by DonViId";
        string sqlNguoiDangXuLy = @$"SELECT
            hs.{nameof(HoSoEntity.NguoiNhanHoSo)},
            hs.{nameof(HoSoEntity.MaHoSo)},
            hs.{nameof(HoSoEntity.TrangThaiHoSoId)},
            hs.{nameof(HoSoEntity.DonViTraKq)},
            hs.{nameof(HoSoEntity.HinhThucTra)},
            hs.{nameof(HoSoEntity.TrangThaiPhiDiaGioi)},
            hs.{nameof(HoSoEntity.LaHoSoChungThuc)},
            hs.{nameof(HoSoEntity.ChoBanHanh)},
            hs.{nameof(HoSoEntity.TrangThaiBoSung)},
            hs.{nameof(HoSoEntity.TrangThaiTraKq)},
            hs.{nameof(HoSoEntity.NgayHenTra)},
            hs.{nameof(HoSoEntity.KenhThucHien)},
            hs.{nameof(HoSoEntity.NguoiDangXuLy)}
            FROM {SchemaNames.Business}.{TableNames.NguoiXuLyHoSos} nxl WITH (NOLOCK)
            INNER JOIN {SchemaNames.Business}.{TableNames.HoSos} hs WITH (NOLOCK)
            ON nxl.{nameof(NguoiXuLyHoSo.HoSoId)} = hs.{nameof(HoSoEntity.Id)}
            WHERE nxl.{nameof(NguoiXuLyHoSo.NguoiXuLy)} = @UserId AND nxl.{nameof(NguoiXuLyHoSo.TrangThai)} in @TrangThai AND hs.{nameof(HoSoEntity.TrangThaiHoSoId)} NOT IN ('3', '10') AND hs.{nameof(HoSoEntity.DeletedOn)} is null 
        ";

        //var datas = await _dapperRepository.QueryAsync<NhacViecResponse>(sql, new
        //{
        //    UserId = currentUserId.ToString(),
        //    DonViId = currentUserOfficeCode,
        //    DonViTraKq = currentUserOfficeCode,
        //});
        List<string> trangThais = new List<string>()
        {
            NguoiXuLyHoSo.NguoiXuLyHoSo_TrangThai.DangXuLy,
            NguoiXuLyHoSo.NguoiXuLyHoSo_TrangThai.DaXuLy
        };
        var datas = await _dapperRepository.QueryAsync<NhacViecDBSelect>(sqlNguoiDangXuLy, new
        {
            UserId = currentUserId,
            DonViTraKq = currentUserOfficeCode,
            TrangThai = trangThais
        });
        bool hasMenuMoiDangKy = false;
        bool hasMenuDuocTiepNhan = false;
        bool hasMenuDangXuLy = false;
        bool hasMenuTiepNhanPhiDiaGioi = false;
        bool hasMenuHoSoToiHan = false;
        bool hasMenuHoSoQuaHan = false;
        bool hasMenuChoMotCuaBoSung = false;
        bool hasMenuChoCongDanBoSung = false;
        bool hasMenuYeuCauThucHienNghiaVuTaiChinh = false;
        bool hasMenuCongDanYeuCauRutHoSo = false;
        bool hasMenuDungXuLy = false;
        bool hasMenuChoTraKetQua = false;
        bool hasMenuChoTraBCCI = false;
        bool hasMenuChoTraBCCITTHCC = false;
        bool hasMenuMoiDangKyChungThuc = false;
        bool hasMenuDuocTiepNhanChungThuc = false;
        bool hasMenuDangXuLyChungThuc = false;
        bool hasMenuChoTraKetQuaChungThuc = false;
        bool hasMenuDuThaoXinLoiChoThongQua = false;
        bool hasMenuDuThaoBoSungChoThongQua = false;
        bool hasMenuDuThaoTraLaiXinRutChoThongQua = false;

        


        for (int i = 0; i < request.Menus.Count; i++)
        {
            string menuName = request.Menus[i];

            if (menuName == "moiDangKy")
            {
                hasMenuMoiDangKy = true;
            }
            if (menuName == "duocTiepNhan")
            {
                hasMenuDuocTiepNhan = true;
            }
            if (menuName == "dangXuLy")
            {
                hasMenuDangXuLy = true;
            }
            if (menuName == "tiepNhanPhiDiaGioi")
            {
                hasMenuTiepNhanPhiDiaGioi = true;
            }
            if (menuName == "hoSoToiHan")
            {
                hasMenuHoSoToiHan = true;
            }
            if (menuName == "hoSoQuaHan")
            {
                hasMenuHoSoQuaHan = true;
            }
            if (menuName == "choMotCuaBoSung")
            {
                hasMenuChoMotCuaBoSung = true;
            }
            if (menuName == "choCongDanBoSung")
            {
                hasMenuChoCongDanBoSung = true;
            }
            if (menuName == "yeuCauThucHienNghiaVuTaiChinh")
            {
                hasMenuYeuCauThucHienNghiaVuTaiChinh = true;
            }
            if (menuName == "congDanYeuCauRutHoSo")
            {
                hasMenuCongDanYeuCauRutHoSo = true;
            }
            if (menuName == "dungXuLy")
            {
                hasMenuDungXuLy = true;
            }
            if (menuName == "choTraKetQua")
            {
                hasMenuChoTraKetQua = true;
            }
            if (menuName == "choTraBCCI")
            {
                hasMenuChoTraBCCI = true;
            }
            if (menuName == "choTraBCCITTHCC")
            {
                hasMenuChoTraBCCITTHCC = true;
            }
            if (menuName == "moiDangKyChungThuc")
            {
                hasMenuMoiDangKyChungThuc = true;
            }
            if (menuName == "duocTiepNhanChungThuc")
            {
                hasMenuDuocTiepNhanChungThuc = true;
            }
            if (menuName == "dangXuLyChungThuc")
            {
                hasMenuDangXuLyChungThuc = true;
            }
            if (menuName == "choTraKetQuaChungThuc")
            {
                hasMenuChoTraKetQuaChungThuc = true;
            }
            if (menuName == "duThaoXinLoiChoThongQua")
            {
                hasMenuDuThaoXinLoiChoThongQua = true; 
            }
            if (menuName == "duThaoBoSungChoThongQua")
            {
                hasMenuDuThaoBoSungChoThongQua = true; 
            }
            if (menuName == "duThaoTraLaiXinRutChoThongQua")
            {
                hasMenuDuThaoTraLaiXinRutChoThongQua = true; 
            }
            if (menuName == "duThaoTraLaiXinRutChoThongQua")
            {
                hasMenuDuThaoTraLaiXinRutChoThongQua = true; 
            }

        }

        if (datas.Any())
        {
            DateTime today = DateTime.Now.Date;
            DateTime endDate = today.AddDays(3);
            Dictionary<string, HashSet<string>> maHoSoDict = new Dictionary<string, HashSet<string>>();
            
            for (int i = 0; i < datas.Count; i++)
            {
                var data = datas[i];
                
                string nguoiNhanHoSo = data.NguoiNhanHoSo;
                string maHoSo = data.MaHoSo;
                string nguoiDangXuLy = data.NguoiDangXuLy?.ToLower();
                string trangThaiHoSoId = data.TrangThaiHoSoId;
                string donViTraKq = data.DonViTraKq;
                string hinhThucTra = data.HinhThucTra;
                string trangThaiPhiDiaGioi = data.TrangThaiPhiDiaGioi;
                bool laHoSoChungThuc = data.LaHoSoChungThuc;
                bool choBanHanh = data.ChoBanHanh;
                string trangThaiBoSung = data.TrangThaiBoSung;
                string trangThaiTraKq = data.TrangThaiTraKq;
                DateTime? ngayHenTra = data.NgayHenTra;
                string kenhThucHien = data.KenhThucHien;
                bool isHoSoToiHan = ngayHenTra != null ? (ngayHenTra >= today
                   && ngayHenTra?.Date >= today
                   && ngayHenTra?.Date <= endDate) : false;
                bool isDonViTra = donViTraKq?.ToLower() == currentUserOfficeCode?.ToLower();
                bool isNguoiNhanHoSo = nguoiNhanHoSo?.ToLower() == currentUserId.ToString()?.ToLower();
                bool isContainNguoiDangXuLy = string.IsNullOrEmpty(nguoiDangXuLy) ? false : nguoiDangXuLy.Contains(currentUserId.ToString()?.ToLower());
                bool isEqualNguoiDangXuLy = string.IsNullOrEmpty(nguoiDangXuLy) ? false : nguoiDangXuLy == currentUserId.ToString()?.ToLower();
                if (!maHoSoDict.ContainsKey(maHoSo))
                {
                    maHoSoDict[maHoSo] = new HashSet<string>();
                }

                if (trangThaiHoSoId == "1" && !laHoSoChungThuc && hasMenuMoiDangKy && isContainNguoiDangXuLy)
                {
                    if (maHoSoDict[maHoSo].Add("moiDangKy"))
                    {
                        nhacViecResponse.moiDangKy++;
                    }
                }
                if (trangThaiHoSoId == "1" && !laHoSoChungThuc && trangThaiPhiDiaGioi == "1" && isEqualNguoiDangXuLy && hasMenuTiepNhanPhiDiaGioi)
                {
                    if (maHoSoDict[maHoSo].Add("tiepNhanPhiDiaGioi"))
                    {
                        nhacViecResponse.tiepNhanPhiDiaGioi++;
                    }
                }
                if (trangThaiHoSoId == "2" && !laHoSoChungThuc && !choBanHanh && isContainNguoiDangXuLy && hasMenuDuocTiepNhan)
                {
                    if (maHoSoDict[maHoSo].Add("duocTiepNhan"))
                    {
                        nhacViecResponse.duocTiepNhan++;
                    }
                }
                if (trangThaiHoSoId == "4" && !laHoSoChungThuc && !choBanHanh && hasMenuDangXuLy && isContainNguoiDangXuLy)
                {
                    if (maHoSoDict[maHoSo].Add("dangXuLy"))
                    {
                        nhacViecResponse.dangXuLy++;
                    }
                }
                if ((trangThaiHoSoId == "4" || trangThaiHoSoId == "2") && !laHoSoChungThuc && isNguoiNhanHoSo && isHoSoToiHan && hasMenuHoSoToiHan)
                {
                    if (maHoSoDict[maHoSo].Add("hoSoToiHan"))
                    {
                        nhacViecResponse.hoSoToiHan++;
                    }
                }
                if ((trangThaiHoSoId == "4" || trangThaiHoSoId == "2") && !laHoSoChungThuc && isNguoiNhanHoSo && ngayHenTra <= today && hasMenuHoSoQuaHan)
                {
                    if (maHoSoDict[maHoSo].Add("hoSoQuaHan"))
                    {
                        nhacViecResponse.hoSoQuaHan++;
                    }
                }
                if (trangThaiHoSoId == "5" && !laHoSoChungThuc && trangThaiBoSung == HoSoConstant.TrangThaiBoSungMotCua && hasMenuChoMotCuaBoSung && isContainNguoiDangXuLy)
                {
                    if (maHoSoDict[maHoSo].Add("choMotCuaBoSung"))
                    {
                        nhacViecResponse.choMotCuaBoSung++;
                    }
                }
                if (trangThaiHoSoId == "5" && !laHoSoChungThuc && trangThaiBoSung == HoSoConstant.TrangThaiBoSungCongDan && hasMenuChoCongDanBoSung && isContainNguoiDangXuLy)
                {
                    if (maHoSoDict[maHoSo].Add("choCongDanBoSung"))
                    {
                        nhacViecResponse.choCongDanBoSung++;
                    }
                }
                if (trangThaiHoSoId == "6" && !laHoSoChungThuc && hasMenuYeuCauThucHienNghiaVuTaiChinh && isContainNguoiDangXuLy)
                {
                    if (maHoSoDict[maHoSo].Add("yeuCauThucHienNghiaVuTaiChinh"))
                    {
                        nhacViecResponse.yeuCauThucHienNghiaVuTaiChinh++;
                    }
                }
                if (trangThaiHoSoId == "7" && !laHoSoChungThuc && hasMenuCongDanYeuCauRutHoSo && isContainNguoiDangXuLy)
                {
                    if (maHoSoDict[maHoSo].Add("congDanYeuCauRutHoSo"))
                    {
                        nhacViecResponse.congDanYeuCauRutHoSo++;
                    }
                }
                if (trangThaiHoSoId == "8" && !laHoSoChungThuc && hasMenuDungXuLy && isContainNguoiDangXuLy)
                {
                    if (maHoSoDict[maHoSo].Add("dungXuLy"))
                    {
                        nhacViecResponse.dungXuLy++;
                    }
                }
                if (trangThaiHoSoId == "9" && (kenhThucHien == "2" || kenhThucHien == "1") && !laHoSoChungThuc && hinhThucTra == "0" && trangThaiTraKq == "3" && isDonViTra && hasMenuChoTraKetQua)
                {
                    if (maHoSoDict[maHoSo].Add("choTraKetQua"))
                    {
                        nhacViecResponse.choTraKetQua++;
                    }
                }
                if (trangThaiHoSoId == "9" && !laHoSoChungThuc && hinhThucTra == "1" && trangThaiTraKq == "3" && isDonViTra && hasMenuChoTraBCCI)
                {
                    if (maHoSoDict[maHoSo].Add("choTraBCCI"))
                    {
                        nhacViecResponse.choTraBCCI++;
                    }
                }
                if (trangThaiHoSoId == "9" && hinhThucTra == "1" && (trangThaiTraKq == "3" || trangThaiTraKq == string.Empty || trangThaiTraKq == null) && !laHoSoChungThuc && isDonViTra && hasMenuChoTraBCCITTHCC)
                {
                    if (maHoSoDict[maHoSo].Add("choTraBCCITTHCC"))
                    {
                        nhacViecResponse.choTraBCCITTHCC++;
                    }
                }
                if (trangThaiHoSoId == "2" && laHoSoChungThuc && hasMenuDuocTiepNhanChungThuc && isContainNguoiDangXuLy)
                {
                    if (maHoSoDict[maHoSo].Add("duocTiepNhanChungThuc"))
                    {
                        nhacViecResponse.duocTiepNhanChungThuc++;
                    }
                }
                if (trangThaiHoSoId == "1" && laHoSoChungThuc && hasMenuMoiDangKyChungThuc && isContainNguoiDangXuLy)
                {
                    if (maHoSoDict[maHoSo].Add("moiDangKyChungThuc"))
                    {
                        nhacViecResponse.moiDangKyChungThuc++;
                    }
                }
                if (trangThaiHoSoId == "4" && laHoSoChungThuc && hasMenuDangXuLyChungThuc && isContainNguoiDangXuLy)
                {
                    if (maHoSoDict[maHoSo].Add("dangXuLyChungThuc"))
                    {
                        nhacViecResponse.dangXuLyChungThuc++;
                    }
                }
                if (trangThaiHoSoId == "9" && isDonViTra && hinhThucTra == "0" && (trangThaiTraKq == "3" || trangThaiTraKq == string.Empty || trangThaiTraKq == null) && isNguoiNhanHoSo && laHoSoChungThuc && hasMenuChoTraKetQuaChungThuc)
                {
                    if (maHoSoDict[maHoSo].Add("choTraKetQuaChungThuc"))
                    {
                        nhacViecResponse.choTraKetQuaChungThuc++;
                    }
                }
            }
        }

        string sqlChoDuyetThongQua = @$"SELECT 
                        {selectChoDuyetThongQuaClause}
                        FROM Business.DuThaoXuLyHoSos WITH (NOLOCK) WHERE LanhDaoThongQua = @UserId";

        bool checkDuyetThongQua = false;
        foreach (string menu in request.Menus)
        {
            if (menu.Contains("duThao"))
                checkDuyetThongQua = true;
        }


        if (checkDuyetThongQua)
        {
            var ChoDuyetThongQuaDatas = await _dapperRepository.QueryAsync<NhacViecResponse>(sqlChoDuyetThongQua, new
            {
                UserId = currentUserId.ToString(),
            });
            if (ChoDuyetThongQuaDatas != null && ChoDuyetThongQuaDatas.Count > 0 && datas != null && datas.Count > 0)
            {
                if (ChoDuyetThongQuaDatas[0].duThaoXinLoiChoThongQua != null && ChoDuyetThongQuaDatas[0].duThaoXinLoiChoThongQua > 0)
                {
                    nhacViecResponse.duThaoXinLoiChoThongQua = ChoDuyetThongQuaDatas[0].duThaoXinLoiChoThongQua;
                }
                else
                {
                    nhacViecResponse.duThaoXinLoiChoThongQua = 0;
                }

                if (ChoDuyetThongQuaDatas[0].duThaoBoSungChoThongQua != null && ChoDuyetThongQuaDatas[0].duThaoBoSungChoThongQua > 0)
                {
                    nhacViecResponse.duThaoBoSungChoThongQua = ChoDuyetThongQuaDatas[0].duThaoBoSungChoThongQua;
                }
                else
                {
                    nhacViecResponse.duThaoBoSungChoThongQua = 0;
                }

                if (ChoDuyetThongQuaDatas[0].duThaoTraLaiXinRutChoThongQua != null && ChoDuyetThongQuaDatas[0].duThaoTraLaiXinRutChoThongQua > 0)
                {
                    nhacViecResponse.duThaoTraLaiXinRutChoThongQua = ChoDuyetThongQuaDatas[0].duThaoTraLaiXinRutChoThongQua;
                }
                else
                {
                    nhacViecResponse.duThaoTraLaiXinRutChoThongQua = 0;
                }
            }
        }

        //dynamic totals = new ExpandoObject();
        //var totalsDict = (IDictionary<string, object>)totals;

        //var properties = typeof(NhacViecResponse).GetProperties(BindingFlags.Public | BindingFlags.Instance);

        //foreach (var property in properties)
        //{
        //    if (property.PropertyType == typeof(int))
        //    {
        //        totalsDict[property.Name] = datas.Sum(d => (int)property.GetValue(d));
        //    }
        //}

        return Result<object>.Success(data: nhacViecResponse);
    }

    private class NhacViecDBSelect
    {
        public string? NguoiNhanHoSo { get; set; }
        public string MaHoSo { get; set; }
        public string TrangThaiHoSoId { get; set; }
        public string? DonViTraKq { get; set; }
        public string? HinhThucTra { get; set; }
        public string? TrangThaiPhiDiaGioi { get; set; }
        public bool LaHoSoChungThuc { get; set; }
        public bool ChoBanHanh { get; set; }
        public string TrangThaiBoSung { get; set; }
        public string? TrangThaiTraKq { get; set; }
        public DateTime? NgayHenTra { get; set; }
        public string? KenhThucHien { get; set; }
        public string? NguoiDangXuLy { get; set; }
    }

    private class NhacViecDuThaoDBSelect
    {
        public string duThaoXinLoiChoThongQua { get; set; }
        public string duThaoBoSungChoThongQua { get; set; }
        public string duThaoTraLaiXinRutChoThongQua { get; set; }
    }
}
