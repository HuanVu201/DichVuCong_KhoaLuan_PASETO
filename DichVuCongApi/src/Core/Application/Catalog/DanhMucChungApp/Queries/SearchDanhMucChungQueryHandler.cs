using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;


namespace TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Queries;

public class SearchDanhMucChungQueryWhereBuilder
{
    public static string Build(SearchDanhMucChungQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TenDanhMuc))
            where += " AND TenDanhMuc Like N'%' + @TenDanhMuc + '%'";
        if (!string.IsNullOrEmpty(req.Code))
            where += " AND Code Like N'%' + @Code + '%'";
        if (!string.IsNullOrEmpty(req.Type))
            where += " AND Type = @Type";
        if(req.Types != null && req.Types.Count > 0)
        {
            where += " AND Type IN @Types ";
        }
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

public class SearchDanhMucChungQueryHandler : IRequestHandler<SearchDanhMucChungQuery, PaginationResponse<DanhMucChungDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchDanhMucChungQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<DanhMucChungDto>> Handle(SearchDanhMucChungQuery request, CancellationToken cancellationToken)
    {
        var where = SearchDanhMucChungQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID,TenDanhMuc,Code, ParentCode,ThuTu,Active,Type FROM Catalog.DanhMucChungs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhMucChungDto>(sql, request.PageSize, "ThuTu", cancellationToken, request.PageNumber, request);
        return data;
    }
}
