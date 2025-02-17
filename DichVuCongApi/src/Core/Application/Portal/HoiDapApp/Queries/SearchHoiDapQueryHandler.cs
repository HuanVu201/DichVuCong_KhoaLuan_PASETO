using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Portal.HoiDapApp.Queries;

public class SearchHoiDapQueryWhereBuilder
{
    public static string Build(SearchHoiDapQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaDonVi))
            where += " AND MaDonVi Like N'%' + @MaDonVi + '%'";
        if (!string.IsNullOrEmpty(req.NoiDung))
            where += " AND NoiDung Like N'%' + @NoiDung + '%'";
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
public class SearchHoiDapQueryHandler : IRequestHandler<SearchHoiDapQuery, PaginationResponse<HoiDapDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchHoiDapQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<HoiDapDto>> Handle(SearchHoiDapQuery request, CancellationToken cancellationToken)
    {
        var where = SearchHoiDapQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, HoTen, SoDienThoai, Email, DiaChi, TieuDe, NoiDung, MaDonVi,Ma,NgayGui,TraLoi,NguoiTraLoi,CongKhai,DinhKem,TrangThai,TieuDeTraLoi,NoiDungTraLoi  FROM Portal.HoiDaps {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoiDapDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
