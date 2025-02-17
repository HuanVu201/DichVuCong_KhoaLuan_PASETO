

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Portal.BannerApp;


public class BannerDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string ImageUrl { get; set; }
    public bool SuDung { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
