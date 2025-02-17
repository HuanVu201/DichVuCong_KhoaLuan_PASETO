using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class ThongBaoCoKetQuaEvent : HoSoEvent
{
    public string HoTenNguoiNop { get; set; }
    public string TenDonVi { get; set; }
    public string MaHoSo { get; set; }
    public string SoDienThoaiHoTro { get; set; }
    public string IdCongDan { get; set; }
    public ThongBaoCoKetQuaEvent(Business.HoSoQLVB hoSo, string tenDonVi) : base(hoSo)
    {
        HoTenNguoiNop = (hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo) ?? "";
        TenDonVi = HoSoEventUtils.GetTenDonViTraKetQua(hoSo.Catalog, tenDonVi);
        MaHoSo = hoSo.MaHoSo;
        IdCongDan = hoSo.UyQuyen == true ? hoSo.SoGiayToNguoiUyQuyen : hoSo.SoGiayToChuHoSo;
    }
}
