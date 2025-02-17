using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.TrangThaiHoSoApp.Queries;


public class SearchTrangThaiHoSoQuery : PaginationFilter, IRequest<PaginationResponse<TrangThaiHoSoDto>>
{
    public string? Ten { get; set; }
    public bool? LaTrangThaiQuyTrinh { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
