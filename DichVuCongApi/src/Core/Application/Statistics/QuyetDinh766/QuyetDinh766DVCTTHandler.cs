using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
public class QuyetDinh766DVCTTHandler : IRequestHandler<QuyetDinh766DVCTTRequest, QuyetDinh766Response<QuyetDinh766DVCTTElementResponse>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly string yeuCauThanhToanTableName = "Business.YeuCauThanhToans";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public QuyetDinh766DVCTTHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    }
    private async Task<List<QuyetDinh766DVCTTElementResponse>> GetBaoCaoTongHop(QuyetDinh766DVCTTRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        List<QuyetDinh766DVCTTElementResponse> result = new List<QuyetDinh766DVCTTElementResponse>();
       
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);
        string where = string.Empty;
        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
            where += $" AND MaDinhDanh Like @MaDinhDanhCha +'%'";
        //string traLaiWhere = $"{hoSoTableName}.NgayTiepNhan <= '{denNgay}' " +
        //    $"AND {hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) " +
        //    $"AND {hoSoTableName}.NgayTra >= '{tuNgay}' " +
        //    $"AND {hoSoTableName}.NgayTra <= '{denNgay}'";
        //string tiepNhanWhere = $"{hoSoTableName}.NgayTiepNhan >= '{tuNgay}' AND {hoSoTableName}.NgayTiepNhan <= '{denNgay}'";
        //string tiepNhanTrucTiep = $"{tiepNhanWhere} AND {hoSoTableName}.KenhThucHien = '1'";
        //string tiepNhanQuaMang = $"{tiepNhanWhere} AND {hoSoTableName}.KenhThucHien = '2'";
        //string tiepNhanBCCI = $"{tiepNhanWhere} AND {hoSoTableName}.KenhThucHien = '3'";

        string tongCoNghiaVuTaiChinh = $"{yeuCauThanhToanTableName}.Ma IS NOT NULL";
        string tongDaTTTTQuaDvcqg = $"{yeuCauThanhToanTableName}.Ma IS NOT NULL AND {yeuCauThanhToanTableName}.TrangThai = 'Đã thanh toán' AND {yeuCauThanhToanTableName}.HinhThucThanhToan = 'DVC'";
        string totalWhere = $"WHERE ({builder.where.DangXuLy}) {where}";


        string sql = $"SELECT {hoSoTableName}.DonViId MaThongKe, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhan}) THEN {hoSoTableName}.Id END) TongTiepNhan, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaMang}) THEN {hoSoTableName}.Id END) TiepNhanQuaMang, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanTrucTiep}) THEN {hoSoTableName}.Id END) TiepNhanTrucTiep, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaBCCI}) THEN {hoSoTableName}.Id END) TiepNhanBCCI, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLy} AND {hoSoTableName}.KenhThucHien = '2') THEN {hoSoTableName}.Id END) TongTrucTuyenDangXuLy, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyTrongHan} AND {hoSoTableName}.KenhThucHien = '2') THEN {hoSoTableName}.Id END) TrucTuyenDangXuLyTrongHan, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyQuaHan} AND {hoSoTableName}.KenhThucHien = '2') THEN {hoSoTableName}.Id END) TrucTuyenDangXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({tongCoNghiaVuTaiChinh}) THEN {hoSoTableName}.Id END) TongCoNghiaVuTaiChinh, " +
            $"COUNT(CASE WHEN ({tongDaTTTTQuaDvcqg}) THEN {hoSoTableName}.Id END) DaTTTTQuaDvcqg " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {groupTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupTableName}.GroupCode " +
            $"LEFT JOIN {yeuCauThanhToanTableName} " +
            $"ON {hoSoTableName}.MaHoSo = {yeuCauThanhToanTableName}.MaHoSo " +
            $"{totalWhere} " +
            $"GROUP BY {hoSoTableName}.DonViId";
        var resBaoCao = await _dapperRepository.QueryAsync<QuyetDinh766DVCTTElementResponse>(sql,request, null,cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.OfGroupCode = request.MaDonViCha;
        queryGroups.PageNumber = request.PageNumber;
        queryGroups.PageSize = request.PageSize;
        queryGroups.Catalog = request.Catalog;
        queryGroups.Type = request.Type;
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            QuyetDinh766DVCTTElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.TenThongKe = group.GroupName;
                res.MaDinhDanh = group.MaDinhDanh;
                res.Catalog = group.Catalog;
            }
            else
            {
                res = new QuyetDinh766DVCTTElementResponse();
                res.MaThongKe = group.GroupCode;
                res.MaDinhDanh = group.MaDinhDanh;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;
            }
            result.Add(res);
        }
        return result;
    }
    public async Task<QuyetDinh766Response<QuyetDinh766DVCTTElementResponse>> Handle(QuyetDinh766DVCTTRequest request, CancellationToken cancellationToken)
    {
        List<QuyetDinh766DVCTTElementResponse> result = await GetBaoCaoTongHop(request, cancellationToken);

        return new QuyetDinh766Response<QuyetDinh766DVCTTElementResponse>(result);
    }
}
