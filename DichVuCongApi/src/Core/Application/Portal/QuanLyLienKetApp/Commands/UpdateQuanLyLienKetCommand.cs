using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.QuanLyLienKetApp.Commands;
public sealed class UpdateQuanLyLienKetCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string Ten { get; set; }
    public string? Ma { get; set; }
    public string? LinkLienKet { get; set; }
    public int ThuTu { get; set; }
    public bool SuDung { get; set; }
}
