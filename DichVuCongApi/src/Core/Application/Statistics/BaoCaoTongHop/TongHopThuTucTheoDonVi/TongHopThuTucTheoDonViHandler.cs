using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;
using TD.DichVuCongApi.Application.Application.Catalog.DonViThuTucApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class TongHopThuTucTheoDonViHandler : IRequestHandler<TongHopThuTucTheoDonViRequest, BaoCaoTongHopResponse<TongHopThuTucElementResponse>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly ICommonServices _commonServices;
    public TongHopThuTucTheoDonViHandler(IDapperRepository dapperRepository, IMediator mediator, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _commonServices = commonServices;
    }

    private async Task<List<TongHopThuTucElementResponse>> GetBaoCaoTongHopThuTucTheoDonVi(TongHopThuTucTheoDonViRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        List<TongHopThuTucElementResponse> result = new List<TongHopThuTucElementResponse>();
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);

        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND {TablesName.ThuTucsTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";
        if (!string.IsNullOrEmpty(request.MaDonVi)) totalWhere += $" AND ({hoSoTableName}.DonViId = @MaDonVi)";
        if (!string.IsNullOrEmpty(request.MaDinhDanh)) totalWhere += $" AND ({TablesName.GroupsTableName}.MaDinhDanh = @MaDinhDanh)";
        if (!string.IsNullOrEmpty(request.Catalog)) totalWhere += $" AND ({TablesName.GroupsTableName}.Catalog = @Catalog)";

        string sql = $"SELECT {TablesName.ThuTucsTableName}.MaTTHC MaThongKe, {TablesName.GroupsTableName}.GroupCode MaDonVi, {TablesName.ThuTucsTableName}.MucDo, " +
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
            $"INNER JOIN {TablesName.ThuTucsTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {TablesName.ThuTucsTableName}.MaTTHC " +
            $"INNER JOIN {TablesName.GroupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {TablesName.GroupsTableName}.GroupCode " +
            $"{totalWhere} " +
            $"GROUP BY {TablesName.ThuTucsTableName}.MaTTHC, {TablesName.ThuTucsTableName}.MucDo,{TablesName.GroupsTableName}.GroupCode ";
        var resBaoCao = await _dapperRepository.QueryAsync<TongHopThuTucElementResponse>(sql, new
        {
            request.MaDinhDanhCha,
            request.MaDinhDanh,
            request.MaDonVi,
            request.Catalog,
            request.DonViQuanLy,
            request.MaTTHC,
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
            where += $" AND {TablesName.GroupsTableName}.MaDinhDanh = @MaDinhDanh";
        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
            where += $" AND {TablesName.GroupsTableName}.MaDinhDanh LIKE @MaDinhDanhCha + '%'";
        if (!string.IsNullOrEmpty(request.Catalog))
            where += $" AND {TablesName.GroupsTableName}.Catalog = @Catalog ";
        if (!string.IsNullOrEmpty(request.MaTTHC)) where += $" AND {TablesName.ThuTucsTableName}.MaTTHC = @MaTTHC";
        if (request.SuDung == true)
        {
            where += $" AND {TablesName.ThuTucsTableName}.SuDung = 1";
        }
        else if (request.SuDung == false)
        {
            where += $" AND {TablesName.ThuTucsTableName}.SuDung = 0";
        }

        string sqlThuTucs = $"SELECT {TablesName.ThuTucsTableName}.MaTTHC, {TablesName.ThuTucsTableName}.TenTTHC, {TablesName.ThuTucsTableName}.MucDo, {TablesName.ThuTucsTableName}.LinhVucChinh, {TablesName.ThuTucsTableName}.MaLinhVucChinh, {TablesName.DonViThuTucsTableName}.DonViId, {TablesName.GroupsTableName}.GroupName FROM {TablesName.ThuTucsTableName} " +
            $"INNER JOIN {TablesName.DonViThuTucsTableName} ON {TablesName.ThuTucsTableName}.MaTTHC = {TablesName.DonViThuTucsTableName}.MaTTHC " +
            $"INNER JOIN {TablesName.GroupsTableName} ON {TablesName.GroupsTableName}.GroupCode = {TablesName.DonViThuTucsTableName}.DonViId " +
            $"WHERE {TablesName.ThuTucsTableName}.DeletedOn IS NULL AND {TablesName.DonViThuTucsTableName}.DeletedOn IS NULL {where} " +
            $"ORDER BY {TablesName.GroupsTableName}.GroupOrder, {TablesName.GroupsTableName}.MaDinhDanh, {TablesName.GroupsTableName}.GroupCode ";
        var thuTucs = await _dapperRepository.QueryAsync<DonViThuTucDetailDto>(sqlThuTucs, request, null, cancellationToken);
        if (thuTucs == null) throw new Exception("Thutucs not found");
        foreach (var thuTuc in thuTucs)
        {
            TongHopThuTucElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == thuTuc.MaTTHC);
            if (res != null)
            {
                res.TenThongKe = thuTuc.TenTTHC ?? string.Empty;
                res.TenDonVi = thuTuc.GroupName;
                res.LinhVucChinh = thuTuc.LinhVucChinh;
                res.MaLinhVucChinh = thuTuc.MaLinhVucChinh;
                if(request.CoPhatSinhHoSo != false) result.Add(res);
            }
            else
            {
                res = new TongHopThuTucElementResponse();
                res.MucDo = thuTuc.MucDo;
                res.LinhVucChinh = thuTuc.LinhVucChinh;
                res.MaLinhVucChinh = thuTuc.MaLinhVucChinh;
                res.MaThongKe = thuTuc.MaTTHC;
                res.TenThongKe = thuTuc.TenTTHC ?? string.Empty;
                res.TenDonVi = thuTuc.GroupName;
                res.MaDonVi = thuTuc.DonViId;
                if (request.CoPhatSinhHoSo != true) result.Add(res);
            }

        }

        return result;
    }

    public async Task<BaoCaoTongHopResponse<TongHopThuTucElementResponse>> Handle(TongHopThuTucTheoDonViRequest request, CancellationToken cancellationToken)
    {
        List<TongHopThuTucElementResponse> result = await GetBaoCaoTongHopThuTucTheoDonVi(request, cancellationToken);
        return new BaoCaoTongHopResponse<TongHopThuTucElementResponse>(result);
    }
}
