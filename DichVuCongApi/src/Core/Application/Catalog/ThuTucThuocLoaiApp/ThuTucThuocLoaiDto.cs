

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Application.Catalog.ThuTucThuocLoaiApp;


public class ThuTucThuocLoaiDto : IDto
{
    public Guid? Id { get; set; }
    public Guid? ThuTucId { get; set; }
    public string ThuTu { get; set; }
    public Guid LoaiThuTucId { get; set; }
    public string? TenThuTuc { get; set; }
    public bool SuDung { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
