using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.QuanLyVanBanApp.Commands;
public sealed class UpdateQuanLyVanBanCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? SoKyHieu { get; set; }
    public DateTime? NgayBanHanh { get; set; }
    public string? LoaiVanBan { get; set; }
    public bool? CongKhai { get; set; }
    public int? ThuTu { get; set; }
    public string? FileDinhKem { get; set; }
    public string? TrichYeu { get; set; }
    public string? MaLinhVuc { get; set; }
    public string? CoQuanBanHanh { get; set; }
}
