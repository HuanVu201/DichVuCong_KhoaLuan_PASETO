using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.HuongDanSuDungApp.Commands;
public sealed class UpdateHuongDanSuDungCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? TenHuongDanSuDung { get; set; }
    public string? NoiDungHuongDanSuDung { get; set; }
    public int? ThuTu { get; set; }

}
