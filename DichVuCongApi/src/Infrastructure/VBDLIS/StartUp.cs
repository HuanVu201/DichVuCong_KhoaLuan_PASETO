using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.VBDLIS;

namespace TD.DichVuCongApi.Infrastructure.VBDLIS;
public static class StartUp
{
    internal static IServiceCollection AddVBDLISConfigs(this IServiceCollection services, IConfiguration configuration)
    {
        return services.Configure<VBDLISSettings>(configuration.GetSection(nameof(VBDLISSettings)));
    }
}
