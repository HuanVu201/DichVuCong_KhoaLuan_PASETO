using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.TrangThaiApp.Commands;
public class UpdateTrangThaiCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? TenTrangThai { get; set; }
    public int? ThuTu { get; set; }
    public bool HienThiTrangChu { get; set; }
}
