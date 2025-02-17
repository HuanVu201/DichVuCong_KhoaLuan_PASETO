using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TD.DichVuCongApi.Infrastructure.CoQuanThucHienThuTuc;

internal static class StartUp
{
    internal static IServiceCollection AddCoQuanThucHienConfigs(this IServiceCollection services, IConfiguration configuration)
    {
        return services.Configure<ListCoQuanThucHienConfigs>(configuration.GetSection(nameof(ListCoQuanThucHienConfigs)));
    }
}
