using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucThuocLoaiApp;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Queries;


public class SearchThuTucThuocLoaiTheoDonViQuery : PaginationFilter, IRequest<PaginationResponse<ThuTucThuocLoaiDto>>
{
    public string? Ma { get; set; }
    public string? Ten { get; set; }
    public string? MaNganh { get; set; }
    public bool? HasThuTuc { get; set; }
    public bool? HasThuTucCapTinh { get; set; }
    public bool? HasThuTucCapHuyen { get; set; }
    public bool? HasThuTucCapXa { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaDinhDanh { get;set; }
    public string? DonViId { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
