using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.ILISApp;

namespace TD.DichVuCongApi.Infrastructure.ILIS;
public static class StartUp
{
    internal static IServiceCollection AddILISConfigs(this IServiceCollection services, IConfiguration configuration)
    {
        return services.Configure<ILISSettings>(configuration.GetSection(nameof(ILISSettings)));
    }
}
