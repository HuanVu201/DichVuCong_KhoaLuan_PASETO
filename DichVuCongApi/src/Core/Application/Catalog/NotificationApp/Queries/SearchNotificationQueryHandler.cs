using System.Data;
using TD.DichVuCongApi.Application.Catalog.NhomNguoiDungApp.Queries;
using TD.DichVuCongApi.Application.Catalog.NotificationApp.Dtos;
using TD.DichVuCongApi.Application.Common.FirebaseNotification;

namespace TD.DichVuCongApi.Application.Catalog.NotificationApp.Queries;
public class SearchNotificationQueryWhereBuilder
{
    public static string Build(SearchNotificationQuery req)
    {
        string where = string.Empty;
        if (req.HoSoId != null && req.HoSoId != default)
            where += " AND HoSoId = @HoSoId";
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND MaHoSo = @MaHoSo";
        if(!string.IsNullOrEmpty(req.LoaiThongBao))
            where += " AND LoaiThongBao = @LoaiThongBao";
        if (req.IsRead != null)
            where += " AND IsRead = @IsRead";
        if (!string.IsNullOrEmpty(req.Topic))
            where += " AND Topic = @Topic";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchNotificationQueryHandler : IRequestHandler<SearchNotificationQuery, PaginationResponse<SearchNotificationDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IFirebaseNotification _firebaseNotification;
    public SearchNotificationQueryHandler(IDapperRepository dapperRepository, IFirebaseNotification firebaseNotification)
    {
        _dapperRepository = dapperRepository;
        _firebaseNotification = firebaseNotification;
    }
    public async Task<PaginationResponse<SearchNotificationDto>> Handle(SearchNotificationQuery request, CancellationToken cancellationToken)
    {
        var res =await _firebaseNotification.SearchNotification(request, cancellationToken);
        return res;
    }
}
