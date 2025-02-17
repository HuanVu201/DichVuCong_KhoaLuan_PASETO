using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Commands;
public class AddPhanAnhKienNghiCommand : ICommand<DefaultIdType>
{
    public string UserId { get; set; }
    public string HoTen { get; set; }
    public string SoDienThoai { get; set; }
    public string Email { get; set; }
    public string DiaChi { get; set; }
    public string TieuDe { get; set; }
    public string NoiDung { get; set; }
    public DateTime NgayGui { get; set; }
    public string TrangThai { get; set; }
    public string? NguoiTraLoi { get; set; }
    public string? NoiDungTraLoi { get; set; }
    public string CongKhai { get; set; }
}
