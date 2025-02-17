using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Shared.Events;

namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class MotCuaYeuCauBoSungHoSoEvent : HoSoEvent
{
    public string MaTrangThaiMoi { get; set; }
    public string MaGiayToHoSo { get; set; }
    public string TenDonViCha { get; set; }
    public string BoPhanTiepNhanVaTraKetQua { get; set; }
    public string MaHoSo { get; set; }
    public string TenDiaDanh { get; set; }
    public string NgayThangNam { get; set; }
    public string HoTenNguoiNop { get; set; }
    public string TenHoSo { get; set; }
    public string LyDoBoSung { get; set; }
    public string ThoiHanBoSung { get; set; }
    public string TenNguoiHuongDan { get; set; }
    public string SoDienThoaiHoTro { get; set; }
    public string SoDienThoaiNguoiNop { get; set; }
    public string EmailNguoiNop { get; set; }
    public string IdCongDan { get; set; }
    public MotCuaYeuCauBoSungHoSoEvent(Business.HoSo hoSo, string maGiayToHoSo, string maTrangThaiMoi, string tenNguoiHuongDan, string userOfficeName, string lyDoBoSung, string thoiHanBoSung, string tenDonViCha, string groupCatalog, string ofGroupName, string tenTinhThanh, string soDienThoaiHoTro) : base(hoSo)
    {
        TenDiaDanh = HoSoEventUtils.GetTenDiaDanh(userOfficeName, groupCatalog, tenTinhThanh);
        MaTrangThaiMoi = maTrangThaiMoi;
        MaGiayToHoSo = maGiayToHoSo;
        DateTime currentDate = DateTime.Now;
        NgayThangNam = string.Format("ngày {0} tháng {1} năm {2}", currentDate.Day, currentDate.Month, currentDate.Year);
        TenNguoiHuongDan = tenNguoiHuongDan;
        HoTenNguoiNop = (hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo) ?? "";
        SoDienThoaiNguoiNop = (hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo) ?? "";
        EmailNguoiNop = (hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo) ?? "";
        LyDoBoSung = lyDoBoSung;
        MaHoSo = hoSo.MaHoSo;
        if (!string.IsNullOrEmpty(thoiHanBoSung))
        {
            ThoiHanBoSung = $"Thời gian thực hiện bổ sung: {thoiHanBoSung} ngày.";
        }
        else
        {
            ThoiHanBoSung = "";
        }

        if (!string.IsNullOrEmpty(hoSo.TrichYeuHoSo))
        {
            TenHoSo = hoSo.TrichYeuHoSo;
        }
        else
        {
            TenHoSo = "";
        }
        if (groupCatalog == GroupContants.XA_PHUONG || groupCatalog == GroupContants.QUAN_HUYEN)
        {
            TenDonViCha = tenDonViCha.ToUpper();
            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "</strong>";
        }
        else if (groupCatalog == GroupContants.SO_BAN_NGANH)
        {
            TenDonViCha = HoSoEventUtils.TrungTamPhucVuHanhChinhCong.ToUpper() + "</br>" + "<strong>" + "TỈNH " + tenTinhThanh.ToUpper() + "</strong>";
            BoPhanTiepNhanVaTraKetQua = "";
        }
        else if (groupCatalog == GroupContants.CNVPDK)
        {
            if (ofGroupName.Contains("UBND"))
            {
                ofGroupName = ofGroupName.Replace("UBND", "");
            }
            TenDonViCha = HoSoEventUtils.ChiNhanhVanPhongDangKyDatDai.ToUpper() + " " + ofGroupName.ToUpper();
            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "</strong>";
        }
        SoDienThoaiHoTro = soDienThoaiHoTro;
        IdCongDan = hoSo.UyQuyen == true ? hoSo.SoGiayToNguoiUyQuyen : hoSo.SoGiayToChuHoSo;
    }
}
