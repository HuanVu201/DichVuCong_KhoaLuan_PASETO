using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.TrangThaiApp.Commands;
public class AddTrangThaiCommand : ICommand<Guid>
{
    public string TenTrangThai { get; set; }
    public int ThuTu { get; set; }
    public bool HienThiTrangChu { get; set; }
}
