using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class MotCuaYeuCauBoSungCommand : ICommand
{
    [JsonIgnore]
    public Guid Id { get; set; }
    public string? MaGiayToHoSo { get; set; }
    public string? LyDoBoSung { get; set; }
    public string? NoiDungBoSung { get; set; }
    public string? DinhKemBoSung { get; set; }
    public List<ThanhPhanBoSungHoSo>? ThanhPhanBoSung { get; set; }
    public List<ThanhPhanBoSungHoSo>? ThanhPhanHoSo { get; set; }
    public int? ThoiHanBoSung { get; set; } = 0;
}

public class ThanhPhanBoSungHoSo
{
    public string? ThanhPhanHoSoId { get; set; }
    public string? TenThanhPhan { get; set; }
    public string? FileDinhKem { get; set; }
    public string? NoiDungBoSung { get; set; }
}
