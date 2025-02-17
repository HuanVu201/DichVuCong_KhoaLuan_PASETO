using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.HoSoNhapApp.Dtos;

namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Queries;
public class SearchHoSoNhapQuery : PaginationFilter, IRequest<PaginationResponse<HoSoNhapDto>>
{
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}

public class SearchHoSoNhapQueryByUserId : SearchHoSoNhapQuery
{
    public string? UserId { get; set; }
}