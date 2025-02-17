using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp.Commands;
public class AddLoaiPhiLePhiCommand : ICommand<DefaultIdType>
{
    public string Ten { get; set; }
    public string Ma { get; set; }
    public bool SuDung { get; set; }
}
