using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp;

namespace TD.DichVuCongApi.Application.Catalog.NguoiDungNhomNguoiDungApp.Queries;
public class SearchUserNotInNhomQuery : PaginationFilter, IRequest<PaginationResponse<UserNotInNhomDto>>
{
    public string NhomNguoiDungId { get; set; }
    public string? GroupCode { get; set; }
    public string? GroupName { get; set; }
    public string? OfficeName { get; set; }
    public string? OfficeCode { get; set; }
    public string? FullName { get; set; }
    public string? UserName { get; set; }
    public string? ChucVu { get; set; }
    public string? ChucDanh { get; set; }
    public string? PositionName { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
