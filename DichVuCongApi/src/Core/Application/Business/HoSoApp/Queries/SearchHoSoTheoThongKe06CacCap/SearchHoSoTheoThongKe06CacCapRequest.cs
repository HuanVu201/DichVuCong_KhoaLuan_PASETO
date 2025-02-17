using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchHoSoTheoThongKe06CacCap;
public class SearchHoSoTheoThongKe06CacCapRequest : PaginationFilter, IRequest<PaginationResponse<HoSoDto>>
{
    public string? TieuChi { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaTTHC { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public bool? ChiBaoGomDonViCon { get; set; }
    public string? Catalog { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public bool? CoTrangThaiThanhToan { get; set; }
}