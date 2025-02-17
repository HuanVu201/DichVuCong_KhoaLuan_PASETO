using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;
using TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.BaoCaoTongHop06aCacCap;
public class BaoCaoSo06aCacCapHandler : IRequestHandler<BaoCaoSo06aCacCapRequest, BaoCaoSo06Response<BaoCaoSo06ElementResponse>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly ICommonServices _commonServices;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public BaoCaoSo06aCacCapHandler(IDapperRepository dapperRepository, IMediator mediator, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _commonServices = commonServices;
    }
    private async Task<List<BaoCaoSo06ElementResponse>> GetBaoCao06(BaoCaoSo06aCacCapRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        List<BaoCaoSo06ElementResponse> result = new List<BaoCaoSo06ElementResponse>();
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);

        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";
        BaseStatisticsWhereBuilder baseWhere = new BaseStatisticsWhereBuilder(request);
        if (!string.IsNullOrEmpty(request.MaDinhDanh)) totalWhere += $" AND ({TablesName.GroupsTableName}.MaDinhDanh = @MaDinhDanh)";
        string sql = $"SELECT {TablesName.ThuTucsTableName}.MaLinhVucChinh MaThongKe, {TablesName.GroupsTableName}.Catalog , " +
            $"COUNT({hoSoTableName}.Id) TongSo, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanKyTruoc}) THEN {hoSoTableName}.Id END) TiepNhanKyTruoc," +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanTrucTiepVaBCCI}) THEN {hoSoTableName}.Id END) TiepNhanTrucTiepVaBCCI," +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaMang}) THEN {hoSoTableName}.Id END) TiepNhanQuaMang," +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyVaTraLai}) THEN {hoSoTableName}.Id END) DaXuLyVaTraLai, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyTruocHan}) THEN {hoSoTableName}.Id END) DaXuLyTruocHan, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyDungHanVaTraLai}) THEN {hoSoTableName}.Id END) DaXuLyDungHanVaTraLai, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyQuaHan}) THEN {hoSoTableName}.Id END) DaXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyVaBoSung}) THEN {hoSoTableName}.Id END) DangXuLyVaBoSung, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyTrongHanVaBoSung}) THEN {hoSoTableName}.Id END) DangXuLyTrongHanVaBoSung, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyQuaHan}) THEN {hoSoTableName}.Id END) DangXuLyQuaHan " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {TablesName.ThuTucsTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {TablesName.ThuTucsTableName}.MaTTHC " +
            $"INNER JOIN {TablesName.LinhVucsTableName} ON {TablesName.LinhVucsTableName}.Ma = {TablesName.ThuTucsTableName}.MaLinhVucChinh " +
            $"INNER JOIN {TablesName.GroupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {TablesName.GroupsTableName}.GroupCode " +
            $"{totalWhere} {baseWhere.where} " +
            $"GROUP BY {TablesName.ThuTucsTableName}.MaLinhVucChinh, {TablesName.GroupsTableName}.Catalog";
        var resBaoCao = await _dapperRepository.QueryAsync<BaoCaoSo06ElementResponse>(sql, new
        {
            request.MaDinhDanhCha,
            request.Catalog,
            request.MaDinhDanh,
            request.MaDonVi,
            TuNgay = tuNgay,
            DenNgay = denNgay,
        }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
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
            if (linhVuc != null)
            {
                if ((string.IsNullOrEmpty(request.Catalog) || request.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH) && linhVuc.SoLuongThuTucCapTinh > 0)
                {

                    var tmpRes = resBaoCao.FirstOrDefault(t => (t.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH || t.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.CNVPDK) && t.MaThongKe == linhVuc.Ma);
                    if (tmpRes != null)
                    {
                        tmpRes.TenThongKe = linhVuc.Ten;
                        result.Add(tmpRes);
                    }
                    else
                    {
                        var res = new BaoCaoSo06ElementResponse();
                        res.TenThongKe = linhVuc.Ten;
                        res.MaThongKe = linhVuc.Ma;
                        res.Catalog = _tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH;
                        result.Add(res);
                    }
                }

                if ((request.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.CNVPDK) && linhVuc.SoLuongThuTucCapTinh > 0)
                {

                    var tmpRes = resBaoCao.FirstOrDefault(t => t.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.CNVPDK && t.MaThongKe == linhVuc.Ma);
                    if (tmpRes != null)
                    {
                        tmpRes.TenThongKe = linhVuc.Ten;
                        result.Add(tmpRes);
                    }
                    else
                    {
                        var res = new BaoCaoSo06ElementResponse();
                        res.TenThongKe = linhVuc.Ten;
                        res.MaThongKe = linhVuc.Ma;
                        res.Catalog = _tiepNhanHoSoTrucTuyenConstants.CATALOG.CNVPDK;
                        result.Add(res);
                    }
                }

                if ((string.IsNullOrEmpty(request.Catalog) || (request.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN && request.ChiBaoGomDonViCon != true)) && linhVuc.SoLuongThuTucCapHuyen > 0)
                {
                    var tmpRes = resBaoCao.FirstOrDefault(t => t.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN && t.MaThongKe == linhVuc.Ma);
                    if (tmpRes != null)
                    {
                        tmpRes.TenThongKe = linhVuc.Ten;
                        result.Add(tmpRes);
                    }
                    else
                    {
                        var res = new BaoCaoSo06ElementResponse();
                        res.TenThongKe = linhVuc.Ten;
                        res.MaThongKe = linhVuc.Ma;
                        res.Catalog = _tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN;
                        result.Add(res);
                    }
                }

                if ((string.IsNullOrEmpty(request.Catalog)
                || (request.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN && request.ChiBaoGomDonViCon != false)
                || request.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG)
                && linhVuc.SoLuongThuTucCapXa > 0)
                {
                    var tmpRes = resBaoCao.FirstOrDefault(t => t.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG && t.MaThongKe == linhVuc.Ma);
                    if (tmpRes != null)
                    {
                        tmpRes.TenThongKe = linhVuc.Ten;
                        result.Add(tmpRes);
                    }
                    else
                    {
                        var res = new BaoCaoSo06ElementResponse();
                        res.TenThongKe = linhVuc.Ten;
                        res.MaThongKe = linhVuc.Ma;
                        res.Catalog = _tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG;
                        result.Add(res);
                    }
                }
            }

        }

        return result;
    }

    public async Task<BaoCaoSo06Response<BaoCaoSo06ElementResponse>> Handle(BaoCaoSo06aCacCapRequest request, CancellationToken cancellationToken)
    {

        List<BaoCaoSo06ElementResponse> result = await GetBaoCao06(request, cancellationToken);
        return new BaoCaoSo06Response<BaoCaoSo06ElementResponse>(result);
    }
}
