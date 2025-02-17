using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Portal.KenhTinApp.Commands;
public class UpdateKenhTinCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? TenKenhTin { get; set; }
    public Nullable<Guid> MaKenhTinCha { get; set; }
    public string? TomTat { get; set; }
    public int? ThuTu { get; set; }
    public string? ImageUrl { get; set; }
    public Nullable<Guid> KieuNoiDungId { get; set; }
    public bool? HienThiMenuChinh { get; set; }
    public bool? HienThiMenuDoc { get; set; }
    public bool? HienThiMenuPhu { get; set; }
    public string? NoiDung { get; set; }
    public string? LoaiMoLienKet { get; set; }
    public string? LienKetNgoai { get; set; }
}
