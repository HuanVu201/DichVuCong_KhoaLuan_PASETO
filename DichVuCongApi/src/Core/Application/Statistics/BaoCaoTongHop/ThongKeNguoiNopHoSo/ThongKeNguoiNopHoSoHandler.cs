using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeNguoiNopHoSo;
public class ThongKeNguoiNopHoSoHandler : IRequestHandler<ThongKeNguoiNopHoSoRequest, BaoCaoSo06Response<ThongKeNguoiNopHoSoElementResponse>>
{
    private readonly string hoSoTableName = $"Business.HoSos";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    public ThongKeNguoiNopHoSoHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
    }
    public async Task<BaoCaoSo06Response<ThongKeNguoiNopHoSoElementResponse>> Handle(ThongKeNguoiNopHoSoRequest request, CancellationToken cancellationToken)
    {
        List<ThongKeNguoiNopHoSoElementResponse> result = new List<ThongKeNguoiNopHoSoElementResponse>();
        string tuNgay = string.Empty;
        string denNgay = string.Empty;
        string totalWhere = $"Where {hoSoTableName}.DeletedOn IS NULL ";
        if (request.TuNgay.HasValue)
            tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        if (request.DenNgay.HasValue)
            denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd");
        if (!string.IsNullOrEmpty(tuNgay)) totalWhere += $"AND {hoSoTableName}.NgayTiepNhan >= @TuNgay ";
        if (!string.IsNullOrEmpty(denNgay)) totalWhere += $"AND {hoSoTableName}.NgayTiepNhan <= @DenNgay ";
        ThongKeNguoiNopHoSoWhereBuilder whereBuilder = new ThongKeNguoiNopHoSoWhereBuilder();
        string sql = $"SELECT {hoSoTableName}.DonViId MaThongKe, " +
            $"COUNT(DISTINCT CASE WHEN {whereBuilder.CongDan} THEN {hoSoTableName}.SoGiayToChuHoSo END) CongDan," +
            $"COUNT(DISTINCT CASE WHEN  {whereBuilder.ToChuc} THEN {hoSoTableName}.SoGiayToChuHoSo END) ToChuc," +
            $"COUNT(DISTINCT CASE WHEN  {whereBuilder.DoanhNghiep}  THEN {hoSoTableName}.SoGiayToChuHoSo END) DoanhNghiep, " +
            $"COUNT(DISTINCT {hoSoTableName}.SoGiayToChuHoSo ) TongSo " +
            $"FROM {hoSoTableName} " +
            $"{totalWhere} " +
            $"GROUP BY {hoSoTableName}.DonViId";
        var resBaoCao = await _dapperRepository.QueryAsync<ThongKeNguoiNopHoSoElementResponse>(sql, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
        }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("ThongKeNguoiNopHoSo not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.OfGroupCode = request.MaDonViCha;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.PageNumber = request.PageNumber;
        queryGroups.PageSize = request.PageSize;
        queryGroups.Catalog = request.Catalog;
        queryGroups.Type = "don-vi";
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            if (string.IsNullOrEmpty(group.MaDinhDanh)) continue;
            ThongKeNguoiNopHoSoElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.TenThongKe = group.GroupName;
            }
            else
            {
                res = new ThongKeNguoiNopHoSoElementResponse();
                res.MaThongKe = group.GroupCode;
                res.TenThongKe = group.GroupName;
            }
            result.Add(res);
        }
        return new BaoCaoSo06Response<ThongKeNguoiNopHoSoElementResponse>(result);

    }
}
