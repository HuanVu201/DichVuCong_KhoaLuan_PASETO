using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Commands;
public sealed class UpdatePhienBanGiayToSoHoaKhoTaiLieuDienTuCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    [JsonIgnore]
    public string? KhoTaiLieuDienTuId { get; set; }
    public string? MaHoSo { get; set; }
    public string? DinhKem { get; set; }
    public string? MaGiayTo { get; set; }
    public double? DungLuong { get; set; }
}
