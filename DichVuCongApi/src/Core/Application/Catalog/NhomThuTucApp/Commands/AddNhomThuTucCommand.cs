using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Commands;
public class AddNhomThuTucCommand : ICommand<Guid>
{
    public string Ten { get; set; }

    public string MoTa { get; set; }

    public string Icon { get; set; }
    public string MauSac { get; set; }

    public string DoiTuong { get; set; }

    public int ThuTu { get; set; }

}
