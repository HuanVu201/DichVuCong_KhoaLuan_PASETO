using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaKhoTaiLieuDienTuApp;
using TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaPhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Queries;
public class SearchPhienBanGiayToSoHoaKhoTaiLieuDienTuQueryWhereBuilder
{
    public static string Build(SearchPhienBanGiayToSoHoaKhoTaiLieuDienTuQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.SoDinhDanh))
            where += " AND pbgt.SoDinhDanh Like N'%' + @SoDinhDanh + '%'";
        if (!string.IsNullOrEmpty(req.KhoTaiLieuDienTuId))
            where += " AND KhoTaiLieuDienTuId Like N'%' + @KhoTaiLieuDienTuId + '%'";
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND MaHoSo Like N'%' + @MaHoSo + '%'";
        if (!string.IsNullOrEmpty(req.MaGiayTo))
            where += " AND MaGiayTo Like N'%' + @MaGiayTo + '%'";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchPhienBanGiayToSoHoaKhoTaiLieuDienTuQueryHandler : IRequestHandler<SearchPhienBanGiayToSoHoaKhoTaiLieuDienTuQuery, PaginationResponse<PhienBanGiayToSoHoaKhoTaiLieuDienTuDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchPhienBanGiayToSoHoaKhoTaiLieuDienTuQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<PhienBanGiayToSoHoaKhoTaiLieuDienTuDto>> Handle(SearchPhienBanGiayToSoHoaKhoTaiLieuDienTuQuery request, CancellationToken cancellationToken)
    {
        var where = SearchPhienBanGiayToSoHoaKhoTaiLieuDienTuQueryWhereBuilder.Build(request);
        var sql = $@"SELECT pbgt.ID, pbgt.MaHoSo, pbgt.DinhKem, pbgt.MaGiayTo, pbgt.DungLuong, pbgt.CreatedOn, pbgt.LastModifiedOn, ktldt.TenKhoTaiLieu
                    FROM Business.PhienBanGiayToSoHoaKhoTaiLieuDienTus pbgt
                    LEFT JOIN [Business].[KhoTaiLieuDienTus] ktldt on pbgt.KhoTaiLieuDienTuId = ktldt.Id
                    {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<PhienBanGiayToSoHoaKhoTaiLieuDienTuDto>(sql, request.PageSize, "CreatedOn DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}