using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Catalog.ThayDoiMucDoThuTucApp.Queries;
public class SearchThayDoiThuTucQuery : PaginationFilter, IRequest<PaginationResponse<ThayDoiMucDoThuTucDto>>
{
    public string? DonVi { get; set; }
    public string? ThuTuc { get; set; }
    public string? MucDoCu { get; set; }
    public string? MucDoMoi { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public DateTime? ThoiGian { get; set; }

    public bool? Removed { get; set; } = false;

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
