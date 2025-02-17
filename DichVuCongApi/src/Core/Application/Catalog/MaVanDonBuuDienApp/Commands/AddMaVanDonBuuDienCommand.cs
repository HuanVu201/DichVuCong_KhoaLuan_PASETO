using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Commands;
public class AddMaVanDonBuuDienCommand : ICommand<Guid>
{
    public string Ma { get; set; }
    public string? HoSo { get; set; }
    public string? TrangThai { get; set; }
    public DateTime? NgayYeuCau { get; set; }
    
}
