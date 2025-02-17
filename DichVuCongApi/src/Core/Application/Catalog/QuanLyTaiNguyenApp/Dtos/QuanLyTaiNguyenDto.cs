using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Dtos;
public class QuanLyTaiNguyenDto : IDto
{
    public Guid? Id { get; set; }
    public string? DinhKem { get; set; }
    public string? Ten { get; set; }
    public string? Mota { get; set; }
    public int? KichThuocTep { get; set; }
    public Guid? CreatedBy { get; set; }
    public bool? Public { get; set; }
    public bool? SuDung { get; set; }
    public int? ThuTu { get; set; }
    [JsonIgnore]

    public int TotalCount { get; set; }
}
