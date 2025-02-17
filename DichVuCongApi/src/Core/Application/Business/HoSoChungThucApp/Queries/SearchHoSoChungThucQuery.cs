using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Dtos;
using TD.DichVuCongApi.Domain.Business;
using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Queries;
public class SearchHoSoChungThucQuery : PaginationFilter, IRequest<PaginationResponse<HoSoChungThucDto>>
{
    public Guid? SoChungThucId { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
}
