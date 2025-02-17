using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.MenuApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Zalo;
using TD.DichVuCongApi.Application.Statistics.HoSo;

namespace TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp.Queries;

public class SearchLogCSDLDanCuDoanhNghiepQueryWhereBuilder
{
    public static string Build(SearchLogCSDLDanCuDoanhNghiep req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Loai))
            where += " AND Loai = @Loai";
        if (!string.IsNullOrEmpty(req.TaiKhoan))
            where += " AND TaiKhoan = @TaiKhoan";
        if (!string.IsNullOrEmpty(req.DonViId))
            where += " AND DonViId = @DonViId";
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
public class SearchLogCSDLDanCuDoanhNghiepQueryHandler : IRequestHandler<SearchLogCSDLDanCuDoanhNghiep, PaginationResponse<LogCSDLDanCuDoanhNghiepDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchLogCSDLDanCuDoanhNghiepQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LogCSDLDanCuDoanhNghiepDto>> Handle(SearchLogCSDLDanCuDoanhNghiep request, CancellationToken cancellationToken)
    {
        var where = SearchLogCSDLDanCuDoanhNghiepQueryWhereBuilder.Build(request);
        var sql = string.Empty;
           sql = $@"
           SELECT l.ID, l.TaiKhoan, l.ThoiGian, l.DonViId, l.Loai, g.GroupName 
            FROM Business.LogCSDLDanCuDoanhNghieps l
            JOIN Catalog.Groups g ON l.DonViId = g.GroupCode
            {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LogCSDLDanCuDoanhNghiepDto>(sql, request.PageSize, "ThoiGian DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}
