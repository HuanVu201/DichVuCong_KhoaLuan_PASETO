using Microsoft.Extensions.Configuration;

namespace TD.DichVuCongApi.Application.Common.Interfaces;
public interface IInjectConfiguration : ITransientService
{
    public T? GetValue<T>(string key);
    IConfiguration GetSection(string key);
    T? GetFromSection<T>(string key);
}
