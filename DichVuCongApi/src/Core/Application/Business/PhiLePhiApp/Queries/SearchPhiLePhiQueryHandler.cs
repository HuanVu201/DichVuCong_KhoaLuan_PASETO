using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp.Queries;

public class SearchPhiLePhiQueryWhereBuilder
{
    public static string Build(SearchPhiLePhiQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Loai))
            where += " AND Loai = @Loai";
        if (!string.IsNullOrEmpty(req.ThuTucId))
            where += " AND ThuTucId = @ThuTucId";
        if (!string.IsNullOrEmpty(req.TruongHopId))
            where += " AND TruongHopId = @TruongHopId";
       
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
public class SearchPhiLePhiQueryHandler : IRequestHandler<SearchPhiLePhiQuery, PaginationResponse<PhiLePhiDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchPhiLePhiQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<PhiLePhiDto>> Handle(SearchPhiLePhiQuery request, CancellationToken cancellationToken)
    {
        var where = SearchPhiLePhiQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, Loai, MoTa, SoTien, Ten FROM Business.PhiLePhis {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<PhiLePhiDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
