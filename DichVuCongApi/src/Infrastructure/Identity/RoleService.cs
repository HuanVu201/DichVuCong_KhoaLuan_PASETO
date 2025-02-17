using Finbuckle.MultiTenant;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Identity.Roles;
using TD.DichVuCongApi.Domain.Identity;
using TD.DichVuCongApi.Infrastructure.Persistence.Context;
using TD.DichVuCongApi.Shared.Authorization;
using TD.DichVuCongApi.Shared.Multitenancy;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace TD.DichVuCongApi.Infrastructure.Identity;

internal class RoleService : IRoleService
{
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _db;
    private readonly IStringLocalizer _t;
    private readonly ICurrentUser _currentUser;
    private readonly ITenantInfo _currentTenant;
    private readonly IEventPublisher _events;

    public RoleService(
        RoleManager<ApplicationRole> roleManager,
        UserManager<ApplicationUser> userManager,
        ApplicationDbContext db,
        IStringLocalizer<RoleService> localizer,
        ICurrentUser currentUser,
        ITenantInfo currentTenant,
        IEventPublisher events)
    {
        _roleManager = roleManager;
        _userManager = userManager;
        _db = db;
        _t = localizer;
        _currentUser = currentUser;
        _currentTenant = currentTenant;
        _events = events;
    }


    public async Task<int> GetCountAsync(CancellationToken cancellationToken) =>
        await _roleManager.Roles.CountAsync(cancellationToken);

    public async Task<bool> ExistsAsync(string roleName, string? excludeId) =>
        await _roleManager.FindByNameAsync(roleName)
            is ApplicationRole existingRole
            && existingRole.Id != excludeId;

    public async Task<RoleDto> GetByIdAsync(string id) =>
        await _db.Roles.SingleOrDefaultAsync(x => x.Id == id) is { } role
            ? role.Adapt<RoleDto>()
            : throw new NotFoundException(_t["Role Not Found"]);

    public async Task<RoleDto> GetByIdWithPermissionsAsync(string roleId, CancellationToken cancellationToken)
    {
        var role = await GetByIdAsync(roleId);

        role.Permissions = await _db.RoleClaims
            .Where(c => c.RoleId == roleId && c.ClaimType == TDClaims.Permission)
            .Select(x => new RolePermission()
            {
                Id = x.Id,
                ClaimValue = x.ClaimValue,
            })
            .ToListAsync(cancellationToken);

        return role;
    }
    public async Task<List<RolePermission>> SearchWithPermissionsAsync(CancellationToken cancellationToken)
    {
        var permissions = await _db.RoleClaims.Select(x => new RolePermission()
        {
            Id = x.Id,
            ClaimValue = x.ClaimValue
        })
            .ToListAsync(cancellationToken);
        return permissions;
    }

    public async Task<string> CreateOrUpdateAsync(CreateOrUpdateRoleRequest request)
    {
        if (string.IsNullOrEmpty(request.Id))
        {
            // Create a new role.
            var role = new ApplicationRole(request.Name, request.Description);
            var result = await _roleManager.CreateAsync(role);

            if (!result.Succeeded)
            {
                throw new InternalServerException(_t["Register role failed"], result.GetErrors(_t));
            }

            await _events.PublishAsync(new ApplicationRoleCreatedEvent(role.Id, role.Name!));

            return string.Format(_t["Role {0} Created."], request.Name);
        }
        else
        {
            // Update an existing role.
            var role = await _roleManager.FindByIdAsync(request.Id);

            _ = role ?? throw new NotFoundException(_t["Role Not Found"]);

            if (TDRoles.IsDefault(role.Name!))
            {
                if (request.LaQuyenQuanTriDonVi != null)
                {
                    role.LaQuyenQuanTriDonVi = request.LaQuyenQuanTriDonVi;
                }
                else
                {
                    throw new Exception($"Cannot Update Role's Name, Description: {role.Name}.");
                }
            }
            else
            {
                role.Name = request.Name;
                role.NormalizedName = request.Name.ToUpperInvariant();
                role.Description = request.Description;
                role.LaQuyenQuanTriDonVi = request.LaQuyenQuanTriDonVi;
            }

            var result = await _roleManager.UpdateAsync(role);

            if (!result.Succeeded)
            {
                throw new InternalServerException(_t["Update role failed"], result.GetErrors(_t));
            }

            await _events.PublishAsync(new ApplicationRoleUpdatedEvent(role.Id, role.Name));

            return string.Format(_t["Role {0} Updated."], role.Name);
        }
    }

