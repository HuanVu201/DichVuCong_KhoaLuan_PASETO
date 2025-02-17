using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;

using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuSoHoa;

public class QuyetDinh766ChiTieuSoHoaHandler : IRequestHandler<QuyetDinh766ChiTieuSoHoaRequest, QuyetDinh766Response<QuyetDinh766ChiTieuSoHoaElement>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    private readonly ICommonServices _commonServices;
    public QuyetDinh766ChiTieuSoHoaHandler(IDapperRepository dapperRepository, IMediator mediator, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _commonServices = commonServices;
    }

    private async Task<List<QuyetDinh766ChiTieuSoHoaElement>> GetThongKe(QuyetDinh766ChiTieuSoHoaRequest request, CancellationToken cancellationToken)
    {
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        List<QuyetDinh766ChiTieuSoHoaElement> result = new List<QuyetDinh766ChiTieuSoHoaElement>();
        QuyetDinh766ChiTieuSoHoaWhereBuilder whereBuilder = new QuyetDinh766ChiTieuSoHoaWhereBuilder(hoSoTableName);
        string where = string.Empty;
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
        BaseStatisticsWhereBuilder baseWhere = new BaseStatisticsWhereBuilder(request);
        string sqlQuery = $"SELECT {hoSoTableName}.DonViId MaThongKe, " +
            $"Count(DISTINCT CASE WHEN {whereBuilder.TiepNhan} THEN {hoSoTableName}.ID END ) as TiepNhan, " +
            $"Count(DISTINCT CASE WHEN {whereBuilder.ChuaSoHoaTPHS} THEN {hoSoTableName}.ID END ) as ChuaSoHoaTPHS, " +
            $"Count(DISTINCT CASE WHEN {whereBuilder.CoSoHoaTPHS} THEN {hoSoTableName}.ID END ) as CoSoHoaTPHS, " +
            $"Count(DISTINCT CASE WHEN {whereBuilder.CoTaiSuDungTPHS} THEN {hoSoTableName}.ID END ) as CoTaiSuDungTPHS, " +
            $"Count(DISTINCT CASE WHEN {whereBuilder.CoTaiSuDungTPHSTuDvcQg} THEN {hoSoTableName}.ID END ) as CoTaiSuDungTPHSTuDvcQg, " +
            $"Count(DISTINCT CASE WHEN {whereBuilder.DaGiaiQuyet} THEN {hoSoTableName}.ID END ) as DaGiaiQuyet, " +
            $"Count(DISTINCT CASE WHEN {whereBuilder.DaGiaiQuyetChuaSoHoa} THEN {hoSoTableName}.ID END ) as DaGiaiQuyetChuaSoHoa, " +
            $"Count(DISTINCT CASE WHEN {whereBuilder.DaGiaiQuyetDaSoHoa} THEN {hoSoTableName}.ID END ) as DaGiaiQuyetDaSoHoa " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {TablesName.GroupsTableName} ON {hoSoTableName}.DonViId = {TablesName.GroupsTableName}.GroupCode " +
            $"INNER JOIN {TablesName.ThuTucsTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {TablesName.ThuTucsTableName}.MaTTHC " +
            $"LEFT JOIN {TablesName.ThanhPhanHoSoTableName} " +
            $"ON {TablesName.ThanhPhanHoSoTableName}.HoSo = {hoSoTableName}.MaHoSo " +
            $"WHERE {hoSoTableName}.DeletedOn IS Null AND {TablesName.ThanhPhanHoSoTableName}.DeletedOn IS NULL AND {hoSoTableName}.TrangThaiHoSoId IN ({whereBuilder.TRANG_THAI_TIEP_NHAN}) {where} {baseWhere.where} " +
            $"GROUP BY {hoSoTableName}.DonViId ";
        var resBaoCao = await _dapperRepository.QueryAsync<QuyetDinh766ChiTieuSoHoaElement>(sqlQuery, new { MaDinhDanh = request.MaDinhDanh, MaDinhDanhCha = request.MaDinhDanhCha, Catalog = request.Catalog }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.PageNumber = 1;
        queryGroups.PageSize = 1000;
        queryGroups.Type = "don-vi";
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.Catalog = request.Catalog;
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            QuyetDinh766ChiTieuSoHoaElement res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.MaDinhDanh = group.MaDinhDanh;
                res.MaThongKeCha = group.OfGroupCode;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }
            else
            {
                res = new QuyetDinh766ChiTieuSoHoaElement();
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

    public async Task<QuyetDinh766Response<QuyetDinh766ChiTieuSoHoaElement>> Handle(QuyetDinh766ChiTieuSoHoaRequest request, CancellationToken cancellationToken)
    {
        List<QuyetDinh766ChiTieuSoHoaElement> result = await GetThongKe(request, cancellationToken);

        return new QuyetDinh766Response<QuyetDinh766ChiTieuSoHoaElement>(result);
    }
}

