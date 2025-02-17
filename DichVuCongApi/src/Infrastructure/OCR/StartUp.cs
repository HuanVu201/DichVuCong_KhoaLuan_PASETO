using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TD.DichVuCongApi.Infrastructure.OCR;

internal static class StartUp
{
    internal static IServiceCollection AddOCR(this IServiceCollection services, IConfiguration configuration)
    {
        return services.Configure<OCRSetting>(configuration.GetSection(nameof(OCRSetting)));
    }
}
