using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Dtos;

namespace TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Queries;


public class SearchMenuKetQuaThuTucQuery : PaginationFilter, IRequest<MenuKetQuaThuTucDto>
{
    public string? TenMenu { get; set; }
    public string? Catalog { get; set; }
    public string? MaTTHC { get; set; }
    public bool? IsRoot { get; set; }
    public bool? Removed { get; set; } = false;
    public bool? Active { get; set; } = null;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}

public class SearchMenuKetQuaThuTucWithMaDonViQuery : SearchMenuKetQuaThuTucQuery
{
    public string? MaDonVi { get; set; }
    public SearchMenuKetQuaThuTucWithMaDonViQuery(SearchMenuKetQuaThuTucQuery request)
    {
        TenMenu = request.TenMenu;
        Removed = request.Removed;
        Active = request.Active;
        ReFetch = request.ReFetch;
        PageNumber = request.PageNumber;
        PageSize = request.PageSize;
        MaTTHC = request.MaTTHC;
        Catalog = request.Catalog;
    }
}