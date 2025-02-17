using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.DonViThuTucApp;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeThanhToan;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopThanhtoan;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopThuTuc;
public class TongHopThuTucPhatSinhHoSoHandler : IRequestHandler<TongHopThuTucPhatSinhHoSoRequest, BaoCaoSo06Response<TongHopThuTucPhatSinhHoSoElementResponse>>
{
    private readonly string donViThuTucsTableName = "Catalog.DonViThuTucs";
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string groupsTableName = "Catalog.Groups";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly TongHopThuTucPhatSinhHoSoWhereBuilder whereBuilder;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly TiepNhanHoSoTrucTuyenConstants tiepNhanHoSoTrucTuyenConstants;
    public TongHopThuTucPhatSinhHoSoHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        whereBuilder = new TongHopThuTucPhatSinhHoSoWhereBuilder();
        _dapperRepository = dapperRepository;
        _mediator = mediator;
    }
    public async Task<BaoCaoSo06Response<TongHopThuTucPhatSinhHoSoElementResponse>> Handle(TongHopThuTucPhatSinhHoSoRequest request, CancellationToken cancellationToken)
    {
       
        string where = string.Empty;
        string tiepNhanTuNgay = string.Empty;
        string tiepNhanDenNgay = string.Empty;

        if (string.IsNullOrEmpty(request.MaDinhDanh) && request.Catalog != $"{tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH}") throw new ArgumentNullException(nameof(request.MaDinhDanh));
        if(!string.IsNullOrEmpty(request.MaDinhDanh))
        {
            where += $" AND {groupsTableName}.MaDinhDanh = @MaDinhDanh ";
        }
        if (request.Catalog == $"{tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH}")
        {
            where += $" AND {groupsTableName}.Catalog = '{tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH}' ";
        }

        if (request.TiepNhanTuNgay.HasValue)
        {
            tiepNhanTuNgay = request.TiepNhanTuNgay.Value.ToString("yyyy-MM-dd");
            where += $" AND {hoSoTableName}.[NgayTiepNhan] >= @TiepNhanTuNgay ";
        }
        if (request.TiepNhanDenNgay.HasValue)
        {
            tiepNhanDenNgay = request.TiepNhanDenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
            where += $" AND {hoSoTableName}.[NgayTiepNhan] <= @TiepNhanDenNgay ";
        }
        if(request.CoPhatSinhHoSo == true)
        {
            where += $" AND TongTiepNhan > 0 ";

        }else if(request.CoPhatSinhHoSo == false)
        {
            where += $" AND TongTiepNhan = 0 ";
        }
        string sql = $"SELECT {donViThuTucsTableName}.DonViId MaDonVi, {donViThuTucsTableName}.MaTTHC,{groupsTableName}.GroupName TenDonVi, {thuTucTableName}.TenTTHC,{thuTucTableName}.MucDo, " +
            $"COUNT({hoSoTableName}.MaHoSo) TongTiepNhan, " +
            $"COUNT(CASE WHEN {whereBuilder.TiepNhanTrucTuyen} THEN {hoSoTableName}.MaHoSo END) TiepNhanTrucTuyen, " +
            $"COUNT(CASE WHEN {whereBuilder.TiepNhanBCCI} THEN {hoSoTableName}.MaHoSo END) TiepNhanBCCI, " +
            $"COUNT(CASE WHEN {whereBuilder.TiepNhanTrucTiep} THEN {hoSoTableName}.MaHoSo END) TiepNhanTrucTiep, " +
            $"COUNT(CASE WHEN {whereBuilder.TraKetQuaQuaBCCI} THEN {hoSoTableName}.MaHoSo END)  TraKetQuaQuaBCCI " +
            $"FROM {donViThuTucsTableName} " +
            $"LEFT JOIN {hoSoTableName} " +
            $"ON {donViThuTucsTableName}.MaTTHC = {hoSoTableName}.MaTTHC " +
            $"INNER JOIN {groupsTableName} ON {donViThuTucsTableName}.DonViId = {groupsTableName}.GroupCode " +
             $"INNER JOIN {thuTucTableName} ON {donViThuTucsTableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
            $"WHERE {hoSoTableName}.DeletedOn IS NULL AND {donViThuTucsTableName}.DeletedOn IS NULL {where} " +
            $"GROUP BY {donViThuTucsTableName}.DonViId, {donViThuTucsTableName}.MaTTHC,{groupsTableName}.GroupName, {thuTucTableName}.TenTTHC,{thuTucTableName}.MucDo ";
        var resBaoCao = await _dapperRepository.QueryAsync<TongHopThuTucPhatSinhHoSoElementResponse>(sql, new
        {
            request.MaDinhDanh,
            TiepNhanTuNgay = tiepNhanTuNgay,
            TiepNhanDenNgay = tiepNhanDenNgay,
        }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        
        return new BaoCaoSo06Response<TongHopThuTucPhatSinhHoSoElementResponse>(resBaoCao.ToList());
    }
}
