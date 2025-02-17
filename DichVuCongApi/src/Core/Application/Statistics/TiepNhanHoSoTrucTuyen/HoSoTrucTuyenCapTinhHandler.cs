using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.TiepNhanHoSo;
public class HoSoTrucTuyenCapTinhHandler : IRequestHandler<HoSoTrucTuyenCapTinhRequest, TiepNhanHoSoTrucTuyenResponse>
{
    private IDapperRepository _dapperRepository;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly ICacheService _cacheService;
    private readonly ICommonServices _commonServices;
    public HoSoTrucTuyenCapTinhHandler(IDapperRepository dapperRepository, ICacheService cacheService, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _commonServices = commonServices;
    }
    private async Task<List<TiepNhanHoSoTrucTuyenElm>> GetThongKeHoSoTrucTuyenCapTinhAsync(HoSoTrucTuyenCapTinhRequest request)
    {
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        TiepNhanHoSoTrucTuyenWhereBuilder _where = new TiepNhanHoSoTrucTuyenWhereBuilder(hoSoTableName);
        string query = string.Empty;
        string where = $"WHERE {hoSoTableName}.MucDo IN ('{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}','{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}','{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}')  AND {hoSoTableName}.DeletedOn IS NULL AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) ";
        List<TiepNhanHoSoTrucTuyenElm> result = new List<TiepNhanHoSoTrucTuyenElm>();
        result.Add(new TiepNhanHoSoTrucTuyenElm(_tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH, "Sở, ban, ngành cấp tỉnh"));
        result.Add(new TiepNhanHoSoTrucTuyenElm(_tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN, "UBND cấp huyện"));
        result.Add(new TiepNhanHoSoTrucTuyenElm(_tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG, "UBND cấp xã"));
        result.Add(new TiepNhanHoSoTrucTuyenElm("total", "Tổng cộng toàn tỉnh (I+II+III)"));

        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");


        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  >= @TuNgay ";


        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");

        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  <= @DenNgay ";


        string sql = $"(SELECT {TablesName.GroupsTableName}.Catalog MaDonVi, " +
          $"COUNT(CASE WHEN {_where.tongSo} THEN {hoSoTableName}.ID END) TongSo, " +
            $"COUNT(CASE WHEN {_where.tongBCCI} THEN {hoSoTableName}.ID END) TongBCCI, " +
            $"COUNT(CASE WHEN {_where.tongTrucTuyen} THEN {hoSoTableName}.ID END) TongTrucTuyen, " +
            $"COUNT(CASE WHEN {_where.tongTrucTiep} THEN {hoSoTableName}.ID END) TongTrucTiep, " +
            $"COUNT(CASE WHEN {_where.tongDvc} THEN {hoSoTableName}.ID END) TongDvc, " +
            $"COUNT(CASE WHEN {_where.tongMotPhan} THEN {hoSoTableName}.ID END) TongMotPhan, " +
            $"COUNT(CASE WHEN {_where.tongToanTrinh} THEN {hoSoTableName}.ID END) TongToanTrinh, " +
            $"COUNT(CASE WHEN {_where.tongMotPhanBCCI}  THEN {hoSoTableName}.ID END) TongMotPhanBCCI, " +
            $"COUNT(CASE WHEN {_where.tongMotPhanTrucTiep} THEN {hoSoTableName}.ID END) TongMotPhanTrucTiep, " +
            $"COUNT(CASE WHEN {_where.tongMotPhanTrucTuyen} THEN {hoSoTableName}.ID END) TongMotPhanTrucTuyen, " +
            $"COUNT(CASE WHEN {_where.tongDvcBCCI}  THEN {hoSoTableName}.ID END) TongDvcBCCI, " +
            $"COUNT(CASE WHEN {_where.tongDvcTrucTiep} THEN {hoSoTableName}.ID END) TongDvcTrucTiep, " +
            $"COUNT(CASE WHEN {_where.tongDvcTrucTuyen} THEN {hoSoTableName}.ID END) TongDvcTrucTuyen, " +
            $"COUNT(CASE WHEN {_where.tongToanTrinhBCCI} THEN {hoSoTableName}.ID END) TongToanTrinhBCCI, " +
            $"COUNT(CASE WHEN {_where.tongToanTrinhTrucTiep} THEN {hoSoTableName}.ID END) TongToanTrinhTrucTiep, " +
            $"COUNT(CASE WHEN {_where.tongToanTrinhTrucTuyen} THEN {hoSoTableName}.ID END) TongToanTrinhTrucTuyen " +
           $"FROM {hoSoTableName} " +
           $"INNER JOIN {TablesName.ThuTucsTableName} ON {TablesName.ThuTucsTableName}.MaTTHC = {hoSoTableName}.MaTTHC " +
           $"INNER JOIN {TablesName.GroupsTableName} " +
           $"ON {hoSoTableName}.DonViId = {TablesName.GroupsTableName}.GroupCode " +
           $"{where} " +
            $"Group By {TablesName.GroupsTableName}.Catalog " +
           $")";
        var hoSos = await _dapperRepository.QueryAsync<TiepNhanHoSoTrucTuyenElm>(sql,
            new
            {
                MotPhan = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN,
                ToanTrinh = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH,
                BCCI = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.BCCI,
                TrucTiep = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP,
                TrucTuyen = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN,
                Dvc = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC,
                TuNgay = tuNgay,
                DenNgay = denNgay,

            });
        foreach (var res in result)
        {
            var tmpHoSos = res.MaDonVi == "total" ? hoSos.Where(t => !string.IsNullOrEmpty(t.MaDonVi)) :
               res.MaDonVi == "so-ban-nganh" ? hoSos.Where(t => t.MaDonVi == res.MaDonVi || t.MaDonVi == $"{_tiepNhanHoSoTrucTuyenConstants.CATALOG.CNVPDK}") : hoSos.Where(t => t.MaDonVi == res.MaDonVi);
            foreach (var itemHs in tmpHoSos)
            {
                res.TongSo += itemHs.TongSo;
                res.TongTrucTuyen += itemHs.TongTrucTuyen;
                res.TongTrucTiep += itemHs.TongTrucTiep;
                res.TongDvc += itemHs.TongDvc;
                res.TongBCCI += itemHs.TongBCCI;
                res.TongToanTrinh += itemHs.TongToanTrinh;
                res.TongToanTrinhTrucTiep += itemHs.TongToanTrinhTrucTiep;
                res.TongToanTrinhTrucTuyen += itemHs.TongToanTrinhTrucTuyen;
                res.TongToanTrinhBCCI += itemHs.TongToanTrinhBCCI;

                res.TongMotPhan += itemHs.TongMotPhan;
                res.TongMotPhanTrucTiep += itemHs.TongMotPhanTrucTiep;
                res.TongMotPhanTrucTuyen += itemHs.TongMotPhanTrucTuyen;
                res.TongMotPhanBCCI += itemHs.TongMotPhanBCCI;
                res.TongDvcTrucTiep += itemHs.TongDvcTrucTiep;
                res.TongDvcTrucTuyen += itemHs.TongDvcTrucTuyen;
                res.TongDvcBCCI += itemHs.TongDvcBCCI;
            }
        }
        return result;

    }
    public async Task<TiepNhanHoSoTrucTuyenResponse> Handle(HoSoTrucTuyenCapTinhRequest request, CancellationToken cancellationToken)
    {
        //if (request.cache == true)
        //{
        //    var cacheResult = _cacheService.Get<List<TiepNhanHoSoTrucTuyenElm>>($"HoSoTrucTuyenCapTinh_{request.TuNgay}_{request.DenNgay}");
        //    if (cacheResult != null) return new TiepNhanHoSoTrucTuyenResponse(cacheResult);
        //}
        List<TiepNhanHoSoTrucTuyenElm> result = await GetThongKeHoSoTrucTuyenCapTinhAsync(request);
        if (request.cache == true) _cacheService.Set($"HoSoTrucTuyenCapTinh_{request.TuNgay}_{request.DenNgay}", result, TimeSpan.FromMinutes(10));
        return new TiepNhanHoSoTrucTuyenResponse(result);
    }
}
