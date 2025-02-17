using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Commands;
public class AddQuaTrinhTraoDoiCongDanCommand : ICommand<DefaultIdType>
{
    public string MaHoSo { get; set; }
    public string NoiDungTraoDoi { get; set; }
    public bool? Email { get; set; } = false;
    public bool? SMS { get; set; } = false;
    public bool? Zalo { get; set; } = false;
}
