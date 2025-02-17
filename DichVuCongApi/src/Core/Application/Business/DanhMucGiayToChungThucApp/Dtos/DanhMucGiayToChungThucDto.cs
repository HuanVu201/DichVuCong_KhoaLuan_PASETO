using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.DanhMucGiayToChungThucApp.Dtos;
public class DanhMucGiayToChungThucDto : IDto
{
    public Guid Id { get; set; }
    public string Ten { get; set; }
    public string Ma{ get; set; }
    public bool SuDung { get; set; }
    [JsonIgnore]

    public int TotalCount { get; set; }
}
