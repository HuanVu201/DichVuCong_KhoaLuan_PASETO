using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Dtos;
namespace TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Queries;


public class SearchQuanLyTaiNguyenQuery : PaginationFilter, IRequest<PaginationResponse<QuanLyTaiNguyenDto>>
{
    public string? Ten { get; set; }
    public bool? Public { get; set; }
    public Guid? User { get; set; }
    public bool? SuDung { get; set; } = true;
    public bool? Removed { get; set; } = false;

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}

