using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchTheoBaoCaoHoSoTrucTuyenHandler : IRequestHandler<SearchTheoBaoCaoHoSoTrucTuyenRequest, PaginationResponse<HoSoDto>>
{
    private readonly string groupTableName = "Catalog.Groups";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly IDapperRepository _dapperRepository;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    private readonly ICommonServices _commonServices;
    public SearchTheoBaoCaoHoSoTrucTuyenHandler(IDapperRepository dapperRepository, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _commonServices = commonServices;
    }

    public async Task<PaginationResponse<HoSoDto>> Handle(SearchTheoBaoCaoHoSoTrucTuyenRequest request, CancellationToken cancellationToken)
    {
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        string where = string.Empty;
        if (!string.IsNullOrEmpty(request.Catalog))
            if (request.Catalog.ToLower() == "total") where += $" AND {groupTableName}.Catalog IS NOT NULL "; else where += $" AND {groupTableName}.Catalog = @Catalog ";
        if (request.Catalogs != null && request.Catalogs.Count > 0)
            where += $" AND {groupTableName}.Catalog IN @Catalogs ";
        if (!string.IsNullOrEmpty(request.MaDonVi)) where += $" AND {hoSoTableName}.DonViId = @MaDonVi ";
        if (!string.IsNullOrEmpty(request.MaTTHC)) where += $" AND {hoSoTableName}.MaTTHC = @MaTTHC ";
        if (request.LaHoSoTrucTuyen == true) where += $" AND {hoSoTableName}.MucDo IN ('{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}', '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}')";
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  >= @TuNgay ";
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        where += $"AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan ,23)  <= @DenNgay ";
        BaseStatisticsWhereBuilder baseWhere = new BaseStatisticsWhereBuilder(request);
        where += baseWhere.where;

        var builder = new TiepNhanHoSoTrucTuyenWhereBuilder(hoSoTableName);
        if (!string.IsNullOrEmpty(request.TieuChi))
        {
            var tmpSql = builder.GetType().GetProperty(request.TieuChi).GetValue(builder, null);
            if (tmpSql != null) where += $"AND {tmpSql} ";
        }
        string sql = $"SELECT {hoSoTableName}.ID, {hoSoTableName}.ChuHoSo, {hoSoTableName}.SoDienThoaiChuHoSo, {hoSoTableName}.EmailChuHoSo, {hoSoTableName}.MaTruongHop, {hoSoTableName}.MaTTHC, {hoSoTableName}.TrangThaiHoSoId," +
            $"{hoSoTableName}.UyQuyen, {hoSoTableName}.NgayTiepNhan, {hoSoTableName}.NgayHenTra,{hoSoTableName}.NgayTra, {hoSoTableName}.CreatedOn, {hoSoTableName}.MaHoSo, {hoSoTableName}.KenhThucHien, {thuTucTableName}.TenTTHC, " +
            $"{groupTableName}.GroupName as TenDonVi, {hoSoTableName}.NgayNopHoSo, {hoSoTableName}.SoGiayToChuHoSo,{thuTucTableName}.MaLinhVucChinh " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {thuTucTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
            $"INNER JOIN {groupTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupTableName}.GroupCode " +
            $"WHERE {hoSoTableName}.MucDo IN ('{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}', '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}', '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}')  AND {hoSoTableName}.DeletedOn IS NULL " +
            $"AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoDto>(sql, request.PageSize, "CreatedOn Desc", cancellationToken, request.PageNumber, new
        {
            request.MaDonVi,
            request.Catalog,
            request.Catalogs,
            MotPhan = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN,
            ToanTrinh = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH,
            BCCI = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.BCCI,
            TrucTiep = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP,
            TrucTuyen = _tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN,
            Dvc = _tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC,
            TuNgay= tuNgay,
            DenNgay = denNgay,
            request.MaDinhDanh,
            request.MaDinhDanhCha,
            request.MaTTHC
        });
        return data;
    }
}
