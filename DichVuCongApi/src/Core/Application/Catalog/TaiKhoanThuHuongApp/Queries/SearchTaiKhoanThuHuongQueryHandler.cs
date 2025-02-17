using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.TaiKhoanThuHuongApp;
using TD.DichVuCongApi.Application.Catalog.TaiKhoanThuHuongApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.TaiKhoanThuHuongApp.Queries;

public class SearchTaiKhoanThuHuongQueryWhereBuilder
{
    public static string Build(SearchTaiKhoanThuHuongQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TenTKThuHuong))
            where += " AND TenTKThuHuong Like N'%' + @TenTKThuHuong + '%'";
        if (!string.IsNullOrEmpty(req.MaNHThuHuong))
            where += " AND MaNHThuHuong Like N'%' + @MaNHThuHuong + '%'";
        if (!string.IsNullOrEmpty(req.DonViId))
            where += " AND DonViId = @DonViId";
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
public class SearchTaiKhoanThuHuongQueryHandler : IRequestHandler<SearchTaiKhoanThuHuongQuery, PaginationResponse<TaiKhoanThuHuongDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchTaiKhoanThuHuongQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<TaiKhoanThuHuongDto>> Handle(SearchTaiKhoanThuHuongQuery request, CancellationToken cancellationToken)
    {
        var where = SearchTaiKhoanThuHuongQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID,TKThuHuong,MaNHThuHuong,TenTKThuHuong,MoTa,DonViId  FROM Catalog.TaiKhoanThuHuongs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TaiKhoanThuHuongDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
