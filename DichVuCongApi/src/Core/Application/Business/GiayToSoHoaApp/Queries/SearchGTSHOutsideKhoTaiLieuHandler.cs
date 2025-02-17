using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Queries;

public class SearchGTSHOutsideKhoTaiLieuQueryWhereBuilder
{
    public static string Build(SearchGTSHOutsideKhoTaiLieuQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaDinhDanh))
            where += " AND gtsh.MaDinhDanh = @MaDinhDanh";
        where += " AND ((gtsh.LoaiSoHoa = '1' And gtsh.AnGiayTo = 0) OR gtsh.LoaiSoHoa <> '1')"; // loaiSoHoa là kết quả thì công dân chỉ được nhìn những giấy tờ đã được trả kq
        where += " AND gtsh.KhoTaiLieuDienTuId is null ";

        if (req.Removed == false)
            where += " AND gtsh.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND gtsh.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchGTSHOutsideKhoTaiLieuQueryHandler : IRequestHandler<SearchGTSHOutsideKhoTaiLieuQuery, PaginationResponse<GiayToSoHoaDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchGTSHOutsideKhoTaiLieuQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<GiayToSoHoaDto>> Handle(SearchGTSHOutsideKhoTaiLieuQuery request, CancellationToken cancellationToken)
    {
        var where = SearchGTSHOutsideKhoTaiLieuQueryWhereBuilder.Build(request);
        var sql = $@"  SELECT gtsh.ID, ThoiHanHieuLuc, Ten, Ma, ThoiGianSoHoa, g.GroupName, u.FullName, gtsh.DinhKem, gtsh.LoaiSoHoa ,hs.ChuHoSo,gtsh.MaHoSo, gtsh.KhoTaiLieuDienTuId, gtsh.DungLuong
                        FROM Business.GiayToSoHoas as gtsh
                        LEFT JOIN Catalog.Groups as g on gtsh.DonViId = g.MaDinhDanh
                        INNER JOIN [Identity].[Users] as u  on u.Id = gtsh.NguoiSoHoa 
                        INNER JOIN Business.HoSos as hs on hs.MaHoSo = gtsh.MaHoSo  {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<GiayToSoHoaDto>(sql, request.PageSize, "ThoiGianSoHoa DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}