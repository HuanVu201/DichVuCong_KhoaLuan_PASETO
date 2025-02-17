using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.HoiDapApp.Commands;
public class AddHoiDapCommand : ICommand<DefaultIdType>
{
    public string HoTen { get; set; }
    public string SoDienThoai { get; set; }
    public string Email { get; set; }
    public string DiaChi { get; set; }
    public string TieuDe { get; set; }
    public string NoiDung { get; set; }
    public string MaDonVi { get; set; }
    public string Ma { get; set; }
    public DateTime NgayGui { get; set; }
    public string TraLoi { get; set; }
    public string NguoiTraLoi { get; set; }
    public string CongKhai { get; set; }
    public string DinhKem { get; set; }
    public string TrangThai { get; set; }
    public string TieuDeTraLoi { get; set; }
    public string NoiDungTraLoi { get; set; }

}
