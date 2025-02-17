using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.VnPost;

namespace TD.DichVuCongApi.Infrastructure.VnPost;
internal static class StartUp
{
    internal static IServiceCollection AddVNPostConfigs(this IServiceCollection services, IConfiguration configuration)
    {
        return services.Configure<VNPostSettings>(configuration.GetSection(nameof(VNPostSettings)));
    }
}
