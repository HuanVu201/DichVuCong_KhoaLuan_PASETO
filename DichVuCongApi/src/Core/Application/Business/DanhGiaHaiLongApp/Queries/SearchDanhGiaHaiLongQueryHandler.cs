using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Queries;

public class SearchDanhGiaHaiLongQueryWhereBuilder
{
    public static string Build(SearchDanhGiaHaiLongQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += "AND MaHoSo = @MaHoSo";
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
public class SearchDanhGiaHaiLongQueryHandler : IRequestHandler<SearchDanhGiaHaiLongQuery, PaginationResponse<DanhGiaHaiLongDto>>
{
    private readonly string tableName = "Business.DanhGiaHaiLongs";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchDanhGiaHaiLongQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<DanhGiaHaiLongDto>> Handle(SearchDanhGiaHaiLongQuery request, CancellationToken cancellationToken)
    {
        var where = SearchDanhGiaHaiLongQueryWhereBuilder.Build(request);
        var sql = $@"SELECT {tableName}.* FROM {tableName} {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhGiaHaiLongDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
