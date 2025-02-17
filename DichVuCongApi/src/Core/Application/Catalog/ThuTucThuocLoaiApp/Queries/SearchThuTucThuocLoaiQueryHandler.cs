using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucThuocLoaiApp;
using TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Queries;

public class SearchThuTucThuocLoaiQueryWhereBuilder
{
    public static string Build(SearchThuTucThuocLoaiQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.LoaiThuTucid.ToString()))
        {
            string stringloaithutucID = req.LoaiThuTucid.ToString();
            where += " AND tt.LoaiThuTucId = '" + stringloaithutucID + "'";
        }
        if (!string.IsNullOrEmpty(req.ThuTucid.ToString()))
        {
            string stringthutucID = req.ThuTucid.ToString();
            where += " AND tt.ThuTucId = '" + stringthutucID + "'";
        }

        if (req.Removed == false)
            where += " AND tt.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND tt.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchThuTucThuocLoaiQueryHandler : IRequestHandler<SearchThuTucThuocLoaiQuery, PaginationResponse<ThuTucThuocLoaiDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchThuTucThuocLoaiQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ThuTucThuocLoaiDto>> Handle(SearchThuTucThuocLoaiQuery request, CancellationToken cancellationToken)
    {
        var where = SearchThuTucThuocLoaiQueryWhereBuilder.Build(request);
        // var sql = $@"SELECT ID,ThuTucID,ThuTu,LoaiThuTucId FROM Catalog.ThuTucThuocLoais INNER JOIN Catalog.ThuTucThuocLoais {where}";
        var sql = $@"SELECT
    tt.ID,
    tt.ThuTucID,
    tt.ThuTu,
    tt.LoaiThuTucId,
    t.TenTTHC AS TenThuTuc
    FROM
    Catalog.ThuTucThuocLoais tt
    INNER JOIN
    Catalog.ThuTucs t
    ON
    tt.ThuTucID = t.Id {where}";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThuTucThuocLoaiDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
