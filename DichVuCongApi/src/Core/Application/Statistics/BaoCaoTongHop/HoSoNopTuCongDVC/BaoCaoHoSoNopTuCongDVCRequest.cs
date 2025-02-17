using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoNopTuCongDVC;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class BaoCaoHoSoNopTuCongDVCRequest : BaseStatistisRequestModel, IRequest<BaoCaoSo06Response<BaoCaoHoSoNopTuDVCElementResponse>>
{
    public string? MaDonVi { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public bool? ChiBaoGomDonViCon { get; set; }
    public string? MaDonViCha { get; set; }
    public string? Catalog { get; set; }
}
