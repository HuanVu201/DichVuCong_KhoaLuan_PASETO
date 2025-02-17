using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
public class QuyetDinh766TTTTHandler : IRequestHandler<QuyetDinh766TTTTRequest, QuyetDinh766Response<QuyetDinh766TTTTElementResponse>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly ICommonServices _commonServices;
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants;
    public QuyetDinh766TTTTHandler(IDapperRepository dapperRepository, IMediator mediator, ICommonServices commonServices )
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _commonServices = commonServices;
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
    }
    private async Task<List<QuyetDinh766TTTTElementResponse>> GetBaoCaoTongHop(QuyetDinh766TTTTRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        string where = string.Empty;
        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
            where += $" AND MaDinhDanh Like @MaDinhDanhCha +'%'";
        List<QuyetDinh766TTTTElementResponse> result = new List<QuyetDinh766TTTTElementResponse>();
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);
        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND {TablesName.YeuCauThanhToanTableName}.DeletedOn IS NULL " +
            $"AND {TablesName.YeuCauThanhToanTableName}.TrangThai = N'{_yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN}' ";
        string sql = $"SELECT {hoSoTableName}.DonViId MaThongKe, " +
            $"COUNT(DISTINCT CASE WHEN ({builder.where.CoNghiaVuTaiChinh}) THEN {hoSoTableName}.Id END) TongCoNghiaVuTaiChinh, " +
            $"COUNT(DISTINCT CASE WHEN ({builder.where.DaTTTTQuaDvcqg}) THEN {hoSoTableName}.Id END) DaTTTTQuaDvcqg " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {TablesName.GroupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {TablesName.GroupsTableName}.GroupCode " +
            $"INNER JOIN {TablesName.YeuCauThanhToanTableName} " +
            $"ON {hoSoTableName}.MaHoSo = {TablesName.YeuCauThanhToanTableName}.MaHoSo " +
            $"{totalWhere} {where}" +
            $"GROUP BY {hoSoTableName}.DonViId";
        var resBaoCao = await _dapperRepository.QueryAsync<QuyetDinh766TTTTElementResponse>(sql, request, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.OfGroupCode = request.MaDonViCha;
        queryGroups.PageNumber = request.PageNumber;
        queryGroups.PageSize = request.PageSize;
        queryGroups.Catalog = request.Catalog;
        queryGroups.Type = request.Type;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.ChiBaoGomDonViCon = request.ChiBaoGomDonViCon;
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            QuyetDinh766TTTTElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.TenThongKe = group.GroupName;
                res.MaDinhDanh = group.MaDinhDanh;
                res.Catalog = group.Catalog;
            }
            else
            {
                res = new QuyetDinh766TTTTElementResponse();
                res.MaThongKe = group.GroupCode;
                res.MaDinhDanh = group.MaDinhDanh;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }

            result.Add(res);
        }

        return result;
    }

    public async Task<QuyetDinh766Response<QuyetDinh766TTTTElementResponse>> Handle(QuyetDinh766TTTTRequest request, CancellationToken cancellationToken)
    {
        List<QuyetDinh766TTTTElementResponse> result = await GetBaoCaoTongHop(request, cancellationToken);

        return new QuyetDinh766Response<QuyetDinh766TTTTElementResponse>(result);
    }
}