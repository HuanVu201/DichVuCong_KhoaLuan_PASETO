using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.TTHC;
public class ThongKeTTHCHandler : IRequestHandler<ThongKeTTHCRequest, QuyetDinh766Response<ThongKeTTHCElementResponse>>
{
    private readonly string donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly IDapperRepository _dapperRepository;
    private readonly ThongKeTTHCWhereBuilder _whereBuilder;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public ThongKeTTHCHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
        _whereBuilder = new ThongKeTTHCWhereBuilder();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    }
    public async Task<QuyetDinh766Response<ThongKeTTHCElementResponse>> Handle(ThongKeTTHCRequest request, CancellationToken cancellationToken)
    {
        string where = string.Empty;
        string totalWhere = string.Empty;

        if (!string.IsNullOrEmpty(request.GroupCode)) where += $" AND {groupTableName}.GroupCode = @GroupCode ";
        if (!string.IsNullOrEmpty(request.MaLinhVuc)) where += $" AND {thuTucTableName}.LinhVucChinh = @MaLinhVuc ";
        if (!string.IsNullOrEmpty(request.Catalog))
        {
            if (request.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH && request.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN
               && request.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.CNVPDK && request.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG)
            {
                where += " AND DonViQuanLy = @Catalog ";
            }
            else
            {
                where += " AND Catalog = @Catalog";
            }

        }
        string sql = $"SELECT  NULL AS GroupOrder,{groupTableName}.Catalog, {thuTucTableName}.LinhVucChinh AS TenLinhVuc,{thuTucTableName}.MaLinhVucChinh AS MaLinhVuc, null AS MaDonVi,null AS TenDonVi," +
            $"Count(DISTINCT {thuTucTableName}.MaTTHC) as {nameof(_whereBuilder.TongTTHC)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TTHCTrucTuyenToanTrinh} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TTHCTrucTuyenToanTrinh)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TTHCTrucTuyenMotPhan} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TTHCTrucTuyenMotPhan)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TTHCConLai} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TTHCConLai)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TongTTHCThuPhi} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TongTTHCThuPhi)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TTHCThuPhiTrucTuyenToanTrinh} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TTHCThuPhiTrucTuyenToanTrinh)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TTHCThuPhiTrucTuyenMotPhan} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TTHCThuPhiTrucTuyenMotPhan)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TTHCThuPhiConLai} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TTHCThuPhiConLai)} " +
            $"FROM {donViThuTucTableName} " +
            $"INNER JOIN {thuTucTableName} " +
            $"ON {donViThuTucTableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
            $"INNER JOIN {groupTableName}  " +
            $"ON {groupTableName}.GroupCode = {donViThuTucTableName}.DonViId " +
            $"WHERE {groupTableName}.Catalog != '{_tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH}' " +
            $"AND {thuTucTableName}.DeletedOn IS NULL " +
            $"AND {donViThuTucTableName}.DeletedOn IS NULL  AND {thuTucTableName}.SuDung = 1  " +
            $"{where}" +
            $"GROUP BY {groupTableName}.Catalog, {thuTucTableName}.LinhVucChinh, {thuTucTableName}.MaLinhVucChinh";
        string sqlSoBanNganh = $"SELECT {groupTableName}.GroupOrder, {groupTableName}.Catalog, {thuTucTableName}.LinhVucChinh AS TenLinhVuc,{thuTucTableName}.MaLinhVucChinh AS MaLinhVuc, {groupTableName}.GroupCode AS MaDonVi,{groupTableName}.GroupName AS TenDonVi," +
            $"Count(DISTINCT {thuTucTableName}.MaTTHC) as {nameof(_whereBuilder.TongTTHC)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TTHCTrucTuyenToanTrinh} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TTHCTrucTuyenToanTrinh)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TTHCTrucTuyenMotPhan} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TTHCTrucTuyenMotPhan)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TTHCConLai} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TTHCConLai)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TongTTHCThuPhi} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TongTTHCThuPhi)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TTHCThuPhiTrucTuyenToanTrinh} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TTHCThuPhiTrucTuyenToanTrinh)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TTHCThuPhiTrucTuyenMotPhan} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TTHCThuPhiTrucTuyenMotPhan)}, " +
            $"Count(DISTINCT CASE WHEN {_whereBuilder.TTHCThuPhiConLai} THEN {thuTucTableName}.MaTTHC END) AS {nameof(_whereBuilder.TTHCThuPhiConLai)} " +
            $"FROM {donViThuTucTableName} " +
            $"INNER JOIN {thuTucTableName} " +
            $"ON {donViThuTucTableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
            $"INNER JOIN {groupTableName}  " +
            $"ON {groupTableName}.GroupCode = {donViThuTucTableName}.DonViId " +
            $"WHERE {groupTableName}.Catalog = '{_tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH}' AND {thuTucTableName}.DeletedOn IS NULL " +
            $"AND {donViThuTucTableName}.DeletedOn IS NULL AND {thuTucTableName}.SuDung = 1  " +
            $"{where}" +
            $"GROUP BY {groupTableName}.GroupOrder, {groupTableName}.Catalog, {thuTucTableName}.LinhVucChinh, {thuTucTableName}.MaLinhVucChinh,{groupTableName}.GroupCode,{groupTableName}.GroupName ";

        if (string.IsNullOrEmpty(request.Catalog))
        {
            totalWhere = $"SELECT * FROM ({sql} " +
                $"UNION ALL " +
                $"{sqlSoBanNganh})AS t ORDER BY  GroupOrder, Catalog,TenDonVi,TenLinhVuc";
        }
        else if (request.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH || request.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.TTHCCTH)
        {
            totalWhere = $"{sqlSoBanNganh} ORDER BY  Catalog,TenDonVi,TenLinhVuc";
        }
        else
        {
            totalWhere = $"{sql} ORDER BY  Catalog,TenDonVi,TenLinhVuc";
        }

        var results = await _dapperRepository.QueryAsync<ThongKeTTHCElementResponse>(totalWhere, request, null, cancellationToken);
        var res = new QuyetDinh766Response<ThongKeTTHCElementResponse>(results.ToList());
        return res;
    }
}
