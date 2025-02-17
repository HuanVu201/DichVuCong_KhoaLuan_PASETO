using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class ThongBaoTraKetQuaEvent : HoSoEvent
{
    public string HoVaTen { get; set; }
    public string TenDonVi { get; set; }
    public string MaHoSo { get; set; }
    public string SoDienThoaiHoTro { get; set; }
    public string IdCongDan { get; set; }

    public ThongBaoTraKetQuaEvent(Business.HoSo hoSo, string tenDonVi,string groupCatalog) : base(hoSo)
    {
        HoVaTen = (hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo) ?? "";
        TenDonVi = HoSoEventUtils.GetTenDonViTraKetQua(groupCatalog, tenDonVi);
        IdCongDan = hoSo.UyQuyen == true ? hoSo.SoGiayToNguoiUyQuyen : hoSo.SoGiayToChuHoSo;
    }
}
