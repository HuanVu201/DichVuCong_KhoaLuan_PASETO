
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Dto;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Queries;
public class SearchThanhPhanChungThucQueryWhereBuilder
{
    public static string Build(SearchThanhPhanChungThucQuery req)
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
public class SearchThanhPhanChungThucQueryHandler : IRequestHandler<SearchThanhPhanChungThucQuery, PaginationResponse<ThanhPhanHoSoChungThucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;

    public SearchThanhPhanChungThucQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<ThanhPhanHoSoChungThucDto>> Handle(SearchThanhPhanChungThucQuery request, CancellationToken cancellationToken)
    {
        var where = SearchThanhPhanChungThucQueryWhereBuilder.Build(request);
        var sql = $@"SELECT tphs.ID, tphs.Ten, tphs.DinhKem, tphs.SoTrang,tphs.SoBanGiay, tphs.KyDienTuBanGiay, dmgtct.Ten as TenKetQua, tphs.DinhKemGoc FROM Business.ThanhPhanHoSos tphs
                    LEFT JOIN Business.DanhMucGiayToChungThucs dmgtct ON tphs.MaGiayTo = dmgtct.Ma {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThanhPhanHoSoChungThucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
