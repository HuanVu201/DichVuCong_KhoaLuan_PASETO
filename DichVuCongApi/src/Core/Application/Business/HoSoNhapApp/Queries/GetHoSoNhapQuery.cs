
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoNhapApp.Dtos;

namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Queries;
public sealed class GetHoSoNhapQuery : IQuery<HoSoNhapDetailDto>
{
    [JsonIgnore]
    public DefaultIdType? Id {  get; set; }
    public string? View { get; set; }
    public bool? ReturnNodeQuyTrinh { get; set; } = false;
}
