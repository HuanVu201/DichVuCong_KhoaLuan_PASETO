using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class ThongBaoNopPhiThuSauEvent : HoSoEvent
{
    public string NgayThangNam { get; set; }
    public string HoTenNguoiNop { get; set; }
    public int SoTienPhi { get; set; }
    public int SoTienLePhi { get; set; }
    public string TenNguoiTiepNhan { get; set; }
    public string TenDonViCha { get; set; }
    public string TenDonViCon { get; set; }
    public string SoDienThoaiHoTro { get; set; }
    public string TenDiaDanh { get; set; }
    public string BoPhanTiepNhanVaTraKetQua { get; set; }
    public ThongBaoNopPhiThuSauEvent(HoSoQLVB hoSo, int soTienPhi, int soTienLePhi, string tenNguoiTiepNhan, string tenDonViCha, string groupCatalog, string tenTinhThanh) : base(hoSo)
    {
        DateTime now = DateTime.Now;
        NgayThangNam = HoSoEventUtils.GetFormatedNgayThangNam(now);
        HoTenNguoiNop = hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo;
        SoTienPhi = soTienPhi;
        SoTienLePhi = soTienLePhi;
        SoDienThoaiHoTro = hoSo.SoDienThoai;
        TenNguoiTiepNhan = tenNguoiTiepNhan;
        if (groupCatalog == GroupContants.XA_PHUONG || groupCatalog == GroupContants.QUAN_HUYEN)
        {
            TenDonViCha = tenDonViCha.ToUpper();
            TenDonViCon = hoSo.GroupName;
            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "</strong>";
        }
        else if (groupCatalog == GroupContants.SO_BAN_NGANH)
        {
            TenDonViCha = HoSoEventUtils.TrungTamPhucVuHanhChinhCong.ToUpper() + "</br>" + "<strong>" + " " + tenTinhThanh.ToUpper() + "/<strong>";
            TenDonViCon = HoSoEventUtils.TrungTamPhucVuHanhChinhCong + tenTinhThanh;
            BoPhanTiepNhanVaTraKetQua = HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper();
        }
        else if (groupCatalog == GroupContants.CNVPDK)
        {
            TenDonViCha = HoSoEventUtils.ChiNhanhVanPhongDangKyDatDai.ToUpper() + " " + hoSo.OfGroupName.ToUpper();
            TenDonViCon = hoSo.OfGroupName;
            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "</strong>";
        }
    }


}
