using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.DanhMucGiayToChungThucApp.Dtos;
namespace TD.DichVuCongApi.Application.Portal.DanhMucGiayToChungThucApp.Queries;


public class SearchDanhMucGiayToChungThucQuery : PaginationFilter, IRequest<PaginationResponse<DanhMucGiayToChungThucDto>>
{
    public string? Ten { get; set; }
    public string? Ma { get; set; }
    public bool? SuDung { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
