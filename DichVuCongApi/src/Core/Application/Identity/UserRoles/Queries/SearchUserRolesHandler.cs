using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;

namespace TD.DichVuCongApi.Application.Identity.UserRoles.Queries;
public class SearchUserRolesHandler : IRequestHandler<SearchUserRoles, PaginationResponse<UserRolesDetailDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly string userRolesTableName = "[Identity].[UserRoles]";
    private readonly string userTableName = "[Identity].[Users]";
    public SearchUserRolesHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<UserRolesDetailDto>> Handle(SearchUserRoles request, CancellationToken cancellationToken)
    {

        string where = "";
        if (request.RoleIds != null)
        {
            if (!string.IsNullOrEmpty(request.RoleId)) where += $" AND {userRolesTableName}.RoleId IN ('{request.RoleId}','{request.RoleIds}')";

        }
        else if (!string.IsNullOrEmpty(request.RoleId))
        {
            if (!string.IsNullOrEmpty(request.RoleId)) where += $" AND {userRolesTableName}.RoleId = @RoleId ";
        }

        //if (!string.IsNullOrEmpty(request.RoleId)) where += $" AND {userRolesTableName}.RoleId = @RoleId ";

        if (!string.IsNullOrEmpty(request.FullName))
            where += $" AND {userTableName}.FullName LIKE N'%' + @FullName + '%'";
        if (!string.IsNullOrEmpty(request.UserName))
            where += $" AND {userTableName}.UserName LIKE N'%' + @UserName + '%' ";

        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            where = $"WHERE {where}";
        string sql = $"SELECT {userTableName}.*, {userRolesTableName}.RoleId, {userRolesTableName}.UserId " +
            $"FROM {userRolesTableName} " +
            $"INNER JOIN {userTableName} " +
            $"ON {userTableName}.Id = {userRolesTableName}.UserId " +
            $"{where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<UserRolesDetailDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }


}
