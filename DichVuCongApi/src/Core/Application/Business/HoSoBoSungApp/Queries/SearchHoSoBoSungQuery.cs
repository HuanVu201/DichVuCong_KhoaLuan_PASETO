namespace TD.DichVuCongApi.Application.Business.HoSoBoSungApp.Queries;
using Newtonsoft.Json;

public class SearchHoSoBoSungQuery : PaginationFilter, IRequest<PaginationResponse<HoSoBoSungDto>>
{
    public string MaHoSo { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
