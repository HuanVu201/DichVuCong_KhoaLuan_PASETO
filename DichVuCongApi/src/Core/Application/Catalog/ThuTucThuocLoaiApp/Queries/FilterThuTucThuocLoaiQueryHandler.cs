using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucThuocLoaiApp;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Queries;



public class FilterThuTucThuocLoaiQueryWhereBuilder
{
    public static string Build(FilterThuTucThuocLoai req, out string joinClause)
    {
        string where = "tt.SuDung = '1'";
        joinClause = string.Empty;

        if (!string.IsNullOrEmpty(req.MaThuTucThuocLoai))
            where += " AND tt.MaThuTucThuocLoaiChinh = @MaThuTucThuocLoai ";
        if (!string.IsNullOrEmpty(req.TuKhoa))
            where += " AND (tt.TenTTHC Like '%' + @TuKhoa + '%' OR tt.MaTTHC Like '%' + @TuKhoa + '%')";
        if (req.HasThuTucCapTinh.HasValue)
            where += " AND tt.CapThucHien Like '%capTinh%'";
        if (req.HasThuTucCapHuyen.HasValue)
            where += " AND tt.CapThucHien Like '%capHuyen%'";
        if (req.HasThuTucCapXa.HasValue)
            where += " AND tt.CapThucHien Like '%capXa%'";
        if (req.ThucHienTaiBoPhanMotCua != null)
            where += " AND tt.ThucHienTaiBoPhanMotCua = @ThucHienTaiBoPhanMotCua";

        if (!string.IsNullOrEmpty(req.DonViId))
        {
            joinClause = " LEFT JOIN [Catalog].[DonViThuTucs] dvtt ON dvtt.MaTTHC = tt.MaTTHC ";
            where += " AND dvtt.DonViId = @DonViId AND dvtt.DeletedOn IS NULL ";
        }
        if (!string.IsNullOrEmpty(req.MucDo))
            where += " AND tt.MucDo = @MucDo ";

        if (req.Removed == false)
            where += " AND tt.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND tt.DeletedOn is not null";

        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class FilterThuTucThuocLoaiQueryHandler : IRequestHandler<FilterThuTucThuocLoai, PaginationResponse<FilterThuTucThuocLoaiDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;

    public FilterThuTucThuocLoaiQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;

    public async Task<PaginationResponse<FilterThuTucThuocLoaiDto>> Handle(FilterThuTucThuocLoai request, CancellationToken cancellationToken)
    {
        var where = FilterThuTucThuocLoaiQueryWhereBuilder.Build(request, out string joinClause);
        var sql = $@"SELECT DISTINCT tt.ID, tt.TenTTHC, tt.MaTTHC, tt.MaThuTucThuocLoaiChinh, tt.CoQuanThucHienChinh, tt.MucDo, tt.CapThucHien, tt.ThuTucThuocLoaiChinh
                     FROM Catalog.ThuTucs tt
                     {joinClause}
                     {where}";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<FilterThuTucThuocLoaiDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
