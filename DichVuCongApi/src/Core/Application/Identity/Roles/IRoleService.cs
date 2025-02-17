namespace TD.DichVuCongApi.Application.Identity.Roles;

public interface IRoleService : ITransientService
{
    Task<List<RoleDto>> GetListAsync(CancellationToken cancellationToken);
    Task<List<RoleDto>> GetListQuanTriDonVi(CancellationToken cancellationToken);

    Task<int> GetCountAsync(CancellationToken cancellationToken);

    Task<bool> ExistsAsync(string roleName, string? excludeId);

    Task<RoleDto> GetByIdAsync(string id);

    Task<RoleDto> GetByIdWithPermissionsAsync(string roleId, CancellationToken cancellationToken);
    Task<List<RolePermission>> SearchWithPermissionsAsync( CancellationToken cancellationToken);


    Task<string> CreateOrUpdateAsync(CreateOrUpdateRoleRequest request);
    Task<string> UpdateQuyenQuanTriDonVi(string id,bool laQuyenQuanTriDonVi);

    Task<string> UpdatePermissionsAsync(UpdateRolePermissionsRequest request, CancellationToken cancellationToken);

    Task<string> DeleteAsync(string id);
}