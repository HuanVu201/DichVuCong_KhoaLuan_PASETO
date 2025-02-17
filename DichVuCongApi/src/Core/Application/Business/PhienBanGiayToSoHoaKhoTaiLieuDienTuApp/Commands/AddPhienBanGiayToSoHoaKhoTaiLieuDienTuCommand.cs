using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Commands;
public class AddPhienBanGiayToSoHoaKhoTaiLieuDienTuCommand : ICommand<Guid>
{
    public string SoDinhDanh { get; set; }
    public string? KhoTaiLieuDienTuId { get; set; }
    public string? MaHoSo { get; set; }
    public string? DinhKem { get; set; }
    public string? MaGiayTo { get; set; }
    public double? DungLuong { get; set; }
}
