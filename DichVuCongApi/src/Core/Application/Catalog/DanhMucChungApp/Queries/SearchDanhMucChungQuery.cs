using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Queries;

public class SearchDanhMucChungQuery : PaginationFilter, IRequest<PaginationResponse<DanhMucChungDto>>
{
    public string? TenDanhMuc { get; set; }
    public string? Code { get; set; }

    public string? Type { get; set; }
    public List<string>? Types { get; set; }

    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 500;
    public new int PageNumber { get; set; } = 1;
}
