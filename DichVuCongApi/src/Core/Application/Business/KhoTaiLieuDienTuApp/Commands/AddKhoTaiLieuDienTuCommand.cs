using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Commands;
public class AddKhoTaiLieuDienTuCommand : ICommand<Guid>
{
    public string SoDinhDanh { get; set; }
    public string TenKhoTaiLieu { get; set; }
    public string? MoTa { get; set; }
    public double? DungLuong { get; set; } = 0;
    public int? SoLuong { get; set; } = 0;
}
