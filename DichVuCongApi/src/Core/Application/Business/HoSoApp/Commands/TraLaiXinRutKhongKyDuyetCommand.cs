using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class TraLaiXinRutKhongKyDuyetCommand : ICommand
{
    public Guid Id { get; set; }
    public string FileDinhKem { get; set; }
    public string? TrichYeu { get; set; }
}
