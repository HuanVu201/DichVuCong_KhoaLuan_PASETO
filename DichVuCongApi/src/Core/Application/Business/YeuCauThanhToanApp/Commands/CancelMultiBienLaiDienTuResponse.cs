using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class CancelMultiBienLaiDienTuResponse
{
    public List<CancelMultiBienLaiDienTuElementResponse> results { get; set; } = new List<CancelMultiBienLaiDienTuElementResponse> ();
}
public class CancelMultiBienLaiDienTuElementResponse
{
    public string? YeuCauThanhToanId { get; set; }
    public string? MaLoi { get; set; }
}
