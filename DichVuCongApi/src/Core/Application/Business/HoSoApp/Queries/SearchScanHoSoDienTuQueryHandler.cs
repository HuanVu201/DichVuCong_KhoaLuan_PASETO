using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Identity.Users;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class SearcShScanHoSoDienTuQueryWhereBuilder
{
    public static string Build(SearchScanHoSoDienTuQuery req)
    {
        string where = string.Empty;
        if (req.daKySo == true)
            where += " AND hs.DinhKemKetQua LIKE '%_signed%'";
        else if (req.daKySo == false)
            where += " AND hs.DinhKemKetQua NOT LIKE '%_signed%'";
        if (!string.IsNullOrEmpty(req.SearchKeys))
            where += " AND (hs.MaHoSo LIKE '%' + @SearchKeys + '%' OR hs.ChuHoSo LIKE '%' + @SearchKeys + '%')";
        if (!string.IsNullOrEmpty(req.ThuTucId))
            where += " AND (tt.MaTTHC = @ThuTucId ) ";
        if (req.chuaDinhKemThanhPhan == true)
            where += " AND not exists (select 1 from Business.ThanhPhanHoSos tpshs where hs.MaHoSo = tpshs.HoSo and tpshs.DeletedOn is null)";
        if (req.NopHoSoTuNgay.HasValue) where += $" AND hs.NgayNopHoSo >= @NopHoSoTuNgay ";
        if (req.NopHoSoDenNgay.HasValue) where += $" AND hs.NgayNopHoSo <= @NopHoSoDenNgay ";
        if (req.Removed == false)
            where += " AND hs.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND hs.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchScanHoSoDienTuQueryHandler : IRequestHandler<SearchScanHoSoDienTuQuery, PaginationResponse<HoSoDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _currentUser;
    public SearchScanHoSoDienTuQueryHandler(IDapperRepository dapperRepository, IUserService currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<PaginationResponse<HoSoDto>> Handle(SearchScanHoSoDienTuQuery request, CancellationToken cancellationToken)
    {
        var where = SearcShScanHoSoDienTuQueryWhereBuilder.Build(request);
        string sql = @$"SELECT hs.ID,hs.NgayXacNhanKetQua, ChuHoSo,hs.TenDiaBan,hs.TenBuocHienTai,NgayLuuViTriHoSo,NguoiLuuViTriHoSo ,hs.SoKyHieuKetQua,SoDienThoaiChuHoSo, EmailChuHoSo, hs.MaTruongHop, hs.MaTTHC, hs.TrangThaiHoSoId,LyDoTuChoi,LyDoBoSung,hs.TrichYeuHoSo, hs.ViTriDeHoSo,hs.LoaiKetQua, hs.DiaChiChuHoSo,
		            UyQuyen, hs.NguoiUyQuyen, hs.SoDienThoaiNguoiUyQuyen, NgayTiepNhan, NgayHenTra, hs.CreatedOn, hs.NgayChuyenXuLy, hs.LastModifiedOn, hs.MaHoSo,hs.DonViId, KenhThucHien, NgayNopHoSo, hs.SoGiayToChuHoSo,
                    hs.DangKyNhanHoSoQuaBCCIData,hs.NgayDangKyBuuDien,hs.NgayTraBuuDien,hs.TrangThaiTraBuuDien, hs.NgayHenTraCaNhan, hs.DinhKemTuChoi, hs.LoaiDuLieuKetNoi
                    FROM [Business].[HoSos] hs
                    INNER JOIN Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                        {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoDto>(sql, request.PageSize, "Id", cancellationToken, request.PageNumber, request);
        return data;
    }
}
