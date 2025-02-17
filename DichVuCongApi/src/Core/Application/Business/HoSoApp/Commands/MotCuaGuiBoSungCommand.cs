using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class MotCuaGuiBoSungCommand : ICommand
{
    [JsonIgnore]
    public Guid Id { get; set; }
    public string ThongTinTiepNhanBoSung { get; set; }
    public List<MotCuaCapNhatBoSung_ThanhPhanHoSo> DanhSachGiayToBoSung { get; set; }
    public List<MotCuaCapNhatBoSung_ThanhPhanHoSo>? DanhSachGiayToBoSungMoi { get; set; }
}
