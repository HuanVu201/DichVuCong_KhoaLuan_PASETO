using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Portal.DSTaiLieuHDSDApp.Queries;

public class SearchDSTaiLieuHDSDQueryWhereBuilder
{
    public static string Build(SearchDSTaiLieuHDSDQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TenTaiLieu))
            where += " AND TenTaiLieu Like N'%' + @TenTaiLieu + '%'";
        if (!string.IsNullOrEmpty(req.TaiLieuDanhcho))
            where += " AND TaiLieuDanhcho = @TaiLieuDanhcho ";
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
public class SearchDSTaiLieuHDSDQueryHandler : IRequestHandler<SearchDSTaiLieuHDSDQuery, PaginationResponse<DSTaiLieuHDSDDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchDSTaiLieuHDSDQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<DSTaiLieuHDSDDto>> Handle(SearchDSTaiLieuHDSDQuery request, CancellationToken cancellationToken)
    {
        var where = SearchDSTaiLieuHDSDQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, ThuTu,TenTaiLieu ,TepDinhKem, MoTa,NgayDang ,TaiLieuDanhcho FROM Portal.DSTaiLieuHDSDs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DSTaiLieuHDSDDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
