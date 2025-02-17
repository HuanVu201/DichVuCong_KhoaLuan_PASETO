using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
public sealed class UpdateMauPhoiCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? LoaiPhoi { get; set; }
    public string? Code { get; set; }
    public string? TenMauPhoi { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaLinhVuc { get; set; }
    public string? MaThuTuc { get; set; }
    public string? UrlMauPhoi { get; set; }
    public string? HtmlPhoi { get; set; }
    public bool? LaPhoiEmail { get; set; }
    public bool? LaPhoiMacDinh { get; set; }
}
