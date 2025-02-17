using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;
using TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class TongHopLinhVucHandler : IRequestHandler<TongHopLinhVucRequest, BaoCaoTongHopBaseResponse>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string thuTucsTableName = "Catalog.ThuTucs";
    private readonly string groupsTableName = "Catalog.Groups";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    public TongHopLinhVucHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    }
    private async Task<List<BaoCaoTongHopBaseElementResponse>> GetBaoCaoTongHopLinhVuc(TongHopLinhVucRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        List<BaoCaoTongHopBaseElementResponse> result = new List<BaoCaoTongHopBaseElementResponse>();
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);

        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND {thuTucsTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";
        BaseStatisticsWhereBuilder baseWhere = new BaseStatisticsWhereBuilder(request);
        totalWhere += baseWhere.where;
        string sql = $"SELECT {thuTucsTableName}.MaLinhVucChinh MaThongKe, " +
             $"COUNT({hoSoTableName}.Id) TongSo, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanKyTruoc}) THEN {hoSoTableName}.Id END) TiepNhanKyTruoc," +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanTrongKy}) THEN {hoSoTableName}.Id END) TiepNhanTrongKy," +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyTruocHan}) THEN {hoSoTableName}.Id END) DaXuLyTruocHan, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanTrucTiep}) THEN {hoSoTableName}.Id END) TiepNhanTrucTiep, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaMang}) THEN {hoSoTableName}.Id END) TiepNhanQuaMang, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaBCCI}) THEN {hoSoTableName}.Id END) TiepNhanQuaBCCI, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyDungHan}) THEN {hoSoTableName}.Id END) DaXuLyDungHan, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyQuaHan}) THEN {hoSoTableName}.Id END) DaXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyTrongHan}) THEN {hoSoTableName}.Id END) DangXuLyTrongHan, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyQuaHan}) THEN {hoSoTableName}.Id END) DangXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({builder.where.TraLai}) THEN {hoSoTableName}.Id END) TongTraLai, " +
            $"COUNT(CASE WHEN ({builder.where.TrangThaiBoSung}) THEN {hoSoTableName}.Id END) TrangThaiBoSung, " +
            $"COUNT(CASE WHEN ({builder.where.TrangThaiDungXuLy}) THEN {hoSoTableName}.Id END) TrangThaiDungXuLy, " +
            $"COUNT(CASE WHEN ({builder.where.TrangThaiYeuCauThucHienNVTC}) THEN {hoSoTableName}.Id END) TrangThaiYeuCauThucHienNVTC, " +
            $"COUNT(CASE WHEN ({builder.where.BoSung}) THEN {hoSoTableName}.Id END) TongBoSung " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {thuTucsTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {thuTucsTableName}.MaTTHC " +
            $"INNER JOIN {groupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupsTableName}.GroupCode " +
            $"{totalWhere} " +
            $"GROUP BY {thuTucsTableName}.MaLinhVucChinh";
        var resBaoCao = await _dapperRepository.QueryAsync<BaoCaoTongHopBaseElementResponse>(sql, new
        {
            request.MaDinhDanh,
            request.MaDonVi,
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.Catalog,
            request.MaDinhDanhCha,
        }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopLinhVuc not found");
        SearchLinhVucTheoBaoCaoTongHopQuery queryThuTucs = new SearchLinhVucTheoBaoCaoTongHopQuery();
        queryThuTucs.PageNumber = request.PageNumber;
        queryThuTucs.PageSize = request.PageSize;
        queryThuTucs.MaDinhDanh = request.MaDinhDanh;
        queryThuTucs.Catalog = request.Catalog;
        queryThuTucs.MaDinhDanhCha = request.MaDinhDanhCha;
        var linhVucDtos = await _mediator.Send(queryThuTucs);
        if (linhVucDtos.Data == null) throw new Exception("linhvucs not found");
        List<LinhVucDto> linhVucs = linhVucDtos.Data;
        foreach (var linhVuc in linhVucs)
        {
            BaoCaoTongHopBaseElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == linhVuc.Ma);
            if (res != null) res.TenThongKe = linhVuc.Ten;
            else
            {
                res = new BaoCaoTongHopBaseElementResponse();
                res.MaThongKe = linhVuc.Ma;
                res.TenThongKe = linhVuc.Ten;
            }

            result.Add(res);
        }

        return result;
    }

    public async Task<BaoCaoTongHopBaseResponse> Handle(TongHopLinhVucRequest request, CancellationToken cancellationToken)
    {
        List<BaoCaoTongHopBaseElementResponse> result = await GetBaoCaoTongHopLinhVuc(request, cancellationToken);
        return new BaoCaoTongHopBaseResponse(result);
    }
}
