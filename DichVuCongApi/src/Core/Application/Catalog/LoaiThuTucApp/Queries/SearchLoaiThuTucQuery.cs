using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Application.Catalog.LoaiThuTucApp;

namespace TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Queries;


public class SearchLoaiThuTucQuery : PaginationFilter, IRequest<PaginationResponse<LoaiThuTucDto>>
{
    public Guid? Id { get; set; }
    public string? ThuTu { get; set; }
    public string? Ten { get; set; }
    public string? MoTa { get; set; }

    public Guid NhomThuTucId { get; set; }

    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
