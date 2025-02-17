using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuDvcTrucTuyen;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766.TTHC;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
public class SearchThuTucTheoBaoCaoTongHopHandler : IRequestHandler<SearchThuTucTheoBaoCaoTongHop, PaginationResponse<ThuTucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly string donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly string hoSosTableName = "Business.HoSos";
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    private readonly ThongKeTTHCWhereBuilder _whereBuilder;
    public SearchThuTucTheoBaoCaoTongHopHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
        _whereBuilder = new ThongKeTTHCWhereBuilder();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    }
    public async Task<PaginationResponse<ThuTucDto>> Handle(SearchThuTucTheoBaoCaoTongHop request, CancellationToken cancellationToken)
    {
        string where = string.Empty;
        QuyetDinh766ChiTieuDVCTrucTuyenWhereBuilder whereBuilder = new QuyetDinh766ChiTieuDVCTrucTuyenWhereBuilder(hoSosTableName);
        if (!string.IsNullOrEmpty(request.TieuChi))
        {
            var tmp = string.Empty;
            switch (request.TieuChi.ToLower())
            {
                case "tthctructuyentoantrinh":
                    tmp = $"{donViThuTucTableName}.MucDo = '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}' ";
                    break;
                case "tongtthctructuyen":
                    tmp = $"{donViThuTucTableName}.MucDo IN ('{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}','{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}') ";
                    break;
                case "tthctructuyenmotphan":
                    tmp = $"{donViThuTucTableName}.MucDo = '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}' ";
                    break;
                case "tthcconlai":
                    tmp = $"{donViThuTucTableName}.MucDo NOT IN ('{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}','{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}') ";
                    break;
                case "tongtthcthuphi":
                    tmp = _whereBuilder.TongTTHCThuPhi;
                    break;
                case "tthcthuphitructuyentoantrinh":
                    tmp = _whereBuilder.TTHCThuPhiTrucTuyenToanTrinh;
                    break;
                case "tthcthuphitructuyenmotphan":
                    tmp = _whereBuilder.TTHCThuPhiTrucTuyenMotPhan;
                    break;
                case "tthcthuphiconlai":
                    tmp = _whereBuilder.TTHCThuPhiConLai;
                    break;
                case "thutucdvc":
                    tmp = $"{donViThuTucTableName}.MucDo = '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}' ";
                    break;

                    break;
            }
            if (!string.IsNullOrEmpty(tmp)) where += "AND " + tmp;
        }
        if (!string.IsNullOrEmpty(request.MaLinhVuc))
            where += $" AND {thuTucTableName}.MaLinhVucChinh = @MaLinhVuc";
        if (!string.IsNullOrEmpty(request.GroupCode))
            if (request.CoPhatSinhHoSo == true) where += $" AND {hoSosTableName}.DonViId = @GroupCode";
            else where += $" AND {donViThuTucTableName}.DonViId = @GroupCode";
        if (!string.IsNullOrEmpty(request.Catalog))
            where += $" AND {groupTableName}.Catalog = @Catalog";
        string orderBy = request.OrderBy != null && request.OrderBy.Length > 0 ? string.Join(", ", request.OrderBy.ToList()) : "ThuTu ASC, TenTTHC ASC";
        string sql = $"SELECT  {thuTucTableName}.MaTTHC ,{thuTucTableName}.ID, {thuTucTableName}.TenTTHC, {thuTucTableName}.TrangThaiPhiLePhi," +
            $"{thuTucTableName}.MaLinhVucChinh, {thuTucTableName}.LinhVucChinh, {thuTucTableName}.NgayCapNhat, {thuTucTableName}.CapThucHien,{thuTucTableName}.ThuTu, " +
            $"{thuTucTableName}.MucDo " +
                $"FROM {donViThuTucTableName} " +
            $"INNER JOIN {thuTucTableName} " +
            $"ON {donViThuTucTableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
            $"INNER JOIN {groupTableName}  " +
            $"ON {groupTableName}.GroupCode = {donViThuTucTableName}.DonViId " +
            $"WHERE " +
            $"{thuTucTableName}.DeletedOn IS NULL " +
            $"AND {donViThuTucTableName}.DeletedOn IS NULL " +
             $"{where}";
        if (request.CoPhatSinhHoSo == true)
        {
            sql = $"SELECT DISTINCT {thuTucTableName}.MaTTHC ,{thuTucTableName}.ID, {thuTucTableName}.TenTTHC, {thuTucTableName}.TrangThaiPhiLePhi," +
            $"{thuTucTableName}.MaLinhVucChinh, {thuTucTableName}.LinhVucChinh, {thuTucTableName}.NgayCapNhat, {thuTucTableName}.CapThucHien,{thuTucTableName}.ThuTu, " +
            $"{donViThuTucTableName}.MucDo " +
            $"FROM {hoSosTableName} " +
            $"INNER JOIN {donViThuTucTableName} ON {donViThuTucTableName}.MaTTHC = {hoSosTableName}.MaTTHC AND {donViThuTucTableName}.DonViId = {hoSosTableName}.DonViId " +
             $"INNER JOIN {thuTucTableName} " +
            $"ON {hoSosTableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
            $"WHERE  {hoSosTableName}.DeletedOn IS NULL AND {thuTucTableName}.DeletedOn IS NULL AND {hoSosTableName}.TrangThaiHoSoId IN ({whereBuilder.TRANG_THAI_TIEP_NHAN}) {where}";
        }
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThuTucDto>(sql, request.PageSize, orderBy, cancellationToken, request.PageNumber, request);

        return data;
    }
}
