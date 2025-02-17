using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucLienQuanApp.Queries;
public class SearchThuTucLienQuanQueryWhereBuilder
{
    public static string Build(SearchThuTucLienQuanQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.ThuTu.ToString()))
            where += " AND tl.ThuTu=@ThuTu";
        if (!string.IsNullOrEmpty(req.ThuTucid.ToString()))
            where += " AND tl.ThuTucid=@ThuTucid";
        if (!string.IsNullOrEmpty(req.ThuTucLienQuanId.ToString()))
            where += " AND tl.ThuTucLienQuanId=@ThuTucLienQuanId";

        if (req.Removed == false)
            where += " AND tl.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND tl.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchThuTucLienQuanQueryHandler : IRequestHandler<SearchThuTucLienQuanQuery, PaginationResponse<ThuTucLienQuanDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchThuTucLienQuanQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ThuTucLienQuanDto>> Handle(SearchThuTucLienQuanQuery request, CancellationToken cancellationToken)
    {
        var where = SearchThuTucLienQuanQueryWhereBuilder.Build(request);
        var sql = $@"
            SELECT 
                tl.ID, 
                tl.ThuTu, 
                tl.ThuTucid, 
                tl.ThuTucLienQuanId, 
                t1.TenTTHC AS TenThuTuc, -- Tên thủ tục
                t2.TenTTHC AS TenThuTucLienQuan -- Tên thủ tục liên quan
            FROM Catalog.ThuTucLienQuans tl
            LEFT JOIN Catalog.ThuTucs t1 ON tl.ThuTucid = t1.ID
            LEFT JOIN Catalog.ThuTucs t2 ON tl.ThuTucLienQuanId = t2.ID
            {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThuTucLienQuanDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}