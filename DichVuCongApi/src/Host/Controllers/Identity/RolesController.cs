using TD.DichVuCongApi.Application.Identity.Roles;

namespace TD.DichVuCongApi.Host.Controllers.Identity;

public class RolesController : VersionNeutralApiController
{
    private readonly IRoleService _roleService;

    public RolesController(IRoleService roleService) => _roleService = roleService;

    [HttpGet]
    [MustHavePermission(TDAction.View, TDResource.Roles)]
    [OpenApiOperation("Get a list of all roles.", "")]
    public Task<List<RoleDto>> GetListAsync(CancellationToken cancellationToken)
    {
        return _roleService.GetListAsync(cancellationToken);
    }
    [HttpGet("QuanTriDonVi")]
    [MustHavePermission(TDAction.View, TDResource.Roles)]
    [OpenApiOperation("Lay danh sach roles quan tri don vi.", "")]
    public Task<List<RoleDto>> GetListQuanTriDonVi(CancellationToken cancellationToken)
    {
        return _roleService.GetListQuanTriDonVi(cancellationToken);
    }

    [HttpGet("permissions")]
    [MustHavePermission(TDAction.View, TDResource.Roles)]
    [OpenApiOperation("Get a list of all permissions.", "")]
    public Task<List<RolePermission>> SearchWithPermissionsAsync(CancellationToken cancellationToken)
    {
        return _roleService.SearchWithPermissionsAsync(cancellationToken);
    }


    [HttpGet("{id}")]
    [MustHavePermission(TDAction.View, TDResource.Roles)]
    [OpenApiOperation("Get role details.", "")]
    public Task<RoleDto> GetByIdAsync(string id)
    {
        return _roleService.GetByIdAsync(id);
    }

    [HttpGet("{id}/permissions")]
    [MustHavePermission(TDAction.View, TDResource.RoleClaims)]
    [OpenApiOperation("Get role details with its permissions.", "")]
    public Task<RoleDto> GetByIdWithPermissionsAsync(string id, CancellationToken cancellationToken)
    {
        return _roleService.GetByIdWithPermissionsAsync(id, cancellationToken);
    }

    [HttpPut("{id}/permissions")]
    [MustHavePermission(TDAction.Update, TDResource.RoleClaims)]
    [OpenApiOperation("Update a role's permissions.", "")]
    public async Task<ActionResult<string>> UpdatePermissionsAsync(string id, UpdateRolePermissionsRequest request, CancellationToken cancellationToken)
    {
        if (id != request.RoleId)
        {
            return BadRequest();
        }

        return Ok(await _roleService.UpdatePermissionsAsync(request, cancellationToken));
    }
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Create or update a role.", "")]
    public Task<string> RegisterRoleAsync(CreateOrUpdateRoleRequest request)
    {
        return _roleService.CreateOrUpdateAsync(request);
    }

    [HttpDelete("{id}")]
    [MustHavePermission(TDAction.Delete, TDResource.Roles)]
    [OpenApiOperation("Delete a role.", "")]
    public Task<string> DeleteAsync(string id)
    {
        return _roleService.DeleteAsync(id);
    }

    [HttpPut("{id}/ChinhSuaQuyenQuanTriDonVi")]
    [MustHavePermission(TDAction.Update, TDResource.Roles)]
    [OpenApiOperation("Ch?nh s?a quy?n qu?n tr? ??n v?.", "")]
    public Task<string> UpdateRoleQuanTriDonVi(string id,bool laQuyenQuanTriDonVi)
    {
        return _roleService.UpdateQuyenQuanTriDonVi(id,laQuyenQuanTriDonVi);
    }
}