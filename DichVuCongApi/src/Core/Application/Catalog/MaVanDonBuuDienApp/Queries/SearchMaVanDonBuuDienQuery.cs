using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Queries;

public class SearchMaVanDonBuuDienQuery : PaginationFilter, IRequest<PaginationResponse<MaVanDonBuuDienDto>>
{

    public string? Ma { get; set; }
    public string? HoSo { get; set; }
    public string? TrangThai { get; set; }
    public DateTime? NgayYeuCau { get; set; }
    public bool? DaSuDung { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 1000;
    public new int PageNumber { get; set; } = 1;
}
