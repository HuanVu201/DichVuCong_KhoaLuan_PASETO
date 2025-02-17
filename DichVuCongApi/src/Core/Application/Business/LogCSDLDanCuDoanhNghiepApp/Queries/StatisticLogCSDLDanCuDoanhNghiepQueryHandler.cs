using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Application.Catalog.LinhVucApp;
using TD.DichVuCongApi.Application.Statistics.HoSo;

namespace TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp.Queries;
public class StatisticLogCSDLDanCuDoanhNghiepQueryWhereBuilder
{
    public static string Build(StatisticLogCSDLDanCuDoanhNghiepQuery req)
    {
        string where = string.Empty;
        if (req.TuNgay != null && req.DenNgay != null)
            where += " AND ThoiGian BETWEEN @TuNgay AND @DenNgay";
        if (req.TuNgay != null)
            where += " AND ThoiGian BETWEEN @TuNgay AND GETDATE()";
        /* if (req.Removed == false)
             where += " AND DeletedOn is null";
         else if (req.Removed == true)
             where += " AND DeletedOn is not null";*/
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class StatisticLogCSDLDanCuDoanhNghiepQueryHandler : IRequestHandler<StatisticLogCSDLDanCuDoanhNghiepQuery, PaginationResponse<StatisticLogCSDLDanCuDoanhNghiepDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICacheService _cacheService;
    public StatisticLogCSDLDanCuDoanhNghiepQueryHandler(IDapperRepository repository, ICacheService cacheService)
     => (_dapperRepository, _cacheService) = (repository, cacheService);
    public async Task<PaginationResponse<StatisticLogCSDLDanCuDoanhNghiepDto>> Handle(StatisticLogCSDLDanCuDoanhNghiepQuery request, CancellationToken cancellationToken)
    {
        var where = StatisticLogCSDLDanCuDoanhNghiepQueryWhereBuilder.Build(request);
        string sql = string.Empty;     
        sql = $@" Select COUNT(*) as SoLuong,DonViId FROM Business.LogCSDLDanCuDoanhNghieps {where} GROUP BY DonViId ";

        return await _dapperRepository.PaginatedListSingleQueryAsync<StatisticLogCSDLDanCuDoanhNghiepDto>(sql, request.PageSize, "DonViId", cancellationToken, request.PageNumber, request, countBy: "DonViId");
    }
}
