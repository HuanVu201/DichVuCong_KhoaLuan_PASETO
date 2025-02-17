using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Portal.HoiDapApp;
using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Portal.HoiDapApp.Queries;

namespace TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Queies;
public class SearchPhanAnhKienNghiQueryWhereBuilder
{
    public static string Build(SearchPhanAnhKienNghiQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TieuDe) || !string.IsNullOrEmpty(req.NoiDung))
            where += " AND (TieuDe Like N'%' + @TieuDe + '%' OR NoiDung Like N'%' + @NoiDung + '%')";
        if (!string.IsNullOrEmpty(req.CongKhai))
            where += " AND CongKhai Like N'%' + @CongKhai + '%'";
        if (!string.IsNullOrEmpty(req.TrangThai))
            where += " AND TrangThai Like N'%' + @TrangThai + '%'";
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
public class SearchPhanAnhKienNghiQueryHandler : IRequestHandler<SearchPhanAnhKienNghiQuery, PaginationResponse<PhanAnhKienNghiDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchPhanAnhKienNghiQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<PhanAnhKienNghiDto>> Handle(SearchPhanAnhKienNghiQuery request, CancellationToken cancellationToken)
    {
        var where = SearchPhanAnhKienNghiQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, HoTen, SoDienThoai, Email, DiaChi, TieuDe, NoiDung,NgayGui, NguoiTraLoi,CongKhai,TrangThai,NoiDungTraLoi  FROM Portal.PhanAnhKienNghis {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<PhanAnhKienNghiDto>(sql, request.PageSize, "NgayGui DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}