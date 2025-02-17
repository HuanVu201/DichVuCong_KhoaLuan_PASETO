using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.QuanLyLienKetApp.Commands;
public class AddQuanLyLienKetCommand : ICommand<DefaultIdType>
{
    public string Ten { get;  set; }
    public string? Ma { get;  set; }
    public string? LinkLienKet { get;  set; }
    public int ThuTu { get; set; }
    public bool SuDung { get; set; }

}
