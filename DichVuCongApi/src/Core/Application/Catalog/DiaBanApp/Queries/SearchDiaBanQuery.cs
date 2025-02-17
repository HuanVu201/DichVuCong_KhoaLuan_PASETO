using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp.Queries;

public class SearchDiaBanQuery : PaginationFilter, IRequest<PaginationResponse<DiaBanDto>>
{
    public string? TenDiaBan { get; set; }
    public string? MaDiaBan { get; set; }
    public string? MaTinh { get; set; }
    public string? MaHuyen { get; set; }
    public bool? LaCapTinh { get; set; }
    public string? Loai { get; set; } // Tinh, Huyen, Xa

    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 100;
    public new int PageNumber { get; set; } = 1;
}
