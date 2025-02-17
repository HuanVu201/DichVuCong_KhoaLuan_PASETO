

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp;


public class CauHoiPhoBienDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string TieuDe { get; set; }
    public string Type { get; set; }
    public string NoiDungCauHoi { get; set; }
    public string NoiDungTraLoi { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
