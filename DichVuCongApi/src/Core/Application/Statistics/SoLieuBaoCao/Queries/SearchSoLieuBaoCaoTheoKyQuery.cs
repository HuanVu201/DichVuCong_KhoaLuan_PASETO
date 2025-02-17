using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.Queries;
public class SearchSoLieuBaoCaoTheoKyQuery : PaginationFilter, IRequest<PaginationResponse<SoLieuBaoCaoDto>>
{
    public string? LoaiThoiGian { get; set; }
    public int? Ky { get; set; }
    public int? Nam { get; set; }
    public string? LoaiThongKe { get; set; }
    public string? MaDinhDanh { get; set; }
    public bool? GetAllMonth { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 100000;
    public new int PageNumber { get; set; } = 1;
}
