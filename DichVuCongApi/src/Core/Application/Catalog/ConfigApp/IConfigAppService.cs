namespace TD.DichVuCongApi.Application.Catalog.ConfigApp;
public interface IConfigAppService : ITransientService
{
    public Task<ConfigDto?> GetOrSetKey(string key);
    public Task InvalidateKey(string key);
}
