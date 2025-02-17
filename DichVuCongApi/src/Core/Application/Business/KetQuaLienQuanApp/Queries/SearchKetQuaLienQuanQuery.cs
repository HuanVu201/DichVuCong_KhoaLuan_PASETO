using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.KetQuaLienQuanApp.Dto;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KetQuaLienQuanApp.Queries;


public class SearchKetQuaLienQuanQuery : PaginationFilter, IRequest<PaginationResponse<KetQuaLienQuanDto>>
{
    public string? MaHoSo { get; set; }
    public string? NguoiKy { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public bool? Removed { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
