using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class AddThuSauYeuCauThanhToan : ICommand
{
    public DefaultIdType? Id { get; set; }
    public DefaultIdType? HoSoId { get; set; }
    public string? Ma { get; set; }
    public int? SoTien { get; set; }
    public int? Phi { get; set; }
    public int? LePhi { get; set; }
    public string? TrangThai { get; set; }
    public string? HinhThucThu { get; set; }
    public string? ChiTiet { get; set; }

}
