using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.ActionApp.Queries;
using TD.DichVuCongApi.Application.Business.ActionApp;
using TD.DichVuCongApi.Application.Common.Caching;
using MediatR;

namespace TD.DichVuCongApi.Application.Statistics.TiepNhanBuuChinh;

public class TiepNhanBuuChinhQueryWhereBuilder
{
    public static string Build(TiepNhanBuuChinhQuery req)
    {
        string where = string.Empty;
        /*  if (req.TuNgay.HasValue) where += $" AND hs.NgayTiepNhan >= @TuNgay ";
          if (req.DenNgay.HasValue) where += $" AND hs.NgayTiepNhan <= @DenNgay ";*/
        if (!string.IsNullOrEmpty(req.Catalog))
            where += " AND Catalog = @Catalog ";
        if (!string.IsNullOrEmpty(req.MaDinhDanh))
            where += " AND MaDinhDanh = @MaDinhDanh ";
        if (!string.IsNullOrEmpty(req.MaDinhDanhCha))
            where += $" AND MaDinhDanh Like @MaDinhDanhCha +'%' ";
        if (req.LaHoSoChungThuc == false)
            where += $" AND (hs.LaHoSoChungThuc = 0 )";
        if (req.Removed == false)
            where += " AND ( hs.DeletedOn is null and GroupCode is not null and gr.Type = 'don-vi' )";
        else if (req.Removed == true)
            where += " AND hs.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class TiepNhanBuuChinhQueryHandler : IRequestHandler<TiepNhanBuuChinhQuery, PaginationResponse<TiepNhanBuuChinhDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public TiepNhanBuuChinhQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<TiepNhanBuuChinhDto>> Handle(TiepNhanBuuChinhQuery request, CancellationToken cancellationToken)
    {
        string whereJoin = "AND hs.LaHoSoChungThuc = 0";
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        if (request.TuNgay.HasValue) whereJoin += $" AND hs.NgayTiepNhan >= @TuNgay ";
        if (request.DenNgay.HasValue) whereJoin += $" AND hs.NgayTiepNhan <= @DenNgay ";
        var where = TiepNhanBuuChinhQueryWhereBuilder.Build(request);
        var sql = $@"select
                    gr.GroupName,MAX(gr.GroupCode) as GroupCode,
	                COUNT(CASE WHEN KenhThucHien = '3' THEN hs.MaHoSo END) AS CountTiepNhanQuaBuuChinh,
                    COUNT(CASE WHEN NgayTraBuuDien is not null and TrangThaiTraBuuDien = '1' THEN 1 END) AS CountBuuDienDaChuyenTraKQ,
	                COUNT(CASE WHEN HinhThucTra = '1' OR NgayDangKyBuuDien IS NOT NULL THEN 1 END) AS CountDangKyQuaKQBuuDien
	                from Business.HoSos hs
                    FULL OUTER JOIN Catalog.Groups gr on gr.GroupCode = hs.DonViId {whereJoin}
                    {where}
                    GROUP BY GroupName
                    ";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TiepNhanBuuChinhDto>(sql, request.PageSize, request.OrderBy != null && request.OrderBy.Length > 0 ? request.OrderBy : new List<string>() { "GroupCode" }.ToArray(), cancellationToken, request.PageNumber, new
        {
            Catalog = request.Catalog,
            MaDinhDanh = request.MaDinhDanh,
            MaDinhDanhCha = request.MaDinhDanhCha,
            TuNgay = tuNgay,
            DenNgay = denNgay
        }, "GroupCode");
        return data;
    }
}
