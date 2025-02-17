using Microsoft.Extensions.Configuration;
using TD.DichVuCongApi.Application.Common.Interfaces;

namespace TD.DichVuCongApi.Infrastructure.Common.Services;
public class InjectConfiguration : IInjectConfiguration
{
    private readonly IConfiguration _configuration;
    public InjectConfiguration(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public T? GetValue<T>(string key)
    {
        return _configuration.GetValue<T>(key);
    }

    public IConfiguration GetSection(string key)
    {
        return _configuration.GetSection(key);
    }
    public T? GetFromSection<T>(string key)
    {
        return _configuration.GetSection(key).Get<T>();
    }
}
