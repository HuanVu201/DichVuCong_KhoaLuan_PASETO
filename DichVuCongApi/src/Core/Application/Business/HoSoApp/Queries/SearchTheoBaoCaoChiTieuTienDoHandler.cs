using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuTienDo;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchTheoBaoCaoChiTieuTienDoHandler : IRequestHandler<SearchTheoBaoCaoChiTieuTienDoRequest, PaginationResponse<HoSoDto>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly IDapperRepository _dapperRepository;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public SearchTheoBaoCaoChiTieuTienDoHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    }

    public async Task<PaginationResponse<HoSoDto>> Handle(SearchTheoBaoCaoChiTieuTienDoRequest request, CancellationToken cancellationToken)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(request.Catalog))
            if (request.Catalog.ToLower() == "total") where += $" AND {groupTableName}.Catalog IS NOT NULL "; else where += $" AND {groupTableName}.Catalog = @Catalog ";
        if (!string.IsNullOrEmpty(request.MaDonVi)) where += $" AND {hoSoTableName}.DonViId = @MaDonVi ";
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new QuyetDinh766ChiTieuTienDoWhereBuilder(hoSoTableName);
        if (!string.IsNullOrEmpty(request.TieuChi))
        {
            var tmpSql = builder.GetType().GetProperty(request.TieuChi).GetValue(builder, null);
            if (tmpSql != null) where += $"AND {tmpSql}";
        }

        string sql = $"SELECT {hoSoTableName}.ID, {hoSoTableName}.ChuHoSo,{hoSoTableName}.NguoiUyQuyen, {hoSoTableName}.DiaChiChuHoSo, {hoSoTableName}.SoDienThoaiChuHoSo, {hoSoTableName}.EmailChuHoSo, {hoSoTableName}.MaTruongHop, {hoSoTableName}.MaTTHC, {hoSoTableName}.TrangThaiHoSoId," +
            $"{hoSoTableName}.UyQuyen, {hoSoTableName}.NgayTiepNhan, {hoSoTableName}.NgayHenTra,{hoSoTableName}.NgayTra, {hoSoTableName}.CreatedOn, {hoSoTableName}.MaHoSo, {hoSoTableName}.KenhThucHien, {thuTucTableName}.TenTTHC, " +
            $"{groupTableName}.GroupName as TenDonVi, {hoSoTableName}.NgayNopHoSo, {hoSoTableName}.SoGiayToChuHoSo,{thuTucTableName}.MaLinhVucChinh,{hoSoTableName}.NgayKetThucXuLy " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {thuTucTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
            $"INNER JOIN {groupTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupTableName}.GroupCode " +
            $"WHERE {hoSoTableName}.DeletedOn IS NULL  AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) {where} AND {builder.TotalWhere}  ";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoDto>(sql, request.PageSize, "CreatedOn Desc", cancellationToken, request.PageNumber, new
        {
            request.MaDonVi,
            request.Catalog,
            MotPhan = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN,
            ToanTrinh = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH,
            BCCI = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.BCCI,
            TrucTiep = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP,
            TrucTuyen = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN,
            TuNgay = tuNgay,
            DenNgay = denNgay
        });
        return data;
    }
}
