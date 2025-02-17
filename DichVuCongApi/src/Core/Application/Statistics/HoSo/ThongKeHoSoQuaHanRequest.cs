using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class ThongKeHoSoQuaHanRequest : BaseStatistisRequestModel, IRequest<ThongKeHoSoQuaHanResponse>
{
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? DonViQuanLy { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? Catalog { get; set; }
    public string? TrangThaiXuLy { get; set; }
    public string? TrangThaiHoSoId { get; set; }
}
