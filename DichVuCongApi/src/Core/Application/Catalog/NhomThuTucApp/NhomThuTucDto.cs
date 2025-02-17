

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Application.Catalog.NhomThuTucApp;


public class NhomThuTucDto : IDto
{
    public Guid Id { get; set; }
    public string Ten { get; set; }

    public string MoTa { get; set; }

    public string Icon  { get; set; }
    public string MauSac { get; set; }

    public string DoiTuong { get; set; }

    public int ThuTu { get; set; }
    public bool SuDung { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
