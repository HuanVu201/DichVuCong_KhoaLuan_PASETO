using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuTTTT;
public class QuyetDinh766ChiTieuTTTT2Request : BaseStatistisRequestModel, IRequest<QuyetDinh766Response<QuyetDinh766ChiTieuTTTT2Element>>
{
    public string? DonViQuanLy { get; set; }
    public List<string>? MucDos { get; set; }
}
