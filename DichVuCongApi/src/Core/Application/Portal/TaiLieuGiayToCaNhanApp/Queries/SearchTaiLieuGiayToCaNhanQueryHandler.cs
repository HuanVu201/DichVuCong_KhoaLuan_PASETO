using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp.Queries;
using TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp;

namespace TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp.Queries;
public class SearchTaiLieuGiayToCaNhanQueryWhereBuilder
{
    public static string Build(SearchTaiLieuGiayToCaNhanQuery req, string userId)
    {
        string where = $"tl.CreatedBy = '{userId}'";
        if (!string.IsNullOrEmpty(req.TenGiayTo))
            where += " AND TenGiayTo Like N'%' + @TenGiayTo + '%')";
        if (!string.IsNullOrEmpty(req.Type))
            where += " AND Type = @Type";
        if (!string.IsNullOrEmpty(req.LoaiNhomGiayToCaNhanId))
            where += " AND LoaiNhomGiayToCaNhanId = @LoaiNhomGiayToCaNhanId ";

        if (req.Removed == false)
            where += " AND tl.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND tl.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchTaiLieuGiayToCaNhanQueryHandler : IRequestHandler<SearchTaiLieuGiayToCaNhanQuery, PaginationResponse<TaiLieuGiayToCaNhanDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public SearchTaiLieuGiayToCaNhanQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<PaginationResponse<TaiLieuGiayToCaNhanDto>> Handle(SearchTaiLieuGiayToCaNhanQuery request, CancellationToken cancellationToken)
    {
        string userId = _currentUser.GetUserId().ToString();
        string where = SearchTaiLieuGiayToCaNhanQueryWhereBuilder.Build(request, userId);
        string sql = $@"SELECT tl.Id, tl.TenGiayTo, tl.DuongDan, tl.LoaiNhomGiayToCaNhanId, tl.Type, tl.CreatedOn, ln.Ten as LoaiTaiLieu  FROM Portal.TaiLieuGiayToCaNhans tl
                        INNER JOIN  [Portal].[LoaiNhomGiayToCaNhans] ln ON tl.LoaiNhomGiayToCaNhanId = ln.Id
                        {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TaiLieuGiayToCaNhanDto>(sql, request.PageSize, "CreatedOn DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}