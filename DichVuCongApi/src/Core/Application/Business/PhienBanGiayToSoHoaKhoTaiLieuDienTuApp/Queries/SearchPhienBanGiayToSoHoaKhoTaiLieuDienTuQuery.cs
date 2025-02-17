using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaKhoTaiLieuDienTuApp;

namespace TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Queries;
public class SearchPhienBanGiayToSoHoaKhoTaiLieuDienTuQuery : PaginationFilter, IRequest<PaginationResponse<PhienBanGiayToSoHoaKhoTaiLieuDienTuDto>>
{
    public string? SoDinhDanh { get; set; }
    public string? KhoTaiLieuDienTuId { get; set; }
    public string? MaHoSo { get; set; }
    public string? MaGiayTo { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}