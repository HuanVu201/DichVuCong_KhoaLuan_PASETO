using Newtonsoft.Json;
namespace TD.DichVuCongApi.Application.Portal.QuanLyLienKetApp.Queries;


public class SearchQuanLyLienKetQuery : PaginationFilter, IRequest<PaginationResponse<QuanLyLienKetDto>>
{
    public string? Ten { get; set; }
    public bool? SuDung { get; set; }
    public string? Ma { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 50;
    public new int PageNumber { get; set; } = 1;
}
