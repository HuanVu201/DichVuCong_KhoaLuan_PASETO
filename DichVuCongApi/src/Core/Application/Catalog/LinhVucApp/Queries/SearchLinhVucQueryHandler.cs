using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;
using TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;

public class SearchLinhVucQueryWhereBuilder
{
    public static string Build(SearchLinhVucQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (!string.IsNullOrEmpty(req.Ma))
            where += " AND Ma Like N'%' + @Ma + '%'";
        if (!string.IsNullOrEmpty(req.MaNganh))
            where += " AND MaNganh Like N'%' + @MaNganh + '%'";
        if (req.HasThuTuc.HasValue)
            where += " AND SoLuongThuTuc > 0";
        if (req.HasThuTucCapTinh.HasValue)
            where += " AND SoLuongThuTucCapTinh > 0";
        if (req.HasThuTucCapHuyen.HasValue)
            where += " AND SoLuongThuTucCapHuyen > 0";
        if (req.HasThuTucCapXa.HasValue)
            where += " AND SoLuongThuTucCapXa > 0";
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
public class SearchLinhVucQueryHandler : IRequestHandler<SearchLinhVucQuery, PaginationResponse<LinhVucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchLinhVucQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LinhVucDto>> Handle(SearchLinhVucQuery request, CancellationToken cancellationToken)
    {
        var where = SearchLinhVucQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, Ten, Ma, MaNganh, SuDung FROM Catalog.LinhVucs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LinhVucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
