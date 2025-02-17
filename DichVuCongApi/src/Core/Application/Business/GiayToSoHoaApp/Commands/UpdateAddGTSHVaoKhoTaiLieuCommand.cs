using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Commands;
public sealed class UpdateAddGTSHVaoKhoTaiLieuCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? KhoTaiLieuDienTuId { get; set; }
    public double? DungLuong { get; set; }
    public DateTime? NgayCapNhatKho { get; set; } = DateTime.Now;
    public int? SoLuong { get; set; }

}
