using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISDongBoKetQuaThueRequest : IRequest<ProvideToVBLISBaseResponse>
{
    public string SoBienNhan { get; set; }

    public string? NguoiXuLy { get; set; }
    public DateTime? NgayCoKetQuaThue { get; set; }
    public string? GhiChu { get; set; }
    public List<VBDLISThongBaoThueElement>? DanhSachThongBaoThue { get; set; }
    public string? SecurityCode { get; set; }
}

public class VBDLISThongBaoThueElement
{
    public string? HoTenChu { get; set; }
    public string? LoaiThue { get; set; }
    public string? SoThongBaoThue { get; set; }
    public string? DuongDanThongBaoThue { get; set; }

}