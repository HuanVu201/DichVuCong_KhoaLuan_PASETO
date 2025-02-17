using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp.Commands;
public sealed class UpdateLinhVucCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? Ten { get; set; }
    public string? Ma { get; set; }
    public string? MaNganh { get; set; }
    public bool? SuDung { get; set; }
    public int? SoLuongThuTuc { get; set; } = 0;
    public int? SoLuongThuTucCapTinh { get; set; } = 0;
    public int? SoLuongThuTucCapHuyen { get; set; } = 0;
    public int? SoLuongThuTucCapXa { get; set; } = 0;
}
