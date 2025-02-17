using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Commands;
public sealed class UpdateTaiLieuKhoLuuTruCongDanCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? TenGiayTo { get; set; }
    public string? DuongDan { get; set; }
    public double? DungLuong { get; set; }
    public bool? TaiSuDung { get; set; }
    public string? EformData { get; set; }
    public string? Type { get; set; }
    public string? LoaiNhomGiayToCaNhanId { get; set; }
}
