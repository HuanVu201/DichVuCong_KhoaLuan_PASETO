using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp;

namespace TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Queries;
public class SearchLoaiNhomGiayToCaNhanQueryWhereBuilder
{
    public static string Build(SearchLoaiNhomGiayToCaNhanQuery req, string userId)
    {
        string where = $"CreatedBy = '{userId}'";
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (!string.IsNullOrEmpty(req.SoDinhDanh))
            where += " AND SoDinhDanh = @SoDinhDanh ";
        if (!string.IsNullOrEmpty(req.GhiChu))
            where += " AND GhiChu Like N'%' + @GhiChu + '%'";
        if (!string.IsNullOrEmpty(req.Loai))
            where += " AND Loai = @Loai ";

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

public class SearchLoaiNhomGiayToCaNhanQueryHandler : IRequestHandler<SearchLoaiNhomGiayToCaNhanQuery, PaginationResponse<LoaiNhomGiayToCaNhanDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public SearchLoaiNhomGiayToCaNhanQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<PaginationResponse<LoaiNhomGiayToCaNhanDto>> Handle(SearchLoaiNhomGiayToCaNhanQuery request, CancellationToken cancellationToken)
    {
        string userId = _currentUser.GetUserId().ToString();
        string where = SearchLoaiNhomGiayToCaNhanQueryWhereBuilder.Build(request, userId);
        string sql = $@"SELECT ID, Ten, SoDinhDanh, GhiChu, Loai, CreatedOn  FROM Portal.LoaiNhomGiayToCaNhans {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LoaiNhomGiayToCaNhanDto>(sql, request.PageSize, "CreatedOn DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}