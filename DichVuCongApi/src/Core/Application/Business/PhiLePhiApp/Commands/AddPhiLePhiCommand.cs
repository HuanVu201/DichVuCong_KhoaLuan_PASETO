using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp.Commands;
public class AddPhiLePhiCommand : ICommand<DefaultIdType>
{
    public string Ten { get; set; }
    public string? Ma { get; set; }
    public string ThuTucId { get; set; }
    public string? TruongHopId { get; set; }
    public string Loai { get; set; }
    public int? SoTien { get; set; }
    public string? MoTa { get; set; }
    public string? DinhKem { get; set; }
}
