using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ThayDoiMucDoThuTucApp.Commands;
public class AddThayDoiThuTucCommand : ICommand<Guid>
{
    public string? ThuTuc { get; set; }
    public string? DonVi { get; set; }
    public DateTime? ThoiGian { get; set; }
    public string? MucDoCu { get; set; }
    public string? MucDoMoi { get; set; }
    public string? NguoiCapNhat { get; set; }
}
