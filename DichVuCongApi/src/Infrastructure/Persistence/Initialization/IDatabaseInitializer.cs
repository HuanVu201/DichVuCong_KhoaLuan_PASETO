using TD.DichVuCongApi.Infrastructure.Multitenancy;

namespace TD.DichVuCongApi.Infrastructure.Persistence.Initialization;

internal interface IDatabaseInitializer
{
    Task InitializeDatabasesAsync(CancellationToken cancellationToken);
    Task InitializeApplicationDbForTenantAsync(TDTenantInfo tenant, CancellationToken cancellationToken);
}