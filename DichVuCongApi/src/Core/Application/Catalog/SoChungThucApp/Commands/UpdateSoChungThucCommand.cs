using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Commands;
public sealed class UpdateSoChungThucCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? DonVi { get; set; }
    public string? TenSo { get; set; }
    public int SoBatDau { get; set; }
    public int SoHienTai { get; set; }
    public DateTime? NgayBatDau { get; set; }
    public DateTime? NgayDongSo { get; set; }
    public bool? TrangThai { get; set; }
    public string? Loai { get; set; }
}
