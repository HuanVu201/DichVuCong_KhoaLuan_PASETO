using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Queries;
using TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Queries;

public class SearchKhoTaiLieuDienTuQueryWhereBuilder
{
    public static string Build(SearchKhoTaiLieuDienTuQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.SoDinhDanh))
            where += " AND SoDinhDanh Like N'%' + @SoDinhDanh + '%'";
        if (!string.IsNullOrEmpty(req.TenKhoTaiLieu))
            where += " AND TenKhoTaiLieuDienTu Like N'%' + @TenKhoTaiLieu + '%'";
        if (!string.IsNullOrEmpty(req.MoTa))
            where += " AND MaDonVi Like N'%' + @MoTa + '%'";
        where += " AND DeletedOn is null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchKhoTaiLieuDienTuQueryHandler : IRequestHandler<SearchKhoTaiLieuDienTuQuery, PaginationResponse<KhoTaiLieuDienTuDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchKhoTaiLieuDienTuQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<KhoTaiLieuDienTuDto>> Handle(SearchKhoTaiLieuDienTuQuery request, CancellationToken cancellationToken)
    {
        var where = SearchKhoTaiLieuDienTuQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, SoDinhDanh, TenKhoTaiLieu, MoTa, DungLuong, SoLuong FROM Business.KhoTaiLieuDienTus {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<KhoTaiLieuDienTuDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}