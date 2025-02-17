

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Application.Catalog.ThongBaoApp;


public class ThongBaoDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public Guid Id { get; set; }
    public string TieuDe { get; set; }
    public Guid DonViId { get; set; }
    public bool ToanHeThong { get; set; }
    public bool QuanTrong { get; set; }
    public bool SuDung { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
