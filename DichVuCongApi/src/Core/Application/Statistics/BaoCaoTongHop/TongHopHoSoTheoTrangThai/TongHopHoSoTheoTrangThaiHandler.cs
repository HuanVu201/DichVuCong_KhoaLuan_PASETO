using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopHoSoTheoTrangThai;
public class TongHopHoSoTheoTrangThaiHandler : IRequestHandler<TongHopHoSoTheoTrangThaiRequest, BaoCaoSo06Response<TongHopHoSoTheoTrangThaiResponse>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string thuTucsTableName = "Catalog.ThuTucs";
    private readonly string groupsTableName = "Catalog.Groups";
    private readonly string donViThuTucsTableName = "Catalog.DonViThuTucs";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly ICommonServices _commonServices;
    public TongHopHoSoTheoTrangThaiHandler(IDapperRepository dapperRepository, IMediator mediator, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _commonServices = commonServices;
    }

    private async Task<List<TongHopHoSoTheoTrangThaiResponse>> GetBaoCao06(TongHopHoSoTheoTrangThaiRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        List<TongHopHoSoTheoTrangThaiResponse> result = new List<TongHopHoSoTheoTrangThaiResponse>();
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND TrangThaiHoSoId IN ('1','2','3','4','5','6','9','10') AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay  ";
        BaseStatisticsWhereBuilder baseWhere = new BaseStatisticsWhereBuilder(request);
        if (!string.IsNullOrEmpty(request.MaDinhDanh)) totalWhere += $" AND ({groupsTableName}.MaDinhDanh = @MaDinhDanh)";
        string sql = $"SELECT {hoSoTableName}.DonViId MaThongKe, " +
            $"COUNT({hoSoTableName}.Id) TongSo, " +
            $"COUNT(CASE WHEN (TrangThaiHoSoId = '1' AND ({hoSoTableName}.LoaiDuLieuKetNoi IN @LoaiDuLieuKetNois)) THEN {hoSoTableName}.Id END) MoiTiepNhan," +
            $"COUNT(CASE WHEN (TrangThaiHoSoId = '2' AND ({hoSoTableName}.LoaiDuLieuKetNoi IN @LoaiDuLieuKetNois)) THEN {hoSoTableName}.Id END) DuocTiepNhan," +
            $"COUNT(CASE WHEN (TrangThaiHoSoId = '3' AND ({hoSoTableName}.LoaiDuLieuKetNoi IN @LoaiDuLieuKetNois)) THEN {hoSoTableName}.Id END) TuChoiTiepNhan," +
            $"COUNT(CASE WHEN (TrangThaiHoSoId = '4' AND ({hoSoTableName}.LoaiDuLieuKetNoi IN @LoaiDuLieuKetNois)) THEN {hoSoTableName}.Id END) DangXuLy, " +
            $"COUNT(CASE WHEN (TrangThaiHoSoId IN ('5','6') AND ({hoSoTableName}.LoaiDuLieuKetNoi IN @LoaiDuLieuKetNois) ) THEN {hoSoTableName}.Id END) BoSungHoSo, " +
            $"COUNT(CASE WHEN (TrangThaiHoSoId = '9' AND ({hoSoTableName}.LoaiDuLieuKetNoi IN @LoaiDuLieuKetNois)) THEN {hoSoTableName}.Id END) DaXuLyXong, " +
            $"COUNT(CASE WHEN (TrangThaiHoSoId = '10'AND ({hoSoTableName}.LoaiDuLieuKetNoi IN @LoaiDuLieuKetNois)) THEN {hoSoTableName}.Id END) DaTraKetQua, " +
            $"COUNT(CASE WHEN ({hoSoTableName}.LoaiDuLieuKetNoi IN @LoaiDuLieuKetNois) THEN {hoSoTableName}.Id END) TongTheoLoaiDuLieuKetNoi, " +
            $"COUNT({hoSoTableName}.Id) TongSo " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {groupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupsTableName}.GroupCode  " +
            $"{totalWhere} {baseWhere.where} " +
            $"GROUP BY {hoSoTableName}.DonViId";
        var resBaoCao = await _dapperRepository.QueryAsync<TongHopHoSoTheoTrangThaiResponse>(sql, new
        {
            request.MaDinhDanhCha,
            request.Catalog,
            request.MaDinhDanh,
            request.MaDonVi,
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.LoaiDuLieuKetNois
        }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.OfGroupCode = request.MaDonViCha;
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.PageNumber = request.PageNumber;
        queryGroups.ChiBaoGomDonViCon = request.ChiBaoGomDonViCon;
        queryGroups.DonViQuanLy = request.DonViQuanLy;
        queryGroups.PageSize = request.PageSize;
        queryGroups.Catalog = request.Catalog;
        queryGroups.Type = "don-vi";
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) return result;
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            if (string.IsNullOrEmpty(group.MaDinhDanh)) continue;
            TongHopHoSoTheoTrangThaiResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null && res.TongTheoLoaiDuLieuKetNoi > 0)
            {
                res.TenThongKe = group.GroupName;
                result.Add(res);
            }

            // else
            // {
            //    res = new TongHopHoSoTheoTrangThaiResponse();
            //    res.MaThongKe = group.GroupCode;
            //    res.TenThongKe = group.GroupName;

            // }

        }

        return result;
    }

    public async Task<BaoCaoSo06Response<TongHopHoSoTheoTrangThaiResponse>> Handle(TongHopHoSoTheoTrangThaiRequest request, CancellationToken cancellationToken)
    {

        List<TongHopHoSoTheoTrangThaiResponse> result = await GetBaoCao06(request, cancellationToken);
        return new BaoCaoSo06Response<TongHopHoSoTheoTrangThaiResponse>(result);
    }
}