using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class TiepNhanHoSoKhongCoNgayHenTraEvent : HoSoEvent
{
    public string NgayThangNam { get; set; }
    public string HoTenChuHoSo { get; set; }
    public string ThoiHanXuLy { get; set; }
    public string GioNhan { get; set; }
    public string NgayNhan { get; set; }
    public string NgayGioHenTra { get; set; }
    public string TenNguoiNhanHoSo { get; set; }
    public string TenDonVi { get; set; }
    public string TenDonViCha { get; set; }
    public string TenDiaDanh { get; set; }
    public string TenTTHC { get; set; }
    public TiepNhanHoSoKhongCoNgayHenTraEvent(Business.HoSoQLVB hoSo, string thoiHanXuLy, string tenNguoiNhanHoSo, string tenDonVi, string tenTTHC, string tenDonViCha, string groupCatalog, string tenTinhThanh) : base(hoSo)
    {
        NgayThangNam = HoSoEventUtils.GetFormatedNgayThangNam(hoSo.NgayTiepNhan);
        ThoiHanXuLy = thoiHanXuLy;
        GioNhan = HoSoEventUtils.GetFormatedNgayGio(hoSo.NgayTiepNhan);
        NgayNhan = HoSoEventUtils.GetFormatedNgayThangNam(hoSo.NgayTiepNhan);
        NgayGioHenTra = HoSoEventUtils.GetFormatedNgayGio(hoSo.NgayHenTra) + ", " + HoSoEventUtils.GetFormatedNgayThangNam(hoSo.NgayHenTra);
        TenNguoiNhanHoSo = tenNguoiNhanHoSo;
        HoTenChuHoSo = hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo;
        TenDonVi = tenDonVi;
        TenTTHC = tenTTHC;
        if (groupCatalog == GroupContants.XA_PHUONG || groupCatalog == GroupContants.QUAN_HUYEN)
        {
            TenDonViCha = tenDonViCha.ToUpper();
        }
        else if (groupCatalog == GroupContants.SO_BAN_NGANH)
        {
            TenDonViCha = HoSoEventUtils.TrungTamPhucVuHanhChinhCong.ToUpper() + "</br>" + "<strong>" + " " + tenTinhThanh.ToUpper() + "</strong>";
        }
        else if (groupCatalog == GroupContants.CNVPDK)

        {
            if (hoSo.OfGroupName.Contains("UBND"))
            {
                hoSo.OfGroupName = hoSo.OfGroupName.Replace("UBND", "");
            }
            TenDonViCha = HoSoEventUtils.ChiNhanhVanPhongDangKyDatDai.ToUpper() + " " + hoSo.OfGroupName.ToUpper();
        }
    }
}
