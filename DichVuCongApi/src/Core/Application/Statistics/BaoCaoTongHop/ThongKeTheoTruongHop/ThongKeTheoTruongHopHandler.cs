using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
using TD.DichVuCongApi.Domain.Business.Events;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeTheoTruongHop;
public class ThongKeTheoTruongHopHandler : IRequestHandler<ThongKeTheoTruongHopRequest, BaoCaoTongHopBaseResponse>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly ICacheService _cacheService;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    private readonly ICommonServices _commonServices;
    public ThongKeTheoTruongHopHandler(IDapperRepository dapperRepository, IMediator mediator, ICacheService cacheService, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _cacheService = cacheService;
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _commonServices = commonServices;
    }

    private async Task<List<BaoCaoTongHopBaseElementResponse>> GetBaoCaoTongHopDonVi(ThongKeTheoTruongHopRequest request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string cacheName = $"ThongKeTheoTruongHop_{JsonConvert.SerializeObject(request)}_{currentTime.Year}_{currentTime.Month}_{currentTime.Day}";
        if (request.cache == true)
        {
            var cacheResult = _cacheService.Get<List<BaoCaoTongHopBaseElementResponse>>(cacheName);
            if (cacheResult != null) return cacheResult;
        }

        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        List<BaoCaoTongHopBaseElementResponse> result = new List<BaoCaoTongHopBaseElementResponse>();
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");

        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);
        var where = builder.where;
        /*  string cataLogWhere = string.Empty;
          if (!string.IsNullOrEmpty(request.Catalog))
          {
               cataLogWhere = $"AND {groupTableName}.Catalog = @Catalog";
          }*/
        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) " +
            $"OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) " +
            $"AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) " +
            $"AND  {hoSoTableName}.MucDo != '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}' AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay";
        if (!string.IsNullOrEmpty(request.MaDonViCha)) totalWhere += $" AND ({TablesName.GroupsTableName}.OfGroupCode = @MaDonViCha)";
        if (!string.IsNullOrEmpty(request.KenhThucHien)) totalWhere += $" AND ({hoSoTableName}.KenhThucHien = @KenhThucHien)";
        if (!string.IsNullOrEmpty(request.MucDo)) totalWhere += $" AND ({hoSoTableName}.KenhThucHien = @MucDo)";
        if (request.LoaiDoiTuong == LoaiChuHoSoConstant.CongDan)
        {
            totalWhere += $" AND {hoSoTableName}.LoaiDoiTuong != N'{LoaiChuHoSoConstant.DoanhNghiep}' AND {hoSoTableName}.LoaiDoiTuong != N'{LoaiChuHoSoConstant.CoQuanNhaNuoc}' ";
        }
        else if (!string.IsNullOrEmpty(request.LoaiDoiTuong))
        {
            totalWhere += $" AND {hoSoTableName}.LoaiDoiTuong = @LoaiDoiTuong ";
        }
        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            if (request.ChiBaoGomDonViCon == true)
            {
                totalWhere += $" AND (MaDinhDanh Like @MaDinhDanhCha +'%' AND MaDinhDanh != @MaDinhDanhCha) ";
            }
            else
            {
                totalWhere += $" AND MaDinhDanh Like @MaDinhDanhCha +'%' ";
            }
        }

        if (!string.IsNullOrEmpty(request.MaDinhDanh))
            totalWhere += " AND MaDinhDanh = @MaDinhDanh ";
        if (!string.IsNullOrEmpty(request.Catalog) && string.IsNullOrEmpty(request.MaDinhDanh) && string.IsNullOrEmpty(request.MaDinhDanhCha))
            totalWhere += " AND Catalog = @Catalog ";
        if (!string.IsNullOrEmpty(request.MaTTHC))
            totalWhere += $" AND  {hoSoTableName}.MaTTHC = @MaTTHC ";
        string sql = $"SELECT {hoSoTableName}.MaTruongHop MaThongKe, {TablesName.GroupsTableName}.GroupCode MaDonVi, {TablesName.ThuTucsTableName}.MaTTHC, " +
             $"COUNT({hoSoTableName}.Id) TongSo, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanKyTruoc}) THEN {hoSoTableName}.Id END) TiepNhanKyTruoc," +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanTrongKy}) THEN {hoSoTableName}.Id END) TiepNhanTrongKy," +
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
            $"INNER JOIN {TablesName.ThuTucsTableName} ON {hoSoTableName}.MaTTHC = {TablesName.ThuTucsTableName}.MaTTHC " +
            $"INNER JOIN {TablesName.GroupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {TablesName.GroupsTableName}.GroupCode " +
            $"{totalWhere} " +
            $"GROUP BY {hoSoTableName}.MaTruongHop, {TablesName.GroupsTableName}.GroupCode,{TablesName.ThuTucsTableName}.MaTTHC";
        var resBaoCao = await _dapperRepository.QueryAsync<BaoCaoTongHopBaseElementResponse>(sql, new
        {
            request.MaDonViCha,
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.KenhThucHien,
            request.LoaiDoiTuong,
            request.MaDinhDanh,
            request.MaDinhDanhCha,
            request.Catalog,
            request.MucDo,
            request.MaTTHC
        }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchTruongHopTheoBaoCaoTongHopRequest queryGroups = new SearchTruongHopTheoBaoCaoTongHopRequest();
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.ChiBaoGomDonViCon = request.ChiBaoGomDonViCon;
        queryGroups.PageNumber = request.PageNumber;
        queryGroups.PageSize = request.PageSize;
        queryGroups.Catalog = request.Catalog;
        queryGroups.ThuTucId = request.MaTTHC;
        queryGroups.Type = "don-vi";
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<TruongHopThuTucDto> groups = groupsDto.Data.ToList();
        foreach (var group in groups)
        {
            BaoCaoTongHopBaseElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.Ma && t.MaDonVi == group.MaDonVi && t.MaTTHC == group.MaTTHC);
            if (res != null)
            {
                res.TenThongKe = group.Ten;
                res.TenDonVi = group.TenDonVi;
                res.MaDonVi = group.MaDonVi;
                res.TenTTHC = group.TenTTHC;
                res.MaTTHC = group.MaTTHC;
            }
            else
            {
                res = new BaoCaoTongHopBaseElementResponse();
                res.MaThongKe = group.Ma;
                res.TenThongKe = group.Ten;
                res.MaDonVi = group.MaDonVi;
                res.TenTTHC = group.TenTTHC;
                res.MaTTHC = group.MaTTHC;
                res.TenDonVi = group.TenDonVi;
            }

            result.Add(res);
        }

        if (request.cache == true) _cacheService.Set(cacheName, result, TimeSpan.FromDays(1));
        return result;
    }

    public async Task<BaoCaoTongHopBaseResponse> Handle(ThongKeTheoTruongHopRequest request, CancellationToken cancellationToken)
    {
        List<BaoCaoTongHopBaseElementResponse> result = await GetBaoCaoTongHopDonVi(request, cancellationToken);

        return new BaoCaoTongHopBaseResponse(result);
    }
}

