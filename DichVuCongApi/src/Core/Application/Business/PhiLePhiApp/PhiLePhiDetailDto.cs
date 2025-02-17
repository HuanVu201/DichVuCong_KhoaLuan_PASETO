using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp;
public class PhiLePhiDetailDto
{
    public string Ten { get; private set; }
    public string Ma { get; private set; }
    public string ThuTucId { get; private set; }
    public string TruongHopId { get; private set; }
    public string Loai { get; private set; }
    public int? SoTien { get; private set; }
    public string? MoTa { get; private set; }
    public string? DinhKem { get; private set; }
}
