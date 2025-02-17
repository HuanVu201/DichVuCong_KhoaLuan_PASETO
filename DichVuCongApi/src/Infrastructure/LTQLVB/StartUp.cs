using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using TD.DichVuCongApi.Application.Common.LTQVLB;

namespace TD.DichVuCongApi.Infrastructure.LTQLVB;
internal static class StartUp
{
    internal static IServiceCollection AddLTQLVB(this IServiceCollection service, IConfiguration configuration)
    {
        return service.Configure<LTQLVBSettings>(configuration.GetSection(nameof(LTQLVBSettings)));
    }
}
