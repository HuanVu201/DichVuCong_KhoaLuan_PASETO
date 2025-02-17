using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Queries;
public class SearchMaVanDonBuuDienQueryWhereBuilder
{
    public static string Build(SearchMaVanDonBuuDienQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ma)) where += " AND Ma = @Ma";
        if (!string.IsNullOrEmpty(req.TrangThai)) where += " AND TrangThai = @TrangThai";
        if (!string.IsNullOrEmpty(req.HoSo)) where += " AND HoSo = @HoSo";
        if (req.DaSuDung == false) where += " AND (HoSo IS NULL OR HoSo = '')";
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

public class SearchMaVanDonBuuDienQueryHandler : IRequestHandler<SearchMaVanDonBuuDienQuery, PaginationResponse<MaVanDonBuuDienDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchMaVanDonBuuDienQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<MaVanDonBuuDienDto>> Handle(SearchMaVanDonBuuDienQuery request, CancellationToken cancellationToken)
    {
        var where = SearchMaVanDonBuuDienQueryWhereBuilder.Build(request);
        var sql = $@"SELECT * FROM Catalog.MaVanDonBuuDiens {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<MaVanDonBuuDienDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
