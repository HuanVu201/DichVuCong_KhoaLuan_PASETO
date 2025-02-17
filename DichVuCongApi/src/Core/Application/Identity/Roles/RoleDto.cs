namespace TD.DichVuCongApi.Application.Identity.Roles;

public class RoleDto
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public bool? LaQuyenQuanTriDonVi { get; set; }
    public List<RolePermission>? Permissions { get; set; }
}

public class RolePermission
{
    public int Id { get; set; } = default!;
    public string ClaimValue { get; set; } = default!;

}