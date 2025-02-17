using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Queries;
public class GetGiayToSoHoaQuery : IQuery<GiayToSoHoaDetailDto>
{
/*    [JsonIgnore]
*/  public Guid? Id { get; set; }
    public string? FileUrl { get; set; }
    public string? SoDinhDanh { get; set; }
}
