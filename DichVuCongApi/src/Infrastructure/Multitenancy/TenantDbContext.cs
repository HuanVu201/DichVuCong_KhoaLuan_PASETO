﻿using Finbuckle.MultiTenant.Stores;
using TD.DichVuCongApi.Infrastructure.Persistence.Configuration;
using Microsoft.EntityFrameworkCore;

namespace TD.DichVuCongApi.Infrastructure.Multitenancy;

public class TenantDbContext : EFCoreStoreDbContext<TDTenantInfo>
{
    public TenantDbContext(DbContextOptions<TenantDbContext> options)
        : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TDTenantInfo>().ToTable("Tenants", SchemaNames.MultiTenancy);
    }
}