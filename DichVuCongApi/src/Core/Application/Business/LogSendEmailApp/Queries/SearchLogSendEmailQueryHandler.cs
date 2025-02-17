using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.MenuApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Statistics.HoSo;

namespace TD.DichVuCongApi.Application.Business.LogSendEmailApp.Queries;

public class SearchLogSendEmailQueryWhereBuilder
{
    public static string Build(SearchLogSendEmail req)
    {
        var whereClauses = new List<string>();

        if (!string.IsNullOrEmpty(req.Service))
            whereClauses.Add("Service = @Service");

        if (!string.IsNullOrEmpty(req.Request))
            whereClauses.Add("Request = @Request");

        if (!string.IsNullOrEmpty(req.MaHoSo))
            whereClauses.Add("MaHoSo = @MaHoSo");
        var where = string.Join(" AND ", whereClauses);

        return string.IsNullOrEmpty(where) ? string.Empty : $"WHERE {where}";
    }
}
public class SearchLogSendEmailQueryHandler : IRequestHandler<SearchLogSendEmail, PaginationResponse<LogSendEmailDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchLogSendEmailQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LogSendEmailDto>> Handle(SearchLogSendEmail request, CancellationToken cancellationToken)
    {
        var where = SearchLogSendEmailQueryWhereBuilder.Build(request);
        var sql = string.Empty;
           sql = $@"
           SELECT l.ID, l.TaiKhoan, l.ThoiGian, l.DonViId, l.Loai, g.GroupName 
            FROM Business.LogSendEmails l
            JOIN Catalog.Groups g ON l.DonViId = g.GroupCode
            {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LogSendEmailDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
