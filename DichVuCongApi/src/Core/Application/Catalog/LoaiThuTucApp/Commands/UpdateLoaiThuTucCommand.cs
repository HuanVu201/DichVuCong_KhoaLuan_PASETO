using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Commands;
public sealed class UpdateLoaiThuTucCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? Ten { get; set; }
    public string? MoTa { get; set; }
    public int ThuTu { get; set; }
    public Guid NhomThuTucID { get; set; }
}
