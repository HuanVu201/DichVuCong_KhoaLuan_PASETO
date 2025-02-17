using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuDvcTrucTuyen;
public class QuyetDinh766ChiTieuDvcTrucTuyenHandler : IRequestHandler<QuyetDinh766ChiTieuDvcTrucTuyenRequest, QuyetDinh766Response<QuyetDinh766ChiTieuDvcTrucTuyenElement>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    private readonly ICommonServices _commonServices;
    public QuyetDinh766ChiTieuDvcTrucTuyenHandler(IDapperRepository dapperRepository, IMediator mediator, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _commonServices = commonServices;
    }

    private async Task<List<QuyetDinh766ChiTieuDvcTrucTuyenElement>> GetThongKe(QuyetDinh766ChiTieuDvcTrucTuyenRequest request, CancellationToken cancellationToken)
    {
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        List<QuyetDinh766ChiTieuDvcTrucTuyenElement> result = new List<QuyetDinh766ChiTieuDvcTrucTuyenElement>();
        string where = string.Empty;
        string whereDVTT = string.Empty;
        if (string.IsNullOrEmpty(request.Catalog) && string.IsNullOrEmpty(request.MaDinhDanh) && string.IsNullOrEmpty(request.MaDinhDanhCha)) throw new Exception("Vui lòng chọn đơn vị thống kê");
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  >= @TuNgay ";
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  <= @DenNgay ";
        BaseStatisticsWhereBuilder baseWhere = new BaseStatisticsWhereBuilder(request);
        whereDVTT = baseWhere.where;
        QuyetDinh766ChiTieuDVCTrucTuyenWhereBuilder whereBuilder = new QuyetDinh766ChiTieuDVCTrucTuyenWhereBuilder(hoSoTableName);
        string sqlTHHC = $"SELECT {TablesName.DonViThuTucsTableName}.DonViId MaThongKe, " +
            $"COUNT(DISTINCT {TablesName.DonViThuTucsTableName}.MaTTHC) TongSoThuTuc, " +
            $"COUNT(CASE WHEN {whereBuilder.ThuTucDvcTrucTuyen} THEN {TablesName.DonViThuTucsTableName}.MaTTHC END ) ThuTucDvcTrucTuyen, " +
            $"COUNT(CASE WHEN {whereBuilder.ThuTucDvcTrucTuyenMotPhan} THEN {TablesName.DonViThuTucsTableName}.MaTTHC END ) ThuTucMotPhan, " +
            $"COUNT(CASE WHEN {whereBuilder.ThuTucDvcTrucTuyenToanTrinh} THEN {TablesName.DonViThuTucsTableName}.MaTTHC END ) ThuTucToanTrinh, " +
            $"COUNT (CASE WHEN {whereBuilder.ThuTucDvc} THEN {TablesName.DonViThuTucsTableName}.MaTTHC END) ThuTucDvc " +
            $"FROM {TablesName.DonViThuTucsTableName} " +
            $"INNER JOIN {TablesName.ThuTucsTableName} " +
            $"ON {TablesName.DonViThuTucsTableName}.MaTTHC = {TablesName.ThuTucsTableName}.MaTTHC " +
            $"INNER JOIN {TablesName.GroupsTableName} ON {TablesName.GroupsTableName}.GroupCode = {TablesName.DonViThuTucsTableName}.DonViId " +
            $"WHERE {TablesName.DonViThuTucsTableName}.DeletedOn IS NULL {whereDVTT} " +
            $"GROUP BY {TablesName.DonViThuTucsTableName}.DonViId";
        string sqlHoSos = $"SELECT {hoSoTableName}.DonViId MaThongKe, " +
            $"COUNT ( DISTINCT CASE WHEN {whereBuilder.ThuTucPhatSinhHoSo} THEN {hoSoTableName}.MaTTHC END) ThuTucPhatSinhHoSo," +
            $"COUNT ( CASE WHEN {whereBuilder.TongHoSoPhatSinh}  THEN {hoSoTableName}.MaHoSo END) TongHoSoPhatSinh," +
            $"COUNT ( DISTINCT CASE WHEN {whereBuilder.ThuTucTrucTuyenPhatSinhHoSo} THEN {hoSoTableName}.MaTTHC END) ThuTucTrucTuyenPhatSinhHoSo," +
            $"COUNT ( CASE WHEN {whereBuilder.HoSoPhatSinhTrongThuTucTrucTuyen} THEN {hoSoTableName}.MaHoSo END) HoSoPhatSinhTrongThuTucTrucTuyen," +
            $"COUNT ( DISTINCT CASE WHEN {whereBuilder.HoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen} THEN {hoSoTableName}.MaHoSo END) HoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen, " +

            $"COUNT ( DISTINCT CASE WHEN {whereBuilder.ThuTucToanTrinhPhatSinhHoSo} THEN {hoSoTableName}.MaTTHC END) ThuTucToanTrinhPhatSinhHoSo," +
            $"COUNT ( CASE WHEN {whereBuilder.HoSoPhatSinhTrongThuTucToanTrinh} THEN {hoSoTableName}.MaHoSo END) HoSoPhatSinhTrongThuTucToanTrinh," +
            $"COUNT ( CASE WHEN {whereBuilder.HoSoPhatSinhTrucTuyenTrongThuTucToanTrinh} THEN {hoSoTableName}.MaHoSo END) HoSoPhatSinhTrucTuyenTrongThuTucToanTrinh, " +

            $"COUNT ( DISTINCT CASE WHEN {whereBuilder.ThuTucMotPhanPhatSinhHoSo} THEN {hoSoTableName}.MaTTHC END) ThuTucMotPhanPhatSinhHoSo," +
            $"COUNT ( CASE WHEN {whereBuilder.HoSoPhatSinhTrongThuTucMotPhan} THEN {hoSoTableName}.MaHoSo END) HoSoPhatSinhTrongThuTucMotPhan," +
            $"COUNT ( DISTINCT CASE WHEN {whereBuilder.HoSoPhatSinhTrucTuyenTrongThuTucMotPhan} THEN {hoSoTableName}.MaHoSo END) HoSoPhatSinhTrucTuyenTrongThuTucMotPhan, " +

            $"COUNT (DISTINCT CASE WHEN {whereBuilder.ThuTucDvcPhatSinhHoSo} THEN {hoSoTableName}.MaTTHC END) ThuTucDvcPhatSinhHoSo," +
            $"COUNT ( CASE WHEN {whereBuilder.HoSoPhatSinhTrongThuTucDvc} THEN {hoSoTableName}.MaHoSo END) HoSoPhatSinhTrongThuTucDvc " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {TablesName.ThuTucsTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {TablesName.ThuTucsTableName}.MaTTHC " +
            $"INNER JOIN {TablesName.DonViThuTucsTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {TablesName.DonViThuTucsTableName}.MaTTHC AND {hoSoTableName}.DonViId = {TablesName.DonViThuTucsTableName}.DonViId " +
            $"INNER JOIN {TablesName.GroupsTableName} ON {TablesName.GroupsTableName}.GroupCode = {hoSoTableName}.DonViId " +
            $"WHERE  {hoSoTableName}.DeletedOn IS NULL AND {TablesName.DonViThuTucsTableName}.DeletedOn IS NULL AND {TablesName.ThuTucsTableName}.DeletedOn IS NULL AND {TablesName.GroupsTableName}.DeletedOn IS NULL AND {hoSoTableName}.TrangThaiHoSoId IN ({whereBuilder.TRANG_THAI_TIEP_NHAN}) {where} {whereDVTT} " +
            $"GROUP BY {hoSoTableName}.DonViId";
        var resTTHCs = await _dapperRepository.QueryAsync<QuyetDinh766ChiTieuDvcTrucTuyenElement>(sqlTHHC, new { MaDinhDanh = request.MaDinhDanh, MaDinhDanhCha = request.MaDinhDanhCha, Catalog = request.Catalog, TuNgay = tuNgay, DenNgay = denNgay }, null, cancellationToken);
        var resBaoCao = await _dapperRepository.QueryAsync<QuyetDinh766ChiTieuDvcTrucTuyenElement>(sqlHoSos, new { MaDinhDanh = request.MaDinhDanh, MaDinhDanhCha = request.MaDinhDanhCha, Catalog = request.Catalog, TuNgay = tuNgay, DenNgay = denNgay }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        if (resTTHCs == null) throw new Exception("resTTHC not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.PageNumber = 1;
        queryGroups.PageSize = 1000;
        queryGroups.Type = "don-vi";
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.ChiBaoGomDonViCon = request.ChiBaoGomDonViCon;
        queryGroups.Catalog = request.Catalog;
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            QuyetDinh766ChiTieuDvcTrucTuyenElement res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            QuyetDinh766ChiTieuDvcTrucTuyenElement resTTHC = resTTHCs.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (resTTHC != null)
            {
                var tmpRes = resTTHC;
                if (res != null) resTTHC = res;
                resTTHC.MaDinhDanh = group.MaDinhDanh;
                resTTHC.MaThongKeCha = group.OfGroupCode;
                resTTHC.TenThongKe = group.GroupName;
                resTTHC.Catalog = group.Catalog;
                resTTHC.TongSoThuTuc = tmpRes.TongSoThuTuc;
                resTTHC.ThuTucDvcTrucTuyen = tmpRes.ThuTucDvcTrucTuyen;
                resTTHC.ThuTucDvc = tmpRes.ThuTucDvc;
                resTTHC.ThuTucToanTrinh = tmpRes.ThuTucToanTrinh;
                resTTHC.ThuTucMotPhan = tmpRes.ThuTucMotPhan;

            }
            else
            {
                resTTHC = new QuyetDinh766ChiTieuDvcTrucTuyenElement();
                resTTHC.MaDinhDanh = group.MaDinhDanh;
                resTTHC.MaThongKe = group.GroupCode;
                resTTHC.MaThongKeCha = group.OfGroupCode;
                resTTHC.TenThongKe = group.GroupName;
                resTTHC.Catalog = group.Catalog;

            }

            result.Add(resTTHC);
        }

        return result;
    }

    public async Task<QuyetDinh766Response<QuyetDinh766ChiTieuDvcTrucTuyenElement>> Handle(QuyetDinh766ChiTieuDvcTrucTuyenRequest request, CancellationToken cancellationToken)
    {
        List<QuyetDinh766ChiTieuDvcTrucTuyenElement> result = await GetThongKe(request, cancellationToken);

        return new QuyetDinh766Response<QuyetDinh766ChiTieuDvcTrucTuyenElement>(result);
    }
}
