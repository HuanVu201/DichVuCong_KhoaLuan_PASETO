using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
internal class BaoCaoSo06bHandler : IRequestHandler<BaoCaoSo06bRequest, BaoCaoSo06Response<BaoCaoSo06ElementResponse>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string thuTucsTableName = "Catalog.ThuTucs";
    private readonly string donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    public BaoCaoSo06bHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    }
    private async Task<List<BaoCaoTongHopBaseElementResponse>> GetBaoCaoTongHop06b(BaoCaoSo06bRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        List<BaoCaoTongHopBaseElementResponse> result = new List<BaoCaoTongHopBaseElementResponse>();
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");

        string tiepNhanKyTruocWhere = $"(CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  < '{tuNgay}' " +
            $"AND ({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DANG_XU_LY},{_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}) OR ({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY},{_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  <= '{tuNgay}'))" +
            $") " +
            $"OR " +
            $"({hoSoTableName}.TrangThaiHoSoId IN ('5','6','8') AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  IS NULL)";
        string tiepNhanTrongKy = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= '{tuNgay}' AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= '{denNgay}' AND {hoSoTableName}.KenhThucHien != '2'";
        string tiepNhanQuaMang = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= '{tuNgay}' AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= '{denNgay}' AND {hoSoTableName}.KenhThucHien = '2'";

        string daXuLyWhere = $"{hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY}) AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  >= '{tuNgay}' AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  <= '{denNgay}'";
        string daXuLyTruocHanWhere = $"{daXuLyWhere} AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  < CONVERT(DATE,{hoSoTableName}.NgayHenTra,23) ";
        string daXuLyDungHanWhere = $"{daXuLyWhere} AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  = CONVERT(DATE,{hoSoTableName}.NgayHenTra,23) ";
        string daXuLyQuaHanWhere = $"{daXuLyWhere} AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  > CONVERT(DATE,{hoSoTableName}.NgayHenTra,23) ";
        string dangXuLyWhere = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= '{denNgay}' " +
            $"AND (" +
            $"{hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DANG_XU_LY}) " +
            $"OR " +
            $"({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY},{_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  > '{denNgay}') " +
            $"OR " +
            $"({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}) AND CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  > '{denNgay}')" +
            $")";
        string dangXuLyTrongHanWhere = $"{dangXuLyWhere} AND CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)  >= '{denNgay}'";
        string dangXuLyQuaHanWhere = $"{dangXuLyWhere} AND CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)  < '{denNgay}'";
        string boSungWhere = $"{hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}) AND (CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  <= '{denNgay}' OR CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  IS NULL)";
        string traLaiWhere = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= '{denNgay}' " +
            $"AND {hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) " +
            $"AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  >= '{tuNgay}' " +
            $"AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  <= '{denNgay}'";
        string totalWhere = $"WHERE ({dangXuLyWhere}) OR ({daXuLyWhere}) OR ({boSungWhere}) OR ({traLaiWhere})";
        if (!string.IsNullOrEmpty(request.MaDonVi)) totalWhere += $" AND ({hoSoTableName}.DonViId = '{request.MaDonVi}')";
        string sql = $"SELECT {hoSoTableName}.MaTTHC MaThongKe, " +
            $"COUNT({hoSoTableName}.Id) TongSo, " +
            $"COUNT(CASE WHEN ({tiepNhanKyTruocWhere}) THEN {hoSoTableName}.Id END) TiepNhanKyTruoc," +
            $"COUNT(CASE WHEN ({tiepNhanQuaMang}) THEN {hoSoTableName}.Id END) TiepNhanQuaMang," +
            $"COUNT(CASE WHEN ({tiepNhanTrongKy}) THEN {hoSoTableName}.Id END) TiepNhanTrongKy," +
            $"COUNT(CASE WHEN ({daXuLyWhere}) THEN {hoSoTableName}.Id END) TongDaXuLy, " +
            $"COUNT(CASE WHEN ({daXuLyTruocHanWhere}) THEN {hoSoTableName}.Id END) DaXuLyTruocHan, " +
            $"COUNT(CASE WHEN ({daXuLyDungHanWhere}) THEN {hoSoTableName}.Id END) DaXuLyDungHan, " +
            $"COUNT(CASE WHEN ({daXuLyQuaHanWhere}) THEN {hoSoTableName}.Id END) DaXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({dangXuLyWhere}) THEN {hoSoTableName}.Id END) TongDangXuLy, " +
            $"COUNT(CASE WHEN ({dangXuLyTrongHanWhere}) THEN {hoSoTableName}.Id END) DangXuLyTrongHan, " +
            $"COUNT(CASE WHEN ({dangXuLyQuaHanWhere}) THEN {hoSoTableName}.Id END) DangXuLyQuaHan, " +
            $"COUNT(CASE WHEN ({boSungWhere}) THEN {hoSoTableName}.Id END) TongBoSung, " +
            $"COUNT(CASE WHEN ({traLaiWhere}) THEN {hoSoTableName}.Id END) TongTraLai " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {donViThuTucTableName} " +
            $"ON {hoSoTableName}.MaTTHC = {donViThuTucTableName}.MaTTHC " +
            $"{totalWhere} " +
            $"GROUP BY {hoSoTableName}.MaTTHC";
        var resBaoCao = await _dapperRepository.QueryAsync<BaoCaoTongHopBaseElementResponse>(sql, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchThuTucQuery queryThuTucs = new SearchThuTucQuery();
        queryThuTucs.PageNumber = request.PageNumber;
        queryThuTucs.PageSize = request.PageSize;
        queryThuTucs.DonVi = request.MaDonVi;
        //queryThuTucs.MaLinhVucChinh = request.MaLinhVuc;
        var thuTucsDto = await _mediator.Send(queryThuTucs);
        if (thuTucsDto.Data == null) throw new Exception("Thutucs not found");
        List<ThuTucDto> thuTucs = thuTucsDto.Data;
        foreach (var thuTuc in thuTucs)
        {
            BaoCaoTongHopBaseElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == thuTuc.MaTTHC);
            if (res != null) res.TenThongKe = thuTuc.TenTTHC;
            else
            {
                res = new BaoCaoTongHopBaseElementResponse();
                res.MaThongKe = thuTuc.MaTTHC;
                res.TenThongKe = thuTuc.TenTTHC;
            }
            result.Add(res);
        }
        return result;
    }
    public Task<BaoCaoSo06Response<BaoCaoSo06ElementResponse>> Handle(BaoCaoSo06bRequest request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
