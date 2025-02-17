using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Commands;
public sealed class UpdateQuaTrinhTraoDoiCongDanCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? NguoiGuiTraoDoi { get; set; }
    public DateTime? NgayGui { get; set; }
    public string? NoiDungTraoDoi { get; set; }
    public bool? Email { get; set; }
    public bool? SMS { get; set; }
    public bool? Zalo { get; set; }
}
