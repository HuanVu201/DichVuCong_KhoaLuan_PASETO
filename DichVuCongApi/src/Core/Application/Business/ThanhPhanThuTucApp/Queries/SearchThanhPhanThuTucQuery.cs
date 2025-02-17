using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Queries;


public class SearchThanhPhanThuTucQuery : PaginationFilter, IRequest<PaginationResponse<ThanhPhanThuTucDto>>
{
    public string? ThuTucId { get; set; }
    public string? TruongHopId { get; set; }
    public string? MaGiayToKhoQuocGia { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
