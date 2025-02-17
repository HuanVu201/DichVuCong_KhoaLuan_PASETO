namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISDongBoTrangThaiChoBoSungRequest : IRequest<ProvideToVBLISBaseResponse>
{
    public string SoBienNhan { get; set; }
    public DateTime NgayChoBoSung { get; set; }
    public string MaCanBoXuLy { get; set; }
    public bool LaTamDung { get; set; }
    public string? GhiChu { get; set; }

    public VBDLISThongTinTapTinDinhKem? TapTin { get; set; }
    public string? SecurityCode { get; set; }
}
