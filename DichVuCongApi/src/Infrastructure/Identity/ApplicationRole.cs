using Microsoft.AspNetCore.Identity;

namespace TD.DichVuCongApi.Infrastructure.Identity;

public class ApplicationRole : IdentityRole
{
    public string? Description { get; set; }
    public bool? IsAdmin { get; set; }
    public bool? IsSupperAdmin { get; set; }
    public bool? LaQuyenQuanTriDonVi { get; set; }

    public ApplicationRole(string name, string? description = null, bool? isAdmin = false, bool? isSupperAdmin = false)
        : base(name)
    {
        Description = description;
        NormalizedName = name.ToUpperInvariant();
        IsAdmin = isAdmin;
        IsSupperAdmin = isSupperAdmin;
    }
    public ApplicationRole SetLaQuyenQuanTriDonVi(bool ? laQuyenQuanTriDonVi)
    {
        if(laQuyenQuanTriDonVi != null)
            LaQuyenQuanTriDonVi = laQuyenQuanTriDonVi;
        return this;
    }
}