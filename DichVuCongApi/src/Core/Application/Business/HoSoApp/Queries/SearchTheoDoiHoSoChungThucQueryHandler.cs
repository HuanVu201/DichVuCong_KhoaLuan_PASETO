using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchTheoDoiHoSoChungThucQueryWhereBuilder
{
    public static string Build(SearchTheoDoiHoSoChungThucQuery req)
    {
        string where = "hs.LaHoSoChungThuc = 1 AND hs.DonViId = @DonViId";
        if (!string.IsNullOrEmpty(req.LoaiDoiTuong))
            where += " AND hs.LoaiDoiTuong LIKE '%' + @LoaiDoiTuong";
        if (!string.IsNullOrEmpty(req.MaChungThuc))
            where += " AND tphs.HoSo LIKE '%' + @MaChungThuc";
        if (!string.IsNullOrEmpty(req.SoChungThuc))
            where += " AND tphs.SoChungThucDienTu = @SoChungThuc OR tphs.SoChungThucGiay= @SoChungThuc ";
        if (!string.IsNullOrEmpty(req.TrangThai))
            where += " AND hs.TrangThaiHoSoId LIKE '%' + @TrangThai";
        if (!string.IsNullOrEmpty(req.SearchKeys))
            where += " AND ((UyQuyen = 1 AND hs.SoGiayToNguoiUyQuyen LIKE '%' + @SearchKeys + '%' OR hs.NguoiUyQuyen LIKE '%' + @SearchKeys + '%')" +
                     " OR  (UyQuyen = 0 AND hs.SoGiayToChuHoSo LIKE '%' + @SearchKeys + '%' OR hs.ChuHoSo LIKE '%' + @SearchKeys + '%')) ";
        if (!string.IsNullOrEmpty(req.TTHC))
            where += " AND hs.MaTTHC LIKE '%' + @TTHC";
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

public class SearchTheoDoiHoSoChungThucQueryHandler : IRequestHandler<SearchTheoDoiHoSoChungThucQuery, PaginationResponse<TheoDoiHoSoChungThucDto>>
{
    private readonly string tableTrangThaiHoSo = "[Business].[TrangThaiHoSos]";
    private readonly string tableTruongHopThuTuc = "[Business].[TruongHopThuTucs]";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _currentUser;
    public SearchTheoDoiHoSoChungThucQueryHandler(IDapperRepository dapperRepository, IUserService currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<PaginationResponse<TheoDoiHoSoChungThucDto>> Handle(SearchTheoDoiHoSoChungThucQuery request, CancellationToken cancellationToken)
    {
        var user = await _currentUser.GetCurrentUserAsync(cancellationToken);
        var where = SearchTheoDoiHoSoChungThucQueryWhereBuilder.Build(request);
        var sql = $@"  SELECT hs.Id as Id,UyQuyen ,tphs.HoSo as MaChungThuc, tphs.SoChungThucDienTu,tphs.SoChungThucGiay ,tphs.DinhKem,hs.TrangThaiHoSoId , hs.NgayNopHoSo as NgayDangKy,tths.Ten as TenTrangThaiHoSo,
		               CASE
                       WHEN hs.UyQuyen = 1 THEN hs.NguoiUyQuyen
                       WHEN hs.UyQuyen = 0 THEN hs.ChuHoSo
                       ELSE NULL 
                       END AS TenDoiTuongDangKy,
                       CASE
                       WHEN hs.UyQuyen = 1 THEN hs.SoGiayToNguoiUyQuyen
                       WHEN hs.UyQuyen = 0 THEN hs.SoGiayToChuHoSo
                       ELSE NULL 
                       END AS SoGiayTo
                       FROM [Business].[ThanhPhanHoSos] tphs 
                       inner join Business.HoSos hs on tphs.HoSo = hs.MaHoSo
					   inner join Business.TrangThaiHoSos tths on hs.TrangThaiHoSoId = tths.ma    
                       {where}";   
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TheoDoiHoSoChungThucDto>(sql, request.PageSize, "NgayDangKy DESC", cancellationToken, request.PageNumber, new
        {
            LoaiDoiTuong = request.LoaiDoiTuong,
            MaChungThuc = request.MaChungThuc,
            SoChungThuc = request.SoChungThuc,
            TrangThai = request.TrangThai,
            SearchKeys = request.SearchKeys ,
            TTHC = request.TTHC,
            NopHoSoTuNgay = request.NopHoSoTuNgay,
            NopHoSoDenNgay = request.NopHoSoDenNgay,
            DonViId = user.OfficeCode
        });
        return data;
    }
}
