using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;

public class SearchGroupQueryWhereBuilder
{
    public static string Build(SearchGroupQuery req)
    {
        string where = string.Empty;
        TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        if (!string.IsNullOrEmpty(req.GroupName))
            where += " AND GroupName like N'%' + @GroupName+ '%'";
        if (req.IsRootGroupCode == true)
            where += " AND OfGroupCode is null";
        if (!string.IsNullOrEmpty(req.OfGroupCode))
        {
            where += " AND OfGroupCode = @OfGroupCode";
        }
        if (!string.IsNullOrEmpty(req.MaDinhDanhCha))
        {
            if (req.ChiBaoGomDonViCon == true)
            {
                where += $" AND (MaDinhDanh Like @MaDinhDanhCha +'%' AND MaDinhDanh != @MaDinhDanhCha) ";
            }
            else
            {
                where += $" AND MaDinhDanh Like @MaDinhDanhCha +'%' ";
            }
        }
        if (!string.IsNullOrEmpty(req.DonViQuanLy))
        {
            where += $"AND (DonViQuanLy = @DonViQuanLy OR GroupCode = @DonViQuanLy OR OfGroupCode = @DonViQuanLy) ";
        }
        if (req.CoThongKe == true) where += $"AND (CoThongKe IS NULL OR CoThongKe = 1) ";
        if (req.HasMaDinhDanh == true) where += $" AND MaDinhDanh is not null ";
        if (!string.IsNullOrEmpty(req.Catalog))
        {
            if (req.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH && req.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN
               && req.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.CNVPDK && req.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG)
            {
                where += " AND DonViQuanLy = @Catalog ";
            }
            else
            {
                where += " AND Catalog = @Catalog";
            }

        }

        if (!string.IsNullOrEmpty(req.OtherCatalog))
            where += " AND OtherCatalog LIKE '%'+@OtherCatalog+'%'";
        if (req.Catalogs != null && req.Catalogs.Count > 0)
            where += " AND Catalog in @Catalogs";
        if (!string.IsNullOrEmpty(req.MaDinhDanh))
            where += " AND MaDinhDanh =  @MaDinhDanh ";
        if (!string.IsNullOrEmpty(req.Type))
            where += " AND Type = @Type";
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
public class SearchGroupQueryHandler : IRequestHandler<SearchGroupQuery, PaginationResponse<GroupDto>>
{
    private readonly string groupTableName = "Catalog.Groups";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchGroupQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    private string GetOrderBy(string[]? keys)
    {
        List<string> res = new List<string>();
        if (keys == null)
        {
            return "GroupCode";
        }
        Dictionary<string, string> result = new Dictionary<string, string>();
        result.Add("GroupOrder", "GroupOrder");
        result.Add("GroupCode", "GroupCode");
        result.Add("MaDinhDanh", "MaDinhDanh");
        for (int i = 0; i < keys.Count(); i++)
        {
            var key = keys[i];
            if (result.ContainsKey(key))
            {
                res.Add(result[key]);
            }
        }
        if (res.Count > 0)
            return string.Join(",", res);
        else return "GroupCode";
    }
    public async Task<PaginationResponse<GroupDto>> Handle(SearchGroupQuery request, CancellationToken cancellationToken)
    {
        var where = SearchGroupQueryWhereBuilder.Build(request);

        var sql = $@"SELECT ID, GroupCode, GroupName, OfGroupCode, OfGroupName, Type, Catalog, OtherCatalog, GroupOrder, MaDinhDanh,DeletedOn,DonViQuanLy,CoThongKe FROM {groupTableName} {where}";
        if (request.GetAllChildren == true)
        {
            string tmpWhere = where;
            // lưu ý trong hàm PaginatedListSingleQueryAsync đã có With Main AS (sql).
            if (!string.IsNullOrEmpty(request.GroupCode))
            {
                if (!string.IsNullOrEmpty(where)) tmpWhere += " AND GroupCode = @GroupCode"; else tmpWhere = "WHERE GroupCode = @GroupCode";
            }
            sql = $"( " +
                $"SELECT DISTINCT ID, GroupCode, GroupName, OfGroupCode, OfGroupName, Type, Catalog, OtherCatalog, GroupOrder, MaDinhDanh,DeletedOn,DonViQuanLy FROM {groupTableName} {tmpWhere} " +
                $"  UNION ALL " +
                $" SELECT g.ID, g.GroupCode, g.GroupName, g.OfGroupCode, g.OfGroupName, g.Type, g.Catalog, g.OtherCatalog, g.GroupOrder, g.MaDinhDanh,g.DeletedOn,g.DonViQuanLy " +
                $"FROM {groupTableName} g " +
                $"JOIN Main c ON g.OfGroupCode = c.GroupCode " +
                $")";
        }
        string order = string.Empty;

        var results = new PaginationResponse<GroupDto>();
        order = "ORDER BY " + GetOrderBy(request.OrderBy);
        var paging = $" OFFSET {(request.PageNumber - 1) * request.PageSize} ROWS FETCH NEXT {request.PageSize} ROWS ONLY";
        var queryFull = $"WITH Main AS({sql}), Total AS (SELECT COUNT(ID) AS[TotalCount] FROM Main) SELECT DISTINCT * FROM Main, Total {where} {order} {paging}";
        var res = await _dapperRepository.QueryAsync<GroupDto>(queryFull, request);
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
