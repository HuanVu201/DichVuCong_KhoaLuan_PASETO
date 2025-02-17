using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TD.DichVuCongApi.Infrastructure.EMC;

internal static class StartUp
{
    internal static IServiceCollection AddEMC(this IServiceCollection services, IConfiguration config)
    {
        return services.Configure<EMCSettings>(config.GetSection(nameof(EMCSettings)));
    }
}
