using Newtonsoft.Json;
namespace TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Queries;


public class SearchCauHoiPhoBienQuery : PaginationFilter, IRequest<PaginationResponse<CauHoiPhoBienDto>>
{
    public string? Type { get; set; }
    public string? NoiDungCauHoi { get; set; }
    public string? Id { get; set; }

    public string? TieuDe { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
