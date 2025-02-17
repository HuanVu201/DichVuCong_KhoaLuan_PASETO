using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TD.DichVuCongApi.Application.Common.Sms;

namespace TD.DichVuCongApi.Infrastructure.SMS;

internal static class StartUp
{
    internal static IServiceCollection AddSMS(this IServiceCollection services, IConfiguration config)
    {
        return services.Configure<SMSSettings>(config.GetSection(nameof(SMSSettings)));
    }
}
