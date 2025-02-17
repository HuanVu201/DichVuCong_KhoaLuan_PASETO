using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Queries;

public class SearchThanhPhanThuTucQueryWhereBuilder
{
    public static string Build(SearchThanhPhanThuTucQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.ThuTucId))
            where += " AND ThuTucId = @ThuTucId";
        if (!string.IsNullOrEmpty(req.TruongHopId))
            where += " AND TruongHopId = @TruongHopId";
        if (!string.IsNullOrEmpty(req.MaGiayToKhoQuocGia))
            where += " AND MaGiayToKhoQuocGia Like N'%' + @MaGiayToKhoQuocGia + '%'";
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
public class SearchThanhPhanThuTucQueryHandler : IRequestHandler<SearchThanhPhanThuTucQuery, PaginationResponse<ThanhPhanThuTucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchThanhPhanThuTucQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ThanhPhanThuTucDto>> Handle(SearchThanhPhanThuTucQuery request, CancellationToken cancellationToken)
    {
        var where = SearchThanhPhanThuTucQueryWhereBuilder.Build(request); // chú ý: MaGiayToKhoQuocGia nếu thêm vào response thì cần phải kiểm tra table ở thêm mới hồ sơ
        var sql = $@"SELECT ID, Ten, Ma, ThuTucId,STT, TruongHopId, BatBuoc, SoBanChinh, ChoPhepThemToKhai, SoBanSao FROM Business.ThanhPhanThuTucs {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThanhPhanThuTucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
