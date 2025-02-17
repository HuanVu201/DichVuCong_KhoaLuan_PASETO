using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchSoTheoDoi;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.ExportThongKe;
public class ExportThongKeSoTheoDoiHoSoRequest : PaginationFilter, IRequest<string>
{
    public string? TypeExport { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public string? GroupCode { get; set; }
    public string? DonViQuanLy { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
    public string? SearchKeys { get; set; }
}