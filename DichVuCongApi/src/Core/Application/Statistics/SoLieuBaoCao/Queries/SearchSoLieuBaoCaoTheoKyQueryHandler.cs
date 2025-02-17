using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchSoTheoDoi;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.Queries;
public class SearchSoLieuBaoCaoTheoKyQueryWhereBuilder
{
    public static string Build(SearchSoLieuBaoCaoTheoKyQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.LoaiThoiGian))
        {
            if (req.GetAllMonth == true)
                where += " AND (LoaiThoiGian =  @LoaiThoiGian OR LoaiThoiGian= N'Tháng')";
            else
                where += " AND LoaiThoiGian =  @LoaiThoiGian";
        }

        if (req.Ky.HasValue)
            where += " AND Ky = @Ky";
        if (req.Nam.HasValue)
            where += " AND Nam = @Nam";
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

public class SearchSoLieuBaoCaoTheoKyQueryHandler : IRequestHandler<SearchSoLieuBaoCaoTheoKyQuery, PaginationResponse<SoLieuBaoCaoDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchSoLieuBaoCaoTheoKyQueryHandler(IDapperRepository dapperRepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
    }

    public async Task<PaginationResponse<SoLieuBaoCaoDto>> Handle(SearchSoLieuBaoCaoTheoKyQuery request, CancellationToken cancellationToken)
    {
        string where = SearchSoLieuBaoCaoTheoKyQueryWhereBuilder.Build(request);
        string sql = $@"SELECT Id, LoaiThoiGian, Ky, Nam, LoaiThongKe, MaDinhDanh, SoLieu FROM [Portal].[SoLieuBaoCaoTheoKys] {where}";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<SoLieuBaoCaoDto>(sql, request.PageSize, "MaDinhDanh ASC", cancellationToken, request.PageNumber, request);

        return data;
    }
}