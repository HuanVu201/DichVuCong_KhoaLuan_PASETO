using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TD.DichVuCongApi.Application.Common.DvcPayment;

namespace TD.DichVuCongApi.Infrastructure.DvcPayment;

internal static class StartUp
{
    internal static IServiceCollection AddDvcPayment(this IServiceCollection services, IConfiguration configuration)
    {
        return services.Configure<DvcPaymentSettings>(configuration.GetSection(nameof(DvcPaymentSettings)));
    }
}
