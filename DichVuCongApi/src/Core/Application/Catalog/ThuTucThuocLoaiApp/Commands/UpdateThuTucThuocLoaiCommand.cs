using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Commands;
public sealed class UpdateThuTucThuocLoaiCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public Guid ThuTucID { get; set; }
    public int ThuTu { get; set; }
    public Guid LoaiThuTucId { get; set; }
}
