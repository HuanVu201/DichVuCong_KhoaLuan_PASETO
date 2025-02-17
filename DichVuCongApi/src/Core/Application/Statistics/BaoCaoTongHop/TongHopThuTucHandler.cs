using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;
using TD.DichVuCongApi.Application.Application.Catalog.DonViThuTucApp;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class TongHopThuTucHandler : IRequestHandler<TongHopThuTucRequest, BaoCaoTongHopResponse<TongHopThuTucElementResponse>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string thuTucsTableName = "Catalog.ThuTucs";
    private readonly string groupsTableName = "Catalog.Groups";
    private readonly string donViThuTucsTableName = "Catalog.DonViThuTucs";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    public TongHopThuTucHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    }

    private async Task<List<TongHopThuTucElementResponse>> GetBaoCaoTongHopThuTuc(TongHopThuTucRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        List<TongHopThuTucElementResponse> result = new List<TongHopThuTucElementResponse>();
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);

        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND {thuTucsTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";
        if (!string.IsNullOrEmpty(request.MaDonVi)) totalWhere += $" AND ({hoSoTableName}.DonViId = @MaDonVi)";
        if (!string.IsNullOrEmpty(request.MaDinhDanh)) totalWhere += $" AND ({groupsTableName}.MaDinhDanh = @MaDinhDanh)";
        if (!string.IsNullOrEmpty(request.Catalog)) totalWhere += $" AND ({groupsTableName}.Catalog = @Catalog)";
        string sql = $"SELECT {thuTucsTableName}.MaTTHC MaThongKe, {thuTucsTableName}.MucDo, " +
             $"COUNT({hoSoTableName}.Id) TongSo, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanKyTruoc}) THEN {hoSoTableName}.Id END) TiepNhanKyTruoc, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanTrongKy}) THEN {hoSoTableName}.Id END) TiepNhanTrongKy, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanTrucTiep}) THEN {hoSoTableName}.Id END) TiepNhanTrucTiep, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaMang}) THEN {hoSoTableName}.Id END) TiepNhanQuaMang, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaBCCI}) THEN {hoSoTableName}.Id END) TiepNhanQuaBCCI, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyTruocHan}) THEN {hoSoTableName}.Id END) DaXuLyTruocHan, " +

            $"COUNT(CASE WHEN ({builder.where.DaXuLyDungHan}) THEN {hoSoTableName}.Id END) DaXuLyDungHan, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyQuaHan}) THEN {hoSoTableName}.Id END) DaXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyTrongHan}) THEN {hoSoTableName}.Id END) DangXuLyTrongHan, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyQuaHan}) THEN {hoSoTableName}.Id END) DangXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({builder.where.TraLai}) THEN {hoSoTableName}.Id END) TongTraLai, " +
            $"COUNT(CASE WHEN ({builder.where.BoSung}) THEN {hoSoTableName}.Id END) TongBoSung " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {thuTucsTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {thuTucsTableName}.MaTTHC " +
            $"INNER JOIN {groupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupsTableName}.GroupCode " +
            $"{totalWhere} " +
            $"GROUP BY {thuTucsTableName}.MaTTHC, {thuTucsTableName}.MucDo ";
        var resBaoCao = await _dapperRepository.QueryAsync<TongHopThuTucElementResponse>(sql, new
        {
            request.MaDinhDanhCha,
            request.MaDinhDanh,
            request.MaDonVi,
            request.Catalog,
            request.DonViQuanLy,
            TuNgay = tuNgay,
            DenNgay = denNgay,
        }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");

        // SearchDonViThuTucQuery queryThuTucs = new SearchDonViThuTucQuery();
        // queryThuTucs.PageNumber = request.PageNumber;
        // queryThuTucs.PageSize = request.PageSize;
        // queryThuTucs.MaLinhVuc = request.MaLinhVuc;
        // queryThuTucs.MaDinhDanh = request.MaDinhDanh;
        // queryThuTucs.MaDinhDanhCha = request.MaDinhDanhCha;
        // queryThuTucs.Catalog = request.Catalog;
        // var thuTucsDto = await _mediator.Send(queryThuTucs);

        // Searhc Thủ tục
        string where = string.Empty;
        if (!string.IsNullOrEmpty(request.MaDinhDanh))
            where += $" AND {groupsTableName}.MaDinhDanh = @MaDinhDanh";
        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
            where += $" AND {groupsTableName}.MaDinhDanh LIKE @MaDinhDanhCha + '%'";
        if (!string.IsNullOrEmpty(request.Catalog))
            where += $" AND {groupsTableName}.Catalog = @Catalog ";
        string sqlThuTucs = $"SELECT DISTINCT {thuTucsTableName}.MaTTHC, {thuTucsTableName}.TenTTHC, {thuTucsTableName}.MucDo FROM {thuTucsTableName} " +
            $"INNER JOIN {donViThuTucsTableName} ON {thuTucsTableName}.MaTTHC = {donViThuTucsTableName}.MaTTHC " +
            $"INNER JOIN {groupsTableName} ON {groupsTableName}.GroupCode = {donViThuTucsTableName}.DonViId " +
            $"WHERE {thuTucsTableName}.DeletedOn IS NULL AND {donViThuTucsTableName}.DeletedOn IS NULL {where} " +
            $"GROUP BY {thuTucsTableName}.MaTTHC, {thuTucsTableName}.TenTTHC, {thuTucsTableName}.MucDo ";
        var thuTucs = await _dapperRepository.QueryAsync<DonViThuTucDetailDto>(sqlThuTucs, request, null, cancellationToken);
        if (thuTucs == null) throw new Exception("Thutucs not found");
        foreach (var thuTuc in thuTucs)
        {
            TongHopThuTucElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == thuTuc.MaTTHC);
            if (res != null)
            {
                res.TenThongKe = thuTuc.TenTTHC ?? string.Empty;

                if(request.CoPhatSinhHoSo != false) result.Add(res);
            }
            else
            {
                res = new TongHopThuTucElementResponse();
                res.MucDo = thuTuc.MucDo;
                res.MaThongKe = thuTuc.MaTTHC;
                res.TenThongKe = thuTuc.TenTTHC ?? string.Empty;
                if (request.CoPhatSinhHoSo != true) result.Add(res);
            }

        }

        return result;
    }

    public async Task<BaoCaoTongHopResponse<TongHopThuTucElementResponse>> Handle(TongHopThuTucRequest request, CancellationToken cancellationToken)
    {
        List<TongHopThuTucElementResponse> result = await GetBaoCaoTongHopThuTuc(request, cancellationToken);
        return new BaoCaoTongHopResponse<TongHopThuTucElementResponse>(result);
    }
}
