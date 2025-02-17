

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp;


public class PhiLePhiDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string Loai { get; set; }
    public int SoTien { get; set; }
    public string Ten { get; set; }

    public string MoTa { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
