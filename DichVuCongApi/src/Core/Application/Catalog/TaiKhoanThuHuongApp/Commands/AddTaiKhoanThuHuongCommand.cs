using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.TaiKhoanThuHuongApp.Commands;
public class AddTaiKhoanThuHuongCommand : ICommand<Guid>
{
    public string TKThuHuong { get; set; }
    public string? DonViId { get; set; }
    public string MaNHThuHuong { get; set; }
    public string TenTKThuHuong { get; set; }
    public string MoTa { get; set; }
   
}
