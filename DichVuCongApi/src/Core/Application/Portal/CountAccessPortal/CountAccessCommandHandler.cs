using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.LogAuthen.Queries;
using TD.DichVuCongApi.Application.Catalog.LogAuthen.Service;
using TD.DichVuCongApi.Application.Catalog.LogAuthen;
using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Portal.CountAccessPortal;
public class CountAccessCommandHandler : IRequestHandler<CountAccessCommand, Result<CountAccessPortalDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ILogAuthenService _logAuthenService;
    private readonly ILogger<LogAuthenDetailDto> _logger;
    private readonly ICacheService _cacheService;

    public CountAccessCommandHandler(IDapperRepository dapperRepository, ILogAuthenService logAuthenService, ILogger<LogAuthenDetailDto> logger, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _logAuthenService = logAuthenService;
        _logger = logger;
        _cacheService = cacheService;
    }

    public async Task<Result<CountAccessPortalDto>> Handle(CountAccessCommand request, CancellationToken cancellationToken)
    {
        try
        {
            string sqlQuery = $@"SELECT 
                                SUM(CASE WHEN CreatedAt >= DATEADD(MINUTE, -60, GETDATE()) THEN 1 ELSE 0 END) AS CountAccessPortal,
                                COUNT(ID) AS CountAccessTotalPortal
                            FROM 
                                [LogAuthens];";

            var countAccess = await _cacheService.GetOrSetAsync("CountAccessPortal",
                async () => await _logAuthenService.CountAccessPortal(sqlQuery), TimeSpan.FromMinutes(5), cancellationToken);

            return Result<CountAccessPortalDto>.Success(countAccess.Data);
        }
        catch (Exception ex)
        {
            return Result<CountAccessPortalDto>.Fail("Lỗi lấy thông tin lượt online: " + ex.Message);
        }
    }
}