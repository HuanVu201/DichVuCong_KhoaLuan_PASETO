using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TD.DichVuCongApi.Infrastructure.NEAC;
internal static class StartUp
{
    internal static IServiceCollection AddNEAC(this IServiceCollection services, IConfiguration config)
    {
        return services.Configure<NEACSetting>(config.GetSection(nameof(NEACSetting)));
    }
}
