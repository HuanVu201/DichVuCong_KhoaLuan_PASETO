using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
public class AddThanhPhanThuTucCommand : ICommand<DefaultIdType>
{
    public string Ten { get; set; }
    public string? Ma { get; set; }
    public string ThuTucId { get; set; }
    public string TruongHopId { get; set; }
    public string? MaGiayToKhoQuocGia { get; set; }
    public string? DinhKem { get; set; }
    public bool BatBuoc { get; set; } = false;
    public int? SoBanChinh { get; set; }
    public int? SoBanSao { get; set; }
    public int? STT { get; set; }
    public bool? ChoPhepThemToKhai { get; set; }
}
