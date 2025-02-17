using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.LoaiThuTucApp;
using TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Queries;

public class SearchLoaiThuTucQueryWhereBuilder
{
    public static string Build(SearchLoaiThuTucQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.NhomThuTucId.ToString()))
        {
            string stringnhomthutucID = req.NhomThuTucId.ToString();
            where += " AND NhomThuTucId = '"+ stringnhomthutucID + "'";
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
public class SearchLoaiThuTucQueryHandler : IRequestHandler<SearchLoaiThuTucQuery, PaginationResponse<LoaiThuTucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchLoaiThuTucQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LoaiThuTucDto>> Handle(SearchLoaiThuTucQuery request, CancellationToken cancellationToken)
    {
        var where = SearchLoaiThuTucQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID,Ten,MoTa,NhomThuTucId,ThuTu FROM Catalog.LoaiThuTucs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LoaiThuTucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
