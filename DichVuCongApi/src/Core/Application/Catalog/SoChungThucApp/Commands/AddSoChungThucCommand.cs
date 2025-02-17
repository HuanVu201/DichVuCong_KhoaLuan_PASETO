using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Commands;
public class AddSoChungThucCommand : ICommand<Guid>
{
    public string? TenSo { get; set; }
    public int SoBatDau { get; set; }
    public int SoHienTai { get; set; }
    public DateTime? NgayBatDau { get; set; }
    public DateTime? NgayDongSo { get; set; }
    public bool? TrangThai { get; set; }
    public string Loai { get; set; }
}
