using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.TrangThaiHoSoApp.Queries;

public class SearchTrangThaiHoSoQueryWhereBuilder
{
    public static string Build(SearchTrangThaiHoSoQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if(req.LaTrangThaiQuyTrinh == true)
            where += " AND LaTrangThaiQuyTrinh = 1";
        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchTrangThaiHoSoQueryHandler : IRequestHandler<SearchTrangThaiHoSoQuery, PaginationResponse<TrangThaiHoSoDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchTrangThaiHoSoQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<TrangThaiHoSoDto>> Handle(SearchTrangThaiHoSoQuery request, CancellationToken cancellationToken)
    {
        var where = SearchTrangThaiHoSoQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, Ten, Ma FROM Business.TrangThaiHoSos {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TrangThaiHoSoDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
