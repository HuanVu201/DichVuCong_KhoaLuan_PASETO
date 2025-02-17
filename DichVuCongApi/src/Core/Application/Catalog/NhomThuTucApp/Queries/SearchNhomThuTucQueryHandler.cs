using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.NhomThuTucApp;
using TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Queries;

public class SearchNhomThuTucQueryWhereBuilder
{
    public static string Build(SearchNhomThuTucQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (!string.IsNullOrEmpty(req.Ma))
            where += " AND Ma Like N'%' + @Ma + '%'";
        if (!string.IsNullOrEmpty(req.MaNganh))
            where += " AND MaNganh Like N'%' + @MaNganh + '%'";
        if (req.HasThuTuc.HasValue)
            where += " AND SoLuongThuTuc > 0";
        if (req.HasThuTucCapTinh.HasValue)
            where += " AND SoLuongThuTucCapTinh > 0";
        if (req.HasThuTucCapHuyen.HasValue)
            where += " AND SoLuongThuTucCapHuyen > 0";
        if (req.HasThuTucCapXa.HasValue)
            where += " AND SoLuongThuTucCapXa > 0";
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
public class SearchNhomThuTucQueryHandler : IRequestHandler<SearchNhomThuTucQuery, PaginationResponse<NhomThuTucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchNhomThuTucQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<NhomThuTucDto>> Handle(SearchNhomThuTucQuery request, CancellationToken cancellationToken)
    {
        var where = SearchNhomThuTucQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, Ten,Mota,Icon,MauSac,DoiTuong,ThuTu  FROM Catalog.NhomThuTucs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<NhomThuTucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
