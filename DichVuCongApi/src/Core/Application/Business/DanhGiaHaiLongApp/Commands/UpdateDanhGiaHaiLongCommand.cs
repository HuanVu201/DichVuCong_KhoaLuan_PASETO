using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Commands;
public sealed class UpdateDanhGiaHaiLongCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string MaHoSo { get;  set; }
    public string? LoaiDanhGia { get;  set; }
    public string? NguoiDanhGia { get;  set; }
    public DateTime? ThoiGianDanhGia { get;  set; }
    public string DanhGia { get;  set; }
    public string? NoiDungDanhGia { get; set; }
}
