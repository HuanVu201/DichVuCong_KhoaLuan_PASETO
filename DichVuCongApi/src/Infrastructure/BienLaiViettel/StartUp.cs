using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.BienLaiViettel;

namespace TD.DichVuCongApi.Infrastructure.BienLaiViettel;
internal static class StartUp
{
    internal static IServiceCollection AddViettelInvoiceConfigs(this IServiceCollection services, IConfiguration configuration)
    {
        return services.Configure<ViettelInvoiceSettings>(configuration.GetSection(nameof(ViettelInvoiceSettings)));
    }
}
