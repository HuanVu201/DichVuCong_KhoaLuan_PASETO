using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.KetQuaLienQuanApp.Commands;
public sealed class UpdateKetQuaLienQuanCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? LoaiKetQua { get; set; }
    public string? SoKyHieu { get; set; }
    public string? TrichYeu { get; set; }
    public DateTime? NgayKy { get; set; }
    public string NguoiKy { get; set; }
    public string CoQuanBanHanh { get; set; }
    public DateTime? NgayCoHieuLuc { get; set; }
    public DateTime? NgayHetHieuLuc { get; set; }
    public string? TrangThai { get; set; }
    public string? DinhKem { get; set; }
}
