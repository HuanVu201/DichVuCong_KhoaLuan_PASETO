using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeThanhToan;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopThanhtoan;
public class TongHopThanhToanTheoDonViHandler : IRequestHandler<TongHopThanhToanTheoDonViRequest, BaoCaoSo06Response<TongHopThanhToanElementResponse>>
{
    private readonly string yeuCauThanhToanTableName = $"Business.YeuCauThanhToans";
    private readonly string hoSoTableName = $"Business.HoSos";
    private readonly string thuTucTableName = $"Catalog.ThuTucs";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly TongHopThanhToanWhereBuilder _whereBuilder;
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants;
    public TongHopThanhToanTheoDonViHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _whereBuilder = new TongHopThanhToanWhereBuilder();
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
    }
    public async Task<BaoCaoSo06Response<TongHopThanhToanElementResponse>> Handle(TongHopThanhToanTheoDonViRequest request, CancellationToken cancellationToken)
    {
        string where = string.Empty;
        string tiepNhanTuNgay = string.Empty;
        string tiepNhanDenNgay = string.Empty;
        string thanhToanTuNgay = string.Empty;
        string thanhToanDenNgay = string.Empty;
        if (request.TiepNhanTuNgay.HasValue)
        {
            tiepNhanTuNgay = request.TiepNhanTuNgay.Value.ToString("yyyy-MM-dd");
            where += $" AND {hoSoTableName}.[NgayTiepNhan] >= @TiepNhanTuNgay ";
        }
        if (request.TiepNhanDenNgay.HasValue)
        {
            tiepNhanDenNgay = request.TiepNhanDenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
            where += $" AND {hoSoTableName}.[NgayTiepNhan] <= @TiepNhanDenNgay ";
        }
        if (request.ThanhToanTuNgay.HasValue)
        {
            thanhToanTuNgay = request.ThanhToanTuNgay.Value.ToString("yyyy-MM-dd");
            where += $" AND {yeuCauThanhToanTableName}.NgayThuPhi >= @ThanhToanTuNgay";
        }
        if (request.ThanhToanDenNgay.HasValue)
        {
            thanhToanDenNgay = request.ThanhToanDenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
            where += $" AND {yeuCauThanhToanTableName}.NgayThuPhi <= @ThanhToanDenNgay";
        }
        List<TongHopThanhToanElementResponse> result = new List<TongHopThanhToanElementResponse>();
        string sql = $"SELECT {yeuCauThanhToanTableName}.DonVi MaThongKe, " +
            $"SUM({yeuCauThanhToanTableName}.Phi) Phi, " +
            $"SUM({yeuCauThanhToanTableName}.LePhi) LePhi, " +
            $"SUM({yeuCauThanhToanTableName}.Phi + {yeuCauThanhToanTableName}.LePhi) TongSo, " +
            $"SUM(CASE WHEN {_whereBuilder.TongTienMat} THEN {yeuCauThanhToanTableName}.Phi + {yeuCauThanhToanTableName}.LePhi END) TongTienMat, " +
            $"SUM(CASE WHEN {_whereBuilder.TongTrucTuyen} THEN {yeuCauThanhToanTableName}.Phi + {yeuCauThanhToanTableName}.LePhi END) TongTrucTuyen, " +
            $"SUM(CASE WHEN {_whereBuilder.TongHinhThucThanhToanKhac} THEN {yeuCauThanhToanTableName}.Phi + {yeuCauThanhToanTableName}.LePhi END) TongHinhThucThanhToanKhac, " +
            $"COUNT(DISTINCT {yeuCauThanhToanTableName}.MaHoSo) HoSoDaThuPhi " +
            $"FROM {yeuCauThanhToanTableName} " +
            $"INNER JOIN {hoSoTableName} " +
            $"ON {yeuCauThanhToanTableName}.MaHoSo = {hoSoTableName}.MaHoSo " +
            $"WHERE {yeuCauThanhToanTableName}.TrangThai = N'{_yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN}' " +
            $"AND {yeuCauThanhToanTableName}.DeletedOn IS NULL {where} " +
            $"GROUP BY {yeuCauThanhToanTableName}.DonVi";
        var resBaoCao = await _dapperRepository.QueryAsync<TongHopThanhToanElementResponse>(sql, new
        {
            request.MaDonViCha,
            TiepNhanTuNgay = tiepNhanTuNgay,
            TiepNhanDenNgay = tiepNhanDenNgay,
            ThanhToanTuNgay = thanhToanTuNgay,
            ThanhToanDenNgay = thanhToanDenNgay
        }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.OfGroupCode = request.MaDonViCha;
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.PageNumber = request.PageNumber;
        queryGroups.PageSize = request.PageSize;
        queryGroups.Catalog = request.Catalog;
        queryGroups.Type = "don-vi";
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh" }.ToArray();
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            if (string.IsNullOrEmpty(group.MaDinhDanh)) continue;
            TongHopThanhToanElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
                if (request.DaThuPhi != false) result.Add(res);
            }
            else
            {
                res = new TongHopThanhToanElementResponse();
                res.MaThongKe = group.GroupCode;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
                if (request.DaThuPhi != true) result.Add(res);
            }
        }
        return new BaoCaoSo06Response<TongHopThanhToanElementResponse>(result);

    }
}
