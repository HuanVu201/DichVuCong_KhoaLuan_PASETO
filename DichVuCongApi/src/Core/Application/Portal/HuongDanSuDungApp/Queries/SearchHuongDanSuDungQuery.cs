using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Portal.HuongDanSuDungApp.Queries;


public class SearchHuongDanSuDungQuery : PaginationFilter, IRequest<PaginationResponse<HuongDanSuDungDto>>
{
    public int? ThuTu { get; set; }
    public string? TenHuongDanSuDung { get; set; }
    public string? NoiDungHuongDanSuDung { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
