using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Users;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchHoSoCanBoBCCI;
public class SearchHoSoCanBoBCCIWhereBuilder
{

    public static string Build(SearchHoSoCanBoBCCIRequest req)
    {
        string tableHoSos = "[Business].[HoSos]";
        string tableMaVanDon = "[Catalog].[MaVanDonBuuDiens]";
        YeuCauThanhToanConstants yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.DonViTraKq))
        {
            where += $" AND {tableHoSos}.DonViTraKq = @DonViTraKq";
        }
        if (req.SearchAllType == false)
        {
            if (req.LaHoSoChungThuc == true)
            {
                where += $" AND {tableHoSos}.LaHoSoChungThuc = 1";
            }
            else
            {
                where += $" AND ({tableHoSos}.LaHoSoChungThuc = 0 OR {tableHoSos}.LaHoSoChungThuc is null)";
            }
        }
        if (req.DaYeuCauBCCILayKetQua == false)
        {
            where += $" AND  {tableHoSos}.NgayTraBuuDien IS NULL AND {tableHoSos}.TrangThaiTraBuuDien IS NULL ";
        }
        else if (req.DaYeuCauBCCILayKetQua == true)
        {
            where += $" AND {tableHoSos}.NgayTraBuuDien IS NOT NULL AND {tableHoSos}.TrangThaiTraBuuDien = '1' ";

        }
        if (req.NotInMaTrangThais != null && req.NotInMaTrangThais.Count > 0)
            where += $" AND {tableHoSos}.TrangThaiHoSoId NOT IN @NotInMaTrangThais";
        if (req.InMaTrangThais != null && req.InMaTrangThais.Count > 0)
            where += $" AND {tableHoSos}.TrangThaiHoSoId IN @InMaTrangThais";
        if (!string.IsNullOrEmpty(req.GroupCode))
            where += $" AND {tableHoSos}.DonViId = @GroupCode";
        if (req.NhanKetQuaBCCI == true)
            where += $" AND {tableHoSos}.HinhThucTra = '1'";
        else if (req.NhanKetQuaBCCI == false)
            where += $" AND ({tableHoSos}.HinhThucTra = '0'";
        if (req.CanBoBCCIDaDangKy == true)
            where += $" AND {tableHoSos}.NgayDangKyBuuDien IS NOT NULL ";
        else if (req.CanBoBCCIDaDangKy == false)
            where += $" AND {tableHoSos}.NgayDangKyBuuDien IS NULL";
        if (!string.IsNullOrEmpty(req.KenhThucHien))
            where += $" AND {tableHoSos}.KenhThucHien = @KenhThucHien";
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += $" AND {tableHoSos}.MaHoSo LIKE '%' + @MaHoSo + '%'";
        if (!string.IsNullOrEmpty(req.SearchKeys))
            where += $" AND ({tableHoSos}.MaHoSo LIKE '%' + @SearchKeys + '%' OR {tableHoSos}.ChuHoSo LIKE '%' + @SearchKeys + '%')";
        if (!string.IsNullOrEmpty(req.SoDienThoaiChuHoSo))
            where += $" AND {tableHoSos}.SoDienThoaiChuHoSo LIKE '%' + @SoDienThoaiChuHoSo + '%'";
        if (!string.IsNullOrEmpty(req.SoDienThoaiNguoiUyQuyen))
            where += $" AND {tableHoSos}.SoDienThoaiNguoiUyQuyen LIKE '%' + @SoDienThoaiNguoiUyQuyen + '%'";
        if (!string.IsNullOrEmpty(req.ChuHoSo))
            where += $" AND {tableHoSos}.ChuHoSo LIKE '%' + @ChuHoSo + '%'";
        if (!string.IsNullOrEmpty(req.NguoiUyQuyen))
            where += $" AND {tableHoSos}.NguoiUyQuyen LIKE '%' + @NguoiUyQuyen + '%'";
        if (!string.IsNullOrEmpty(req.TrichYeuHoSo))
            where += $" AND {tableHoSos}.TrichYeuHoSo LIKE '%' + @TrichYeuHoSo + '%'";
        if (!string.IsNullOrEmpty(req.GroupCode))
            where += $" AND {tableHoSos}.DonViId = @GroupCode";
        if (!string.IsNullOrEmpty(req.NgayTraFrom))
            where += $" AND {tableHoSos}.NgayTra >= @NgayTraFrom";
        if (!string.IsNullOrEmpty(req.NgayTraTo))
            where += $" AND {tableHoSos}.NgayTra <= @NgayTraTo";
        if (!string.IsNullOrEmpty(req.MaTrangThai))
            where += $" AND {tableHoSos}.TrangThaiHoSoId = @MaTrangThai";
        if (req.NopHoSoTuNgay.HasValue) where += $" AND {tableHoSos}.NgayNopHoSo >= @NopHoSoTuNgay ";
        if (req.NopHoSoDenNgay.HasValue) where += $" AND {tableHoSos}.NgayNopHoSo <= @NopHoSoDenNgay ";
        if (req.TraKqWithItemCode == true)
        {
            where += $" AND {tableMaVanDon}.Ma IS NOT NULL ";
        }
        else if (req.TraKqWithItemCode == false)
        {
            where += $" AND {tableMaVanDon}.Ma IS NULL ";
        }

        if (req.DangKyBuuDienTuNgay.HasValue) where += $" AND {tableHoSos}.NgayDangKyBuuDien >= @DangKyBuuDienTuNgay ";
        if (req.DangKyBuuDienDenNgay.HasValue) where += $" AND {tableHoSos}.NgayDangKyBuuDien <= @DangKyBuuDienDenNgay ";

        if (req.TiepNhanFrom.HasValue) where += $" AND {tableHoSos}.NgayTiepNhan >= @TiepNhanFrom ";
        if (req.TiepNhanTo.HasValue) where += $" AND {tableHoSos}.NgayTiepNhan <= @TiepNhanTo ";


        if (req.TraKqBuuDienTuNgay.HasValue) where += $" AND {tableHoSos}.NgayTraBuuDien >= @TraKqBuuDienTuNgay ";
        if (req.TraKqBuuDienDenNgay.HasValue) where += $" AND {tableHoSos}.NgayTraBuuDien <= @TraKqBuuDienDenNgay ";
        if (req.Removed == false)
            where += $" AND {tableHoSos}.DeletedOn is null";
        else if (req.Removed == true)
            where += $" AND {tableHoSos}.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchHoSoCanBoBCCIHandler : IRequestHandler<SearchHoSoCanBoBCCIRequest, PaginationResponse<HoSoDto>>
{
    private readonly string tableHoSos = "[Business].[HoSos]";
    private readonly string tableMaVanDon = "[Catalog].[MaVanDonBuuDiens]";
    private readonly string tableLogDGHL = "[Business].[LogThongKeDGHLCongDans]";
    private readonly string tablePhieuKhaoSat = "[Business].[PhieuKhaoSats]";
    private readonly string tableTrangThaiHoSo = "[Business].[TrangThaiHoSos]";
    private readonly string tableTruongHopThuTuc = "[Business].[TruongHopThuTucs]";
    private readonly string tableGiayToHoSo = "[Business].[GiayToHoSos]";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _currentUser;
    public SearchHoSoCanBoBCCIHandler(IDapperRepository dapperRepository, IUserService currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<PaginationResponse<HoSoDto>> Handle(SearchHoSoCanBoBCCIRequest request, CancellationToken cancellationToken)
    {
        var user = await _currentUser.GetCurrentUserAsync(cancellationToken);
        var where = SearchHoSoCanBoBCCIWhereBuilder.Build(request);
        string sql = $"SELECT DISTINCT {tableHoSos}.Id,{tableHoSos}.ChuHoSo, {tableHoSos}.SoDienThoaiChuHoSo, {tableHoSos}.EmailChuHoSo,{tableHoSos}.SoGiayToChuHoSo ,{tableHoSos}.TrangThaiHoSoId, {tableHoSos}.TrichYeuHoSo, " +
            $"{tableHoSos}.NgayTiepNhan, {tableHoSos}.NgayHenTra, {tableHoSos}.NgayTraBuuDien , {tableHoSos}.NgayDangKyBuuDien, {tableHoSos}.DangKyNhanHoSoQuaBCCIData " +
            $",{tableHoSos}.CreatedOn, {tableHoSos}.MaHoSo, {tableMaVanDon}.Ma MaVanDonBuuDien FROM {tableHoSos} " +
            $"LEFT JOIN {tableMaVanDon} ON {tableMaVanDon}.HoSo = {tableHoSos}.MaHoSo " +
            $" {where} ";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoDto>(sql, request.PageSize, "CreatedOn Desc", cancellationToken, request.PageNumber, new
        {
            request.MaHoSo,
            request.MaLinhVucChinh,
            request.TiepNhanTo,
            request.TiepNhanFrom,
            request.HoSoToiHan,
            request.HenTraFrom,
            request.HenTraTo,
            request.NgayTraFrom,
            request.NgayTraTo,
            CurrentUser = user.Id.ToString(),
            NguoiGui = user.SoDinhDanh,
            request.MaTrangThai,
            request.NotInMaTrangThais,
            request.InMaTrangThais,
            request.NguoiDaXuLy,
            request.NguoiXuLyTruoc,
            request.GroupCode,
            request.HinhThucTra,
            request.KenhThucHien,
            request.NotEqKenhThucHien,
            request.NguoiNhanHoSo,
            request.TenTTHC,
            request.TrangThaiBoSung,
            request.TrangThaiTheoDoiHoSo,
            request.TrangThaiThuPhi,
            request.TrangThaiTraKq,
            request.DonViTraKq,
            request.SearchKeys,
            request.SoKyHieuTrichYeu,
            request.SoGiayToChuHoSo,
            request.TinhThanhDiaBan,
            request.MaTruongHop,
            request.MaTTHC,
            request.DangKyBuuDienDenNgay,
            request.DangKyBuuDienTuNgay,
            request.DangKyQuaBuuDien,
            request.TraKqBuuDienTuNgay,
            request.TraKqBuuDienDenNgay,
            request.ChuHoSo,
            request.NguoiUyQuyen,
            request.SoDienThoaiChuHoSo,
            request.SoDienThoaiNguoiUyQuyen,
            request.TrichYeuHoSo,
            QuanHuyenDiaBan = request.TinhThanhDiaBan + "." + request.QuanHuyenDiaBan,
            XaPhuongDiaBan = request.TinhThanhDiaBan + "." + request.QuanHuyenDiaBan + "." + request.XaPhuongDiaBan
        });
        return data;
    }
}
