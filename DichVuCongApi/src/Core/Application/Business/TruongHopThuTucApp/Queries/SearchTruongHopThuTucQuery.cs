
namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;


public class SearchTruongHopThuTucQuery : PaginationFilter, IRequest<PaginationResponse<TruongHopThuTucDto>>
{
    public string? ThuTucId { get; set; }
    public string? DonViTiepNhan { get; set; }
    public bool? ByUserOfficeCode { get; set; }
    public bool? KhongNopTrucTuyen { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public string? UserOfficeCode { get; set; }
    public bool? Removed { get; set; } = false;
    [Newtonsoft.Json.JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
