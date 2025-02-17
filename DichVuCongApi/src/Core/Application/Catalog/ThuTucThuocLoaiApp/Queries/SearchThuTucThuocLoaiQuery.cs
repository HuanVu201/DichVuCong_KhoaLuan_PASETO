using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucThuocLoaiApp;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Queries;


public class SearchThuTucThuocLoaiQuery : PaginationFilter, IRequest<PaginationResponse<ThuTucThuocLoaiDto>>
{
    public Guid? ThuTucId { get; set; }

    public int? ThuTu { get; set; }

    public Guid? LoaiThuTucid { get; set; }

    public Guid? ThuTucid { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
