using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Portal.QuanLyVanBanApp.Queries;

public class SearchQuanLyVanBanQueryWhereBuilder
{
    public static string Build(SearchQuanLyVanBanQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaLinhVuc))
            where += " AND MaLinhVuc Like N'%' + @MaLinhVuc + '%'";
        if (!string.IsNullOrEmpty(req.LoaiVanBan))
            where += " AND LoaiVanBan Like N'%' + @LoaiVanBan + '%'";
        if (!string.IsNullOrEmpty(req.TuKhoa))
            where += " AND (TrichYeu Like '%' + @TuKhoa + '%' OR SoKyHieu Like '%' + @TuKhoa + '%')";
        if (req.CongKhai != null)
            where += " AND CongKhai = @CongKhai";
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
public class SearchQuanLyVanBanQueryHandler : IRequestHandler<SearchQuanLyVanBanQuery, PaginationResponse<QuanLyVanBanDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchQuanLyVanBanQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<QuanLyVanBanDto>> Handle(SearchQuanLyVanBanQuery request, CancellationToken cancellationToken)
    {
        var where = SearchQuanLyVanBanQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, SoKyHieu,NgaybanHanh,LoaiVanBan,CongKhai, ThuTu,FileDinhKem,TrichYeu,MaLinhVuc,CoQuanBanHanh FROM Portal.QuanLyVanBans {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<QuanLyVanBanDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
