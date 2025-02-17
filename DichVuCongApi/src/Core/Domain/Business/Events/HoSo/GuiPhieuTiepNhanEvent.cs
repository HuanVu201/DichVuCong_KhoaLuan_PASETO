using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class GuiPhieuTiepNhanEvent : HoSoEvent
{
    public string HoTenChuHoSo { get; set; }
    public string TenNguoiNhanHoSo { get; set; }
    public string TenDonVi { get; set; }
    public string SoDienThoaiHoTro { get; set; }
    public string MaGiayTo { get; set; }
    public GuiPhieuTiepNhanEvent(Business.HoSo hoSo, string maGiayToHoSo, string tenNguoiNhanHoSo, string tenDonVi, string tenDonViCha, string groupCatalog, string ofGroupName, string tenTinhThanh, string soDienThoai) : base(hoSo)
    {
        TenNguoiNhanHoSo = tenNguoiNhanHoSo;
        HoTenChuHoSo = hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo;
        SoDienThoaiHoTro = soDienThoai;
        MaGiayTo = maGiayToHoSo;
        //TenDonVi = tenDonVi;

        if (groupCatalog == GroupContants.XA_PHUONG || groupCatalog == GroupContants.QUAN_HUYEN)
        {
            TenDonVi = HoSoEventUtils.BoPhanTiepNhanVaTraKetQua + " " + tenDonViCha;
        }
        else if (groupCatalog == GroupContants.SO_BAN_NGANH)
        {
            TenDonVi = HoSoEventUtils.TrungTamPhucVuHanhChinhCong + " " + tenTinhThanh;
        }
        else if (groupCatalog == GroupContants.CNVPDK)
        {

            TenDonVi = HoSoEventUtils.ChiNhanhVanPhongDangKyDatDai + " " + ofGroupName;
        }

    }
}
