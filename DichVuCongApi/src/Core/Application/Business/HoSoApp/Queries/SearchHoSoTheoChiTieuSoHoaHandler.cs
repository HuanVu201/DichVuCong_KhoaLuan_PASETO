using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuSoHoa;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchHoSoTheoChiTieuSoHoaHandler : IRequestHandler<SearchHoSoTheoChiTieuSoHoaRequest, PaginationResponse<HoSoDto>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string thanhPhanHoSosTableName = "[Business].[ThanhPhanHoSos]";
    private readonly IDapperRepository _dapperRepository;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public SearchHoSoTheoChiTieuSoHoaHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();

    }
    public async Task<PaginationResponse<HoSoDto>> Handle(SearchHoSoTheoChiTieuSoHoaRequest request, CancellationToken cancellationToken)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(request.Catalog))
            if (request.Catalog.ToLower() == "total") where += $" AND {groupTableName}.Catalog IS NOT NULL "; else where += $" AND {groupTableName}.Catalog = @Catalog ";
        if (!string.IsNullOrEmpty(request.MaDonVi)) where += $" AND {hoSoTableName}.DonViId = @MaDonVi ";
        if (!string.IsNullOrEmpty(request.SearchKeys))
            where += $" AND ({hoSoTableName}.MaHoSo LIKE '%' + @SearchKeys + '%' OR {hoSoTableName}.ChuHoSo LIKE '%' + @SearchKeys + '%')";
        if (!string.IsNullOrEmpty(request.SoDienThoaiChuHoSo))
            where += $" AND {hoSoTableName}.SoDienThoaiChuHoSo LIKE '%' + @SoDienThoaiChuHoSo + '%'";
        if (!string.IsNullOrEmpty(request.SoDienThoaiNguoiUyQuyen))
            where += $" AND {hoSoTableName}.SoDienThoaiNguoiUyQuyen LIKE '%' + @SoDienThoaiNguoiUyQuyen + '%'";
        if (!string.IsNullOrEmpty(request.ChuHoSo))
            where += $" AND {hoSoTableName}.ChuHoSo LIKE '%' + @ChuHoSo + '%'";
        if (!string.IsNullOrEmpty(request.NguoiUyQuyen))
            where += $" AND {hoSoTableName}.NguoiUyQuyen LIKE '%' + @NguoiUyQuyen + '%'";
        if (!string.IsNullOrEmpty(request.HoSoTaiKhoan))
            where += $" AND ( NguoiDangXuLy LIKE '%' + @HoSoTaiKhoan + '%' Or NguoiNhanHoSo LIKE '%' + @HoSoTaiKhoan + '%' Or NguoiDaXuLy LIKE '%' + @HoSoTaiKhoan + '%' Or NguoiXuLyTiep LIKE '%' +  @HoSoTaiKhoan + '%' Or NguoiXuLyTruoc LIKE '%' +  @HoSoTaiKhoan + '%')";
        if (!string.IsNullOrEmpty(request.TrichYeuHoSo))
            where += $" AND {hoSoTableName}.TrichYeuHoSo LIKE '%' + @TrichYeuHoSo + '%'";
        if (!string.IsNullOrEmpty(request.MaHoSoLienThong))
            where += $" AND {hoSoTableName}.MaHoSoKhac LIKE '%' + @MaHoSoLienThong + '%'";
        if (!string.IsNullOrEmpty(request.SoKyHieuKetQua))
            where += $" AND {hoSoTableName}.SoKyHieuKetQua LIKE '%' + @SoKyHieuKetQua + '%'";
        if (!string.IsNullOrEmpty(request.MaHoSo))
            where += $" AND {hoSoTableName}.MaHoSo LIKE '%' + @MaHoSo + '%'";
        if (request.TuNgay.HasValue)
        {
            DateTime tuNgay = new DateTime(request.TuNgay.Value.Year, request.TuNgay.Value.Month, request.TuNgay.Value.Day, 0, 0, 1);
            where += $" AND {hoSoTableName}.NgayTiepNhan >= '{tuNgay}' ";
        }
        if (request.DenNgay.HasValue)
        {
            DateTime denNgay = new DateTime(request.DenNgay.Value.Year, request.DenNgay.Value.Month, request.DenNgay.Value.Day, 23, 59, 59);
            where += $" AND {hoSoTableName}.NgayTiepNhan <= '{denNgay}' ";
        }
        QuyetDinh766ChiTieuSoHoaWhereBuilder builder = new QuyetDinh766ChiTieuSoHoaWhereBuilder(hoSoTableName);

        if (!string.IsNullOrEmpty(request.TieuChi))
        {
            var tmpSql = builder.GetType().GetProperty(request.TieuChi).GetValue(builder, null);
            if (tmpSql != null) where += $"AND {tmpSql}";
        }

        string sql = $"SELECT DISTINCT {hoSoTableName}.ID, {hoSoTableName}.ChuHoSo, {hoSoTableName}.SoDienThoaiChuHoSo, {hoSoTableName}.EmailChuHoSo, {hoSoTableName}.MaTruongHop, {hoSoTableName}.MaTTHC, {hoSoTableName}.TrangThaiHoSoId," +
            $"{hoSoTableName}.UyQuyen, {hoSoTableName}.NgayTiepNhan, {hoSoTableName}.NgayHenTra,{hoSoTableName}.NgayTra, {hoSoTableName}.CreatedOn, {hoSoTableName}.MaHoSo, {hoSoTableName}.KenhThucHien, {thuTucTableName}.TenTTHC, " +
            $"{groupTableName}.GroupName as TenDonVi, {hoSoTableName}.NgayNopHoSo, {hoSoTableName}.SoGiayToChuHoSo,{thuTucTableName}.MaLinhVucChinh,{hoSoTableName}.DiaChiChuHoSo " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {thuTucTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
            $"INNER JOIN {groupTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupTableName}.GroupCode " +
            $"LEFT JOIN {thanhPhanHoSosTableName} " +
            $"ON {thanhPhanHoSosTableName}.HoSo = {hoSoTableName}.MaHoSo AND {thanhPhanHoSosTableName}.DeletedOn IS NULL " +
            $"WHERE {hoSoTableName}.DeletedOn IS Null AND {hoSoTableName}.TrangThaiHoSoId IN ({builder.TRANG_THAI_TIEP_NHAN}) {where}  ";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoDto>(sql, request.PageSize, "CreatedOn Desc", cancellationToken, request.PageNumber, new
        {
            request.MaDonVi,
            request.Catalog,
            request.SoDienThoaiChuHoSo,
            request.SearchKeys,
            request.SoDienThoaiNguoiUyQuyen,
            request.ChuHoSo,
            request.NguoiUyQuyen,
            request.HoSoTaiKhoan,
            request.TrichYeuHoSo,
            request.MaHoSoLienThong,
            request.SoKyHieuKetQua,
            request.MaHoSo

        });
        return data;
    }
}
