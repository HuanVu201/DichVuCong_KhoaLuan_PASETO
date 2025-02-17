using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Queries;

public class SearchThanhPhanHuongDanNopHoSoQueryWhereBuilder
{
    public static string Build(SearchThanhPhanHuongDanNopHoSoQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten = @Ten";
        if (!string.IsNullOrEmpty(req.HoSo))
            where += " AND HoSo = @HoSo";
        if (!string.IsNullOrEmpty(req.MaGiayToKhoQuocGia))
            where += " AND MaGiayToKhoQuocGia Like N'%' + @MaGiayToKhoQuocGia + '%'";
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
public class SearchThanhPhanHuongDanNopHoSoQueryHandler : IRequestHandler<SearchThanhPhanHuongDanNopHoSoQuery, PaginationResponse<ThanhPhanHuongDanNopHoSoDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchThanhPhanHuongDanNopHoSoQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ThanhPhanHuongDanNopHoSoDto>> Handle(SearchThanhPhanHuongDanNopHoSoQuery request, CancellationToken cancellationToken)
    {
        var where = SearchThanhPhanHuongDanNopHoSoQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, Ten, HoSo,SoBanChinh, SoBanSao, GhiChu FROM Business.ThanhPhanHuongDanNopHoSos {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThanhPhanHuongDanNopHoSoDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
