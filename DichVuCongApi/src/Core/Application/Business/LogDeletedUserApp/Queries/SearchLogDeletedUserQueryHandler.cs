using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp;
using TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.LogDeletedUserApp.Queries;

public class SearchLogDeletedUserQueryHandlerWhereBuilder
{
    public static string Build(SearchLogDeletedUserQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.FullName))
            where += " AND FullName Like N'%' + @FullName + '%'";
        if (!string.IsNullOrEmpty(req.UserName))
            where += " AND UserName Like N'%' + @UserName + '%'";
        if (!string.IsNullOrEmpty(req.Id))
            where += " AND Id Like N'%' + @Id + '%'";
        if (req.TuNgay != null && req.DenNgay != null)
            where += " AND ThoiGianXoa BETWEEN DATEADD(day, DATEDIFF(day, 0, @TuNgay), 0) AND DATEADD(second, -1, DATEADD(day, 1, DATEADD(day, DATEDIFF(day, 0, @DenNgay), 0)))";
        if (req.TuNgay != null)
            where += " AND ThoiGianXoa BETWEEN @TuNgay AND GETDATE()";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchLogDeletedUserQueryHandler : IRequestHandler<SearchLogDeletedUserQuery, PaginationResponse<LogDeletedUserDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchLogDeletedUserQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LogDeletedUserDto>> Handle(SearchLogDeletedUserQuery request, CancellationToken cancellationToken)
    {
        var where = SearchLogDeletedUserQueryHandlerWhereBuilder.Build(request);
        var sql = string.Empty;
        sql = $@"SELECT ID, FullName,UserName,GroupCode,NgayThangNamSinh,OfficeName,GroupName,ThoiGianXoa,PositionName,MaDinhDanhOfficeCode FROM Business.LogDeletedUsers {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LogDeletedUserDto>(sql, request.PageSize, "ThoiGianXoa DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}
