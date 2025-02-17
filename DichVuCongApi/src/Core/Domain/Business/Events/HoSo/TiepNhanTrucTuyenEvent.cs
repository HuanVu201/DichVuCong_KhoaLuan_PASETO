using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class TiepNhanHoSoTrucTuyenEvent : HoSoEvent
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
    public string GroupCatalog { get; set; }
    public string DangKyNhanKetQuaTai { get; set; }
    public bool? KhongCoNgayHenTra { get; set; }
    public string BoPhanTiepNhanVaTraKetQua { get; set; }
    public string IdCongDan { get; set; }
    public TiepNhanHoSoTrucTuyenEvent(Business.HoSoQLVB hoSo, double? thoiHanXuLy, string tenNguoiNhanHoSo, string tenDonVi, string tenTTHC, string tenDonViCha, string groupCatalog, string tinhThanh, string tenTinhThanh, string loaiThoiGianThucHien, bool? khongCoNgayHenTra = false) : base(hoSo)
    {
        NgayThangNam = HoSoEventUtils.GetFormatedNgayThangNam(hoSo.NgayTiepNhan);
        ThoiHanXuLy = HoSoEventUtils.GetThoiGianThucHien(thoiHanXuLy, loaiThoiGianThucHien);
        GioNhan = HoSoEventUtils.GetFormatedNgayGio(hoSo.NgayTiepNhan);
        NgayNhan = HoSoEventUtils.GetFormatedNgayThangNam(hoSo.NgayTiepNhan);
        NgayGioHenTra = HoSoEventUtils.GetFormatedNgayGio(hoSo.NgayHenTra) + ", " + HoSoEventUtils.GetFormatedNgayThangNam(hoSo.NgayHenTra);
        TenDiaDanh = HoSoEventUtils.GetTenDiaDanh(tenDonViCha, groupCatalog, tinhThanh);
        TenNguoiNhanHoSo = tenNguoiNhanHoSo;
        HoTenChuHoSo = hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo;
        TenDonVi = tenDonVi;
        TenTTHC = tenTTHC;
        if (groupCatalog == GroupContants.XA_PHUONG || groupCatalog == GroupContants.QUAN_HUYEN)
        {
            TenDonViCha = tenDonViCha.ToUpper();
            DangKyNhanKetQuaTai = HoSoEventUtils.BoPhanTiepNhanVaTraKetQua + tenDonViCha;
            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "</strong>";

        }
        else if (groupCatalog == GroupContants.SO_BAN_NGANH)
        {
            TenDonViCha = HoSoEventUtils.TrungTamPhucVuHanhChinhCong.ToUpper() + "</br>" + "<strong>" +" " + tenTinhThanh.ToUpper() + "</strong>";
            DangKyNhanKetQuaTai = HoSoEventUtils.BoPhanTiepNhanVaTraKetQua + tenDonViCha;
            BoPhanTiepNhanVaTraKetQua = "";
/*            SoDienThoaiHoTro = "02373900900";
*/        }
        else if (groupCatalog == GroupContants.CNVPDK)
        {
            if (hoSo.OfGroupName.Contains("UBND"))
            {
                hoSo.OfGroupName = hoSo.OfGroupName.Replace("UBND", "");
            }
            TenDonViCha = HoSoEventUtils.ChiNhanhVanPhongDangKyDatDai.ToUpper() + " " + hoSo.OfGroupName.ToUpper();
            DangKyNhanKetQuaTai = HoSoEventUtils.BoPhanTiepNhanVaTraKetQua + tenDonViCha;
            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "</strong>";
        }
        KhongCoNgayHenTra = khongCoNgayHenTra;
        GroupCatalog = groupCatalog;
        IdCongDan = hoSo.UyQuyen == true ? hoSo.SoGiayToNguoiUyQuyen : hoSo.SoGiayToChuHoSo;
    }

}
