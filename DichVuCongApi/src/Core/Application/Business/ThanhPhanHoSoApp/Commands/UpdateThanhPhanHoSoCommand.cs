using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
public sealed class UpdateThanhPhanHoSoCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? Ten { get; set; }
    public string? HoSo { get; set; }
    public string? TruongHopId { get; set; }
    public string? MaGiayToKhoQuocGia { get; set; }
    public string? MaGiayToSoHoa { get; set; }
    public string? TrangThaiSoHoa { get; set; }
    public string? MaGiayTo { get; set; }
    public bool? DuocLayTuKhoDMQuocGia { get; set; }
    public string? MaKetQuaThayThe { get; set; }
    public string? DinhKem { get; set; }
    public bool? NhanBanGiay { get; set; } = false;
    public int? SoBanChinh { get; set; }
    public int? SoBanSao { get; set; }
    public string? TrangThaiDuyet { get; set; }
}
