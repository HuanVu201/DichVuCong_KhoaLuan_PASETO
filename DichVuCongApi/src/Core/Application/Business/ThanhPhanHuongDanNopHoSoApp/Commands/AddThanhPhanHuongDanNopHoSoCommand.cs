using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Commands;
public class AddThanhPhanHuongDanNopHoSoCommand : ICommand<DefaultIdType>
{
    public string? Ten { get; set; }
    public string? HoSo { get; set; }
    public int? SoBanChinh { get; set; }
    public int? SoBanSao { get; set; }
    public string? GhiChu { get; set; }
   
}
