using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoNopTuCongDVC;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class BaoCaoHoSoNopTuCongDVCHandler : IRequestHandler<BaoCaoHoSoNopTuCongDVCRequest, BaoCaoSo06Response<BaoCaoHoSoNopTuDVCElementResponse>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string thuTucsTableName = "Catalog.ThuTucs";
    private readonly string groupsTableName = "Catalog.Groups";
    private readonly string donViThuTucsTableName = "Catalog.DonViThuTucs";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _TiepNhanHoSoTrucTuyenConstants;
    public BaoCaoHoSoNopTuCongDVCHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    }
    private async Task<List<BaoCaoHoSoNopTuDVCElementResponse>> GetBaoCao06(BaoCaoHoSoNopTuCongDVCRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        List<BaoCaoHoSoNopTuDVCElementResponse> result = new List<BaoCaoHoSoNopTuDVCElementResponse>();
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);

        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) ";

        if (!string.IsNullOrEmpty(request.MaDinhDanh)) totalWhere += $" AND ({groupsTableName}.MaDinhDanh = @MaDinhDanh)";
        string sql = $"SELECT {hoSoTableName}.DonViId MaThongKe, " +

            $"COUNT(CASE WHEN ({builder.where.TiepNhan}) THEN {hoSoTableName}.Id END) TongTiepNhan," +
            $"COUNT(CASE WHEN ({builder.where.XuLyDungHan}) THEN {hoSoTableName}.Id END) XuLyDungHan," +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaHan}) THEN {hoSoTableName}.Id END) TiepNhanQuaHan," +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyQuaHan}) THEN {hoSoTableName}.Id END) DangXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyQuaHanTrongKy}) THEN {hoSoTableName}.Id END) DangXuLyQuaHanTrongKy " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {thuTucsTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {thuTucsTableName}.MaTTHC " +
            $"INNER JOIN {groupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupsTableName}.GroupCode " +
            $"{totalWhere} " +
            $"GROUP BY {hoSoTableName}.DonViId";
        var resBaoCao = await _dapperRepository.QueryAsync<BaoCaoHoSoNopTuDVCElementResponse>(sql, new
        {
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
        queryGroups.PageSize = request.PageSize;
        queryGroups.Catalog = request.Catalog;
        queryGroups.Type = "don-vi";
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh" }.ToArray();
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) return result;
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            if (string.IsNullOrEmpty(group.MaDinhDanh)) continue;
            BaoCaoHoSoNopTuDVCElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }
            else
            {
                res = new BaoCaoHoSoNopTuDVCElementResponse();
                res.MaThongKe = group.GroupCode;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }
            result.Add(res);
        }
        return result;
    }
    public async Task<BaoCaoSo06Response<BaoCaoHoSoNopTuDVCElementResponse>> Handle(BaoCaoHoSoNopTuCongDVCRequest request, CancellationToken cancellationToken)
    {

        List<BaoCaoHoSoNopTuDVCElementResponse> result = await GetBaoCao06(request, cancellationToken);
        return new BaoCaoSo06Response<BaoCaoHoSoNopTuDVCElementResponse>(result);
    }
}
