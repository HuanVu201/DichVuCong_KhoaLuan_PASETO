using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Commands;
public sealed class UpdateMenuKetQuaThuTucCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? TenMenu { get; set; }
    public Guid? ParentId { get; set; }
    public int? ThuTuMenu { get; set; }
    public bool? Active { get; set; }
    public string? IconName { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaTTHC { get; set; }
    public string? QueryStringParams { get; set; }
    public string? Catalog { get; set; }
    public string? MaKetQuaTTHC { get; set; }
}
