using Newtonsoft.Json;
using System.Collections.Generic;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSo;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class DuLieuThongKeTheoThangQueryHandler : ICommandHandler<DuLieuThongKeTheoThangQuery, List<DuLieuThongKeTheoThangDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly ICacheService _cacheService;
    private readonly string groupTableName = "Catalog.Groups";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly ICommonServices _commonServices;
    public DuLieuThongKeTheoThangQueryHandler(IDapperRepository dapperRepository, ICacheService cacheService, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _commonServices = commonServices;
    }

    public async Task<Result<List<DuLieuThongKeTheoThangDto>>> Handle(DuLieuThongKeTheoThangQuery request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string cacheName = $"ThongKeHoSoTheoKy_{JsonConvert.SerializeObject(request)}_{currentTime.Year}_{currentTime.Month}_{currentTime.Day}";
        if (request.Cache == true)
        {
            var cacheResult = _cacheService.Get<List<DuLieuThongKeTheoThangDto>>(cacheName);
            if (cacheResult != null) return Result<List<DuLieuThongKeTheoThangDto>>.Success(cacheResult);
        }
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        List<DuLieuThongKeTheoThangDto> result = new List<DuLieuThongKeTheoThangDto>();
        // string whereBuilder = SearchDuLieuThongKeQueryWhereBuilder.Build(request);
        var builder = new ThongKeWhereBuilder(request.TuNgay.ToString(), request.DenNgay.ToString(), request.Year, hoSoTableName);
        int thangBatDau = request.TuNgay.Month;
        int thangKetThuc = request.DenNgay.Month;
        string sql = $@"SELECT 
            COUNT(CASE WHEN ({builder.where.TiepNhanKyTruoc}) THEN {hoSoTableName}.Id END) HoSoTuKyTruoc,
            COUNT(CASE WHEN ({builder.where.TiepNhanTrucTiep}) THEN {hoSoTableName}.Id END) TiepNhanTrucTiep,
            COUNT(CASE WHEN ({builder.where.TiepNhanQuaMang}) THEN {hoSoTableName}.Id END) TiepNhanQuaMang,
            COUNT(CASE WHEN ({builder.where.TiepNhanQuaBCCI}) THEN {hoSoTableName}.Id END) TiepNhanQuaBCCI,
            COUNT(CASE WHEN ({builder.where.TiepNhan}) THEN {hoSoTableName}.Id END) HoSoMoiTiepNhan,
            COUNT(CASE WHEN ({builder.where.DangXuLyVaBoSung}) THEN {hoSoTableName}.Id END) DangXuLy,
            COUNT(CASE WHEN ({builder.where.DaXuLyVaTraLai}) THEN {hoSoTableName}.Id END) TongSoHoSoDaXuLy,
            COUNT(CASE WHEN ({builder.where.DaXuLyVaTraLaiTrongKy}) THEN {hoSoTableName}.Id END) TongSoHoSoDaXuLyTrongKy,
            COUNT(CASE WHEN ({builder.where.DaXuLyDungHanTruocHanVaTraLai}) THEN {hoSoTableName}.Id END) HoSoDaXuLyDungHan,
            COUNT(CASE WHEN ({builder.where.DaXuLyQuaHan}) THEN {hoSoTableName}.Id END) HoSoDaXuLyQuaHan
            FROM {hoSoTableName}
            INNER JOIN {thuTucTableName} on {hoSoTableName}.MaTTHC = {thuTucTableName}.MaTTHC
            INNER JOIN {groupTableName} on {hoSoTableName}.DonViId = {groupTableName}.GroupCode
            WHERE {hoSoTableName}.DeletedOn IS NULL
            AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai}))
            AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";
        for (int i = thangBatDau; i <= thangKetThuc; i++)
        {
            int nam = request.TuNgay.Year;
            int lastDay = DateTime.DaysInMonth(nam, i);

            if (i == currentTime.Month && nam == currentTime.Year)
            {
                if (currentTime.Day == 1) break;
                lastDay = currentTime.AddDays(-1).Day;
            }

            string tuNgay = $"{nam}-{i}-01";
            string denNgay = $"{nam}-{i}-{lastDay}";
            DuLieuThongKeTheoThangDto res = await _dapperRepository.QueryFirstOrDefaultAsync<DuLieuThongKeTheoThangDto>(sql, new { TuNgay = tuNgay, DenNgay = denNgay }, null, cancellationToken);
            res.Thang = i;
            res.Nam = request.Year;
            if(res != null) result.Add(res);
        }

        // var data = await _cacheService.GetOrSetAsync(request,
        // async () => await _dapperRepository.QueryAsync<DuLieuThongKeTheoThangDto>(sql, request),
        // TimeSpan.FromMinutes(request.CacheTime ?? 30),
        // cancellationToken);
        if (request.Cache == true) _cacheService.Set(cacheName, result, TimeSpan.FromHours(6));
        return Result<List<DuLieuThongKeTheoThangDto>>.Success(result);
    }
}