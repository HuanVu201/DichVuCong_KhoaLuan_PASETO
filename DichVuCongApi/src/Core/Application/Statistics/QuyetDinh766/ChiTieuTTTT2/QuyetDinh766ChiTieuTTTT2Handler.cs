using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;


namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuTTTT;
public class QuyetDinh766ChiTieuTTTT2Handler : IRequestHandler<QuyetDinh766ChiTieuTTTT2Request, QuyetDinh766Response<QuyetDinh766ChiTieuTTTT2Element>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    private readonly ICommonServices _commonServices;
    public QuyetDinh766ChiTieuTTTT2Handler(IDapperRepository dapperRepository, IMediator mediator, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _commonServices = commonServices;
    }
    private async Task<List<QuyetDinh766ChiTieuTTTT2Element>> GetThongKe(QuyetDinh766ChiTieuTTTT2Request request, CancellationToken cancellationToken)
    {
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        List<QuyetDinh766ChiTieuTTTT2Element> result = new List<QuyetDinh766ChiTieuTTTT2Element>();
        QuyetDinh766ChiTieuTTTT2WhereBuilder whereBuilder = new QuyetDinh766ChiTieuTTTT2WhereBuilder();
        string tuNgay = string.Empty;
        string denNgay = string.Empty;
        string where = $"WHERE {TablesName.YeuCauThanhToanTableName}.DeletedOn IS NULL AND {TablesName.YeuCauThanhToanTableName}.TrangThai = N'{_yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN}' ";
        if (request.TuNgay.HasValue)
        {
            tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
            where += $" AND {TablesName.YeuCauThanhToanTableName}.NgayThuPhi >= @TuNgay ";
        }
        if (request.DenNgay.HasValue)
        {
            denNgay = denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
            where += $" AND {TablesName.YeuCauThanhToanTableName}.NgayThuPhi <= @DenNgay ";
        }
        if (request.MucDos != null)
        {
            where += $" AND {hoSoTableName}.MucDo IN @MucDos ";
        }
        var baseWhere = new BaseStatisticsWhereBuilder(request);
        //if (!string.IsNullOrEmpty(request.Catalog)) where += $" AND {TablesName.GroupsTableName}.Catalog = @Catalog ";
        //if (!string.IsNullOrEmpty(request.MaDinhDanhCha)) where += $" AND {TablesName.GroupsTableName}.MaDinhDanh LIKE '%'+ @MaDinhDanhCha ";
        //if (!string.IsNullOrEmpty(request.MaDinhDanh)) where += $" AND {TablesName.GroupsTableName}.MaDinhDanh = '%'+ @MaDinhDanh ";
        string sql = $"SELECT {TablesName.YeuCauThanhToanTableName}.DonVi MaThongKe, " +
            $"COUNT(DISTINCT CASE WHEN {whereBuilder.HoSoDaThuPhi} THEN {TablesName.YeuCauThanhToanTableName}.MaHoSo END) HoSoDaThuPhi," +
            $"COUNT(DISTINCT CASE WHEN {whereBuilder.HoSoThuocDoiTuongMienPhi} THEN {TablesName.YeuCauThanhToanTableName}.MaHoSo END) HoSoThuocDoiTuongMienPhi," +
            $"COUNT(DISTINCT CASE WHEN {whereBuilder.HoSoDaThuPhiTrucTiep} THEN {TablesName.YeuCauThanhToanTableName}.MaHoSo END) HoSoDaThuPhiTrucTiep, " +
            $"COUNT(DISTINCT CASE WHEN {whereBuilder.HoSoDaThuPhiTrucTuyen} THEN {TablesName.YeuCauThanhToanTableName}.MaHoSo END) HoSoDaThuPhiTrucTuyen, " +
            $"SUM(CASE WHEN {whereBuilder.TongSoTienChuyenKhoan} THEN COALESCE(CAST({TablesName.YeuCauThanhToanTableName}.Phi AS BIGINT), 0) + COALESCE(CAST({TablesName.YeuCauThanhToanTableName}.LePhi AS BIGINT), 0) END) TongSoTienChuyenKhoan, " +
            $"SUM(CASE WHEN {whereBuilder.TongSoTienTienMat} THEN COALESCE(CAST({TablesName.YeuCauThanhToanTableName}.Phi AS BIGINT), 0) + COALESCE(CAST({TablesName.YeuCauThanhToanTableName}.LePhi AS BIGINT), 0) END) TongSoTienTienMat, " +
            $"SUM(CASE WHEN {whereBuilder.TongSoTienTrucTuyen} THEN COALESCE(CAST({TablesName.YeuCauThanhToanTableName}.Phi AS BIGINT), 0) + COALESCE(CAST({TablesName.YeuCauThanhToanTableName}.LePhi AS BIGINT), 0) END) TongSoTienTrucTuyen, " +
            $"SUM(COALESCE(CAST({TablesName.YeuCauThanhToanTableName}.Phi AS BIGINT), 0) + COALESCE(CAST({TablesName.YeuCauThanhToanTableName}.LePhi AS BIGINT), 0)) TongSoTien, " +
            $"SUM(COALESCE(CAST({TablesName.YeuCauThanhToanTableName}.Phi AS BIGINT), 0)) TongPhi, " +
            $"SUM(COALESCE(CAST({TablesName.YeuCauThanhToanTableName}.LePhi AS BIGINT), 0)) TongLePhi " +
            $"FROM {TablesName.YeuCauThanhToanTableName} " +
            $"INNER JOIN {hoSoTableName} ON {TablesName.YeuCauThanhToanTableName}.MaHoSo = {hoSoTableName}.MaHoSo " +
            $"INNER JOIN {TablesName.GroupsTableName} " +
            $"ON {TablesName.YeuCauThanhToanTableName}.DonVi = {TablesName.GroupsTableName}.GroupCode " +
            $"{where} {baseWhere.where} " +
            $"GROUP BY {TablesName.YeuCauThanhToanTableName}.DonVi";
        var resBaoCao = await _dapperRepository.QueryAsync<QuyetDinh766ChiTieuTTTT2Element>(sql, new { request.MaDinhDanhCha, request.Catalog, TuNgay = tuNgay, DenNgay = denNgay, request.MaDinhDanh, request.MucDos }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.PageNumber = 1;
        queryGroups.PageSize = 1000;
        queryGroups.Type = "don-vi";
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.DonViQuanLy = request.DonViQuanLy;
        queryGroups.Catalog = request.Catalog;
        queryGroups.CoThongKe = true;
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            QuyetDinh766ChiTieuTTTT2Element res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.MaDinhDanh = group.MaDinhDanh;
                res.MaThongKeCha = group.OfGroupCode;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;

            }
            else
            {
                res = new QuyetDinh766ChiTieuTTTT2Element();
                res.MaDinhDanh = group.MaDinhDanh;
                res.MaThongKe = group.GroupCode;
                res.MaThongKeCha = group.OfGroupCode;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;

            }
            result.Add(res);
        }
        return result;
    }
    public async Task<QuyetDinh766Response<QuyetDinh766ChiTieuTTTT2Element>> Handle(QuyetDinh766ChiTieuTTTT2Request request, CancellationToken cancellationToken)
    {
        List<QuyetDinh766ChiTieuTTTT2Element> result = await GetThongKe(request, cancellationToken);

        return new QuyetDinh766Response<QuyetDinh766ChiTieuTTTT2Element>(result);
    }
}
