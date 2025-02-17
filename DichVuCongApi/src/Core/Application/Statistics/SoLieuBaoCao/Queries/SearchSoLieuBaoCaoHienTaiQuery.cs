using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.Queries;
public class SearchSoLieuBaoCaoHienTaiQuery : PaginationFilter, IRequest<PaginationResponse<SoLieuBaoCaoDto>>
{
    public string? LoaiThongKe { get; set; }
    public string? MaDinhDanh { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 100000;
    public new int PageNumber { get; set; } = 1;
}
