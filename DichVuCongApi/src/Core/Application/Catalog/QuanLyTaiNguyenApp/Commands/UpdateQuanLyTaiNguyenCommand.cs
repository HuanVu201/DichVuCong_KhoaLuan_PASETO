using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Commands;
public sealed class UpdateQuanLyTaiNguyenCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? DinhKem { get; set; }
    public string? Ten { get; set; }
    public string? Mota { get; set; }
    public bool? Public { get; set; }
    public bool? SuDung { get; set; }
    public int? ThuTu { get; set; }
    public int? KichThuocTep { get; set; }
}
