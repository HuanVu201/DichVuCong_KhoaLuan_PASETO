using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.SoChungThucApp;
using TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Queries;
public class SearchSoChungThucQueryWhereBuilder
{
    public static string Build(SearchSoChungThucQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TenSo))
            where += " AND sct.TenSo Like N'%' + @TenSo + '%'";
        if (!string.IsNullOrEmpty(req.DonVi))
            where += " AND sct.DonVi = @DonVi";
        if(req.SearchByOpening == true)
        {
            where += " AND sct.NgayBatDau <= GetDate() and sct.NgayDongSo >= GetDate()";
        }
        if (req.TrangThai != null)
            where += " AND sct.TrangThai = @TrangThai";
        if (req.Removed == false)
            where += " AND sct.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND sct.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchSoChungThucQueryHandler : IRequestHandler<SearchSoChungThucQuery, PaginationResponse<SoChungThucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchSoChungThucQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<SoChungThucDto>> Handle(SearchSoChungThucQuery request, CancellationToken cancellationToken)
    {
        var where = SearchSoChungThucQueryWhereBuilder.Build(request);
        var sql = $@"SELECT sct.Id,sct.DonVi,g.GroupName,sct.TenSo,g.Catalog,sct.SoBatDau,sct.SoHienTai,sct.NgayBatDau,sct.NgayDongSo,sct.TrangThai,sct.Loai FROM Catalog.SoChungThucs sct
                    INNER JOIN Catalog.Groups g on sct.DonVi = g.GroupCode {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<SoChungThucDto>(sql, request.PageSize, "Id", cancellationToken, request.PageNumber, request);
        return data;
    }
}
