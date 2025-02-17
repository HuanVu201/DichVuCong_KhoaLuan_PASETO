namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeTheoTruongHop;
public class ThongKeTheoTruongHopRequest : BaseStatistisRequestModel, IRequest<BaoCaoTongHopBaseResponse>
{
    public string? MaDonViCha { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? Catalog { get; set; }
    public bool? ChiBaoGomDonViCon { get; set; }
    public string? MaTTHC { get; set; }
    public string? Type { get; set; }
    public string? LoaiDoiTuong { get; set; }
    public string? KenhThucHien { get; set; }
    public string? MucDo { get; set; }
}
