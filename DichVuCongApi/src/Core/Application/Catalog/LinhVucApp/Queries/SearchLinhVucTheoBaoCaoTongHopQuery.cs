using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;

namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;
public class SearchLinhVucTheoBaoCaoTongHopQuery : PaginationFilter, IRequest<PaginationResponse<LinhVucDto>>
{
    public string? Ma { get; set; }
    public string? Ten { get; set; }
    public string? MaNganh { get; set; }
    public string? Catalog { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaDinhDanh { get;set; }
    public string? MaDinhDanhCha { get; set; }
    public bool? ChiBaoGomDonViCon { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
