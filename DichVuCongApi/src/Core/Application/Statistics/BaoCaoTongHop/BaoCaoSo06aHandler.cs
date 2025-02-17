using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class BaoCaoSo06aHandler : IRequestHandler<BaoCaoSo06aRequest, BaoCaoSo06Response<BaoCaoSo06ElementResponse>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly ICommonServices _commonServices;
    public BaoCaoSo06aHandler(IDapperRepository dapperRepository, IMediator mediator, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _commonServices = commonServices;
    }

    private async Task<List<BaoCaoSo06ElementResponse>> GetBaoCao06(BaoCaoSo06aRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        List<BaoCaoSo06ElementResponse> result = new List<BaoCaoSo06ElementResponse>();
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);

        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";
        BaseStatisticsWhereBuilder baseWhere = new BaseStatisticsWhereBuilder(request);
        if (!string.IsNullOrEmpty(request.MaDinhDanh)) totalWhere += $" AND ({TablesName.GroupsTableName}.MaDinhDanh = @MaDinhDanh)";
        string sql = $"SELECT {hoSoTableName}.DonViId MaThongKe, " +
            $"COUNT({hoSoTableName}.Id) TongSo, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanKyTruoc}) THEN {hoSoTableName}.Id END) TiepNhanKyTruoc," +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanTrucTiepVaBCCI}) THEN {hoSoTableName}.Id END) TiepNhanTrucTiepVaBCCI," +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaMang}) THEN {hoSoTableName}.Id END) TiepNhanQuaMang," +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyVaTraLai}) THEN {hoSoTableName}.Id END) DaXuLyVaTraLai, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyTruocHan}) THEN {hoSoTableName}.Id END) DaXuLyTruocHan, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyDungHanVaTraLai}) THEN {hoSoTableName}.Id END) DaXuLyDungHanVaTraLai, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyQuaHan}) THEN {hoSoTableName}.Id END) DaXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyVaBoSung}) THEN {hoSoTableName}.Id END) DangXuLyVaBoSung, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyTrongHanVaBoSung}) THEN {hoSoTableName}.Id END) DangXuLyTrongHanVaBoSung, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyQuaHan}) THEN {hoSoTableName}.Id END) DangXuLyQuaHan " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {TablesName.ThuTucsTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {TablesName.ThuTucsTableName}.MaTTHC " +
            $"INNER JOIN {TablesName.GroupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {TablesName.GroupsTableName}.GroupCode " +
            $"{totalWhere} {baseWhere.where} " +
            $"GROUP BY {hoSoTableName}.DonViId";
        var resBaoCao = await _dapperRepository.QueryAsync<BaoCaoSo06ElementResponse>(sql, new
        {
            request.MaDinhDanhCha,
            request.Catalog,
            request.MaDinhDanh,
            request.MaDonVi,
            TuNgay = tuNgay,
            DenNgay = denNgay,
        }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.OfGroupCode = request.MaDonViCha;
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.PageNumber = request.PageNumber;
        queryGroups.ChiBaoGomDonViCon = request.ChiBaoGomDonViCon;
        queryGroups.DonViQuanLy = request.DonViQuanLy;
        queryGroups.PageSize = request.PageSize;
        queryGroups.Catalog = request.Catalog;
        queryGroups.Type = "don-vi";
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) return result;
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            if (string.IsNullOrEmpty(group.MaDinhDanh)) continue;
            BaoCaoSo06ElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }
            else
            {
                res = new BaoCaoSo06ElementResponse();
                res.MaThongKe = group.GroupCode;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }

            result.Add(res);
        }

        return result;
    }

    public async Task<BaoCaoSo06Response<BaoCaoSo06ElementResponse>> Handle(BaoCaoSo06aRequest request, CancellationToken cancellationToken)
    {

        List<BaoCaoSo06ElementResponse> result = await GetBaoCao06(request, cancellationToken);
        return new BaoCaoSo06Response<BaoCaoSo06ElementResponse>(result);
    }
}
