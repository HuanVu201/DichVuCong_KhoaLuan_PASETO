using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.KetQuaThuTucApp.Dto;

namespace TD.DichVuCongApi.Application.Business.KetQuaThuTucApp.Queries;

public class SearchKetQuaThuTucWhereBuilder
{
    public static string Build(SearchKetQuaThuTucQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaTTHC))
            where += " AND MaTTHC = @MaTTHC ";
        if (!string.IsNullOrEmpty(req.MaKetQua))
            where += " AND MaKetQua = @MaKetQua ";
        if (!string.IsNullOrEmpty(req.TenKetQua))
            where += " AND TenKetQua LIKE '%' + @TenKetQua + '%'";
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

public class SearchKetQuaThuTucQueryHandler : IRequestHandler<SearchKetQuaThuTucQuery, PaginationResponse<KetQuaThuTucDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public SearchKetQuaThuTucQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<KetQuaThuTucDto>> Handle(SearchKetQuaThuTucQuery request, CancellationToken cancellationToken)
    {
        var where = SearchKetQuaThuTucWhereBuilder.Build(request);
        string sql = $"SELECT Id, MaNhanDienOCR, MaKetQua, TenKetQua, TenTep, Url, EFormKetQua, MaTTHC, LoaiThoiHan, ThoiHanMacDinh FROM Business.KetQuaThuTucs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<KetQuaThuTucDto>(sql, request.PageSize, "ID Desc", cancellationToken, request.PageNumber, request);
        return data;
    }
}
