using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;
using TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.BaoCaoTongHopDonVi;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeLinhVucTheoDonVi;
public class ThongKeLinhVucTheoDonViHanlder : IRequestHandler<ThongKeLinhVucTheoDonViRequest, BaoCaoTongHopBaseResponse>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly ICommonServices _commonServices;
    public ThongKeLinhVucTheoDonViHanlder(IDapperRepository dapperRepository, IMediator mediator, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _commonServices = commonServices;
    }
    private async Task<List<BaoCaoTongHopBaseElementResponse>> GetBaoCaoTongHopLinhVuc(ThongKeLinhVucTheoDonViRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        if (string.IsNullOrEmpty(request.Catalog) && string.IsNullOrEmpty(request.MaDinhDanh) && string.IsNullOrEmpty(request.MaDinhDanhCha)) throw new ArgumentNullException("Vui lòng chọn đơn vị thống kê");
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        List<BaoCaoTongHopBaseElementResponse> result = new List<BaoCaoTongHopBaseElementResponse>();
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new BaoCaoTongHopDonViWhereBuilder(tuNgay, denNgay, null, hoSoTableName);

        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND {TablesName.ThuTucsTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";
        BaseStatisticsWhereBuilder baseWhere = new BaseStatisticsWhereBuilder(request);
        totalWhere += baseWhere.where;
        string sql = $"SELECT {TablesName.ThuTucsTableName}.MaLinhVucChinh MaThongKe, {hoSoTableName}.DonViId MaDonVi, " +
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
            $"COUNT(CASE WHEN ({builder.where.BoSung}) THEN {hoSoTableName}.Id END) TongBoSung " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {TablesName.ThuTucsTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {TablesName.ThuTucsTableName}.MaTTHC " +
            $"INNER JOIN {TablesName.GroupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {TablesName.GroupsTableName}.GroupCode " +
            $"{totalWhere} " +
            $"GROUP BY {TablesName.ThuTucsTableName}.MaLinhVucChinh, {hoSoTableName}.DonViId";
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
        SearchDonViLinhVucRequest queryThuTucs = new SearchDonViLinhVucRequest();
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
            BaoCaoTongHopBaseElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == linhVuc.Ma && t.MaDonVi == linhVuc.GroupCode);
            if (res != null)
            {
                res.TenThongKe = linhVuc.Ten;
                res.TenDonVi = linhVuc.GroupName;
            }
            else
            {
                res = new BaoCaoTongHopBaseElementResponse();
                res.MaThongKe = linhVuc.Ma;
                res.TenThongKe = linhVuc.Ten;
                res.TenDonVi = linhVuc.GroupName;
                res.MaDonVi = linhVuc.GroupCode;
            }

            result.Add(res);
        }

        return result;
    }

    public async Task<BaoCaoTongHopBaseResponse> Handle(ThongKeLinhVucTheoDonViRequest request, CancellationToken cancellationToken)
    {
        List<BaoCaoTongHopBaseElementResponse> result = await GetBaoCaoTongHopLinhVuc(request, cancellationToken);
        return new BaoCaoTongHopBaseResponse(result);
    }
}