using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Identity.Users.UsersQueries;

public class SearchUsersWhereBuilder
{
    public static string Build(SearchUserDongBoTTHCQuery req)
    {
        string where = "TypeUser = 'CanBo'";
        if (!string.IsNullOrEmpty(req.DonViQuanLy))
            //where += " AND g.GroupCode = @DonViQuanLy ";
            where += " AND u.OfficeCode = @DonViQuanLy ";

        if (!string.IsNullOrEmpty(req.UserName))
            where += " AND u.UserName Like '%' + @UserName + '%'";
        if (!string.IsNullOrEmpty(req.FullName))
            where += " AND u.FullName Like N'%' + @FullName + '%'";
        if (!string.IsNullOrEmpty(req.GroupCode))
            where += " AND u.GroupCode = @GroupCode ";
        if (!string.IsNullOrEmpty(req.TypeUser))
            where += " AND u.TypeUser = @TypeUser ";

        if (req.LaCanBoTiepNhan == true)
            where += " AND u.LaCanBoTiepNhan = 1";
        else if (req.LaCanBoTiepNhan == false)
            where += " AND u.LaCanBoTiepNhan = 0";
        if (req.Removed == false)
            where += " AND u.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND u.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchUserDongBoTTHCQueryHandler : IRequestHandler<SearchUserDongBoTTHCQuery, PaginationResponse<UserDongBoTTHCDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchUserDongBoTTHCQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<UserDongBoTTHCDto>> Handle(SearchUserDongBoTTHCQuery request, CancellationToken cancellationToken)
    {
        var where = SearchUsersWhereBuilder.Build(request);
        var sql = $@"
                  SELECT
                    Id
                  ,UserOrder
                  ,[UserName]
                  ,[FullName]
                  ,[GroupCode]
	              ,OfficeCode
	              ,SoDinhDanh
                  ,[OfficeName]
	              ,PhoneNumber
                  ,[PositionName]
                  ,Email
                  ,[HoVaTen]
                  FROM [Identity].[Users] u
                    {where}
                    ";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<UserDongBoTTHCDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }

}
