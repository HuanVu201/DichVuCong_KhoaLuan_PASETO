using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Statistics.TiepNhanBuuChinh;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class ThongKeTheoDoiTrangThaiXuLyHoSoQueryWhereBuilder
{
    public static string Build(ThongKeTheoDoiTrangThaiXuLyHoSoQuery req)
    {
        string where = string.Empty;
      /*  if (req.NopHoSoTuNgay.HasValue) where += $" AND hs.NgayGui >= @NopHoSoTuNgay ";
        if (req.NopHoSoDenNgay.HasValue) where += $" AND hs.NgayGui <= @NopHoSoDenNgay ";
        if (req.TiepNhanTuNgay.HasValue) where += $" AND hs.NgayTiepNhan >= @TiepNhanTuNgay ";
        if (req.TiepNhanDenNgay.HasValue) where += $" AND hs.NgayTiepNhan <= @TiepNhanDenNgay ";*/
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
public class ThongKeTheoDoiTrangThaiXuLyHoSoQueryHandler : IRequestHandler<ThongKeTheoDoiTrangThaiXuLyHoSoQuery, PaginationResponse<ThongKeTheoDoiTrangThaiXuLyHoSoDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public ThongKeTheoDoiTrangThaiXuLyHoSoQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ThongKeTheoDoiTrangThaiXuLyHoSoDto>> Handle(ThongKeTheoDoiTrangThaiXuLyHoSoQuery request, CancellationToken cancellationToken)
    {
        string whereJoin = "";
      /*  string tiepNhanTuNgay = request.TiepNhanTuNgay.Value.ToString("yyyy-MM-dd");
        string tiepNhanDenNgay = request.TiepNhanDenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        string ngayGuiTuNgay = request.NopHoSoTuNgay.Value.ToString("yyyy-MM-dd");
        string ngayGuiDenNgay = request.NopHoSoDenNgay.Value.ToString("yyyy-MM-dd 23:59:59");*/
        if (request.TiepNhanTuNgay != null) whereJoin += $" AND hs.NgayTiepNhan >= @TiepNhanTuNgay ";
        if (request.TiepNhanDenNgay != null) whereJoin += $" AND hs.NgayTiepNhan <= @TiepNhanDenNgay ";
        if (request.NopHoSoTuNgay != null) whereJoin += $" AND hs.NgayNopHoSo >= @NopHoSoTuNgay ";
        if (request.NopHoSoDenNgay != null) whereJoin += $" AND hs.NgayNopHoSo <= @NopHoSoDenNgay ";
        if (!string.IsNullOrEmpty(request.KenhThucHien))
            whereJoin += " AND hs.KenhThucHien = @KenhThucHien";
        var where = ThongKeTheoDoiTrangThaiXuLyHoSoQueryWhereBuilder.Build(request);
        var sql = $@"
                    select gr.GroupName,MAX(gr.GroupCode) as GroupCode,MAX(gr.GroupOrder) as GroupOrder,MAX(gr.MaDinhDanh) as MaDinhDanh,
					COUNT(CASE WHEN TrangThaiHoSoId = '1' and yctt.TrangThaiThuPhi is null THEN 1 END) AS ChoTiepNhan,
					COUNT(CASE WHEN TrangThaiHoSoId = '1' and yctt.TrangThaiThuPhi is null and KenhThucHien = '2' THEN 1 END) AS ChoTiepNhanTrucTuyen,
					COUNT(CASE WHEN TrangThaiHoSoId = '1' and yctt.TrangThaiThuPhi is null and KenhThucHien = '3' THEN 1 END) AS ChoTiepNhanQuaBCCI,
					COUNT(CASE WHEN TrangThaiHoSoId = '1' and yctt.TrangThaiThuPhi LIKE N'%Đã thanh toán%' THEN 1 END) AS DuDieuKienDaNopPhiChoTiepNhan,
					COUNT(CASE WHEN TrangThaiHoSoId = '1' AND (yctt.TrangThaiThuPhi LIKE N'%Chờ thanh toán%' OR yctt.TrangThaiThuPhi LIKE N'%Chưa thanh toán%')  THEN 1 END) AS DuDieuKienChuaNopPhiChoTiepNhan,
					COUNT(CASE WHEN TrangThaiHoSoId = '2' THEN 1 END) AS MoiTiepNhan,
					COUNT(CASE WHEN TrangThaiHoSoId = '2' and KenhThucHien = '2' THEN 1 END) AS MoiTiepNhanTrucTuyen,
					COUNT(CASE WHEN TrangThaiHoSoId = '2' and KenhThucHien = '3' THEN 1 END) AS MoiTiepNhanQuaBCCI,
					COUNT(CASE WHEN TrangThaiHoSoId = '4' THEN 1 END) AS DangXuLy,
					COUNT(CASE WHEN TrangThaiHoSoId = '8' THEN 1 END) AS DungXuLy,
					COUNT(CASE WHEN TrangThaiHoSoId = '6' THEN 1 END) AS ChoThucHienNghiaVuTaiChinh,
					COUNT(CASE WHEN TrangThaiHoSoId = '5' and TrangThaiTraKq = 1 THEN 1 END) AS ChoBoSung,
					COUNT(CASE WHEN TrangThaiHoSoId = '9' and TrangThaiTraKq = 1 and LoaiKetQua != N'Trả lại/Xin rút' THEN 1 END) AS ChoXacNhanKetQua,
					COUNT(CASE WHEN TrangThaiHoSoId = '5' and TrangThaiTraKq = 1 THEN 1 END) AS ChoXacNhanBoSung,
					COUNT(CASE WHEN TrangThaiHoSoId = '9' and TrangThaiTraKq = 1 and LoaiKetQua = N'Trả lại/Xin rút' THEN 1 END) AS ChoXacNhanTraLai,
					COUNT(CASE WHEN TrangThaiHoSoId = '9' and TrangThaiTraKq = 1 THEN 1 END) AS ChoTra
					from Business.HoSos hs 
                    FULL OUTER JOIN Catalog.Groups gr on gr.GroupCode = hs.DonViId {whereJoin}
					outer apply (select STRING_AGG (CONVERT(NVARCHAR(700), TrangThai) , '##') as TrangThaiThuPhi from Business.YeuCauThanhToans yctt where hs.MaHoSo = yctt.MaHoSo and yctt.DeletedOn is null ) as yctt
					{where}
                    GROUP BY GroupName
                    ";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThongKeTheoDoiTrangThaiXuLyHoSoDto>(sql, request.PageSize, request.OrderBy != null && request.OrderBy.Length > 0 ? request.OrderBy : new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray(), cancellationToken, request.PageNumber, new
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
