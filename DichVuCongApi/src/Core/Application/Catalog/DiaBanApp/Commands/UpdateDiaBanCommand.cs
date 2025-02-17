using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp.Commands;
public sealed class UpdateDiaBanCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string TenDiaBan { get; set; }
    public string MaDiaBan { get; set; }
    public string MaTinh { get; set; }
    public string MaHuyen { get; set; }

    public string MaXa { get; set; }
    public int ThuTu { get; set; } = 1;
    public bool Active { get; set; } = true;
}
