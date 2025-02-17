using System.Text.Json.Serialization;
namespace TD.DichVuCongApi.Application.Portal.TrangThaiApp;
public class TrangThaiDto : TrangThaiBaseDto
{
    public int ThuTu { get; set; }
}

public class TrangThaiBaseDto : IDto
{
    public Guid Id { get; set; }
    public string TenTrangThai { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}