

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.ScreenApp;


public class ScreenDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string Ma { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
