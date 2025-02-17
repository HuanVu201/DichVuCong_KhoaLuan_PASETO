using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchHoSoTheoThongKe06CacCap;
public class SearchHoSoTheoThongKe06CacCapHandler : IRequestHandler<SearchHoSoTheoThongKe06CacCapRequest, PaginationResponse<HoSoDto>>
{

    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string yeuCauThanhToanTableName = "Business.YeuCauThanhToans";
    private readonly IDapperRepository _dapperRepository;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    public SearchHoSoTheoThongKe06CacCapHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    }
    public async Task<PaginationResponse<HoSoDto>> Handle(SearchHoSoTheoThongKe06CacCapRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        string where = string.Empty;
        if (!string.IsNullOrEmpty(request.Catalog) && string.IsNullOrEmpty(request.MaDinhDanhCha)) where += $" AND {groupTableName}.Catalog = @Catalog ";
        if (!string.IsNullOrEmpty(request.MaLinhVucChinh)) where += $" AND {thuTucTableName}.MaLinhVucChinh = @MaLinhVucChinh ";
        if (!string.IsNullOrEmpty(request.MaDonVi)) where += $" AND {hoSoTableName}.DonViId = @MaDonVi ";
        if (!string.IsNullOrEmpty(request.MaDinhDanh)) where += $" AND {groupTableName}.MaDinhDanh = @MaDinhDanh ";
        if (!string.IsNullOrEmpty(request.MaTTHC)) where += $" AND {hoSoTableName}.MaTTHC = @MaTTHC ";
        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            if (request.ChiBaoGomDonViCon == true)
            {
                where += $" AND ({groupTableName}.MaDinhDanh Like @MaDinhDanhCha +'%' AND {groupTableName}.MaDinhDanh != @MaDinhDanhCha) ";
            }
            else
            {
                where += $" AND {groupTableName}.MaDinhDanh Like @MaDinhDanhCha +'%' ";
            }
        }
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);
        if (!string.IsNullOrEmpty(request.TieuChi))
        {
            var tmp = builder.where;
            var tmpSql = tmp.GetType().GetProperty(request.TieuChi).GetValue(tmp, null);
            if (tmpSql != null) where += $"AND {tmpSql}";
        }
        string sql = $"SELECT DISTINCT {hoSoTableName}.ID, {hoSoTableName}.ChuHoSo,{hoSoTableName}.DiaChiChuHoSo, {hoSoTableName}.SoDienThoaiChuHoSo, {hoSoTableName}.EmailChuHoSo, {hoSoTableName}.MaTruongHop, {hoSoTableName}.MaTTHC, {hoSoTableName}.TrangThaiHoSoId," +
            $"{hoSoTableName}.UyQuyen,{hoSoTableName}.[NguoiUyQuyen], {hoSoTableName}.NgayTiepNhan, {hoSoTableName}.NgayHenTra,{hoSoTableName}.NgayTra, {hoSoTableName}.CreatedOn, {hoSoTableName}.MaHoSo, {hoSoTableName}.KenhThucHien, {thuTucTableName}.TenTTHC, " +
            $"{groupTableName}.GroupName as TenDonVi, {hoSoTableName}.NgayNopHoSo, {hoSoTableName}.SoGiayToChuHoSo,{thuTucTableName}.MaLinhVucChinh, {hoSoTableName}.[NgayKetThucXuLy] " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {thuTucTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
            $"INNER JOIN {groupTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupTableName}.GroupCode ";
        sql += $"WHERE {hoSoTableName}.DeletedOn IS NULL AND (({builder.where.TiepNhanKyTruoc}) OR ({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) " +
            $"AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoDto>(sql, request.PageSize, "CreatedOn Desc", cancellationToken, request.PageNumber, new
        {
            request.MaDinhDanh,
            request.MaLinhVucChinh,
            request.MaDinhDanhCha,
            request.MaDonVi,
            request.Catalog,
            request.MaTTHC,
            TuNgay = tuNgay,
            DenNgay = denNgay
        });
        return data;
    }
}