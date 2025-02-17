using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThongBaoApp;
using TD.DichVuCongApi.Application.Catalog.ThongBaoApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.ThongBaoApp.Queries;

public class SearchThongBaoQueryWhereBuilder
{
    public static string Build(SearchThongBaoQuery req)
    {
        string where = string.Empty;
        if (req.DonViId != null && req.DonViId != default(DefaultIdType))
            where += " AND DonViId = @DonViId";
        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchThongBaoQueryHandler : IRequestHandler<SearchThongBaoQuery, PaginationResponse<ThongBaoDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchThongBaoQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ThongBaoDto>> Handle(SearchThongBaoQuery request, CancellationToken cancellationToken)
    {
        var where = SearchThongBaoQueryWhereBuilder.Build(request);
        // join đơn vị, thủ tục, vs bảng này để ra kq
        var sql = $@"SELECT ID,DonViId,TieuDe,ToanHeThong,QuanTrong,SuDung FROM Catalog.ThongBaos {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThongBaoDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
