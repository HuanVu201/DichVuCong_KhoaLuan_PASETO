using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Queries;
public class SearchTaiLieuKhoLuuTruCongDanQuery : PaginationFilter, IRequest<PaginationResponse<TaiLieuKhoLuuTruCongDanDto>>
{
    public Guid? KhoLuuTruId { get; set; }
    public string? TenGiayTo { get; set; }
    public string? DuongDan { get; set; }
    public string? Nguon { get; set; }
    public string? LoaiTaiLieu { get; set; }
    public string? LoaiNhomGiayToCaNhanId { get; set; }
    public string? MaLinhVuc { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
