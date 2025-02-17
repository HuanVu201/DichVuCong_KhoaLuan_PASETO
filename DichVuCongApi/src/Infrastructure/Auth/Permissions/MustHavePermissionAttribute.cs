using TD.DichVuCongApi.Shared.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace TD.DichVuCongApi.Infrastructure.Auth.Permissions;

public class MustHavePermissionAttribute : AuthorizeAttribute
{
    public MustHavePermissionAttribute(string action, string resource) =>
        Policy = TDPermission.NameFor(action, resource);
}