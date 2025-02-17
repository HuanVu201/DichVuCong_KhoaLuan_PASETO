using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchHoSoTheoHanXuLyQuery : PaginationFilter, IRequest<PaginationResponse<HoSoTheoTrangThaiDto>>
{
    public DateTime TuNgay { get; set; }
    public DateTime DenNgay { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? TrangThaiXuLy { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public string? GroupCode { get; set; }
    public string? DonViTraKq { get; set; }
    public string? DonViQuanLy { get; set; }
    public string? SearchKeys { get; set; }
}
