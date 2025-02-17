using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSo;
namespace TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

public class HoSoTrucTuyenCapHuyenHandler : IRequestHandler<HoSoTrucTuyenCapHuyenRequest, TiepNhanHoSoTrucTuyenResponse>
{
    private IDapperRepository _dapperRepository;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly IMediator _mediator;
    private readonly ICacheService _cacheService;
    private readonly ICommonServices _commonServices;
    public HoSoTrucTuyenCapHuyenHandler(IDapperRepository dapperRepository, IMediator mediator, ICacheService cacheService, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _mediator = mediator;
        _cacheService = cacheService;
     
        _commonServices = commonServices;
    }

    private async Task<List<TiepNhanHoSoTrucTuyenElm>> GetThongKeHoSoTrucTuyenCapHuyenAsync(HoSoTrucTuyenCapHuyenRequest request)
    {
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        TiepNhanHoSoTrucTuyenWhereBuilder _where = new TiepNhanHoSoTrucTuyenWhereBuilder(hoSoTableName);
        //if(string.IsNullOrEmpty(request.Catalog) && request.Catalogs == null) throw new ArgumentNullException(nameof(request.Catalog));
        string where = $"WHERE {hoSoTableName}.MucDo != '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}' " +
        $"AND {hoSoTableName}.DeletedOn IS NULL " +
        $"AND {TablesName.ThuTucsTableName}.DeletedOn IS NULL " +
        $"AND {TablesName.GroupsTableName}.DeletedOn IS NULL " +
        $"AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) ";
        List<TiepNhanHoSoTrucTuyenElm> result = new List<TiepNhanHoSoTrucTuyenElm>();
        List<GroupDto> groups = new List<GroupDto>();
        SearchGroupQuery requestGroupParams = new SearchGroupQuery();
        requestGroupParams.Catalog = request.Catalog;
        requestGroupParams.Catalogs = request.Catalogs;
        requestGroupParams.MaDinhDanh = request.MaDinhDanh;
        requestGroupParams.MaDinhDanhCha = request.MaDinhDanhCha;
        requestGroupParams.ChiBaoGomDonViCon = request.ChiBaoGomDonViCon;
        requestGroupParams.Type = "don-vi";
        requestGroupParams.CoThongKe = true;
        requestGroupParams.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        requestGroupParams.PageNumber = 1;
        requestGroupParams.PageSize = 1000;
        var resultGroups = await _mediator.Send(requestGroupParams);
        if (resultGroups.Data == null) throw new Exception($"{request.Catalog} groups not found");
        groups = resultGroups.Data;
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  >= @TuNgay ";
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  <= @DenNgay ";
        if (!string.IsNullOrEmpty(request.Catalog))
            where += $"AND {TablesName.GroupsTableName}.Catalog = '{request.Catalog}' ";

        if (request.Catalogs != null && request.Catalogs.Count > 0)
            where += $"AND {TablesName.GroupsTableName}.Catalog IN @Catalogs ";
        string sql = $"(SELECT {TablesName.GroupsTableName}.GroupCode MaDonVi, {TablesName.GroupsTableName}.Catalog, " +
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
            $"Group By {TablesName.GroupsTableName}.GroupCode,{TablesName.GroupsTableName}.Catalog " +
           $")";
        var hoSos = await _dapperRepository.QueryAsync<TiepNhanHoSoTrucTuyenElm>(sql,
            new
            {
                MotPhan = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN,
                ToanTrinh = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH,
                BCCI = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.BCCI,
                TrucTiep = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP,
                TrucTuyen = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN,
                request.Catalogs,
                TuNgay = tuNgay,
                DenNgay = denNgay,
            });
        foreach (var group in groups)
        {
            TiepNhanHoSoTrucTuyenElm res = new TiepNhanHoSoTrucTuyenElm(group.GroupCode, group.GroupName);
            var tmpHoSos = res.MaDonVi == "total" ? hoSos.Where(t => !string.IsNullOrEmpty(t.MaDonVi)) : hoSos.Where(t => t.MaDonVi == res.MaDonVi);
            foreach (var itemHs in tmpHoSos)
            {
                res.TongSo += itemHs.TongSo;
                res.TongTrucTuyen += itemHs.TongTrucTuyen;
                res.TongTrucTiep += itemHs.TongTrucTiep;
                res.TongBCCI += itemHs.TongBCCI;
                res.TongToanTrinh += itemHs.TongToanTrinh;
                res.TongToanTrinhTrucTiep += itemHs.TongToanTrinhTrucTiep;
                res.TongToanTrinhTrucTuyen += itemHs.TongToanTrinhTrucTuyen;
                res.TongToanTrinhBCCI += itemHs.TongToanTrinhBCCI;

                res.TongMotPhan += itemHs.TongMotPhan;
                res.TongMotPhanTrucTiep += itemHs.TongMotPhanTrucTiep;
                res.TongMotPhanTrucTuyen += itemHs.TongMotPhanTrucTuyen;
                res.TongMotPhanBCCI += itemHs.TongMotPhanBCCI;
            }

            result.Add(res);
        }

        return result;

    }

    public async Task<TiepNhanHoSoTrucTuyenResponse> Handle(HoSoTrucTuyenCapHuyenRequest request, CancellationToken cancellationToken)
    {
        //if(request.cache == true)
        //{
        //    var cacheResult = _cacheService.Get<List<TiepNhanHoSoTrucTuyenElm>>($"HoSoTrucTuyenCapHuyen_{request.Catalog}_{request.TuNgay}_{request.DenNgay}");
        //    if (cacheResult != null) return new TiepNhanHoSoTrucTuyenResponse(cacheResult);
        //}

        List<TiepNhanHoSoTrucTuyenElm> result = await GetThongKeHoSoTrucTuyenCapHuyenAsync(request);
        if (request.cache == true) _cacheService.Set($"HoSoTrucTuyenCapHuyen_{request.Catalog}_{request.TuNgay}_{request.DenNgay}", result, TimeSpan.FromMinutes(10));
        return new TiepNhanHoSoTrucTuyenResponse(result);
    }
}
