﻿using Finbuckle.MultiTenant.EntityFrameworkCore;
using TD.DichVuCongApi.Infrastructure.Auditing;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TD.DichVuCongApi.Infrastructure.Persistence.Configuration;

public class AuditTrailConfig : IEntityTypeConfiguration<Trail>
{
    public void Configure(EntityTypeBuilder<Trail> builder) =>
        builder
            .ToTable("AuditTrails", SchemaNames.Auditing)
            .IsMultiTenant();
}