using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;
using TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class BaoCaoTongHop07aHandler : IRequestHandler<BaoCaoTongHop07aRequest, BaoCaoTongHopResponse<BaoCaoTongHop07aElementResponse>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly ICommonServices _commonServices;
    public BaoCaoTongHop07aHandler(IDapperRepository dapperRepository, IMediator mediator, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _commonServices = commonServices;
    }
    private async Task<List<BaoCaoTongHop07aElementResponse>> GetBaoCao06(BaoCaoTongHop07aRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        List<BaoCaoTongHop07aElementResponse> result = new List<BaoCaoTongHop07aElementResponse>();
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);
        BaseStatisticsWhereBuilder baseWhere = new BaseStatisticsWhereBuilder(request);
        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";
        if (!string.IsNullOrEmpty(request.MaDonVi)) totalWhere += $" AND ({hoSoTableName}.DonViId = @MaDonVi)";
        if (!string.IsNullOrEmpty(request.MaDinhDanh)) totalWhere += $" AND ({TablesName.GroupsTableName}.MaDinhDanh = @MaDinhDanh)";
        string sql = $"SELECT {TablesName.ThuTucsTableName}.MaLinhVucChinh MaThongKe, " +
             $"COUNT({hoSoTableName}.Id) TongSo, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanKyTruoc}) THEN {hoSoTableName}.Id END) TiepNhanKyTruoc," +
            $"COUNT(CASE WHEN ({builder.where.TiepNhan}) THEN {hoSoTableName}.Id END) TongTiepNhan," +
            $"COUNT(CASE WHEN ({builder.where.DaXuLy}) THEN {hoSoTableName}.Id END) TongDaXuLy, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyDungHanVaTruocHan}) THEN {hoSoTableName}.Id END) DaXuLyDungHanVaTruocHan, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyQuaHan}) THEN {hoSoTableName}.Id END) DaXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLy}) THEN {hoSoTableName}.Id END) TongDangXuLy, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyTrongHan}) THEN {hoSoTableName}.Id END) DangXuLyTrongHan, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyQuaHan}) THEN {hoSoTableName}.Id END) DangXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({builder.where.TraLai}) THEN {hoSoTableName}.Id END) TongTraLai, " +
            $"COUNT(CASE WHEN ({builder.where.BoSung}) THEN {hoSoTableName}.Id END) TongBoSung " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {TablesName.ThuTucsTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {TablesName.ThuTucsTableName}.MaTTHC " +
            $"INNER JOIN {TablesName.GroupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {TablesName.GroupsTableName}.GroupCode " +
            $"{totalWhere} {baseWhere.where} " +
            $"GROUP BY {TablesName.ThuTucsTableName}.MaLinhVucChinh";
        var resBaoCao = await _dapperRepository.QueryAsync<BaoCaoTongHop07aElementResponse>(sql, new
        {
            request.MaDinhDanhCha,
            request.Catalog,
            request.MaDinhDanh,
            request.MaDonVi,
            TuNgay = tuNgay,
            DenNgay = denNgay,
        }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopLinhVuc not found");
        SearchLinhVucTheoBaoCaoTongHopQuery queryThuTucs = new SearchLinhVucTheoBaoCaoTongHopQuery();
        queryThuTucs.PageNumber = request.PageNumber;
        queryThuTucs.PageSize = request.PageSize;

        queryThuTucs.MaDinhDanh = request.MaDinhDanh;
        queryThuTucs.Catalog = request.Catalog;
        queryThuTucs.MaDinhDanhCha = request.MaDinhDanhCha;
        queryThuTucs.ChiBaoGomDonViCon = request.ChiBaoGomDonViCon;
        var linhVucDtos = await _mediator.Send(queryThuTucs);
        if (linhVucDtos.Data == null) throw new Exception("linhvucs not found");
        List<LinhVucDto> linhVucs = linhVucDtos.Data;
        foreach (var linhVuc in linhVucs)
        {
            BaoCaoTongHop07aElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == linhVuc.Ma);
            if (res != null) res.TenThongKe = linhVuc.Ten;
            else
            {
                res = new BaoCaoTongHop07aElementResponse();
                res.MaThongKe = linhVuc.Ma;
                res.TenThongKe = linhVuc.Ten;
            }

            result.Add(res);
        }

        return result;
    }

    public async Task<BaoCaoTongHopResponse<BaoCaoTongHop07aElementResponse>> Handle(BaoCaoTongHop07aRequest request, CancellationToken cancellationToken)
    {
        List<BaoCaoTongHop07aElementResponse> result = await GetBaoCao06(request, cancellationToken);
        return new BaoCaoTongHopResponse<BaoCaoTongHop07aElementResponse>(result);
    }
}