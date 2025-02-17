using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
public class QuyetDinh766TienDoGiaiQuyetRequest : BaseStatistisRequestModel, IRequest<QuyetDinh766Response<QuyetDinh766TienDoGiaiQuyetElementResponse>>
{
    public bool? LocTheoDonViHienTai { get; set; }
    public string? MaDonViCha { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? Catalog { get; set; }
    public string? Type { get; set; }
}
