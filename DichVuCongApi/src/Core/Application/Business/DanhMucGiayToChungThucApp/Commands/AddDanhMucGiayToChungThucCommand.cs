using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.DanhMucGiayToChungThucApp.Commands;
public class AddDanhMucGiayToChungThucCommand : ICommand<DefaultIdType>
{
    public string Ma { get; set; }
    public string Ten { get; set; }
    public bool SuDung { get; set; }

}
