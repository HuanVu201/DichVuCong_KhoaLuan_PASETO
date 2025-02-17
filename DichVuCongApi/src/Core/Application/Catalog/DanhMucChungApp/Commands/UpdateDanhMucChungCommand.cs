using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Commands;
public sealed class UpdateDanhMucChungCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? TenDanhMuc { get; set; }
    public string? Code { get; set; }
    public string? ParentCode { get; set; }
    public int ThuTu { get; set; } = 1;
    public bool Active { get; set; } = true;
    public string Type { get; set; }
}
