using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISDongBoTrangThaiLuanChuyenHoSoRequest : IRequest<ProvideToVBLISBaseResponse>
{
    public string SoBienNhan { get; set; }
    public string MaCanBoChuyen { get; set; }
    public string MaCanBoNhan { get; set; }
    public string MaTrangThai { get; set; }
    public bool? LaTrangThaiChuyenLai { get; set; }
    public string? NoiDungXuLy { get; set; }
    public DateTime? NgayChuyen { get; set; }
    public double? HanXuLy { get; set; }
    public List<VBDLISThongTinTapTinDinhKem>? DanhSachTapTin { get; set; }
    public string? SecurityCode { get; set; }
}

public class VBDLISThongTinTapTinDinhKem
{
    public string? TenGiayTo { get; set; }
    public string? KieuFile { get; set; }
    public string? LinkFile { get; set; }
    public int? SoBanSao { get; set; }
    public int? SoBanChinh { get; set; }
}