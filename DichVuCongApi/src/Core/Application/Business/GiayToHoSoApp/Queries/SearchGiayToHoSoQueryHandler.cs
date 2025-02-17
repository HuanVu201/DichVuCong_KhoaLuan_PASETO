using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Queries;


public class SearchGiayToHoSoQueryWhereBuilder
{
    public static string Build(SearchGiayToHoSoQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND MaHoSo Like N'%' + @MaHoSo + '%'";
        if (!string.IsNullOrEmpty(req.LoaiGiayTo))
            where += " AND LoaiGiayTo Like N'%' + @LoaiGiayTo + '%'";
        if (!string.IsNullOrEmpty(req.MaGiayTo))
            where += " AND MaGiayTo Like N'%' + @MaGiayTo + '%'";
        if (req.SuDung == true || req.SuDung == null)
            where += " AND SuDung = 1";
        else if (req.SuDung == false)
            where += " AND SuDung = 0";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchGiayToHoSoQueryHandler : IRequestHandler<SearchGiayToHoSoQuery, PaginationResponse<GiayToHoSoDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchGiayToHoSoQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<GiayToHoSoDto>> Handle(SearchGiayToHoSoQuery request, CancellationToken cancellationToken)
    {
        var where = SearchGiayToHoSoQueryWhereBuilder.Build(request);
        var sql = $@"SELECT ID, MaHoSo, LoaiGiayTo, NguoiXuatPhieu, NgayXuatPhieu, MaGiayTo, DocxPhieu, PDFPhieu, HinhAnhChuKyCongDan, NgayKySo,
                    NguoiKySo, NgayGuiCongDan, TrangThaiGuiCongDan, NguoiGuiCongDan  FROM Business.GiayToHoSos {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<GiayToHoSoDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}