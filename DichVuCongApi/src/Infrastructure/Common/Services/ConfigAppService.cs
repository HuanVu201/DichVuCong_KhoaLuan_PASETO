using DocumentFormat.OpenXml.VariantTypes;
using Mapster;
using System.Threading;
using TD.DichVuCongApi.Application.Catalog.ConfigApp;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Infrastructure.Common.Services;
public class ConfigAppService : IConfigAppService
{
    private readonly ICacheService _cacheService;
    private readonly ICacheKeyService _cacheKeyService;
    private readonly IReadRepository<Config> _repositoryConfig;
    public ConfigAppService (ICacheService cacheService, ICacheKeyService cacheKeyService, IReadRepository<Config> repositoryConfig)
    {
        _cacheService = cacheService;
        _cacheKeyService = cacheKeyService;
        _repositoryConfig = repositoryConfig;
    }
    public async Task<ConfigDto?> GetOrSetKey(string key)
    {
        return await _cacheService.GetOrSetAsync<ConfigDto>(key,
            async () =>
            {
                var res = await _repositoryConfig.GetBySpecAsync(new GetByCodeSpec(key));
                return res.Adapt<ConfigDto>();
            },
            TimeSpan.FromMinutes(5),
            CancellationToken.None
            );
    }

    public async Task InvalidateKey(string key)
    {
        await _cacheService.RemoveAsync(key);
    }
}
