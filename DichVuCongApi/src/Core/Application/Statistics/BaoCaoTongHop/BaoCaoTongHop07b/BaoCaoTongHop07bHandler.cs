using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.BaoCaoTongHop07b;

public class BaoCaoTongHop07bHandler : IRequestHandler<BaoCaoTongHop07bRequest, BaoCaoTongHopResponse<BaoCaoTongHop07bElementResponse>>
{
    private readonly string _donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly string _groupTableName = "Catalog.Groups";
    private readonly string _thuTucsTableName = "Catalog.ThuTucs";
    private readonly string _truongHopThuTucTableName = "Business.TruongHopThuTucs";
    private readonly IDapperRepository _dapperRepository;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    private readonly IMediator _mediator;
    public BaoCaoTongHop07bHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _mediator = mediator;
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    }

    public async Task<BaoCaoTongHopResponse<BaoCaoTongHop07bElementResponse>> Handle(BaoCaoTongHop07bRequest request, CancellationToken cancellationToken)
    {
        string where = string.Empty;
        List<BaoCaoTongHop07bElementResponse> result = new List<BaoCaoTongHop07bElementResponse>();
        BaseStatisticsWhereBuilder baseWhere = new BaseStatisticsWhereBuilder(request);
        where += baseWhere.where;

        string sql = $"SELECT GroupCode MaThongKe, " +
            $"COUNT(DISTINCT {_thuTucsTableName}.id)  TongSoTTHCTheoCCMC, " +
            $"COUNT(DISTINCT CASE WHEN {_groupTableName}.Catalog = '{_tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH}' THEN {_thuTucsTableName}.id end)  soTTHCTaiBPMCCapTinh, " +
            $"COUNT(DISTINCT CASE WHEN {_groupTableName}.Catalog = '{_tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN}' THEN {_thuTucsTableName}.id end)  SoTTHCTaiBPMCCapHuyen, " +
            $"COUNT(DISTINCT CASE WHEN {_groupTableName}.Catalog = '{_tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG}' THEN {_thuTucsTableName}.id end)  SoTTHCTaiBPMCCapXa, " +
            $"COUNT(DISTINCT {_truongHopThuTucTableName}.id) TongSoQuyTrinh, " +
            $"COUNT(DISTINCT CASE WHEN {_groupTableName}.Catalog = '{_tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH}' THEN {_truongHopThuTucTableName}.id end) SoQuyTrinhCapTinh, " +
             $"COUNT(DISTINCT CASE WHEN {_groupTableName}.Catalog = '{_tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN}' THEN {_truongHopThuTucTableName}.id end)  SoQuyTrinhCapHuyen, " +
            $"COUNT(DISTINCT CASE WHEN {_groupTableName}.Catalog = '{_tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG}' THEN {_truongHopThuTucTableName}.id end)  SoQuyTrinhCapXa " +
            $"FROM {_donViThuTucTableName} " +
            $"INNER JOIN {_thuTucsTableName} ON {_donViThuTucTableName}.MaTTHC = {_thuTucsTableName}.MaTTHC " +
            $"INNER JOIN {_groupTableName} ON {_donViThuTucTableName}.DonViId = {_groupTableName}.GroupCode " +
            $"INNER JOIN {_truongHopThuTucTableName} ON {_thuTucsTableName}.MaTTHC = {_truongHopThuTucTableName}.ThuTucId " +
            $"WHERE {_thuTucsTableName}.DeletedOn IS NULL AND {_donViThuTucTableName}.DeletedOn IS NULL AND {_truongHopThuTucTableName}.DeletedOn IS NULL {where} " +
            $"GROUP BY GroupCode ";
        var resBaoCao = await _dapperRepository.QueryAsync<BaoCaoTongHop07bElementResponse>(sql, new
        {
            request.MaDinhDanhCha,
            request.Catalog,
            request.MaDinhDanh,
            request.MaDonVi
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
        if (groupsDto.Data == null) return new BaoCaoTongHopResponse<BaoCaoTongHop07bElementResponse>(new List<BaoCaoTongHop07bElementResponse>());
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            if (string.IsNullOrEmpty(group.MaDinhDanh)) continue;
            BaoCaoTongHop07bElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }
            else
            {
                res = new BaoCaoTongHop07bElementResponse();
                res.MaThongKe = group.GroupCode;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }

            result.Add(res);
        }

        return new BaoCaoTongHopResponse<BaoCaoTongHop07bElementResponse>(result);
    }
}
