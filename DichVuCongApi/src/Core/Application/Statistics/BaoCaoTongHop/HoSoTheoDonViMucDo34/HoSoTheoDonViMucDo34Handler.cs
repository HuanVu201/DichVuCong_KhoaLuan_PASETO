using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.DonViThuTucApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoTheoDonViMucDo34;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoTrucTuyenTheoThuTuc;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSo;
using TD.DichVuCongApi.Domain.Catalog;
namespace TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

public class HoSoTheoDonViMucDo34Handler : IRequestHandler<HoSoTheoDonViMucDo34Request, BaoCaoSo06Response<HoSoTheoDonViMucDo34ElementResponse>>
{
    private IDapperRepository _dapperRepository;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;

    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly IMediator _mediator;
    private readonly ICacheService _cacheService;
    private readonly ICommonServices _commonServices;
    public HoSoTheoDonViMucDo34Handler(IDapperRepository dapperRepository, IMediator mediator, ICacheService cacheService, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _mediator = mediator;
        _cacheService = cacheService;
        _commonServices = commonServices;
    }

    private async Task<List<HoSoTheoDonViMucDo34ElementResponse>> GetThongKeHoSoTheoDonViMucDo34Async(HoSoTheoDonViMucDo34Request request, CancellationToken cancellationToken)
    {
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        TiepNhanHoSoTrucTuyenWhereBuilder _where = new TiepNhanHoSoTrucTuyenWhereBuilder(hoSoTableName);
        string where = $"WHERE {hoSoTableName}.MucDo != '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}' " +
            $"AND {hoSoTableName}.DeletedOn IS NULL " +
             $"AND {TablesName.ThuTucsTableName}.DeletedOn IS NULL AND {TablesName.ThuTucsTableName}.SuDung = 1 " +
             $"AND {TablesName.GroupsTableName}.DeletedOn IS NULL " +
            $"AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) ";
        List<HoSoTheoDonViMucDo34ElementResponse> result = new List<HoSoTheoDonViMucDo34ElementResponse>();
        List<GroupDto> groups = new List<GroupDto>();
        SearchGroupQuery requestGroupParams = new SearchGroupQuery();
        requestGroupParams.OfGroupCode = request.MaDonViCha;
        requestGroupParams.MaDinhDanhCha = request.MaDinhDanhCha;
        requestGroupParams.MaDinhDanh = request.MaDinhDanh;
        requestGroupParams.PageNumber = request.PageNumber;
        requestGroupParams.PageSize = request.PageSize;
        requestGroupParams.Catalog = request.Catalog;
        requestGroupParams.Type = "don-vi";
        requestGroupParams.ChiBaoGomDonViCon = request.ChiBaoGomDonViCon;
        requestGroupParams.PageNumber = 1;
        requestGroupParams.PageSize = 1000;
        var resultGroups = await _mediator.Send(requestGroupParams);
        if (resultGroups.Data == null) throw new Exception($"{request.Catalog} groups not found");
        groups = resultGroups.Data;
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  >= @TuNgay ";
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  <= @DenNgay ";

        BaseStatisticsWhereBuilder baseWhere = new BaseStatisticsWhereBuilder(request);
        where += baseWhere.where;
        if (request.Catalogs != null && request.Catalogs.Count > 0)
            where += $"AND {TablesName.GroupsTableName}.Catalog IN @Catalogs ";
        string sql = $"(SELECT {TablesName.GroupsTableName}.GroupCode MaThongKe, " +
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
        var hoSos = await _dapperRepository.QueryAsync<HoSoTheoDonViMucDo34ElementResponse>(sql,
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
                request.Catalog,
                request.MaDinhDanh,
                request.MaDinhDanhCha
            });

        // Thống kê thủ tục đạt chỉ tiêu/ không đạt/ không phát sinh hồ sơ.

