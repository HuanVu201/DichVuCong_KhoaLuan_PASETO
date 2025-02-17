using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class TheoDoiHoSoKhongDuocTiepNhanQueryWhereBuilder
{
    public static string Build(TheoDoiHoSoKhongDuocTiepNhanQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Catalog))
            where += " AND Catalog = @Catalog ";
        if (!string.IsNullOrEmpty(req.MaDinhDanh))
            where += " AND MaDinhDanh = @MaDinhDanh ";
        if (!string.IsNullOrEmpty(req.MaDinhDanhCha))
            where += $" AND MaDinhDanh Like @MaDinhDanhCha +'%' ";
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
public class TheoDoiHoSoKhongDuocTiepNhanQueryHandler : IRequestHandler<TheoDoiHoSoKhongDuocTiepNhanQuery, PaginationResponse<TheoDoiHoSoKhongDuocTiepNhanDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public TheoDoiHoSoKhongDuocTiepNhanQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<TheoDoiHoSoKhongDuocTiepNhanDto>> Handle(TheoDoiHoSoKhongDuocTiepNhanQuery request, CancellationToken cancellationToken)
    {
        string whereJoin = "";
        /*  string tiepNhanTuNgay = request.TiepNhanTuNgay.Value.ToString("yyyy-MM-dd");
          string tiepNhanDenNgay = request.TiepNhanDenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
          string ngayGuiTuNgay = request.NopHoSoTuNgay.Value.ToString("yyyy-MM-dd");
          string ngayGuiDenNgay = request.NopHoSoDenNgay.Value.ToString("yyyy-MM-dd 23:59:59");*/
        if (request.NopHoSoTuNgay != null) whereJoin += $" AND hs.NgayNopHoSo >= @NopHoSoTuNgay ";
        if (request.NopHoSoDenNgay != null) whereJoin += $" AND hs.NgayNopHoSo <= @NopHoSoDenNgay ";
        if (!string.IsNullOrEmpty(request.KenhThucHien))
            whereJoin += " AND hs.KenhThucHien = @KenhThucHien";
        var where = TheoDoiHoSoKhongDuocTiepNhanQueryWhereBuilder.Build(request);
        var sql = $@"
                    select gr.GroupName,MAX(gr.GroupCode) as GroupCode,MAX(gr.GroupOrder) as GroupOrder,MAX(gr.MaDinhDanh) as MaDinhDanh,
					COUNT(CASE WHEN TrangThaiHoSoId = '3' THEN 1 END) AS HoSoKhongDuocTiepNhan
					from Business.HoSos hs 
                    FULL OUTER JOIN Catalog.Groups gr on gr.GroupCode = hs.DonViId {whereJoin}
					outer apply (select STRING_AGG (CONVERT(NVARCHAR(700), TrangThai) , '##') as TrangThaiThuPhi from Business.YeuCauThanhToans yctt where hs.MaHoSo = yctt.MaHoSo and yctt.DeletedOn is null ) as yctt
					{where}
                    GROUP BY GroupName
                    ";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TheoDoiHoSoKhongDuocTiepNhanDto>(sql, request.PageSize, request.OrderBy != null && request.OrderBy.Length > 0 ? request.OrderBy : new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray(), cancellationToken, request.PageNumber, new
        {
            Catalog = request.Catalog,
            MaDinhDanh = request.MaDinhDanh,
            MaDinhDanhCha = request.MaDinhDanhCha,
            NopHoSoTuNgay = request.NopHoSoTuNgay,
            NopHoSoDenNgay = request.NopHoSoDenNgay,
            KenhThucHien = request.KenhThucHien
        }, "GroupCode");
        return data;
    }
}
