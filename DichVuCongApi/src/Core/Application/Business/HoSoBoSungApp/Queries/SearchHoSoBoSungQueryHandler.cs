using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.HoSoBoSungApp.Queries;

public class SearchHoSoBoSungQueryWhereBuilder
{
    public static string Build(SearchHoSoBoSungQuery req)
    {
        string where = "hsbs.MaHoSo = @MaHoSo";
        if (req.Removed == false)
            where += " AND hsbs.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND hsbs.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}


public class SearchHoSoBoSungQueryHandler : IRequestHandler<SearchHoSoBoSungQuery, PaginationResponse<HoSoBoSungDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchHoSoBoSungQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<HoSoBoSungDto>> Handle(SearchHoSoBoSungQuery request, CancellationToken cancellationToken)
    {
        var where = SearchHoSoBoSungQueryWhereBuilder.Build(request);
        var sql = $@"SELECT NgayHenTraMoi, NgayHenTraTruoc, NguoiYeuCauBoSung, TrangThaiBoSung, NgayBoSung, NguoiTiepNhanBoSung, NoiDungBoSung,
                    hsbs.ID, u1.FullName as NguoiYeuCauBoSungFullName, u2.FullName as NguoiTiepNhanBoSungFullName, DinhKemNoiDungBoSung
                    FROM Business.HoSoBoSungs hsbs
                    left join [Identity].[Users] u1 on hsbs.NguoiYeuCauBoSung = u1.id 
                    left join [Identity].[Users] u2 on hsbs.NguoiTiepNhanBoSung = u2.id  {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoBoSungDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, new
        {
            request.MaHoSo,
        });
        return data;
    }
}