        string sqlTTHC = $@"SELECT  {TablesName.GroupsTableName}.GroupCode MaThongKe ,{TablesName.DonViThuTucsTableName}.MaTTHC, {TablesName.ThuTucsTableName}.MucDo
            , COUNT(DISTINCT MaHoSo ) TongSo
            , COUNT(DISTINCT  CASE  WHEN KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}' THEN MaHoSo END) TrucTuyen
	        from Catalog.DonViThuTucs  
	        INNER JOIN Catalog.ThuTucs ON {TablesName.DonViThuTucsTableName}.MaTTHC = {TablesName.ThuTucsTableName}.MaTTHC
	        LEFT JOIN {hoSoTableName} ON {TablesName.DonViThuTucsTableName}.MaTTHC = {hoSoTableName}.MaTTHC
	        INNER JOIN Catalog.Groups  ON {hoSoTableName}.DonViId = {TablesName.GroupsTableName}.GroupCode
	        {where} AND {TablesName.ThuTucsTableName}.DeletedOn IS NULL AND {TablesName.GroupsTableName}.DeletedOn IS NULL AND {TablesName.DonViThuTucsTableName}.DeletedOn IS NULL
            GROUP BY {TablesName.GroupsTableName}.GroupCode, {TablesName.DonViThuTucsTableName}.MaTTHC, {TablesName.ThuTucsTableName}.MucDo";
        var hoSosTheoTTHCCs = await _dapperRepository.QueryAsync<HoSoTrucTuyenTheoTTHCElement>(sqlTTHC,
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
                request.Catalog,
                request.MaDinhDanh,
                request.MaDinhDanhCha
            });

        // search thủ tục theo đơn vị
        string sqlThuTucs = $"SELECT {TablesName.ThuTucsTableName}.MaTTHC, {TablesName.ThuTucsTableName}.TenTTHC, {TablesName.ThuTucsTableName}.MucDo, {TablesName.DonViThuTucsTableName}.DonViId, {TablesName.GroupsTableName}.GroupName FROM {TablesName.ThuTucsTableName} " +
           $"INNER JOIN {TablesName.DonViThuTucsTableName} ON {TablesName.ThuTucsTableName}.MaTTHC = {TablesName.DonViThuTucsTableName}.MaTTHC " +
           $"INNER JOIN {TablesName.GroupsTableName} ON {TablesName.GroupsTableName}.GroupCode = {TablesName.DonViThuTucsTableName}.DonViId " +
           $"WHERE {TablesName.ThuTucsTableName}.DeletedOn IS NULL AND {TablesName.ThuTucsTableName}.SuDung = 1  AND {TablesName.ThuTucsTableName}.MucDo IN  ('{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}','{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}') AND {TablesName.DonViThuTucsTableName}.DeletedOn IS NULL {baseWhere.where} ";
        var thuTucs = await _dapperRepository.QueryAsync<DonViThuTucDetailDto>(sqlThuTucs, request, null, cancellationToken);
        foreach (var group in groups)
        {
            if (string.IsNullOrEmpty(group.MaDinhDanh)) continue;
            var res = hoSos.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.TenThongKe = group.GroupName;
            }
            else
            {
                res = new HoSoTheoDonViMucDo34ElementResponse();
                res.MaThongKe = group.GroupCode;
                res.TenThongKe = group.GroupName;
            }

            if (hoSosTheoTTHCCs != null && hoSosTheoTTHCCs.Count > 0)
            {
                // lấy tổng hồ sơ, tổng hồ sơ trực tuyến theo đơn vị thủ tục của từng đơn vị
                var hoSosTheoTTHCC = hoSosTheoTTHCCs.Where(t => t.MaThongKe == group.GroupCode);
                if (hoSosTheoTTHCC != null)
                {
                    // đếm số tthc đạt/không đạt chỉ tiêu hoặc không phát sinh hồ sơ

                    foreach (var item in hoSosTheoTTHCC)
                    {
                        if (item.TongSo <= 0) { res.TTHCKhongPhatSinhHoSo += 1; }
                        else
                        {
                            double tyLeTrucTuyen = group.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH ? _baoCaoTongHopConstants.TY_LE_TRUC_TUYEN_CAP_TINH :
                               group.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN ? _baoCaoTongHopConstants.TY_LE_TRUC_TUYEN_CAP_HUYEN :
                               group.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG ? _baoCaoTongHopConstants.TY_LE_TRUC_TUYEN_CAP_XA : 0;

                            if (Math.Round((double)(item.TrucTuyen / item.TongSo), 2)
                                >= tyLeTrucTuyen) res.TTHCDatChiTieu += 1;
                            else res.TTHCKhongDatChiTieu += 1;

                        }

                    }
                }

                if(thuTucs != null && thuTucs.Count > 0)
                {
                    var tmpThuTucs = thuTucs.Where(t => t.DonViId == group.GroupCode).ToList();
                    if(tmpThuTucs != null && tmpThuTucs.Count > 0)
                    {
                        res.TTHCKhongPhatSinhHoSo = tmpThuTucs.Count - res.TTHCKhongDatChiTieu - res.TTHCDatChiTieu > 0
                      ? tmpThuTucs.Count - res.TTHCKhongDatChiTieu - res.TTHCDatChiTieu : 0;
                    }
                }
            }

            result.Add(res);
        }

        return result;

    }

    public async Task<BaoCaoSo06Response<HoSoTheoDonViMucDo34ElementResponse>> Handle(HoSoTheoDonViMucDo34Request request, CancellationToken cancellationToken)
    {
        // if (request.cache == true)
        // {
        //    var cacheResult = _cacheService.Get<List<HoSoTheoDonViMucDo34ElementResponse>>($"HoSoTheoDonViMucDo34_{request.Catalog}_{request.TuNgay}_{request.DenNgay}");
        //    if (cacheResult != null) return new BaoCaoSo06Response<HoSoTheoDonViMucDo34ElementResponse>(cacheResult);
        // }

        List<HoSoTheoDonViMucDo34ElementResponse> result = await GetThongKeHoSoTheoDonViMucDo34Async(request,cancellationToken);
        if (request.cache == true) _cacheService.Set($"HoSoTheoDonViMucDo34_{request.Catalog}_{request.TuNgay}_{request.DenNgay}", result, TimeSpan.FromMinutes(10));
        return new BaoCaoSo06Response<HoSoTheoDonViMucDo34ElementResponse>(result);
    }
}
