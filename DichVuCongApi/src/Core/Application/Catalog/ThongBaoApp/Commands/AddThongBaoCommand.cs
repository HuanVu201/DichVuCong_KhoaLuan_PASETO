using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ThongBaoApp.Commands;
public class AddThongBaoCommand : ICommand<Guid>
{

    public string TieuDe { get;  set; }
    public string NoiDung { get;  set; }
    public string? TepDinhKem { get;  set; }
    public Guid DonViId { get;  set; }
    public bool ToanHeThong { get;  set; }
    public bool QuanTrong { get;  set; }
    public bool SuDung { get;  set; }
}
