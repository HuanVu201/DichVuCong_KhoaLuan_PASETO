using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Commands;
public sealed class UpdateThanhPhanHuongDanNopHoSoCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? Ten { get; set; }
    public string? HoSo { get; set; }
    
    public int? SoBanChinh { get; set; }
    public int? SoBanSao { get; set; }
    public string? GhiChu { get; set; }
   
}
