using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoTrucTuyenTheoThuTuc;
public class HoSoTrucTuyenTheoThuTucHandler : IRequestHandler<HoSoTrucTuyenTheoThuTucRequest, BaoCaoSo06Response<HoSoTrucTuyenTheoThuTucElementResponse>>
{
    private IDapperRepository _dapperRepository;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly IMediator _mediator;
    private readonly ICacheService _cacheService;
    private readonly ICommonServices _commonServices;
    public HoSoTrucTuyenTheoThuTucHandler(IDapperRepository dapperRepository, IMediator mediator, ICacheService cacheService, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _mediator = mediator;
        _cacheService = cacheService;
        _commonServices = commonServices;
    }

    private async Task<List<HoSoTrucTuyenTheoThuTucElementResponse>> GetThongKeHoSoTrucTuyenCapHuyenAsync(HoSoTrucTuyenTheoThuTucRequest request, CancellationToken cancellationToken)
    {
        string whereThuTucs = string.Empty;
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        TiepNhanHoSoTrucTuyenWhereBuilder _where = new TiepNhanHoSoTrucTuyenWhereBuilder(hoSoTableName);
        string where = $"WHERE {hoSoTableName}.MucDo != '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}' " +
            $"AND {hoSoTableName}.DeletedOn IS NULL " +
             $"AND {TablesName.ThuTucsTableName}.DeletedOn IS NULL AND {TablesName.ThuTucsTableName}.SuDung = 1 " +
             $"AND {TablesName.GroupsTableName}.DeletedOn IS NULL " +
            $"AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) ";
        List<HoSoTrucTuyenTheoThuTucElementResponse> result = new List<HoSoTrucTuyenTheoThuTucElementResponse>();

        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  >= @TuNgay ";

        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");

        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  <= @DenNgay ";
        BaseStatisticsWhereBuilder baseWhere = new BaseStatisticsWhereBuilder(request);
        whereThuTucs += baseWhere.where;
        where += baseWhere.where;

        if (request.Catalogs != null && request.Catalogs.Count > 0)
            where += $"AND {TablesName.GroupsTableName}.Catalog IN @Catalogs ";
        string sql = $"(SELECT {hoSoTableName}.MaTTHC MaThongKe, " +
            $"COUNT(CASE WHEN {_where.tongSo} THEN {hoSoTableName}.ID END) TongSo, " +
            $"COUNT(CASE WHEN {_where.tongBCCI} THEN {hoSoTableName}.ID END) TongBCCI, " +
            $"COUNT(CASE WHEN {_where.tongTrucTuyen} THEN {hoSoTableName}.ID END) TongTrucTuyen, " +
            $"COUNT(CASE WHEN {_where.tongTrucTiep} THEN {hoSoTableName}.ID END) TongTrucTiep, " +
            $"COUNT(CASE WHEN {_where.tongMotPhan} THEN {hoSoTableName}.ID END) TongMotPhan, " +
            $"COUNT(CASE WHEN {_where.tongToanTrinh} THEN {hoSoTableName}.ID END) TongToanTrinh, " +
            $"COUNT(CASE WHEN {_where.tongMotPhanBCCI}  THEN {hoSoTableName}.ID END) TongMotPhanBCCI, " +
            $"COUNT(CASE WHEN {_where.tongMotPhanTrucTiep} THEN {hoSoTableName}.ID END) TongMotPhanTrucTiep, " +
            $"COUNT(CASE WHEN {_where.tongMotPhanTrucTuyen} THEN {hoSoTableName}.ID END) TongMotPhanTrucTuyen, " +
            $"COUNT(CASE WHEN {_where.tongToanTrinhBCCI} THEN {hoSoTableName}.ID END) TongToanTrinhBCCI, " +
            $"COUNT(CASE WHEN {_where.tongToanTrinhTrucTiep} THEN {hoSoTableName}.ID END) TongToanTrinhTrucTiep, " +
            $"COUNT(CASE WHEN {_where.tongToanTrinhTrucTuyen} THEN {hoSoTableName}.ID END) TongToanTrinhTrucTuyen " +
           $"FROM {hoSoTableName} " +
            $"INNER JOIN {TablesName.ThuTucsTableName} ON {TablesName.ThuTucsTableName}.MaTTHC = {hoSoTableName}.MaTTHC " +
           $"INNER JOIN {TablesName.GroupsTableName} " +
           $"ON {hoSoTableName}.DonViId = {TablesName.GroupsTableName}.GroupCode " +
           $"{where} " +
            $"Group By {hoSoTableName}.MaTTHC " +
           $")";
        var hoSos = await _dapperRepository.QueryAsync<HoSoTrucTuyenTheoThuTucElementResponse>(sql,
            new
            {
                MotPhan = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN,
                ToanTrinh = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH,
                BCCI = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.BCCI,
                TrucTiep = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP,
                TrucTuyen = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN,
                request.Catalogs,
                request.Catalog,
                TuNgay = tuNgay,
                DenNgay = denNgay,
                request.MaDinhDanhCha,
                request.MaDinhDanh
            });

        // search Thủ tục
        whereThuTucs += $" AND {TablesName.ThuTucsTableName}.MucDo IN  ('{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}','{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}') ";
        if (!string.IsNullOrEmpty(request.LinhVucId)) whereThuTucs += $" AND {TablesName.ThuTucsTableName}.MaLinhVucChinh = @LinhVucId ";
        string sqlThuTucs = $"SELECT {TablesName.ThuTucsTableName}.MaTTHC, {TablesName.ThuTucsTableName}.TenTTHC, {TablesName.ThuTucsTableName}.MucDo FROM {TablesName.ThuTucsTableName} " +
            $"INNER JOIN {TablesName.DonViThuTucsTableName} ON {TablesName.ThuTucsTableName}.MaTTHC = {TablesName.DonViThuTucsTableName}.MaTTHC " +
            $"INNER JOIN {TablesName.GroupsTableName} ON {TablesName.GroupsTableName}.GroupCode = {TablesName.DonViThuTucsTableName}.DonViId " +
            $"WHERE {TablesName.ThuTucsTableName}.DeletedOn IS NULL AND {TablesName.DonViThuTucsTableName}.DeletedOn IS NULL AND {TablesName.ThuTucsTableName}.SuDung = 1 {whereThuTucs} ";
        var thuTucs = await _dapperRepository.QueryAsync<ThuTucDto>(sqlThuTucs, request, null, cancellationToken);
        if (thuTucs == null) throw new Exception("Thutucs not found");
        foreach (var thuTuc in thuTucs)
        {
            HoSoTrucTuyenTheoThuTucElementResponse res = hoSos.FirstOrDefault(t => t.MaThongKe == thuTuc.MaTTHC);
            if (res != null)
            {
                res.TenThongKe = thuTuc.TenTTHC;
                res.MucDo = thuTuc.MucDo;
                if (request.CoPhatSinhHoSo != false) result.Add(res);
            }
            else
            {
                res = new HoSoTrucTuyenTheoThuTucElementResponse();
                res.MucDo = thuTuc.MucDo;
                res.MaThongKe = thuTuc.MaTTHC;
                res.TenThongKe = thuTuc.TenTTHC;
                if (request.CoPhatSinhHoSo != true) result.Add(res);
            }

        }

        return result;
    }

