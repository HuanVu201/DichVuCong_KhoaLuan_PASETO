using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp.Queries;

public class SearchQuaTrinhXuLyHoSoQueryWhereBuilder
{
    public static string Build(SearchQuaTrinhXuLyHoSoQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND MaHoSo = @MaHoSo";
        if (!string.IsNullOrEmpty(req.NguoiGui))
            where += " AND NguoiGui = @NguoiGui";
        if (req.Removed == false)
            where += " AND qtxlhs.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND qtxlhs.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchQuaTrinhXuLyHoSoQueryHandler : IRequestHandler<SearchQuaTrinhXuLyHoSoQuery, PaginationResponse<QuaTrinhXuLyHoSoDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchQuaTrinhXuLyHoSoQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<QuaTrinhXuLyHoSoDto>> Handle(SearchQuaTrinhXuLyHoSoQuery request, CancellationToken cancellationToken)
    {
        var where = SearchQuaTrinhXuLyHoSoQueryWhereBuilder.Build(request);
        var sql = $@"SELECT qtxlhs.ID, TrangThai, NguoiGui, ThoiHanBuocXuLy, LoaiThoiHanBuocXuLy, NgayHetHanBuocXuLy, ThaoTac, ThoiGian,
                    STRING_AGG (CONVERT(NVARCHAR(500),u.FullName + ' - (' + u.PositionName + ')') , ', ')  as TenNguoiNhan,
                    case when  qtxlhs.NguoiGui = null then STRING_AGG (CONVERT(NVARCHAR(500),ng.FullName + ' - (' + ng.PositionName + ')') , ', ') else qtxlhs.TenNguoiGui end as TenNguoiGui,
                    qtxlhs.DinhKem, qtxlhs.NoiDung, ng.OfficeCode, ng.OfficeName, ng.PositionName
                    FROM Business.QuaTrinhXuLyHoSos qtxlhs
                    LEFT join [Identity].[Users] u on qtxlhs.NguoiNhan = u.id
                    LEFT join [Identity].[Users] ng on qtxlhs.NguoiGui = ng.Id
                    {where}
                    group by qtxlhs.ID, TrangThai, NguoiGui, ThoiHanBuocXuLy, LoaiThoiHanBuocXuLy, NgayHetHanBuocXuLy, ThaoTac, ThoiGian, TenNguoiGui, DinhKem, NoiDung, ng.OfficeCode, ng.OfficeName, u.PositionName, ng.PositionName ";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<QuaTrinhXuLyHoSoDto>(sql, request.PageSize, "ThoiGian", cancellationToken, request.PageNumber, request);
        return data;
    }
}
