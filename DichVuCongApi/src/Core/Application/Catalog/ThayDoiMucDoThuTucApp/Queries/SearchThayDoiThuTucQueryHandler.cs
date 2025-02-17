using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.ThayDoiMucDoThuTucApp.Queries;

public class SearchThayDoiThuTucQueryWhereBuilder
{
    public static string Build(SearchThayDoiThuTucQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.DonVi))
            where += " AND DonVi Like '%' + @DonVi + '%'";
        if (!string.IsNullOrEmpty(req.ThuTuc))
            where += " AND  MaTTHC Like '%' + @ThuTuc + '%'";
        if (!string.IsNullOrEmpty(req.MucDoCu))
            where += " AND MucDoCu like '%' + @MucDoCu +'%'";
        if (!string.IsNullOrEmpty(req.MucDoMoi))
            where += " AND MucDoMoi like '%' + @MucDoMoi +'%'";
        if(req.TuNgay != null )
            where += " AND ThoiGian >= @TuNgay";
        if (req.DenNgay != null)
            where += " AND ThoiGian <= @DenNgay";
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
public class SearchThayDoiThuTucQueryHandler : IRequestHandler<SearchThayDoiThuTucQuery, PaginationResponse<ThayDoiMucDoThuTucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchThayDoiThuTucQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<ThayDoiMucDoThuTucDto>> Handle(SearchThayDoiThuTucQuery request, CancellationToken cancellationToken)
    {
        var where = SearchThayDoiThuTucQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id,MucDoCu,MucDoMoi,ThuTuc,DonVi,NguoiCapNhat,ThoiGian FROM [Catalog].[ThayDoiMucDoThuTucs]  {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThayDoiMucDoThuTucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);

        return data;
    }
}
