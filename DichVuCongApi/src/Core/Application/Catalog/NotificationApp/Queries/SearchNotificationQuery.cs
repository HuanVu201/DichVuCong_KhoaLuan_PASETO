using TD.DichVuCongApi.Application.Catalog.NotificationApp.Dtos;

namespace TD.DichVuCongApi.Application.Catalog.NotificationApp.Queries;
public class SearchNotificationQuery : PaginationFilter, IRequest<PaginationResponse<SearchNotificationDto>>
{
    public string? Topic { get; set; }
    public bool? IsRead { get; set; }
    public string? LoaiThongBao { get; set; }
    public string? MaHoSo { get; set; }
    public DefaultIdType? HoSoId { get; set; }
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
