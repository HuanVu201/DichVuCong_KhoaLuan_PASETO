using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Application.Catalog.TaiKhoanThuHuongApp;

namespace TD.DichVuCongApi.Application.Catalog.TaiKhoanThuHuongApp.Queries;


public class SearchTaiKhoanThuHuongQuery : PaginationFilter, IRequest<PaginationResponse<TaiKhoanThuHuongDto>>
{
    public string? MaNHThuHuong { get; set; }
    public string? DonViId { get; set; }
    public string? TenTKThuHuong { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
