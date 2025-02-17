using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp.Queries;
public class SearchDiaBanQueryWhereBuilder
{
    public static string Build(SearchDiaBanQuery req)
    {
        string where = string.Empty;
        if (req.LaCapTinh == true) where += " AND MaTinh IS NOT NULL AND MaTinh = MaHuyen AND MaTinh = MaXa ";
        if (!string.IsNullOrEmpty(req.MaTinh)) where += " AND MaTinh = @MaTinh";
        if (!string.IsNullOrEmpty(req.TenDiaBan))
            where += " AND TenDiaBan Like N'%' + @TenDiaBan + '%'";
        if (!string.IsNullOrEmpty(req.Loai))
        {
            if (req.Loai == "Tinh")
            {
                where += " AND len(MaDiaBan) = 2";
                if (!string.IsNullOrEmpty(req.MaDiaBan))
                {
                    where += " AND MaDiaBan = @MaDiaBan";
                }
            }
            else if (req.Loai == "Huyen")
            {
                where += " AND len(MaDiaBan) = 6";
                if (!string.IsNullOrEmpty(req.MaDiaBan))
                {
                    where += " AND MaDiaBan LIKE @MaDiaBan + '%'";
                }
            }
            else if (req.Loai == "Xa")
            {
                where += " AND len(MaDiaBan) > 6";
                if (!string.IsNullOrEmpty(req.MaDiaBan))
                {
                    where += " AND MaDiaBan LIKE @MaDiaBan + '%'";
                }
            }
        }
        else
        {
            if (!string.IsNullOrEmpty(req.MaDiaBan))
                where += " AND MaDiaBan = @MaDiaBan";
        }
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

public class SearchDiaBanQueryHandler : IRequestHandler<SearchDiaBanQuery, PaginationResponse<DiaBanDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchDiaBanQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<DiaBanDto>> Handle(SearchDiaBanQuery request, CancellationToken cancellationToken)
    {
        var where = SearchDiaBanQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id,TenDiaBan,MaDiaBan,ThuTu,Active,MaTinh,MaHuyen,MaXa FROM Catalog.DiaBans {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DiaBanDto>(sql, request.PageSize, "ThuTu", cancellationToken, request.PageNumber, request);
        return data;
    }
}
