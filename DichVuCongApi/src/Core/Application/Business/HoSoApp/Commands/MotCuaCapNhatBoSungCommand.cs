
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class MotCuaCapNhatBoSungCommand : ICommand
{
    [JsonIgnore]
    public Guid Id { get; set; }
    public string ThongTinTiepNhanBoSung { get; set; }
    public List<MotCuaCapNhatBoSung_ThanhPhanHoSo> DanhSachGiayToBoSung { get; set; }
    public List<MotCuaCapNhatBoSung_ThanhPhanHoSo>? DanhSachGiayToBoSungMoi { get; set; }
}

public class MotCuaCapNhatBoSung_ThanhPhanHoSo
{
    public string? ThanhPhanHoSoId { get; set; }
    public string? FileDinhKemCu { get; set; }
    public string? FileDinhKemMoi { get; set; }
    public string? NoiDungBoSung { get; set; }
    public string? TenThanhPhan { get; set; }
}