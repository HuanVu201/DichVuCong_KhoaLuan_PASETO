using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.DSTaiLieuHDSDApp.Commands;
public sealed class UpdateDSTaiLieuHDSDCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public int? ThuTu { get; set; }
    public string? TenTaiLieu { get; set; }
    public string? TepDinhKem { get; set; }
    public string? TaiLieuDanhCho { get; set; }
    public string? MoTa { get; set; }
    public DateTime? NgayDang { get; set; }
}