    public async Task<string> UpdatePermissionsAsync(UpdateRolePermissionsRequest request, CancellationToken cancellationToken)
    {
        var role = await _roleManager.FindByIdAsync(request.RoleId);
        _ = role ?? throw new NotFoundException(_t["Role Not Found"]);
        if (role.Name == TDRoles.QuanTriHeThong)
        {
            throw new ConflictException(_t["Not allowed to modify Permissions for this Role."]);
        }

        if (_currentTenant.Id != MultitenancyConstants.Root.Id)
        {
            // Remove Root Permissions if the Role is not created for Root Tenant.
            request.Permissions.RemoveAll(u => u.StartsWith("Permissions.Root."));
        }

        var currentClaims = await _roleManager.GetClaimsAsync(role);

        // Remove permissions that were previously selected
        foreach (var claim in currentClaims.Where(c => !request.Permissions.Any(p => p == c.Value)))
        {
            var removeResult = await _roleManager.RemoveClaimAsync(role, claim);
            if (!removeResult.Succeeded)
            {
                throw new InternalServerException(_t["Update permissions failed."], removeResult.GetErrors(_t));
            }
        }

        // Add all permissions that were not previously selected
        foreach (string permission in request.Permissions.Where(c => !currentClaims.Any(p => p.Value == c)))
        {
            if (!string.IsNullOrEmpty(permission))
            {
                _db.RoleClaims.Add(new ApplicationRoleClaim
                {
                    RoleId = role.Id,
                    ClaimType = TDClaims.Permission,
                    ClaimValue = permission,
                    CreatedBy = _currentUser.GetUserId().ToString()
                });
                await _db.SaveChangesAsync(cancellationToken);
            }
        }

        await _events.PublishAsync(new ApplicationRoleUpdatedEvent(role.Id, role.Name!, true));

        return _t["Permissions Updated."];
    }

    public async Task<string> DeleteAsync(string id)
    {
        var role = await _roleManager.FindByIdAsync(id);

        _ = role ?? throw new NotFoundException(_t["Role Not Found"]);

        if (TDRoles.IsDefault(role.Name!))
        {
            throw new ConflictException(string.Format(_t["Not allowed to delete {0} Role."], role.Name));
        }

        if ((await _userManager.GetUsersInRoleAsync(role.Name!)).Count > 0)
        {
            throw new ConflictException(string.Format(_t["Not allowed to delete {0} Role as it is being used."], role.Name));
        }

        await _roleManager.DeleteAsync(role);

        await _events.PublishAsync(new ApplicationRoleDeletedEvent(role.Id, role.Name!));

        return string.Format(_t["Role {0} Deleted."], role.Name);
    }

    public async Task<string> UpdateQuyenQuanTriDonVi(string id, bool laQuyenQuanTriDonVi)
    {
        var role = await _roleManager.FindByIdAsync(id);
        _ = role ?? throw new NotFoundException(_t["Role Not Found"]);
        role.SetLaQuyenQuanTriDonVi(laQuyenQuanTriDonVi);
        return string.Format(_t["Role Updated."], role.Name);
    }

    public async Task<List<RoleDto>> GetListAsync(CancellationToken cancellationToken) =>
     (await _roleManager.Roles
      .Where(x => x.IsSupperAdmin != true && x.IsAdmin != true)
      .ToListAsync(cancellationToken))
  .Adapt<List<RoleDto>>();

    public async Task<List<RoleDto>> GetListQuanTriDonVi(CancellationToken cancellationToken) =>
     (await _roleManager.Roles
      .Where(x => x.LaQuyenQuanTriDonVi == true && x.IsSupperAdmin != true && x.IsAdmin != true)
      .ToListAsync(cancellationToken))
  .Adapt<List<RoleDto>>();
}