using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Commands;
public class AddLoaiThuTucCommand : ICommand<Guid>
{
    public string? Ten { get; set; }
    public string? MoTa { get; set; }
    public int ThuTu { get; set; }
    public Guid NhomThuTucID { get; set; }

}