    public async Task<BaoCaoSo06Response<HoSoTrucTuyenTheoThuTucElementResponse>> Handle(HoSoTrucTuyenTheoThuTucRequest request, CancellationToken cancellationToken)
    {
        if (request.cache == true)
        {
            var cacheResult = _cacheService.Get<List<HoSoTrucTuyenTheoThuTucElementResponse>>($"HoSoTrucTuyenCapHuyen_{request.Catalog}_{request.TuNgay}_{request.DenNgay}" +
                $"_{request.MaDinhDanhCha}_{request.MaDinhDanh}_{request.ChiBaoGomDonViCon}_{request.LaDuLieuThongKeCacNam}");
            if (cacheResult != null) return new BaoCaoSo06Response<HoSoTrucTuyenTheoThuTucElementResponse>(cacheResult);
        }

        List<HoSoTrucTuyenTheoThuTucElementResponse> result = await GetThongKeHoSoTrucTuyenCapHuyenAsync(request, cancellationToken);
        if (request.cache == true) _cacheService.Set($"HoSoTrucTuyenCapHuyen_{request.Catalog}_{request.TuNgay}_{request.DenNgay}" +
        $"_{request.MaDinhDanhCha}_{request.MaDinhDanh}_{request.ChiBaoGomDonViCon}_{request.LaDuLieuThongKeCacNam}", result, TimeSpan.FromMinutes(10));
        return new BaoCaoSo06Response<HoSoTrucTuyenTheoThuTucElementResponse>(result);
    }
}