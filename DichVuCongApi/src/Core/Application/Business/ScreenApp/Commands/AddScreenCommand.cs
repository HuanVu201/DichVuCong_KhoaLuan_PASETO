using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ScreenApp.Commands;
public class AddScreenCommand : ICommand<DefaultIdType>
{
    public string? Ma { get; set; }
    public string? MoTa { get; set; }
    public bool? ShowActionInModal { get; set; } = false;
    public bool? ShowActionInTable { get; set; } = false;
}
