using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Queries;

public class SearchGiaoDichThanhToanQueryWhereBuilder
{
    public static string Build(SearchGiaoDichThanhToanQuery req)
    {
        string giaoDichThanhToantable = "Business.GiaoDichThanhToans";
        string groupTable = "[Catalog].[Groups]";
        string where = string.Empty;

        if (!string.IsNullOrEmpty(req.MaDonVi))
            where += $" AND {giaoDichThanhToantable}.MaDonVi Like N'%' + @MaDonVi + '%'";
        if (!string.IsNullOrEmpty(req.HoSo))
            where += $" AND {giaoDichThanhToantable}.HoSo = @HoSo";
        if (!string.IsNullOrEmpty(req.TrangThai))
            where += $" AND {giaoDichThanhToantable}.TrangThai = @TrangThai";
        if (!string.IsNullOrEmpty(req.DonViQuanLy))
            where += $" AND {groupTable}.DonViQuanLy = @DonViQuanLy";
        if (!string.IsNullOrEmpty(req.MaThuTucDVCQG))
            where += $" AND {giaoDichThanhToantable}.MaThuTucDVCQG Like N'%' + @MaThuTucDVCQG + '%'";
        if (req.AutoChecked == false)
            where += $" AND ({giaoDichThanhToantable}.AutoCheckedTrangThaiTTTT = 0 OR {giaoDichThanhToantable}.AutoCheckedTrangThaiTTTT IS NULL) ";
        else if (req.AutoChecked == true)
            where += $" AND {giaoDichThanhToantable}.AutoCheckedTrangThaiTTTT = 1 ";
        if (req.Removed == false)
            where += $" AND {giaoDichThanhToantable}.DeletedOn is null";
        else if (req.Removed == true)
            where += $" AND {giaoDichThanhToantable}.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchGiaoDichThanhToanQueryHandler : IRequestHandler<SearchGiaoDichThanhToanQuery, PaginationResponse<GiaoDichThanhToanDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly string giaoDichThanhToantable = "Business.GiaoDichThanhToans";
    private readonly string groupTable = "[Catalog].[Groups]";
    public SearchGiaoDichThanhToanQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<GiaoDichThanhToanDto>> Handle(SearchGiaoDichThanhToanQuery request, CancellationToken cancellationToken)
    {
        var where = SearchGiaoDichThanhToanQueryWhereBuilder.Build(request);
        if (request.TuNgay.HasValue)
        {
            string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd 00:00:01");
            where += $" AND {giaoDichThanhToantable}.ThoiGianGD >= '{tuNgay}' ";
        }
        if (request.TuNgay.HasValue)
        {
            string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
            where += $" AND {giaoDichThanhToantable}.ThoiGianGD <= '{denNgay}' ";
        }

        var sql = $"SELECT {giaoDichThanhToantable}.ID, {giaoDichThanhToantable}.HoSo, {giaoDichThanhToantable}.YeuCauThanhToan, {giaoDichThanhToantable}.MaThamChieu," +
            $"{giaoDichThanhToantable}.SoTien,{giaoDichThanhToantable}.LoaiHinhThanhToan,{giaoDichThanhToantable}.MaKenhThanhToan, " +
            $"{giaoDichThanhToantable}.ThongTinGiaoDich,{giaoDichThanhToantable}.Ip,{giaoDichThanhToantable}.TKThuHuong, {giaoDichThanhToantable}.TenTKThuHuong, " +
            $"{giaoDichThanhToantable}.LoaiPhiLePhi, {giaoDichThanhToantable}.MaPhiLePhi,{giaoDichThanhToantable}.TenPhiLePhi,{giaoDichThanhToantable}.MaDonVi,{giaoDichThanhToantable}.TenDonVi," +
            $"{giaoDichThanhToantable}.MaThuTucDVCQG,{giaoDichThanhToantable}.MaDVCThuTucDVCQuocGia," +
            $"{giaoDichThanhToantable}.TenThuTucDVCQG,{giaoDichThanhToantable}.TenDVCThuTucDVCQuocGia,{giaoDichThanhToantable}.HoTenNguoiNop,{giaoDichThanhToantable}.SoCMNDNguoiNop," +
            $"{giaoDichThanhToantable}.DiaChiNguoiNop," +
            $"{giaoDichThanhToantable}.TrangThai, {giaoDichThanhToantable}.ThoiGianGD,{giaoDichThanhToantable}.NgayTao,{giaoDichThanhToantable}.MaGiaoDich,{giaoDichThanhToantable}.MaDoiTac," +
            $"{giaoDichThanhToantable}.LoaiBanTin,{giaoDichThanhToantable}.MaLoi,{giaoDichThanhToantable}.MaNganHang,{giaoDichThanhToantable}.ThoiGianGDThanhCong," +
            $"{giaoDichThanhToantable}.NgayCapNhatKetQua,{giaoDichThanhToantable}.DuongDanBienLai,{giaoDichThanhToantable}.BodyKetQua,{giaoDichThanhToantable}.ResponseDvcPayment," +
            $"{giaoDichThanhToantable}.DiaChiBienLai,{giaoDichThanhToantable}.NguoiNopTienBienLai,{giaoDichThanhToantable}.MaSoThueBienLai,{groupTable}.DonViQuanLy,{giaoDichThanhToantable}.CreatedOn  " +
            $"FROM {giaoDichThanhToantable} " +
            $"INNER JOIN {groupTable} " +
            $"ON {giaoDichThanhToantable}.MaDonVi = {groupTable}.GroupCode " +
            $" {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<GiaoDichThanhToanDto>(sql, request.PageSize, "HoSo, CreatedOn", cancellationToken, request.PageNumber, request);
        return data;
    }
}
