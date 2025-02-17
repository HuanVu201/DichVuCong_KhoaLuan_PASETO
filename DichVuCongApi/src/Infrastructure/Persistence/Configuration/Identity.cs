using Finbuckle.MultiTenant.EntityFrameworkCore;
using TD.DichVuCongApi.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TD.DichVuCongApi.Domain.Identity;

namespace TD.DichVuCongApi.Infrastructure.Persistence.Configuration;

public class ApplicationUserConfig : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder
            .ToTable("Users", SchemaNames.Identity)
           
            .IsMultiTenant();

        builder
            .Property(u => u.ObjectId)
                .HasMaxLength(256);
        builder.HasIndex(b => b.UserName).HasDatabaseName("Idx_UserName");
        builder.HasIndex(b => b.OfficeCode).HasDatabaseName("Idx_OfficeCode");
        builder.HasIndex(b => b.GroupCode).HasDatabaseName("Idx_GroupCode");
        builder.HasIndex(b => b.MaDinhDanhOfficeCode).HasDatabaseName("Idx_MaDinhDanhOfficeCode");
        builder.HasIndex(b => b.TypeUser).HasDatabaseName("Idx_TypeUser");
    }
}

public class ApplicationRoleConfig : IEntityTypeConfiguration<ApplicationRole>
{
    public void Configure(EntityTypeBuilder<ApplicationRole> builder) =>
        builder
            .ToTable("Roles", SchemaNames.Identity)
            .IsMultiTenant()
                .AdjustUniqueIndexes();
}

public class ApplicationRoleClaimConfig : IEntityTypeConfiguration<ApplicationRoleClaim>
{
    public void Configure(EntityTypeBuilder<ApplicationRoleClaim> builder) =>
        builder
            .ToTable("RoleClaims", SchemaNames.Identity)
            .IsMultiTenant();
}

public class IdentityUserRoleConfig : IEntityTypeConfiguration<IdentityUserRole<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserRole<string>> builder) =>
        builder
            .ToTable("UserRoles", SchemaNames.Identity)
            .IsMultiTenant();
}

public class IdentityUserClaimConfig : IEntityTypeConfiguration<IdentityUserClaim<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserClaim<string>> builder) =>
        builder
            .ToTable("UserClaims", SchemaNames.Identity)
            .IsMultiTenant();
}

public class IdentityUserLoginConfig : IEntityTypeConfiguration<IdentityUserLogin<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserLogin<string>> builder) =>
        builder
            .ToTable("UserLogins", SchemaNames.Identity)
            .IsMultiTenant();
}

public class IdentityUserTokenConfig : IEntityTypeConfiguration<IdentityUserToken<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserToken<string>> builder) =>
        builder
            .ToTable("UserTokens", SchemaNames.Identity)
            .IsMultiTenant();
}

public class UserVBDLISConfig : IEntityTypeConfiguration<UserVBDLIS>
{
    public void Configure(EntityTypeBuilder<UserVBDLIS> builder)
    {
        builder
            .ToTable("UserVBDLIS", SchemaNames.Identity)
            .IsMultiTenant();
    }
}