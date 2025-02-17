using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class ThemMoiTrucTiepEvent : HoSoEvent
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
    public string GroupCatalog { get; set; }
    public string TenTTHC { get; set; }
    public string SoDienThoaiHoTro { get; set; }
    public string DangKyNhanKetQuaTai { get; set; }
    public bool? KhongCoNgayHenTra { get; set; }
    public string BoPhanTiepNhanVaTraKetQua { get; set; }
    public string IdCongDan { get; set; }

    public ThemMoiTrucTiepEvent(Business.HoSo hoSo, double? thoiHanXuLy, string tenNguoiNhanHoSo, string tenDonVi, string tenTTHC, string tenDonViCha, string groupCatalog, string tenTinhThanh, string soDienThoai, string ofGroupName, bool? khongCoNgayHenTra = false) : base(hoSo)
    {
        NgayThangNam = HoSoEventUtils.GetFormatedNgayThangNam(hoSo.NgayTiepNhan);
        ThoiHanXuLy = HoSoEventUtils.GetThoiGianThucHien(thoiHanXuLy, hoSo.LoaiThoiGianThucHien);
        GioNhan = HoSoEventUtils.GetFormatedNgayGio(hoSo.NgayTiepNhan);
        NgayNhan = HoSoEventUtils.GetFormatedNgayThangNam(hoSo.NgayTiepNhan);
        NgayGioHenTra = HoSoEventUtils.GetFormatedNgayGio(hoSo.NgayHenTra) + ", " + HoSoEventUtils.GetFormatedNgayThangNam(hoSo.NgayHenTra);
        TenNguoiNhanHoSo = tenNguoiNhanHoSo;
        HoTenChuHoSo = hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo;
        TenDonVi = tenDonVi;
        TenTTHC = tenTTHC;
        SoDienThoaiHoTro = soDienThoai;
        if (groupCatalog == GroupContants.XA_PHUONG || groupCatalog == GroupContants.QUAN_HUYEN)
        {
            TenDonViCha = tenDonViCha.ToUpper();
            DangKyNhanKetQuaTai = HoSoEventUtils.BoPhanTiepNhanVaTraKetQua + tenDonViCha;
            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "</strong>";
        }
        else if (groupCatalog == GroupContants.SO_BAN_NGANH)
        {
            TenDonViCha = HoSoEventUtils.TrungTamPhucVuHanhChinhCong.ToUpper() + "</br>" + " <strong>" + tenTinhThanh.ToUpper() + "</strong";
            DangKyNhanKetQuaTai = HoSoEventUtils.BoPhanTiepNhanVaTraKetQua + tenDonViCha;
            BoPhanTiepNhanVaTraKetQua = "";
        }
        else if (groupCatalog == GroupContants.CNVPDK)
        {
            if (ofGroupName.Contains("UBND"))
            {
                ofGroupName = ofGroupName.Replace("UBND", "");
            }
            TenDonViCha = HoSoEventUtils.ChiNhanhVanPhongDangKyDatDai.ToUpper() + " " + ofGroupName.ToUpper();
            DangKyNhanKetQuaTai = HoSoEventUtils.BoPhanTiepNhanVaTraKetQua + tenDonViCha;
            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "</strong>";
        }
        KhongCoNgayHenTra = khongCoNgayHenTra;
        IdCongDan = hoSo.UyQuyen == true ? hoSo.SoGiayToNguoiUyQuyen : hoSo.SoGiayToChuHoSo;
        GroupCatalog = groupCatalog;
    }
}
