using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchHoSoQuaHanXuLy;
public class SearchHoSoQuaHanXuLyRequest : PaginationFilter, IRequest<Result<List<HoSoTheoTrangThaiDto>>>
{
    public DateTime TuNgay { get; set; }
    public DateTime DenNgay { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? Catalog { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? TrangThaiXuLy { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public bool? ChiBaoGomDonViCon { get; set; }
    public string? GroupCode { get; set; }
    public string? DonViTraKq { get; set; }
    public string? DonViQuanLy { get; set; }
    public string? SearchKeys { get; set; }
}
