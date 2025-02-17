using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.KetQuaLienQuanApp.Dto;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KetQuaLienQuanApp.Queries;

public class SearchKetQuaLienQuanQueryWhereBuilder
{
    public static string Build(SearchKetQuaLienQuanQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND MaHoSo = @MaHoSo";
        if (!string.IsNullOrEmpty(req.NguoiKy))
            where += " AND NguoiKy = @NguoiKy";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchKetQuaLienQuanQueryHandler : IRequestHandler<SearchKetQuaLienQuanQuery, PaginationResponse<KetQuaLienQuanDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchKetQuaLienQuanQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<KetQuaLienQuanDto>> Handle(SearchKetQuaLienQuanQuery request, CancellationToken cancellationToken)
    {
        var where = SearchKetQuaLienQuanQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, LoaiKetQua, SoKyHieu, TrichYeu, NgayKy, NguoiKy, NgayCoHieuLuc, NgayHetHieuLuc, DinhKem, CoQuanBanHanh, CreatedOn,CreatedBy FROM Business.KetQuaLienQuans {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<KetQuaLienQuanDto>(sql, request.PageSize, "CreatedOn Desc", cancellationToken, request.PageNumber, request);
        return data;
    }
}
