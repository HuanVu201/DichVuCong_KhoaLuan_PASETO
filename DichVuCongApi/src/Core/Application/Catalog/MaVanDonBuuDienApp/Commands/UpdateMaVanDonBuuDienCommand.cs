using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Commands;
public sealed class UpdateMaVanDonBuuDienCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string Ma { get; set; }
    public string? HoSo { get; set; }
    public string? TrangThai { get; set; }
    public DateTime? NgayYeuCau { get; set; }
}
