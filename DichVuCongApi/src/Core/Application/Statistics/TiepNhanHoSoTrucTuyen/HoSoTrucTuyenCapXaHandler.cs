using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;

namespace TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

public class HoSoTrucTuyenCapXaHandler : IRequestHandler<HoSoTrucTuyenCapXaRequest, TiepNhanHoSoTrucTuyenCapXaResponse>
{
    private IDapperRepository _dapperRepository;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly IMediator _mediator;
    private readonly ICacheService _cacheService;
    private readonly ICommonServices _commonServices;
    public HoSoTrucTuyenCapXaHandler(IDapperRepository dapperRepository, IMediator mediator, ICacheService cacheService, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _mediator = mediator;
        _cacheService = cacheService;
        _commonServices = commonServices;
    }
    private async Task<List<TiepNhanHoSoTrucTuyenCapXaElm>> GetThongKeHoSoTrucTuyenCapXaAsync(HoSoTrucTuyenCapXaRequest request)
    {
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        TiepNhanHoSoTrucTuyenWhereBuilder _where = new TiepNhanHoSoTrucTuyenWhereBuilder(hoSoTableName);
        string where = $"WHERE {hoSoTableName}.MucDo != '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}' " +
            $"AND {hoSoTableName}.DeletedOn IS NULL " +
             $"AND {TablesName.ThuTucsTableName}.DeletedOn IS NULL " +
             $"AND {TablesName.GroupsTableName}.DeletedOn IS NULL " +
            $"AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) " +
            $"AND {TablesName.GroupsTableName}.Catalog = '{_tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG}' AND {TablesName.GroupsTableName}.Type = 'don-vi'";
        List<TiepNhanHoSoTrucTuyenCapXaElm> result = new List<TiepNhanHoSoTrucTuyenCapXaElm>();
        List<GroupDto> groups = new List<GroupDto>();
        List<GroupDto> xaPhuongs = new List<GroupDto>();
        // Lấy danh sách quận huyện;
        SearchGroupQuery requestGroupParams = new SearchGroupQuery();
        requestGroupParams.Catalog = _tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN;
        requestGroupParams.Type = "don-vi";
        requestGroupParams.MaDinhDanh = request.MaDinhDanh;
        requestGroupParams.MaDinhDanhCha = request.MaDinhDanhCha;
        requestGroupParams.ChiBaoGomDonViCon = request.ChiBaoGomDonViCon;
        requestGroupParams.PageNumber = 1;
        requestGroupParams.PageSize = 1000;
        requestGroupParams.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        var resultGroups = await _mediator.Send(requestGroupParams);
        if (resultGroups.Data == null) throw new Exception($"{_tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN} groups not found");
        groups = resultGroups.Data;
        //// Lấy tất cả danh sách xã phường
        //SearchGroupQuery searchXaPhuongParams = new SearchGroupQuery();
        //searchXaPhuongParams.Catalog = _tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG;
        ////searchXaPhuongParams.Type = "don-vi";
        //searchXaPhuongParams.PageNumber = 1;
        //searchXaPhuongParams.PageSize = 10000;
        //var resultXaPhuongs = await _mediator.Send(searchXaPhuongParams);
        //if(resultXaPhuongs.Data == null) throw new Exception($"{_tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG} groups not found");
        //xaPhuongs = resultXaPhuongs.Data;
        // Query dữ liệu thống kê (hồ sơ thuộc xã phường)

        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");


        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  >= @TuNgay ";

        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");

        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  <= @DenNgay ";

        string sql = $"(SELECT {TablesName.GroupsTableName}.GroupCode MaDonVi, " +
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
          $"Group By {TablesName.GroupsTableName}.GroupCode " +
         $")";
        var hoSos = await _dapperRepository.QueryAsync<TiepNhanHoSoTrucTuyenCapXaElm>(sql,
            new
            {
                MotPhan = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN,
                ToanTrinh = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH,
                BCCI = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.BCCI,
                TrucTiep = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP,
                TrucTuyen = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN,
                TuNgay = tuNgay,
                DenNgay = denNgay,
            });
        foreach (var group in groups)
        {
            List<TiepNhanHoSoTrucTuyenCapXaElm> tmpResult = new List<TiepNhanHoSoTrucTuyenCapXaElm>();
            TiepNhanHoSoTrucTuyenCapXaElm resQuanHuyen = new TiepNhanHoSoTrucTuyenCapXaElm(group.GroupCode, group.GroupName);
            SearchGroupQuery searchXaPhuongParams = new SearchGroupQuery();
            searchXaPhuongParams.Catalog = _tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG;
            searchXaPhuongParams.Type = "don-vi";
            searchXaPhuongParams.OfGroupCode = group.GroupCode;
            searchXaPhuongParams.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
            searchXaPhuongParams.GetAllChildren = true;
            searchXaPhuongParams.PageNumber = 1;
            searchXaPhuongParams.PageSize = 10000;
            var resultXaPhuongs = await _mediator.Send(searchXaPhuongParams);
            if (resultXaPhuongs.Data != null)
            {
                xaPhuongs = resultXaPhuongs.Data;

                foreach (var item in xaPhuongs)
                {
                    TiepNhanHoSoTrucTuyenCapXaElm res = new TiepNhanHoSoTrucTuyenCapXaElm(item.GroupCode, item.GroupName);
                    var tmpHoSos = hoSos.Where(t => t.MaDonVi == item.GroupCode);
                    foreach (var itemHs in tmpHoSos)
                    {
                        resQuanHuyen.TongSo += itemHs.TongSo;
                        resQuanHuyen.TongTrucTuyen += itemHs.TongTrucTuyen;
                        resQuanHuyen.TongTrucTiep += itemHs.TongTrucTiep;
                        resQuanHuyen.TongBCCI += itemHs.TongBCCI;
                        res.TongSo += itemHs.TongSo;
                        res.TongTrucTuyen += itemHs.TongTrucTuyen;
                        res.TongTrucTiep += itemHs.TongTrucTiep;
                        res.TongBCCI += itemHs.TongBCCI;

                        resQuanHuyen.TongToanTrinh += itemHs.TongToanTrinh;
                        resQuanHuyen.TongToanTrinhTrucTiep += itemHs.TongToanTrinhTrucTiep;
                        resQuanHuyen.TongToanTrinhTrucTuyen += itemHs.TongToanTrinhTrucTuyen;
                        resQuanHuyen.TongToanTrinhBCCI += itemHs.TongToanTrinhBCCI;

                        res.TongToanTrinh += itemHs.TongToanTrinh;
                        res.TongToanTrinhTrucTiep += itemHs.TongToanTrinhTrucTiep;
                        res.TongToanTrinhTrucTuyen += itemHs.TongToanTrinhTrucTuyen;
                        res.TongToanTrinhBCCI += itemHs.TongToanTrinhBCCI;
                        resQuanHuyen.TongMotPhan += itemHs.TongMotPhan;
                        resQuanHuyen.TongMotPhanTrucTiep += itemHs.TongMotPhanTrucTiep;
                        resQuanHuyen.TongMotPhanTrucTuyen += itemHs.TongMotPhanTrucTuyen;
                        resQuanHuyen.TongMotPhanBCCI += itemHs.TongMotPhanBCCI;

                        res.TongMotPhan += itemHs.TongMotPhan;
                        res.TongMotPhanTrucTiep += itemHs.TongMotPhanTrucTiep;
                        res.TongMotPhanTrucTuyen += itemHs.TongMotPhanTrucTuyen;
                        res.TongMotPhanBCCI += itemHs.TongMotPhanBCCI;
                    }

                    tmpResult.Add(res);
                }

                resQuanHuyen.ThanhPhan.AddRange(tmpResult);
                result.Add(resQuanHuyen);
            }
        }
        return result;

    }
    public async Task<TiepNhanHoSoTrucTuyenCapXaResponse> Handle(HoSoTrucTuyenCapXaRequest request, CancellationToken cancellationToken)
    {
        // if (request.cache == true)
        // {
        //    var cacheResult = _cacheService.Get<List<TiepNhanHoSoTrucTuyenCapXaElm>>($"HoSoTrucTuyenCapXa_{request.TuNgay}_{request.DenNgay}");
        //    if (cacheResult != null) return new TiepNhanHoSoTrucTuyenCapXaResponse(cacheResult);
        // }
        List<TiepNhanHoSoTrucTuyenCapXaElm> result = await GetThongKeHoSoTrucTuyenCapXaAsync(request);
        if (request.cache == true) _cacheService.Set($"HoSoTrucTuyenCapXa_{request.TuNgay}_{request.DenNgay}", result, TimeSpan.FromMinutes(10));
        return new TiepNhanHoSoTrucTuyenCapXaResponse(result);
    }
}
