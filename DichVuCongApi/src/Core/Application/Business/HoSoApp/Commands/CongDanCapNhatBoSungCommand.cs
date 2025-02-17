using TD.DichVuCongApi.Application.Abstractions.Messaging;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class CongDanCapNhatBoSungCommand : ICommand
{
    [JsonIgnore]
    public Guid Id { get; set; }
    public string ThongTinTiepNhanBoSung { get; set; }
    public List<MotCuaCapNhatBoSung_ThanhPhanHoSo> DanhSachGiayToBoSung { get; set; }
    public List<MotCuaCapNhatBoSung_ThanhPhanHoSo>? DanhSachGiayToBoSungMoi { get; set; }
}
