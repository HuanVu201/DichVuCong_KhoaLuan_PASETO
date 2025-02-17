using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuTienDo;
public class QuyetDinh766ChiTieuTienDoHandler : IRequestHandler<QuyetDinh766ChiTieuTienDoRequest, QuyetDinh766Response<QuyetDinh766ChiTieuTienDoElement>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    private readonly ICacheService _cacheService;
    private readonly ICommonServices _commonServices;
    public QuyetDinh766ChiTieuTienDoHandler(IDapperRepository dapperRepository, IMediator mediator, ICacheService cacheService, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _cacheService = cacheService;
        _commonServices = commonServices;
    }

    private async Task<List<QuyetDinh766ChiTieuTienDoElement>> GetThongKe(QuyetDinh766ChiTieuTienDoRequest request, CancellationToken cancellationToken)
    {
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        List<QuyetDinh766ChiTieuTienDoElement> result = new List<QuyetDinh766ChiTieuTienDoElement>();
        string where = string.Empty;

        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);
        BaseStatisticsWhereBuilder dvWhere = new BaseStatisticsWhereBuilder(request);
        //QuyetDinh766ChiTieuTienDoWhereBuilder whereBuilder = new QuyetDinh766ChiTieuTienDoWhereBuilder();
        string sqlQuery = $"SELECT {hoSoTableName}.DonViId MaThongKe, " +
             $"COUNT({hoSoTableName}.Id) TongSo, " +
             $"COUNT(CASE WHEN ({builder.where.TiepNhanKyTruoc}) THEN {hoSoTableName}.Id END) TiepNhanKyTruoc," +
             $"COUNT(CASE WHEN ({builder.where.TiepNhanTrongKy}) THEN {hoSoTableName}.Id END) TongTiepNhan, " +
             $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaMang}) THEN {hoSoTableName}.Id END) TiepNhanQuaMang, " +
             $"COUNT(CASE WHEN ({builder.where.TiepNhanTrucTiep}) THEN {hoSoTableName}.Id END) TiepNhanTrucTiep, " +
             $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaBCCI}) THEN {hoSoTableName}.Id END) TiepNhanBCCI, " +
             $"COUNT(CASE WHEN ({builder.where.DaXuLyVaTraLai}) THEN {hoSoTableName}.Id END) TongDaXuLy, " +
             $"COUNT(CASE WHEN ({builder.where.DaXuLyTruocHan}) THEN {hoSoTableName}.Id END) DaXuLyTruocHan, " +
             $"COUNT(CASE WHEN ({builder.where.DaXuLyDungHanVaTraLai}) THEN {hoSoTableName}.Id END) DaXuLyDungHan, " +
             $"COUNT(CASE WHEN ({builder.where.DaXuLyQuaHan}) THEN {hoSoTableName}.Id END) DaXuLyQuaHan, " +
             $"COUNT(CASE WHEN ({builder.where.DangXuLyVaBoSung}) THEN {hoSoTableName}.Id END) DangXuLyVaBoSung, " +
             $"COUNT(CASE WHEN ({builder.where.DangXuLyTrongHanVaBoSung}) THEN {hoSoTableName}.Id END) DangXuLyTrongHanVaBoSung, " +
             $"COUNT(CASE WHEN ({builder.where.DangXuLyQuaHan}) THEN {hoSoTableName}.Id END) DangXuLyQuaHan " +
             $"FROM {hoSoTableName} " +
             $"INNER JOIN {TablesName.ThuTucsTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {TablesName.ThuTucsTableName}.MaTTHC " +
             $"INNER JOIN {TablesName.GroupsTableName} " +
             $"ON {hoSoTableName}.DonViId = {TablesName.GroupsTableName}.GroupCode " +
             $"WHERE {hoSoTableName}.DeletedOn IS NULL  AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) {where} AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) {dvWhere.where} " +
             $"GROUP BY {hoSoTableName}.DonViId";

        var resBaoCao = await _dapperRepository.QueryAsync<QuyetDinh766ChiTieuTienDoElement>(sqlQuery,
            new { TuNgay = tuNgay, DenNgay = denNgay, MaDinhDanh = request.MaDinhDanh, MaDinhDanhCha = request.MaDinhDanhCha, Catalog = request.Catalog },
            null, cancellationToken);

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
            QuyetDinh766ChiTieuTienDoElement res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.MaDinhDanh = group.MaDinhDanh;
                res.MaThongKeCha = group.OfGroupCode;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }
            else
            {
                res = new QuyetDinh766ChiTieuTienDoElement();
                res.MaDinhDanh = group.MaDinhDanh;
                res.MaThongKeCha = group.OfGroupCode;
                res.MaThongKe = group.GroupCode;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;

            }

            result.Add(res);
        }

        return result;
    }

    public async Task<QuyetDinh766Response<QuyetDinh766ChiTieuTienDoElement>> Handle(QuyetDinh766ChiTieuTienDoRequest request, CancellationToken cancellationToken)
    {

        if (!request.TuNgay.HasValue) throw new ArgumentNullException(nameof(request.TuNgay));
        if (!request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request.DenNgay));
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        string cacheName = $"ChiTieuTienDo_{tuNgay}_{denNgay}_{request.MaDinhDanh}_{request.MaDinhDanhCha}_{request.Catalog}";

        if (request.cache == true)
        {
            var cacheResult = _cacheService.Get<List<QuyetDinh766ChiTieuTienDoElement>>(cacheName);
            if (cacheResult != null) return new QuyetDinh766Response<QuyetDinh766ChiTieuTienDoElement>(cacheResult);
        }

        List<QuyetDinh766ChiTieuTienDoElement> result = await GetThongKe(request, cancellationToken);
        if (request.cache == true) _cacheService.Set(cacheName, result, TimeSpan.FromMinutes(10));
        return new QuyetDinh766Response<QuyetDinh766ChiTieuTienDoElement>(result);
    }
}
