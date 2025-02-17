using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;
public class YeuCauThuPhiChungThucHoSoCommand : ICommand
{
    public int TongTien { get; set; }
    public string MaHoSo { get; set; }

}
