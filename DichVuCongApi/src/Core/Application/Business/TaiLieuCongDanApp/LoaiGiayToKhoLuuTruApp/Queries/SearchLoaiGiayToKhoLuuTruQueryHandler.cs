using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.LoaiGiayToKhoLuuTruApp.Queries;
public class SearchLoaiGiayToKhoLuuTruQueryWhereBuilder
{
    public static string Build(SearchLoaiGiayToKhoLuuTruQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ma))
            where += " AND Ma Like N'%' + @Ma + '%'";
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (!string.IsNullOrEmpty(req.Eform))
            where += " AND Eform Like N'%' + @Eform + '%'";
        if (req.SuDung == true)
            where += " AND SuDung = 1";
        else if (req.SuDung == false)
            where += " AND SuDung = 0";

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

public class SearchLoaiGiayToKhoLuuTruQueryHandler : IRequestHandler<SearchLoaiGiayToKhoLuuTruQuery, PaginationResponse<LoaiGiayToKhoLuuTruDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public SearchLoaiGiayToKhoLuuTruQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LoaiGiayToKhoLuuTruDto>> Handle(SearchLoaiGiayToKhoLuuTruQuery request, CancellationToken cancellationToken)
    {
        string where = SearchLoaiGiayToKhoLuuTruQueryWhereBuilder.Build(request);
        string sql = $@"SELECT ID, Ma, Ten, Eform, SuDung, CreatedOn, LastModifiedOn FROM Business.LoaiGiayToKhoLuuTrus {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LoaiGiayToKhoLuuTruDto>(sql, request.PageSize, request.OrderByReq, cancellationToken, request.PageNumber, request);
        return data;
    }
}