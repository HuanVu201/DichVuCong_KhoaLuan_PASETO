using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Dto;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Queries;

public class SearchQuaTrinhTraoDoiCongDanWhereBuilder
{
    public static string Build(SearchQuaTrinhTraoDoiCongDanQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND MaHoSo = @MaHoSo ";
        if (!string.IsNullOrEmpty(req.NguoiGuiTraoDoi))
            where += " AND NguoiGuiTraoDoi = @NguoiGuiTraoDoi ";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchQuaTrinhTraoDoiCongDanQueryHandler : IRequestHandler<SearchQuaTrinhTraoDoiCongDanQuery, PaginationResponse<QuaTrinhTraoDoiCongDanDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public SearchQuaTrinhTraoDoiCongDanQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<QuaTrinhTraoDoiCongDanDto>> Handle(SearchQuaTrinhTraoDoiCongDanQuery request, CancellationToken cancellationToken)
    {
        var where = SearchQuaTrinhTraoDoiCongDanWhereBuilder.Build(request);
        string sql = $@"SELECT qttd.Id, qttd.MaHoSo, qttd.NguoiGuiTraoDoi, qttd.NgayGui, qttd.NoiDungTraoDoi, qttd.Email, qttd.SMS, qttd.Zalo, u.FullName FROM Business.QuaTrinhTraoDoiCongDans qttd
                        INNER JOIN [Identity].[Users] u ON u.Id = qttd.NguoiGuiTraoDoi
                        {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<QuaTrinhTraoDoiCongDanDto>(sql, request.PageSize, "NgayGui Desc", cancellationToken, request.PageNumber, request);
        return data;
    }
}
