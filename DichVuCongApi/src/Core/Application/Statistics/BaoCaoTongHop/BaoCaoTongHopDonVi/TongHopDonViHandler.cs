using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.BaoCaoTongHopDonVi;
using TD.DichVuCongApi.Application.Statistics.TongHopDonVi;
using TD.DichVuCongApi.Domain.Business.Events;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class TongHopDonViHandler : IRequestHandler<TongHopDonViRequest, BaoCaoTongHopBaseResponse>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly ICacheService _cacheService;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly ICommonServices _commonServices;
    public TongHopDonViHandler(IDapperRepository dapperRepository, IMediator mediator, ICacheService cacheService, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _cacheService = cacheService;
        _commonServices = commonServices;
    }

    private async Task<List<BaoCaoTongHopBaseElementResponse>> GetBaoCaoTongHopDonVi(TongHopDonViRequest request, CancellationToken cancellationToken)
    {
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        string cacheName = $"GetBaoCaoTongHopDonViPortal_{JsonConvert.SerializeObject(request)}_{currentTime.Year}_{currentTime.Month}_{currentTime.Day}";
        if (request.cache == true)
        {
            var cacheResult = _cacheService.Get<List<BaoCaoTongHopBaseElementResponse>>(cacheName);
            if (cacheResult != null) return cacheResult;
        }

        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        List<BaoCaoTongHopBaseElementResponse> result = new List<BaoCaoTongHopBaseElementResponse>();
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");

        var builder = new BaoCaoTongHopDonViWhereBuilder(tuNgay, denNgay, null, hoSoTableName);
        var where = builder.where;
        /*  string cataLogWhere = string.Empty;
          if (!string.IsNullOrEmpty(request.Catalog))
          {
               cataLogWhere = $"AND {groupTableName}.Catalog = @Catalog";
          }*/
        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";
        if (!string.IsNullOrEmpty(request.MaDonViCha)) totalWhere += $" AND ({TablesName.GroupsTableName}.OfGroupCode = @MaDonViCha)";
        if (!string.IsNullOrEmpty(request.KenhThucHien)) totalWhere += $" AND ({hoSoTableName}.KenhThucHien = @KenhThucHien)";
        if (!string.IsNullOrEmpty(request.MucDo)) totalWhere += $" AND ({hoSoTableName}.KenhThucHien = @MucDo)";
        if (!string.IsNullOrEmpty(request.LinhVucId)) totalWhere += $" AND {TablesName.ThuTucsTableName}.MaLinhVucChinh = @LinhVucId ";
        if (request.LoaiDoiTuong == LoaiChuHoSoConstant.CongDan)
        {
            totalWhere += $" AND {hoSoTableName}.LoaiDoiTuong != N'{LoaiChuHoSoConstant.DoanhNghiep}' AND {hoSoTableName}.LoaiDoiTuong != N'{LoaiChuHoSoConstant.CoQuanNhaNuoc}' ";
        }
        else if (!string.IsNullOrEmpty(request.LoaiDoiTuong))
        {
            totalWhere += $" AND {hoSoTableName}.LoaiDoiTuong = @LoaiDoiTuong ";
        }

        string sql = $"SELECT {hoSoTableName}.DonViId MaThongKe, " +
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
            $"COUNT(CASE WHEN ({builder.where.TraLaiTruocHan}) THEN {hoSoTableName}.Id END) TraLaiTruocHan, " +
            $"COUNT(CASE WHEN ({builder.where.TraLaiDungHan}) THEN {hoSoTableName}.Id END) TraLaiDungHan, " +
            $"COUNT(CASE WHEN ({builder.where.TraLaiQuaHan}) THEN {hoSoTableName}.Id END) TraLaiQuaHan, " +
            $"COUNT(CASE WHEN ({builder.where.TrangThaiBoSung}) THEN {hoSoTableName}.Id END) TrangThaiBoSung, " +
            $"COUNT(CASE WHEN ({builder.where.TrangThaiDungXuLy}) THEN {hoSoTableName}.Id END) TrangThaiDungXuLy, " +
            $"COUNT(CASE WHEN ({builder.where.TrangThaiYeuCauThucHienNVTC}) THEN {hoSoTableName}.Id END) TrangThaiYeuCauThucHienNVTC, " +
            $"COUNT(CASE WHEN ({builder.where.BoSung}) THEN {hoSoTableName}.Id END) TongBoSung " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {TablesName.ThuTucsTableName} ON {hoSoTableName}.MaTTHC = {TablesName.ThuTucsTableName}.MaTTHC " +
            $"INNER JOIN {TablesName.GroupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {TablesName.GroupsTableName}.GroupCode " +
            $"{totalWhere} " +
            $"GROUP BY {hoSoTableName}.DonViId";


        var resBaoCao = await _dapperRepository.QueryAsync<BaoCaoTongHopBaseElementResponse>(sql, new
        {
            request.MaDonViCha,
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.KenhThucHien,
            request.LoaiDoiTuong,
            request.MucDo,
            request.LinhVucId
        }, null, cancellationToken);


        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.OfGroupCode = request.MaDonViCha;
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.ChiBaoGomDonViCon = request.ChiBaoGomDonViCon;
        queryGroups.PageNumber = request.PageNumber;
        queryGroups.PageSize = request.PageSize;
        queryGroups.Catalog = request.Catalog;
        queryGroups.Type = "don-vi";
        queryGroups.CoThongKe = true;
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {

            if (string.IsNullOrEmpty(group.MaDinhDanh)) continue;
            BaoCaoTongHopBaseElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }
            else
            {
                res = new BaoCaoTongHopBaseElementResponse();
                res.MaThongKe = group.GroupCode;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }

            result.Add(res);
        }

        if (request.cache == true) _cacheService.Set(cacheName, result, TimeSpan.FromDays(1));
        return result;
    }

    public async Task<BaoCaoTongHopBaseResponse> Handle(TongHopDonViRequest request, CancellationToken cancellationToken)
    {
        List<BaoCaoTongHopBaseElementResponse> result = await GetBaoCaoTongHopDonVi(request, cancellationToken);

        return new BaoCaoTongHopBaseResponse(result);
    }
}
