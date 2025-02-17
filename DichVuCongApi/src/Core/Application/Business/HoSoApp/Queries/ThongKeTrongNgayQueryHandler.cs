using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class ThongKeTrongNgayQueryWhereBuilder
{
    public static string Build(ThongKeTrongNgayQuery req)
    {
        string where = string.Empty;
        /*  if (req.NopHoSoTuNgay.HasValue) where += $" AND hs.NgayGui >= @NopHoSoTuNgay ";
          if (req.NopHoSoDenNgay.HasValue) where += $" AND hs.NgayGui <= @NopHoSoDenNgay ";
          if (req.TiepNhanTuNgay.HasValue) where += $" AND hs.NgayTiepNhan >= @TiepNhanTuNgay ";
          if (req.TiepNhanDenNgay.HasValue) where += $" AND hs.NgayTiepNhan <= @TiepNhanDenNgay ";*/
        if (!string.IsNullOrEmpty(req.Catalog))
            where += " AND Catalog = @Catalog ";
        if (req.CoThongKe == true)
            where += $"AND (CoThongKe IS NULL OR CoThongKe = 1) ";
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
public class ThongKeTrongNgayQueryHandler : IRequestHandler<ThongKeTrongNgayQuery, PaginationResponse<ThongKeTrongNgayDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public ThongKeTrongNgayQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ThongKeTrongNgayDto>> Handle(ThongKeTrongNgayQuery request, CancellationToken cancellationToken)
    {
        string whereJoin = "";
        if (request.TiepNhanTuNgay != null) whereJoin += $" AND hs.NgayTiepNhan >= @TiepNhanTuNgay ";
        if (request.TiepNhanDenNgay != null) whereJoin += $" AND hs.NgayTiepNhan <= @TiepNhanDenNgay ";
        if (request.NopHoSoTuNgay != null) whereJoin += $" AND hs.NgayNopHoSo >= @NopHoSoTuNgay ";
        if (request.NopHoSoDenNgay != null) whereJoin += $" AND hs.NgayNopHoSo <= @NopHoSoDenNgay ";
        if (!string.IsNullOrEmpty(request.KenhThucHien))
            whereJoin += " AND hs.KenhThucHien = @KenhThucHien";
        var where = ThongKeTrongNgayQueryWhereBuilder.Build(request);
        var sql = $@"
                     select gr.GroupName,MAX(gr.GroupCode) as GroupCode,MAX(gr.GroupOrder) as GroupOrder,MAX(gr.MaDinhDanh) as MaDinhDanh,
	                COUNT(CASE WHEN TrangThaiHoSoId not in ('1','3') and (NgayTiepNhan >= CAST(GETDATE() AS DATE) AND NgayTiepNhan < DATEADD(DAY, 1, CAST(GETDATE() AS DATE)))  THEN 1 END) AS TiepNhanTrongNgay,
	                COUNT(CASE WHEN TrangThaiHoSoId not in ('1','3') and (NgayTiepNhan >= CAST(GETDATE() AS DATE) AND NgayTiepNhan < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))) and KenhThucHien = '1' THEN 1 END) AS TiepNhanTrucTiepTrongNgay,
	                COUNT(CASE WHEN TrangThaiHoSoId not in ('1','3') and (NgayTiepNhan >= CAST(GETDATE() AS DATE) AND NgayTiepNhan < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))) and KenhThucHien = '2' THEN 1 END) AS TiepNhanTrucTuyenTrongNgay,
	                COUNT(CASE WHEN TrangThaiHoSoId not in ('1','3') and (NgayTiepNhan >= CAST(GETDATE() AS DATE) AND NgayTiepNhan < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))) and KenhThucHien = '3' THEN 1 END) AS TiepNhanBCCITrongNgay,
	                COUNT(CASE WHEN TrangThaiHoSoId in ('9','10') and TrangThaiTraKq != 1 and (NgayKetThucXuLy >= CAST(GETDATE() AS DATE) AND NgayKetThucXuLy < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))) THEN 1 END) AS CoKetQuaTrongNGay,
	                COUNT(CASE WHEN TrangThaiHoSoId = '10' and (NgayTra >= CAST(GETDATE() AS DATE) AND NgayTra < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))) THEN 1 END) AS DaTraCongDanTrongNgay,
	                COUNT(CASE WHEN yctt.TrangThaiThuPhi LIKE N'%Đã thanh toán%' and (yctt.NgayThuPhi >= CAST(GETDATE() AS DATE) AND yctt.NgayThuPhi < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))) THEN 1 END) AS ThuPhiLePhiTrongNgay,
	                COUNT(CASE WHEN TrangThaiHoSoId = '9' and LoaiKetQua = N'Trả lại/Xin rút' and (NgayKetThucXuLy >= CAST(GETDATE() AS DATE) AND NgayKetThucXuLy < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))) THEN 1 END) AS YeuCauTraLaiXinRutTrongNgay,
	                COUNT(CASE WHEN TrangThaiHoSoId = '5' and (NgayYeuCauBoSung >= CAST(GETDATE() AS DATE) AND NgayYeuCauBoSung < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))) THEN 1 END) AS YeuCauBoSungTrongNgay
	                from Business.HoSos hs 
	                FULL OUTER JOIN Catalog.Groups gr on gr.GroupCode = hs.DonViId {whereJoin}
	                outer apply (select STRING_AGG (CONVERT(NVARCHAR(700), TrangThai) , '##') as TrangThaiThuPhi, CAST(NgayThuPhi AS DATE) AS NgayThuPhi from Business.YeuCauThanhToans yctt where hs.MaHoSo = yctt.MaHoSo and yctt.DeletedOn is null group by CAST(NgayThuPhi AS DATE)) as yctt
	                {where}
	                GROUP BY GroupName
                    ";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThongKeTrongNgayDto>(sql, request.PageSize, request.OrderBy != null && request.OrderBy.Length > 0 ? request.OrderBy : new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray(), cancellationToken, request.PageNumber, new
        {
            Catalog = request.Catalog,
            MaDinhDanh = request.MaDinhDanh,
            MaDinhDanhCha = request.MaDinhDanhCha,
            TiepNhanTuNgay = request.TiepNhanTuNgay,
            TiepNhanDenNgay = request.TiepNhanDenNgay,
            NopHoSoTuNgay = request.NopHoSoTuNgay,
            NopHoSoDenNgay = request.NopHoSoDenNgay,
            KenhThucHien = request.KenhThucHien
        }, "GroupCode");
        return data;
    }
}
