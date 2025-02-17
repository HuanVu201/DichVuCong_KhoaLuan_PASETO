using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class TuChoiTiepNhanTucTuyenCommand :ICommand
{
    public Guid Id { get; set; }
    public string? LyDoTuChoi { get; set; }
    public string? DinhKemTuChoi { get; set; }
}
