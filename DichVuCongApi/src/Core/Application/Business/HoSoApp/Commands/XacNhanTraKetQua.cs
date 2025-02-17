using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;


namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class XacNhanTraKetQua : ICommand<Dictionary<string, string>>
{
    public List<string> Ids { get; set; }
    public string? TrangThaiTraKq { get; set; }
    public string? ThaoTac { get; set; }
    public int? SoTien { get; set; }
    public int? Phi { get; set; }
    public int? LePhi { get; set; }
    public string? ChiTiet { get; set; }
    public bool? YeuCauBCCILayKetQua { get; set; }
    
}
