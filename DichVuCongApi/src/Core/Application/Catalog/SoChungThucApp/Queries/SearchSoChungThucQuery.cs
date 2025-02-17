using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Queries;

public class SearchSoChungThucQuery : PaginationFilter, IRequest<PaginationResponse<SoChungThucDto>>
{
    public string? DonVi { get; set; }
    public string? TenSo { get; set; }
    public DateTime? RequestTime { get; set; } = DateTime.Now;
    public bool? TrangThai { get; set; }
    public bool SearchByOpening { get; set; } = false;
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 100;
    public new int PageNumber { get; set; } = 1;
}
