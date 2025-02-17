using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;

public class SearchPortalGroupQueryWhereBuilder
{
    public static string Build(SearchPortalGroupQuery req)
    {
        string where = $"{nameof(Group.Active)} = 1 ";
        if (!string.IsNullOrEmpty(req.GroupCode))
            where += " AND GroupCode = @GroupCode";
        if (!string.IsNullOrEmpty(req.GroupName))
            where += " AND GroupName like N'%' + @GroupName+ '%'";
        if (req.IsRootGroupCode == true)
            where += " AND OfGroupCode is null";
        if (!string.IsNullOrEmpty(req.OfGroupCode))
        {
            if (req.GetAllChildren == true)
            {
                where += $" AND OfGroupCode IN (SELECT GroupCode FROM Catalog.Groups WHERE Catalog.Groups.OfGroupCode = @OfGroupCode)";
            }
            else
            where += " AND OfGroupCode = @OfGroupCode";
        }
        if (!string.IsNullOrEmpty(req.MaDinhDanhCha))
            where += $" AND MaDinhDanh Like @MaDinhDanhCha +'%'";
        if (!string.IsNullOrEmpty(req.Catalog))
        {
            if(req.Catalog == "so-ban-nganh")
                where += " AND Catalog IN ('cnvpdk', 'so-ban-nganh')";
            else
                where += " AND Catalog = @Catalog";

        }

        if (!string.IsNullOrEmpty(req.OtherCatalog))
            where += " AND OtherCatalog LIKE '%'+@OtherCatalog+'%'";
        if (req.Catalogs != null && req.Catalogs.Count > 0)
            where += " AND Catalog in @Catalogs";
        if (!string.IsNullOrEmpty(req.MaDinhDanh))
            where += " AND MaDinhDanh like '%'+@MaDinhDanh+'%'";
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
public class SearchPortalGroupQueryHandler : IRequestHandler<SearchPortalGroupQuery, PaginationResponse<PortalGroupDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 15;
    private readonly IDapperRepository _dapperRepository;
    public SearchPortalGroupQueryHandler(IDapperRepository dapperRepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
    }
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
    public async Task<PaginationResponse<PortalGroupDto>> Handle(SearchPortalGroupQuery request, CancellationToken cancellationToken)
    {
        var where = SearchPortalGroupQueryWhereBuilder.Build(request);
        string order = GetOrderBy(request.OrderBy);

        var sql = $@"SELECT ID, GroupCode, GroupName, OfGroupCode, OfGroupName, Type, Catalog, OtherCatalog, GroupOrder, MaDinhDanh FROM Catalog.Groups {where}";
        var data = await _cacheService.GetOrSetAsync(request,
            async () => await _dapperRepository.PaginatedListSingleQueryAsync<PortalGroupDto>(sql, request.PageSize, order, cancellationToken, request.PageNumber, request),
            TimeSpan.FromMinutes(15), cancellationToken);
        return data;
    }
}
