using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Commands;
public class AddThuTucThuocLoaiCommand : ICommand<Guid>
{
    public Guid? Id { get; set; }
    public Guid ThuTucID { get; set; }
    public int ThuTu { get; set; }
    public Guid LoaiThuTucId { get; set; }
}
