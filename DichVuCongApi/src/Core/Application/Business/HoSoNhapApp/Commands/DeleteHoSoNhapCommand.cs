using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Commands;
public class DeleteHoSoNhapCommand : ICommand
{
    public List<string> Ids { get; set; }
    public string? LyDoXoa { get; set; }
    public bool ForceDelete { get; set; }
}
