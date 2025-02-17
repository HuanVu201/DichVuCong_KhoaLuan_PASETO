
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp;


public class LoaiPhiLePhiDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string Ten { get; set; }
    public string Ma { get; set; }
    public bool SuDung { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
