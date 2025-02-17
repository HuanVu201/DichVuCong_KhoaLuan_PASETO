using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.TrangThaiHoSoApp.Commands;
public class AddTrangThaiHoSoCommand : ICommand<DefaultIdType>
{
    public string Ten { get; set; }
    public string? Ma { get; set; }
    public string? MoTa { get; set; }
    public bool? LaTrangThaiQuyTrinh { get; set; } = false;

}
