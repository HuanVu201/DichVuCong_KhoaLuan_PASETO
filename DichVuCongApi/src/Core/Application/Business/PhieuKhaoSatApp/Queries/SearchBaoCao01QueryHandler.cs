using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;

public class SearchBaoCao01WhereBuilder
{
    public static string Build(SearchBaoCao01Query req)
    {
        string where = string.Empty;
     /*   if (!string.IsNullOrEmpty(req.DonVi))
            where += " AND DonVi = @DonVi";*/
        if (!string.IsNullOrEmpty(req.Quy))
            where += " AND DATEPART(QUARTER, NgayTao) = CAST(@Quy AS INT)";
        if (!string.IsNullOrEmpty(req.Nam))
            where += " AND DATEPART(YEAR, NgayTao) =  CAST(@Nam AS INT)";
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
public class SearchBaoCao01QueryHandler : IRequestHandler<SearchBaoCao01Query, PaginationResponse<BaoCao01Dto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchBaoCao01QueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<BaoCao01Dto>> Handle(SearchBaoCao01Query request, CancellationToken cancellationToken)
    {
        var where = SearchBaoCao01WhereBuilder.Build(request);
        var whereGroupCode = string.Empty;
        string order = string.Empty;
        var lstOrderCol = request.OrderBy != null && request.OrderBy.Length > 0 ? request.OrderBy.ToList() : new List<string>() { "GroupCode" };
        foreach (var item in lstOrderCol.Select((value, index) => new { index, value }))
        {
            order += $"DonVi";
        }
        var results = new PaginationResponse<BaoCao01Dto>();
        order = !string.IsNullOrEmpty(order) ? "ORDER BY " + order : string.Empty;
        var paging = $" OFFSET {(request.PageNumber - 1) * request.PageSize} ROWS FETCH NEXT {request.PageSize} ROWS ONLY";
        if (!string.IsNullOrEmpty(request.DonVi))
            whereGroupCode = "WHERE GroupCode = @DonVi AND Type = 'don-vi'";
        var sql = $@"WITH Main AS (
                    SELECT DISTINCT ID, GroupCode, GroupName, OfGroupCode, OfGroupName, Type, Catalog, OtherCatalog, GroupOrder, MaDinhDanh, DeletedOn 
                    FROM [Catalog].[Groups] {whereGroupCode}
                    UNION ALL
                    SELECT g.ID, g.GroupCode, g.GroupName, g.OfGroupCode, g.OfGroupName, g.Type, g.Catalog, g.OtherCatalog, g.GroupOrder, g.MaDinhDanh, g.DeletedOn
                    FROM [Catalog].[Groups] g
                    JOIN Main c ON g.OfGroupCode = c.GroupCode    
                    WHERE g.Type = 'don-vi'
                    ),
                    Total AS (
                    SELECT COUNT(ID) AS [TotalCount] FROM Main
                    ),
                    PhieuKhaoSatsWithGroupInfo AS (
                    SELECT  m.GroupName,pks.Id, pks.[MaHoSo], pks.DonVi,pks.NgayTao,pks.DeletedOn,
                    CAST(pks.[TraLoi1] AS INT) AS ChiSo1,
                    CAST(pks.[TraLoi2] AS INT) AS ChiSo2,
                    CAST(pks.[TraLoi3] AS INT) AS ChiSo3,
                    CAST(pks.[TraLoi4] AS INT) AS ChiSo4,
                    CAST(pks.[TraLoi6] AS INT) AS ChiSo6,
                    CAST(pks.[TraLoi7] AS INT) AS ChiSo7,
                    CAST(pks.[TraLoi10] AS INT) AS ChiSo10,
                    CAST(pks.[TraLoi11] AS INT) AS ChiSo11,
                    CAST(pks.[TraLoi1] AS INT) + CAST(pks.[TraLoi2] AS INT) + CAST(pks.[TraLoi3] AS INT) + CAST(pks.[TraLoi4] AS INT) + CAST(pks.[TraLoi6] AS INT) + CAST(pks.[TraLoi7] AS INT) AS TongDiem,
                    CASE
                        WHEN CAST(pks.[TraLoi1] AS INT) + CAST(pks.[TraLoi2] AS INT) + CAST(pks.[TraLoi3] AS INT) + CAST(pks.[TraLoi4] AS INT) + CAST(pks.[TraLoi6] AS INT) + CAST(pks.[TraLoi7] AS INT) >= 5 THEN '100%'
                        WHEN CAST(pks.[TraLoi1] AS INT) + CAST(pks.[TraLoi2] AS INT) + CAST(pks.[TraLoi3] AS INT) + CAST(pks.[TraLoi4] AS INT) + CAST(pks.[TraLoi6] AS INT) + CAST(pks.[TraLoi7] AS INT) >= 3.5 AND CAST(pks.[TraLoi1] AS INT) + CAST(pks.[TraLoi2] AS INT) + CAST(pks.[TraLoi3] AS INT) + CAST(pks.[TraLoi4] AS INT) + CAST(pks.[TraLoi6] AS INT) + CAST(pks.[TraLoi7] AS INT) < 5 THEN '70 - 100%'
                        ELSE '< 3.5'
                    END AS xepLoai
        
                    FROM [Business].[PhieuKhaoSats] pks
                    JOIN Main m ON pks.DonVi = m.GroupCode
                    )
                    SELECT  Id, [MaHoSo], DonVi, ChiSo1, ChiSo2, ChiSo3, ChiSo4, ChiSo6, ChiSo7, ChiSo10, ChiSo11, TongDiem, xepLoai,NgayTao,DeletedOn,GroupName
                    FROM PhieuKhaoSatsWithGroupInfo {where} {order} {paging}";
        var res = await _dapperRepository.QueryAsync<BaoCao01Dto>(sql, request);
        var data = res.ToList();
        if (data.Count > 0)
        {
            JObject jobj = JObject.Parse(JsonConvert.SerializeObject(data.First()));
            results.Data = data;
            results.TotalCount = int.Parse(jobj["TotalCount"].ToString());
            results.TotalPages = (int)Math.Ceiling(results.TotalCount / (double)request.PageSize);
        }
        return results;
    }
}
