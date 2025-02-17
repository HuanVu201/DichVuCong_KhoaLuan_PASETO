using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.ChiaSeTaiLieuKhoLuuTruCongDanApp.Queries;
public class SearchChiaSeTaiLieuKhoLuuTruCongDanQuery : PaginationFilter, IRequest<PaginationResponse<ChiaSeTaiLieuKhoLuuTruCongDanDto>>
{
    public string? SoDinhDanhNhan { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
