using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.Queries;
public class SearchSoLieuBaoCaoHienTaiQueryWhereBuilder
{
    public static string Build(SearchSoLieuBaoCaoHienTaiQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.LoaiThongKe))
            where += " AND LoaiThongKe = @LoaiThongKe";

        if (!string.IsNullOrEmpty(req.MaDinhDanh))
            where += " AND MaDinhDanh = @MaDinhDanh";

        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchSoLieuBaoCaoHienTaiQueryHandler : IRequestHandler<SearchSoLieuBaoCaoHienTaiQuery, PaginationResponse<SoLieuBaoCaoDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchSoLieuBaoCaoHienTaiQueryHandler(IDapperRepository dapperRepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
    }

    public async Task<PaginationResponse<SoLieuBaoCaoDto>> Handle(SearchSoLieuBaoCaoHienTaiQuery request, CancellationToken cancellationToken)
    {
        string where = SearchSoLieuBaoCaoHienTaiQueryWhereBuilder.Build( request);
        string sql = $@"SELECT Id, LoaiThongKe, MaDinhDanh, SoLieu FROM [Portal].[SoLieuBaoCaoHienTais] {where}";
        //var data = await _cacheService.GetOrSetAsync("SoLieuBaoCaoHienTais" + request,
        //        async () => await _dapperRepository.PaginatedListSingleQueryAsync<SoLieuBaoCaoDto>(sql, request.PageSize, "MaDinhDanh ASC", cancellationToken, request.PageNumber, request),
        //        TimeSpan.FromHours(6), cancellationToken);

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<SoLieuBaoCaoDto>(sql, request.PageSize, "MaDinhDanh ASC", cancellationToken, request.PageNumber, request);

        return data;
    }
}