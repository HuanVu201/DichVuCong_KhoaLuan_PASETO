using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Queries;

public class SearchThanhPhanHoSoByMaHoSo : Specification<ThanhPhanHoSo>
{
    public SearchThanhPhanHoSoByMaHoSo(string maHoSo)
    {
        Query.Where(x => x.HoSo == maHoSo).AsNoTracking();
    }
}
public class SearchThanhPhanHoSoQueryWhereBuilder
{
    public static string Build(SearchThanhPhanHoSoQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten = @Ten";
        if (!string.IsNullOrEmpty(req.HoSo))
            where += " AND HoSo = @HoSo";
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
public class SearchThanhPhanHoSoQueryHandler : IRequestHandler<SearchThanhPhanHoSoQuery, PaginationResponse<ThanhPhanHoSoDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchThanhPhanHoSoQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ThanhPhanHoSoDto>> Handle(SearchThanhPhanHoSoQuery request, CancellationToken cancellationToken)
    {
        var where = SearchThanhPhanHoSoQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, Ten, HoSo, NhanBanGiay,MaGiayToSoHoa,TrangThaiSoHoa,MaGiayTo,MaKetQuaThayThe,SoBanChinh, SoBanSao, DinhKem, MaGiayToKhoQuocGia, CreatedOn,NoiDungBoSung, SoTrang, SoBanGiay, KyDienTuBanGiay FROM Business.ThanhPhanHoSos {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThanhPhanHoSoDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
