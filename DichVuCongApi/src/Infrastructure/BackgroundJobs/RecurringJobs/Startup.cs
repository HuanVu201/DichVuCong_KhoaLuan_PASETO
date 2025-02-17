using TD.DichVuCongApi.Infrastructure.Common;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace TD.DichVuCongApi.Infrastructure.BackgroundJobs.RecurringJobs.Initialization;

internal static class Startup
{
    internal static IServiceCollection AddRecurringBackgroundJobs(this IServiceCollection services)
    {
        services.AddServices(typeof(IRecurringJobInitialization), ServiceLifetime.Transient);
        return services;
    }
}