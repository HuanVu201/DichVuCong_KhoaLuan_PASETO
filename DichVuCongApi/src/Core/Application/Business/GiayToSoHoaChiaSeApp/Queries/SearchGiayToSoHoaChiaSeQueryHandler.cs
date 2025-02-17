using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Queries;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Queries;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Queries;

public class SearchGiayToSoHoaChiaSeQueryWhereBuilder
{
    public static string Build(SearchGiayToSoHoaChiaSeQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.SoDinhDanh))
            where += " AND gtshcs.SoDinhDanh = @SoDinhDanh";
        if ((req.GiayToSoHoaId).HasValue)
            where += " AND GiayToSoHoaId Like N'%' + @GiayToSoHoaId + '%'";
        if (!string.IsNullOrEmpty(req.MaDinhDanhChiaSe))
            where += " AND MaDinhDanhChiaSe Like N'%' + @MaDinhDanhChiaSe + '%'";
        where += " AND ((gtsh.LoaiSoHoa = '1' And gtsh.AnGiayTo = 0) OR gtsh.LoaiSoHoa <> '1')";
        where += " AND gtsh.DeletedOn is null";
        where += " AND gtshcs.DeletedOn is null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchGiayToSoHoaChiaSeQueryHandler : IRequestHandler<SearchGiayToSoHoaChiaSeQuery, PaginationResponse<GiayToSoHoaChiaSeDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchGiayToSoHoaChiaSeQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<GiayToSoHoaChiaSeDto>> Handle(SearchGiayToSoHoaChiaSeQuery request, CancellationToken cancellationToken)
    {
        var where = SearchGiayToSoHoaChiaSeQueryWhereBuilder.Build(request);
        var sql = $@"  SELECT gtshcs.Id, gtshcs.SoDinhDanh, gtshcs.MaDinhDanhChiaSe, gtshcs.CreatedOn as ThoiGianChiaSe, gtsh.ThoiHanHieuLuc, gtsh.Ten, gtsh.Ma, gtsh.ThoiGianSoHoa, g.GroupName, u.FullName,
                        gtsh.DinhKem, gtsh.LoaiSoHoa ,hs.ChuHoSo,gtsh.MaHoSo, gtsh.KhoTaiLieuDienTuId, gtsh.DungLuong,  u2.FullName as TenNguoiChiaSe
                        FROM Business.GiayToSoHoaChiaSes as gtshcs
                        INNER JOIN Business.GiayToSoHoas as gtsh  on gtshcs.GiayToSoHoaId = gtsh.Id 
                        LEFT JOIN Catalog.Groups as g on gtsh.DonViId = g.MaDinhDanh
                        INNER JOIN [Identity].[Users] as u  on u.Id = gtsh.NguoiSoHoa
                        INNER JOIN [Identity].[Users] as u2 on u2.SoDinhDanh = gtshcs.MaDinhDanhChiaSe
                        INNER JOIN Business.HoSos as hs on hs.MaHoSo = gtsh.MaHoSo  {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<GiayToSoHoaChiaSeDto>(sql, request.PageSize, "ThoiGianChiaSe DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}