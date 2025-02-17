using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Commands;
public sealed class UpdateNhomThuTucCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string Ten { get; set; }

    public string MoTa { get; set; }

    public string Icon { get; set; }
    public string MauSac { get; set; }
    public string DoiTuong { get; set; }
    public int ThuTu { get; set; }
}
