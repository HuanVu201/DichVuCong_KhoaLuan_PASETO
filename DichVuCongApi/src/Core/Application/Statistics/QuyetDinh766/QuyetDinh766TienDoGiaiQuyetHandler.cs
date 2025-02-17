using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
public class QuyetDinh766TienDoGiaiQuyetHandler : IRequestHandler<QuyetDinh766TienDoGiaiQuyetRequest, QuyetDinh766Response<QuyetDinh766TienDoGiaiQuyetElementResponse>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly string yeuCauThanhToanTableName = "Business.YeuCauThanhToans";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    public QuyetDinh766TienDoGiaiQuyetHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    }
    private async Task<List<QuyetDinh766TienDoGiaiQuyetElementResponse>> GetBaoCaoTongHop(QuyetDinh766TienDoGiaiQuyetRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        List<QuyetDinh766TienDoGiaiQuyetElementResponse> result = new List<QuyetDinh766TienDoGiaiQuyetElementResponse>();
        string where = string.Empty;
        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
            where += $" AND MaDinhDanh Like @MaDinhDanhCha +'%'";
       
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);
        string boSungWhere = $"{hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}) AND ({hoSoTableName}.NgayYeuCauBoSung <= '{denNgay}' OR {hoSoTableName}.NgayYeuCauBoSung IS NULL)";

        string traLaiWhere = $"{hoSoTableName}.NgayTiepNhan <= '{denNgay}' " +
            $"AND {hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) " +
            $"AND {hoSoTableName}.NgayTra >= '{tuNgay}' " +
            $"AND {hoSoTableName}.NgayTra <= '{denNgay}'";
        string tiepNhanKyTruocWhere = $"(({hoSoTableName}.NgayTiepNhan < '{tuNgay}' AND {hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DANG_XU_LY},{_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}))" +
       $"OR " +
       $"({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY},{_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) AND {hoSoTableName}.NgayTra > '{tuNgay}'  AND {hoSoTableName}.NgayTiepNhan < '{tuNgay}'))" +
       $"AND ({hoSoTableName}.NgayTiepNhan IS NOT NULL" +
       $")";
        string tiepNhanTrucTiep = $"{hoSoTableName}.NgayTiepNhan >= '{tuNgay}' AND {hoSoTableName}.NgayTiepNhan <= '{denNgay}' AND {hoSoTableName}.KenhThucHien = '1'";
        string tiepNhanQuaMang = $"{hoSoTableName}.NgayTiepNhan >= '{tuNgay}' AND {hoSoTableName}.NgayTiepNhan <= '{denNgay}' AND {hoSoTableName}.KenhThucHien = '2'";
        string tiepNhanBCCI = $"{hoSoTableName}.NgayTiepNhan >= '{tuNgay}' AND {hoSoTableName}.NgayTiepNhan <= '{denNgay}' AND {hoSoTableName}.KenhThucHien = '3'";
        string daXuLyWhere = $"{hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY}) AND {hoSoTableName}.NgayTra >= '{tuNgay}' AND {hoSoTableName}.NgayTra <= '{denNgay}'";

        string daXuLyDungHanWhere = $"{daXuLyWhere} AND {hoSoTableName}.NgayTra <= {hoSoTableName}.NgayHenTra";
        string daXuLyQuaHanWhere = $"{daXuLyWhere} AND {hoSoTableName}.NgayTra > {hoSoTableName}.NgayHenTra";
        string daXuLyTrucTuyenWhere = $"(({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY}) " +
            $"AND {hoSoTableName}.NgayTra >= '{tuNgay}' AND {hoSoTableName}.NgayTra <= '{denNgay}') OR  ({traLaiWhere})) AND {hoSoTableName}.KenhThucHien = '2'";

        string daXuLyTrucTuyenDungHanWhere = $"{daXuLyTrucTuyenWhere} AND {hoSoTableName}.NgayTra <= {hoSoTableName}.NgayHenTra";
        string daXuLyTrucTuyenQuaHanWhere = $"{daXuLyTrucTuyenWhere} AND {hoSoTableName}.NgayTra > {hoSoTableName}.NgayHenTra";

        string dangXuLyWhere = $"{hoSoTableName}.NgayTiepNhan <= '{denNgay}' " +
            $"AND (" +
            $"{hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DANG_XU_LY}) " +
            $"OR " +
            $"({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY},{_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) AND {hoSoTableName}.NgayTra > '{denNgay}') " +
            $"OR " +
            $"({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}) AND {hoSoTableName}.NgayYeuCauBoSung > '{denNgay}')" +
            $")";
        string dangXuLyTrongHanWhere = $"{dangXuLyWhere} AND ( {hoSoTableName}.NgayHenTra >= '{denNgay}'  OR {hoSoTableName}.NgayHenTra IS NULL )";
        string dangXuLyQuaHanWhere = $"{dangXuLyWhere} AND {hoSoTableName}.NgayHenTra < '{denNgay}'";
        string tongCoNghiaVuTaiChinh = $"{yeuCauThanhToanTableName}.Ma IS NOT NULL";
        string tongDaTTTTQuaDvcqg = $"{yeuCauThanhToanTableName}.Ma IS NOT NULL AND {yeuCauThanhToanTableName}.TrangThai = 'Đã thanh toán' AND {yeuCauThanhToanTableName}.HinhThucThanhToan = 'DVC'";

        string totalWhere = $"WHERE ({dangXuLyWhere}) OR ({daXuLyWhere}) {where}";


        string sql = $"SELECT {hoSoTableName}.DonViId MaThongKe, " +
            $"COUNT({hoSoTableName}.Id) TongSo, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanKyTruoc}) THEN {hoSoTableName}.Id END) TiepNhanKyTruoc," +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaMang}) THEN {hoSoTableName}.Id END) TiepNhanQuaMang, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanTrucTiep}) THEN {hoSoTableName}.Id END) TiepNhanTrucTiep, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaBCCI}) THEN {hoSoTableName}.Id END) TiepNhanBCCI, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLy}) THEN {hoSoTableName}.Id END) TongDaXuLy, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyDungHan}) THEN {hoSoTableName}.Id END) DaXuLyDungHan, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyQuaHan}) THEN {hoSoTableName}.Id END) DaXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({daXuLyTrucTuyenWhere}) THEN {hoSoTableName}.Id END) TongDaXuLyTrucTuyen, " +
            $"COUNT(CASE WHEN ({daXuLyTrucTuyenDungHanWhere}) THEN {hoSoTableName}.Id END) DaXuLyTrucTuyenDungHan, " +
            $"COUNT(CASE WHEN ({daXuLyTrucTuyenQuaHanWhere}) THEN {hoSoTableName}.Id END) DaXuLyTrucTuyenQuaHan, " +
            $"COUNT(CASE WHEN ({dangXuLyWhere}) THEN {hoSoTableName}.Id END) TongDangXuLy, " +
            $"COUNT(CASE WHEN ({dangXuLyTrongHanWhere}) THEN {hoSoTableName}.Id END) DangXuLyTrongHan, " +
            $"COUNT(CASE WHEN ({dangXuLyQuaHanWhere}) THEN {hoSoTableName}.Id END) DangXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({tongCoNghiaVuTaiChinh}) THEN {hoSoTableName}.Id END) TongCoNghiaVuTaiChinh, " +
            $"COUNT(CASE WHEN ({tongDaTTTTQuaDvcqg}) THEN {hoSoTableName}.Id END) DaTTTTQuaDvcqg " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {groupTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupTableName}.GroupCode " +
            $"LEFT JOIN {yeuCauThanhToanTableName} " +
            $"ON {hoSoTableName}.MaHoSo = {yeuCauThanhToanTableName}.MaHoSo " +
            $"{totalWhere} " +
            $"GROUP BY {hoSoTableName}.DonViId";
        var resBaoCao = await _dapperRepository.QueryAsync<QuyetDinh766TienDoGiaiQuyetElementResponse>(sql,request,null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.OfGroupCode = request.MaDonViCha;
        queryGroups.PageNumber = request.PageNumber;
        queryGroups.PageSize = request.PageSize;
        queryGroups.Catalog = request.Catalog;
        queryGroups.Type = request.Type;
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            QuyetDinh766TienDoGiaiQuyetElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.MaDinhDanh = group.MaDinhDanh;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }
            else
            {
                res = new QuyetDinh766TienDoGiaiQuyetElementResponse();
                res.MaDinhDanh = group.MaDinhDanh;
                res.MaThongKe = group.GroupCode;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }
            result.Add(res);
        }
        return result;
    }
    public async Task<QuyetDinh766Response<QuyetDinh766TienDoGiaiQuyetElementResponse>> Handle(QuyetDinh766TienDoGiaiQuyetRequest request, CancellationToken cancellationToken)
    {
        List<QuyetDinh766TienDoGiaiQuyetElementResponse> result = await GetBaoCaoTongHop(request, cancellationToken);

        return new QuyetDinh766Response<QuyetDinh766TienDoGiaiQuyetElementResponse>(result);
    }
}
