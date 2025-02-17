using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class YeuCauCongDanBoSungEvent : HoSoEvent
{
    public string NgayThangNam { get; set; }
    public string HoTenNguoiNop { get; set; }
    public string LyDoBoSung { get; set; }
    public string TenNguoiTiepNhan { get; set; }
    public string TenDonViCha { get; set; }
    public string TenHoSo { get; set; }
    public string TenDiaDanh { get; set; }
    public string SoDienThoaiHoTro { get; set; }
    public string BoPhanTiepNhanVaTraKetQua { get; set; }
    public string IdCongDan { get; set; }
    public YeuCauCongDanBoSungEvent(Business.HoSoQLVB hoSo, string tenNguoiTiepNhan, string tenDonViCha, string tenHoSo, string soDienThoaiHoTro, string groupCatalog, string tenTinhThanh) : base(hoSo)
    {
        var now = DateTime.Now;
        NgayThangNam = HoSoEventUtils.GetFormatedNgayThangNam(now);
        HoTenNguoiNop = hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo;
        LyDoBoSung = hoSo.LyDoBoSung;
        TenNguoiTiepNhan = tenNguoiTiepNhan;
        TenHoSo = tenHoSo;
        SoDienThoaiHoTro = soDienThoaiHoTro;
        if (groupCatalog == GroupContants.XA_PHUONG || groupCatalog == GroupContants.QUAN_HUYEN)
        {
            TenDonViCha = tenDonViCha.ToUpper();
            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "</strong>";
        }
        else if (groupCatalog == GroupContants.SO_BAN_NGANH)
        {
            TenDonViCha = HoSoEventUtils.TrungTamPhucVuHanhChinhCong.ToUpper() + "</br>" + "<strong>" + " " + tenTinhThanh.ToUpper() + "</strong>";
            BoPhanTiepNhanVaTraKetQua = "";
        }
        else if (groupCatalog == GroupContants.CNVPDK)

        {
            if (hoSo.OfGroupName.Contains("UBND"))
            {
                hoSo.OfGroupName = hoSo.OfGroupName.Replace("UBND", "");
            }
            TenDonViCha = HoSoEventUtils.ChiNhanhVanPhongDangKyDatDai.ToUpper() + " " + hoSo.OfGroupName.ToUpper();

            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "<strong>";
        }
        IdCongDan = hoSo.UyQuyen == true ? hoSo.SoGiayToNguoiUyQuyen : hoSo.SoGiayToChuHoSo;
    }
}
