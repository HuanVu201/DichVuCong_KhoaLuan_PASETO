

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Portal.FooterApp;


public class FooterDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string TieuDe { get; set; }
    public string NoiDung { get; set; }
    public string ImageUrl { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
