using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;

public class SearchNguoiTiepNhanThuTucQueryWhereBuilder
{
    public static string Build(SearchNguoiTiepNhanThuTuc req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TenTTHC))
            where += " AND tt.TenTTHC Like '%' + @TenTTHC + '%'";

        if (!string.IsNullOrEmpty(req.DonViId))
            where += " AND  dv.DonViId= @DonViId ";

        if (!string.IsNullOrEmpty(req.MaTTHC))
            where += " AND  tt.MaTTHC Like '%' + @MaTTHC + '%'";

        if (!string.IsNullOrEmpty(req.LoaiTTHC))
            where += " AND  tt.LoaiTTHC = @LoaiTTHC";

        if (!string.IsNullOrEmpty(req.NguoiTiepNhan))
            where += " AND dv.NguoiTiepNhanId like '%' + @NguoiTiepNhanId +'%'";

        if (!string.IsNullOrEmpty(req.MaLinhVucChinh))
            where += " AND tt.MaLinhVucChinh = @MaLinhVucChinh";

        if (!string.IsNullOrEmpty(req.MucDo))
            where += " AND tt.MucDo = @MucDo";

        if (req.Removed == false)
            where += " AND tt.DeletedOn is null AND dv.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND tt.DeletedOn is not null AND dv.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchNguoiTiepNhanThuTucQueryHandler : IRequestHandler<SearchNguoiTiepNhanThuTuc, PaginationResponse<NguoiTiepNhanThuTucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchNguoiTiepNhanThuTucQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<NguoiTiepNhanThuTucDto>> Handle(SearchNguoiTiepNhanThuTuc request, CancellationToken cancellationToken)
    {
        var where = SearchNguoiTiepNhanThuTucQueryWhereBuilder.Build(request);
        var sql = $@"SELECT MAX(tt.ID) as ID, tt.TenTTHC, tt.MucDo, tt.LoaiTTHC, tt.MaTTHC, dv.ID as DonViId,
                    MAX(dv.NguoiTiepNhanId) as NguoiTiepNhanId , STRING_AGG(users.FullName, ', ')  WITHIN GROUP (ORDER BY users.FullName ASC) AS NguoiTiepNhan,
                    tt.QuyetDinhCongBo, tt.DinhKemQuyetDinh,tt.SuDung
                    FROM [Catalog].[ThuTucs] as tt
                    LEFT JOIN [Catalog].[DonViThuTucs] as dv on dv.MaTTHC = tt.MaTTHC
                    LEFT JOIN [Identity].[Users] as users on users.Id IN (SELECT value FROM STRING_SPLIT(dv.NguoiTiepNhanId, '#'))
                    {where}
                    GROUP BY tt.MaTTHC, tt.TenTTHC, tt.MucDo, tt.LoaiTTHC, dv.ID, tt.QuyetDinhCongBo, tt.DinhKemQuyetDinh,tt.SuDung";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<NguoiTiepNhanThuTucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);

        return data;
    }
}
