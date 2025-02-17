using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class ThongBaoTraKetQuaChungThucEvent : HoSoEvent
{
    public string HoVaTen { get; set; }
    public string TenDonVi { get; set; }
    public string MaHoSo { get; set; }
    public string SoDienThoaiHoTro { get; set; }
    public string DinhKem { get; set; }
    public string IdCongDan { get; set; }
    public ThongBaoTraKetQuaChungThucEvent(Business.HoSo hoSo, string tenDonVi, string groupCatalog, string? dinhKem) : base(hoSo)
    {
        HoVaTen = (hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo) ?? "";
        TenDonVi = HoSoEventUtils.GetTenDonViTraKetQua(groupCatalog, tenDonVi);
        IdCongDan = hoSo.UyQuyen == true ? hoSo.SoGiayToNguoiUyQuyen : hoSo.SoGiayToChuHoSo;
        DinhKem = dinhKem;
    }
}
