using Mapster;
using MapsterMapper;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Dtos;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Queries;

public class SearchQuanLyTaiNguyenQueryWhereBuilder
{
    public static string Build(SearchQuanLyTaiNguyenQuery req)
    {
        string where = "CreatedBy = @User";
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (req.SuDung == true || req.SuDung == null)
            where += " AND SuDung = 1";
        else if(req.SuDung == false)
            where += " AND SuDung = 0";
        if (req.Public == true )
            where += " AND [Public] = 1";
        else if (req.Public == false)
            where += " AND [Public] = 0";
        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})  OR ([Public] = 1 AND DeletedOn is null)";
        return where;
    }
}
public class SearchQuanLyTaiNguyenQueryHandler : IRequestHandler<SearchQuanLyTaiNguyenQuery, PaginationResponse<QuanLyTaiNguyenDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _currentUser;

    public SearchQuanLyTaiNguyenQueryHandler(IDapperRepository dapperRepository, IUserService currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<PaginationResponse<QuanLyTaiNguyenDto>> Handle(SearchQuanLyTaiNguyenQuery request, CancellationToken cancellationToken)
    {
        var user = await _currentUser.GetCurrentUserAsync(cancellationToken);
        var where = SearchQuanLyTaiNguyenQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, Mota, Ten, DinhKem, [Public],CreatedBy,ThuTu,KichThuocTep FROM {SchemaNames.Catalog}.{TableNames.QuanLyTaiNguyens} {where} ";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<QuanLyTaiNguyenDto>(sql, request.PageSize, "ThuTu", cancellationToken, request.PageNumber, new
        {
            User = user.Id,
            Ten = request.Ten,

        });
        return data;
    }
}
