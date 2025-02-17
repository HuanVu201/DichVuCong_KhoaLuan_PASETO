using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Commands;
public class AddTaiLieuKhoLuuTruCongDanCommand : ICommand<Guid>
{
    public string TenGiayTo { get; set; } = string.Empty;
    public string DuongDan { get; set; } = string.Empty;
    public double? DungLuong { get; set; }
    public string? Nguon { get; set; }
    public int? SoLuotTaiSuDung { get; set; } = 0;
    public Guid? LoaiGiayToId { get; set; }
    public string? EformData { get; set; }
    public string? Type { get; set; }
    public string? LoaiNhomGiayToCaNhanId { get; set; }
    public string? MaLinhVuc { get; set; }
}
