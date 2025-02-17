using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;


namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuTTTT;
public class QuyetDinh766ChiTieuTTTTHandler : IRequestHandler<QuyetDinh766ChiTieuTTTTRequest, QuyetDinh766Response<QuyetDinh766ChiTieuTTTTElement>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly string groupsTableName = "Catalog.Groups";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string yeuCauThanhToanTableName = "Business.YeuCauThanhToans";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public QuyetDinh766ChiTieuTTTTHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    }
    private async Task<List<QuyetDinh766ChiTieuTTTTElement>> GetThongKe(QuyetDinh766ChiTieuTTTTRequest request, CancellationToken cancellationToken)
    {
        List<QuyetDinh766ChiTieuTTTTElement> result = new List<QuyetDinh766ChiTieuTTTTElement>();
        string where = string.Empty;
        DateTime tuNgay = new DateTime(request.TuNgay.Value.Year, request.TuNgay.Value.Month, request.TuNgay.Value.Day, 0, 0, 1);
        DateTime denNgay = new DateTime(request.DenNgay.Value.Year, request.DenNgay.Value.Month, request.DenNgay.Value.Day, 23, 59, 59);
        where += $" AND {hoSoTableName}.NgayTiepNhan >= @TuNgay AND {hoSoTableName}.NgayTiepNhan <= @DenNgay ";
        BaseStatisticsWhereBuilder baseStatistis = new BaseStatisticsWhereBuilder(request);
        string thuTucCoPhi = $"Count(DISTINCT  {donViThuTucTableName}.MaTTHC ) ThuTucCoPhi";
        string thuTucCoPhiPhatSinhHoSo = $"Count(DISTINCT CASE WHEN {hoSoTableName}.MaHoSo IS NOT NULL AND {thuTucTableName}.TrangThaiPhiLePhi = 1 THEN {donViThuTucTableName}.MaTTHC  END ) ThuTucCoPhiPhatSinhHoSo";
        string thuTucPhatSinhThanhToan = $"Count(  DISTINCT CASE WHEN {yeuCauThanhToanTableName}.TrangThai = N'Đã thanh toán' AND {yeuCauThanhToanTableName}.HinhThucThu != N'Đối tượng miễn phí' THEN  {donViThuTucTableName}.MaTTHC  END ) ThuTucPhatSinhThanhToan";
        string thuTucPhatSinhTTTT = $"Count(  DISTINCT CASE WHEN {yeuCauThanhToanTableName}.TrangThai = N'Đã thanh toán' AND  {yeuCauThanhToanTableName}.HinhThucThanhToan = 'truc-tuyen' THEN  {donViThuTucTableName}.MaTTHC  END ) ThuTucPhatSinhTTTT";
        string hoSoThuocThuTucCoPhi = $"Count(CASE WHEN {hoSoTableName}.MaHoSo IS NOT NULL  AND {thuTucTableName}.TrangThaiPhiLePhi = 1 THEN {hoSoTableName}.MaHoSo  END) HoSoThuocThuTucCoPhi";
        string hoSoThuocThuTucCoPhiDaTTTT = $"Count (DISTINCT CASE WHEN {yeuCauThanhToanTableName}.TrangThai = N'Đã thanh toán' AND  {yeuCauThanhToanTableName}.HinhThucThanhToan = 'truc-tuyen' AND {thuTucTableName}.TrangThaiPhiLePhi = 1 AND {hoSoTableName}.MaHoSo IS NOT NULL THEN {hoSoTableName}.MaHoSo  END )HoSoThuocThuTucCoPhiDaTTTT";
        string sqlQuery = $"SELECT {donViThuTucTableName}.DonViId MaThongKe," +
            $"{thuTucCoPhi}, " +
            $"{thuTucCoPhiPhatSinhHoSo}, " +
            $"{thuTucPhatSinhThanhToan}, " +
            $"{thuTucPhatSinhTTTT}, " +
            $"{hoSoThuocThuTucCoPhi}, " +
            $"{hoSoThuocThuTucCoPhiDaTTTT} " +
            $"FROM {donViThuTucTableName} " +
            $"INNER JOIN {thuTucTableName} " +
            $"ON {donViThuTucTableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
            $"INNER JOIN {groupsTableName} " +
            $"ON {donViThuTucTableName}.DonViId = {groupsTableName}.GroupCode " +
            $"LEFT JOIN {hoSoTableName} " +
            $"ON ({donViThuTucTableName}.MaTTHC = {hoSoTableName}.MaTTHC AND {donViThuTucTableName}.DonViId = {hoSoTableName}.DonViId) " +
            $"LEFT JOIN {yeuCauThanhToanTableName} " +
            $" ON ({hoSoTableName}.MaHoSo = {yeuCauThanhToanTableName}.MaHoSo) " +
            $" WHERE {donViThuTucTableName}.DeletedOn IS NULL AND {thuTucTableName}.TrangThaiPhiLePhi = 1  {where} {baseStatistis.where}" +
            $" Group By {donViThuTucTableName}.DonViId ";
        var resBaoCao = await _dapperRepository.QueryAsync<QuyetDinh766ChiTieuTTTTElement>(sqlQuery, new { TuNgay = tuNgay, DenNgay = denNgay, MaDinhDanh = request.MaDinhDanh, MaDinhDanhCha = request.MaDinhDanhCha, Catalog = request.Catalog }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.PageNumber = 1;
        queryGroups.PageSize = 1000;
        queryGroups.Type = "don-vi";
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.ChiBaoGomDonViCon = request.ChiBaoGomDonViCon;
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            QuyetDinh766ChiTieuTTTTElement res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.MaDinhDanh = group.MaDinhDanh;
                res.MaThongKeCha = group.OfGroupCode;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;

            }
            else
            {
                res = new QuyetDinh766ChiTieuTTTTElement();
                res.MaDinhDanh = group.MaDinhDanh;
                res.MaThongKe = group.GroupCode;
                res.MaThongKeCha = group.OfGroupCode;
                res.TenThongKe = group.GroupName;
                res.Catalog = group.Catalog;

            }

            result.Add(res);
        }

        return result;
    }

    public async Task<QuyetDinh766Response<QuyetDinh766ChiTieuTTTTElement>> Handle(QuyetDinh766ChiTieuTTTTRequest request, CancellationToken cancellationToken)
    {

        if (!request.TuNgay.HasValue) throw new ArgumentNullException(nameof(request.TuNgay));
        if (!request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request.DenNgay));
        List<QuyetDinh766ChiTieuTTTTElement> result = await GetThongKe(request, cancellationToken);

        return new QuyetDinh766Response<QuyetDinh766ChiTieuTTTTElement>(result);
    }
}
