using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
public class FilterThuTucQuery : PaginationFilter, IRequest<PaginationResponse<FilterThuTucDto>>
{
    public bool? Removed { get; set; } = false;

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
