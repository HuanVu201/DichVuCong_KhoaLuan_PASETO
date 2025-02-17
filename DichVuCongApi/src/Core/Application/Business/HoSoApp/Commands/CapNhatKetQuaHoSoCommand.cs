using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class CapNhatKetQuaHoSoCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public string? DinhKemKetQua { get; set; }
    public string? EFormKetQuaData { get; set; }
    public string? LoaiVanBanKetQua { get; set; }
    public string? SoKyHieuKetQua { get; set; }
    public string? NguoiKyKetQua { get; set; }
    public string? CoQuanBanHanhKetQua { get; set; }
    public string? LoaiKetQua { get; set; }
    public DateTime? NgayBanHanhKetQua { get; set; }
    public DateTime? NgayKyKetQua { get; set; }
}
