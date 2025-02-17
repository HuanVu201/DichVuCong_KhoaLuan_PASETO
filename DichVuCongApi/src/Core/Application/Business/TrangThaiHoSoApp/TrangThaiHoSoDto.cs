

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.TrangThaiHoSoApp;


public class TrangThaiHoSoDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string Ten { get; set; }
    public string Ma { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
