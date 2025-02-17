using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Common;
public class ChuyenBuocXuLyQLVB : ChuyenBuocXuLyHoSoCommand
{
    public DateTime? NgayKy { get; set; }
    public string? TenNguoiGui { get; set; }
}
