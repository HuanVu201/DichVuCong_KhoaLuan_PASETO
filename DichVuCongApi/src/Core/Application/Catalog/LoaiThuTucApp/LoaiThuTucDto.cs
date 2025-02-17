

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Application.Catalog.LoaiThuTucApp;


public class LoaiThuTucDto : IDto
{
    public Guid Id { get; set; }
    public string ThuTu { get; set; }
    public string Ten { get; set; }
    public string MoTa { get; set; }

    public Guid NhomThuTucId { get; set; }

    public bool SuDung { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
