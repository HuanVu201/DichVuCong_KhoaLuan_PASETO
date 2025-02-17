using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Shared.Authorization;
using Microsoft.EntityFrameworkCore;

namespace TD.DichVuCongApi.Infrastructure.Identity;

internal partial class UserService
{
    public async Task<List<string>> GetPermissionsAsync(string userId, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(userId);

        _ = user ?? throw new UnauthorizedException("Authentication Failed.");

        var userRoles = await _userManager.GetRolesAsync(user);
        var permissions = new List<string>();
        foreach (var role in await _roleManager.Roles
            .Where(r => userRoles.Contains(r.Name!))
            .ToListAsync(cancellationToken))
        {
            permissions.AddRange(await _db.RoleClaims
                .Where(rc => rc.RoleId == role.Id && rc.ClaimType == TDClaims.Permission)
                .Select(rc => rc.ClaimValue!)
                .ToListAsync(cancellationToken));
        }

        return permissions.Distinct().ToList();
    }

    public async Task<bool> HasPermissionAsync(string userId, string permission, CancellationToken cancellationToken)
    {
        var permissions = await _cache.GetOrSetAsync(
            _cacheKeys.GetCacheKey(TDClaims.Permission, userId),
            () => GetPermissionsAsync(userId, cancellationToken),
            cancellationToken: cancellationToken);
        var arrPers = permission.Split(".")[1].Split(","); // permissions.something1,something2.view(update,...)
        //return permissions != null ? permissions.Any(p => arrPers.Contains(p)) : false;
        
        return permissions != null ? arrPers.Any(x => permissions.Any(p => p.Contains(x))) : false;
    }

    public Task InvalidatePermissionCacheAsync(string userId, CancellationToken cancellationToken) =>
        _cache.RemoveAsync(_cacheKeys.GetCacheKey(TDClaims.Permission, userId), cancellationToken);
}