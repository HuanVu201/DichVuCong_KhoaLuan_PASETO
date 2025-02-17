using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Constant;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
using TD.DichVuCongApi.Domain.Business.Events;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchHoSoXinRutTraLai;
public class SearchHoSoXinRutTraLaiQueryHandler : IRequestHandler<SearhHoSoXinRutTraLaiQuery, PaginationResponse<HoSoTraLaiXinRutDto>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string duThaoHoSoTableName = "[Business].[DuThaoXuLyHoSos]";
    private readonly string ycttTableName = "Business.YeuCauThanhToans";
    private readonly string duThaoTableName = "Business.DuThaoXuLyHoSos";
    private readonly IDapperRepository _dapperRepository;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public SearchHoSoXinRutTraLaiQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();

    }

    public async Task<PaginationResponse<HoSoTraLaiXinRutDto>> Handle(SearhHoSoXinRutTraLaiQuery request, CancellationToken cancellationToken)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(request.Catalog))
            if (request.Catalog.ToLower() == "total") where += $" AND {groupTableName}.Catalog IS NOT NULL "; else where += $" AND {groupTableName}.Catalog = @Catalog ";
        if (!string.IsNullOrEmpty(request.MaDonVi)) where += $" AND {hoSoTableName}.DonViId = @MaDonVi ";
        if (!string.IsNullOrEmpty(request.DonViQuanLy)) where += $" AND ({groupTableName}.DonViQuanLy = @DonViQuanLy OR {groupTableName}.GroupCode = @DonViQuanLy) ";
        if (!string.IsNullOrEmpty(request.TrangThaiThanhToan)) where += $" AND ({ycttTableName}.TrangThai = @TrangThaiThanhToan) ";
        if (!string.IsNullOrEmpty(request.HinhThucThuPhi)) where += $" AND ({ycttTableName}.HinhThucThu = @HinhThucThuPhi) ";
        if (request.TuNgay.HasValue)
        {
            var tuNgay = new DateTime(request.TuNgay.Value.Year, request.TuNgay.Value.Month, request.TuNgay.Value.Day, 0, 0, 1);
            where += $"AND {hoSoTableName}.[NgayTiepNhan] >= '{tuNgay}' ";
        }
        if (request.DenNgay.HasValue)
        {
            var denNgay = new DateTime(request.DenNgay.Value.Year, request.DenNgay.Value.Month, request.DenNgay.Value.Day, 23, 59, 59);
            where += $"AND {hoSoTableName}.[NgayTiepNhan] <= '{denNgay}' ";
        }

        if (request.TraLaiTuNgay.HasValue)
        {
            var traLaiTuNgay = new DateTime(request.TraLaiTuNgay.Value.Year, request.TraLaiTuNgay.Value.Month, request.TraLaiTuNgay.Value.Day, 0, 0, 1);
            where += $"AND {hoSoTableName}.[NgayKetThucXuLy] >= '{traLaiTuNgay}' ";
        }
        if (request.TraLaiDenNgay.HasValue)
        {
            var traLaiDenNgay = new DateTime(request.TraLaiDenNgay.Value.Year, request.TraLaiDenNgay.Value.Month, request.TraLaiDenNgay.Value.Day, 23, 59, 59);
            where += $"AND {hoSoTableName}.[NgayKetThucXuLy] <= '{traLaiDenNgay}' ";
        }
        if (request.YeuCauBoSungTuNgay.HasValue)
        {
            var traLaiTuNgay = new DateTime(request.YeuCauBoSungTuNgay.Value.Year, request.YeuCauBoSungTuNgay.Value.Month, request.YeuCauBoSungTuNgay.Value.Day, 0, 0, 1);
            where += $"AND {hoSoTableName}.[NgayYeuCauBoSung] >= '{traLaiTuNgay}' ";
        }
        if (request.YeuCauBoSungDenNgay.HasValue)
        {
            var traLaiDenNgay = new DateTime(request.YeuCauBoSungDenNgay.Value.Year, request.YeuCauBoSungDenNgay.Value.Month, request.YeuCauBoSungDenNgay.Value.Day, 23, 59, 59);
            where += $"AND {hoSoTableName}.[NgayYeuCauBoSung] <= '{traLaiDenNgay}' ";
        }
        if (request.Loai == DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut)
        {
            where += $" AND {hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY}) AND {hoSoTableName}.LoaiKetQua = N'{DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut}' ";
        }
        else if (request.Loai == DuThaoXuLyHoSoConstant.Loai_BoSung)
        {
            where += $" AND {hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG})";
        }
        if (request.LoaiDoiTuong == LoaiChuHoSoConstant.CongDan)
        {
            where += $" AND hs.LoaiDoiTuong != N'{LoaiChuHoSoConstant.DoanhNghiep}' AND hs.LoaiDoiTuong != N'{LoaiChuHoSoConstant.CoQuanNhaNuoc}' ";
        }
        else if (!string.IsNullOrEmpty(request.LoaiDoiTuong))
        {
            where += $" AND hs.LoaiDoiTuong = @LoaiDoiTuong ";
        }
        if (!string.IsNullOrEmpty(request.TrangThaiHoSoId))
        {
            where += $" AND hs.TrangThaiHoSoId = CAST(@TrangThaiHoSoId AS VARCHAR(20)) ";
        }
        string sql = $"SELECT DISTINCT {hoSoTableName}.ID, {hoSoTableName}.ChuHoSo, {hoSoTableName}.SoDienThoaiChuHoSo, {hoSoTableName}.EmailChuHoSo, {hoSoTableName}.TrichYeuHoSo, {hoSoTableName}.MaTruongHop, {hoSoTableName}.MaTTHC, {hoSoTableName}.TrangThaiHoSoId," +
            $"{hoSoTableName}.UyQuyen, {hoSoTableName}.NgayTiepNhan, {hoSoTableName}.NgayHenTra,{hoSoTableName}.NgayTra, {hoSoTableName}.CreatedOn, {hoSoTableName}.MaHoSo, {hoSoTableName}.KenhThucHien, {thuTucTableName}.TenTTHC, {hoSoTableName}.LyDoBoSung, " +
            $"{groupTableName}.GroupName as TenDonVi, {hoSoTableName}.NgayNopHoSo, {hoSoTableName}.SoGiayToChuHoSo,{thuTucTableName}.MaLinhVucChinh, {thuTucTableName}.trangThaiPhiLePhi, {ycttTableName}.TrangThai as TrangThaiThuPhi, {duThaoTableName}.TrichYeu LyDoTraLaiXinRut, {hoSoTableName}.NgayKetThucXuLy " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {thuTucTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
            $"INNER JOIN {groupTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupTableName}.GroupCode " +
            $"LEFT JOIN {duThaoHoSoTableName} ON {duThaoHoSoTableName}.[MaHoSo] = {hoSoTableName}.MaHoSo " +
            $"INNER JOIN {ycttTableName} " +
            $"ON {ycttTableName}.MaHoSo = {hoSoTableName}.MaHoSo " +
            //$"INNER JOIN {duThaoTableName} " +
            //$"ON {duThaoTableName}.MaHoSo = {hoSoTableName}.MaHoSo " +
            $"WHERE  {hoSoTableName}.DeletedOn IS NULL AND {thuTucTableName}.DeletedOn IS NULL  " +
            $" {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoTraLaiXinRutDto>(sql, request.PageSize, "NgayKetThucXuLy Desc, NgayTiepNhan DESC", cancellationToken, request.PageNumber, new
        {
            request.MaDonVi,
            request.Catalog,
            request.DonViQuanLy,
            request.TrangThaiThanhToan,
            request.HinhThucThuPhi,
            request.LoaiDoiTuong,
            request.TrangThaiHoSoId
        });
        return data;
    }
}
