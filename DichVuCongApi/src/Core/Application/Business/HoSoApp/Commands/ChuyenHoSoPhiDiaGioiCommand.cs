using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenHoSoPhiDiaGioiCommand : ICommand
{
    public string MaHoSo { get; set; }
}
