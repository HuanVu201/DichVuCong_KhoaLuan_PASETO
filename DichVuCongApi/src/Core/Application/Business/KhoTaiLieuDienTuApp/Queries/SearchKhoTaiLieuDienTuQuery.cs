using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;

namespace TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Queries;
public class SearchKhoTaiLieuDienTuQuery : PaginationFilter, IRequest<PaginationResponse<KhoTaiLieuDienTuDto>>
{
    public string? SoDinhDanh { get; set; }
    public string? TenKhoTaiLieu { get; set; }
    public string? MoTa { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}