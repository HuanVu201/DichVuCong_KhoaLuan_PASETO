using Mapster;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.MenuApp.Queries;
using TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Dtos;
using TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Shared.Authorization;

namespace TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Queries;

public class SearchMenuKetQuaThuTucQueryWhereBuilder
{
    public static string Build(SearchMenuKetQuaThuTucWithMaDonViQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TenMenu))
            where += " AND TenMenu Like N'%' + @TenMenu + '%'";
        if (req.Active == true) where += " AND Active = 1";
        else if(req.Active == false) where += " AND Active = 0";
        if (!string.IsNullOrEmpty(req.MaDonVi))
            where += " AND MaDonVi = @MaDonVi";
        if (!string.IsNullOrEmpty(req.MaTTHC))
            where += " AND MaTTHC = @MaTTHC";
        if (!string.IsNullOrEmpty(req.Catalog))
            where += " AND Catalog = @Catalog";
        if (req.IsRoot == true)
            where += " AND ParentId is null";
        if (req.Removed == false)
            where += " AND m.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND m.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where}) AND g.DeletedOn is null";
        return where;
    }
}
public class SearchMenuKetQuaThuTucQueryHandler : IRequestHandler<SearchMenuKetQuaThuTucQuery, MenuKetQuaThuTucDto>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _userService;
    private readonly ICurrentUser _currentUser;
    private readonly IReadRepository<Menu> _menuRepository;

    public SearchMenuKetQuaThuTucQueryHandler(IDapperRepository dapperRepository, IUserService userService, ICurrentUser currentUser, IReadRepository<Menu> menuRepository)
    {
        _dapperRepository = dapperRepository;
        _userService = userService;
        _currentUser = currentUser;
        _menuRepository = menuRepository;
    }
    private async Task<SearchMenuKetQuaThuTucWithMaDonViQuery> GenerateOfficeCode(SearchMenuKetQuaThuTucQuery request)
    {
        //var officeCode = await _userService.IsSystemManager();
        var officeCode = _currentUser.GetUserOfficeCode();

        SearchMenuKetQuaThuTucWithMaDonViQuery newRequest = new SearchMenuKetQuaThuTucWithMaDonViQuery(request);
        newRequest.MaDonVi = officeCode;
        return newRequest;
    }
    public async Task<MenuKetQuaThuTucDto> Handle(SearchMenuKetQuaThuTucQuery request, CancellationToken cancellationToken)
    {
        var response = new MenuKetQuaThuTucDto();
        var newRequest = await GenerateOfficeCode(request);
        var permissions = await _userService.GetPermissionsAsync(_currentUser.GetUserId().ToString(),cancellationToken);
        var userPermissions = permissions.Distinct().ToList();
        var where = SearchMenuKetQuaThuTucQueryWhereBuilder.Build(newRequest);
        var sql = $@"SELECT m.ID, ParentId, QueryStringParams, g.GroupName as TenDonVi, ThuTuMenu, TenMenu, MaDonVi, IconName, MaTTHC FROM Catalog.MenuKetQuaThuTucs as m
                LEFT JOIN Catalog.Groups as g ON g.GroupCode = m.MaDonVi
                {where}";
        var navMenu = await _menuRepository.ListAsync(new SearchTopMenuSpec());
        var menuKetQuaThuTucs = await _dapperRepository.PaginatedListSingleQueryAsync<MenuKQTTDto>(sql, request.PageSize, "ThuTuMenu", cancellationToken, request.PageNumber, newRequest);
        var filteredNavMenuByPermission = new List<Menu>();
        navMenu.ForEach((menu) =>
        {
            if (menu.Permission == null || (menu.Permission != null && userPermissions.Any(role => menu.Permission.Contains(role))))
            {
                filteredNavMenuByPermission.Add(menu);
            }
        });
        response.NavMenu = filteredNavMenuByPermission.Adapt<List<NavMenuKQTTDto>>();
        response.MenuKetQuaThuTucs = menuKetQuaThuTucs;
        return response;
    }
}
