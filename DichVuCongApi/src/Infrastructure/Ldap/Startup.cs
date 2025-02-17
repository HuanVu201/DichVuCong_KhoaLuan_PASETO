using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TD.DichVuCongApi.Infrastructure.Ldap;

internal static class Startup
{
    internal static IServiceCollection AddLdap(this IServiceCollection services, IConfiguration config) =>
        services.Configure<LDAPSettings>(config.GetSection(nameof(LDAPSettings)));
}