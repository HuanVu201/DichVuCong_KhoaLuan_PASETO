using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoLoiThongKe;
public class HoSoGayLoiThongKeHandler : IRequestHandler<HoSoGayLoiThongKeRequest, Result<HoSoGayLoiThongKeResponse>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public HoSoGayLoiThongKeHandler(IDapperRepository dapperRepository)
    {
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _dapperRepository = dapperRepository;
    }

    public async Task<Result<HoSoGayLoiThongKeResponse>> Handle(HoSoGayLoiThongKeRequest request, CancellationToken cancellationToken)
    {
        string currentTime = GetCurrentTime.Get(DateTime.UtcNow).ToString("yyyy-MM-dd");

        string tuNgay = string.Empty;
        string denNgay = string.Empty;
        if (request.TuNgay.HasValue) tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        if (request.DenNgay.HasValue) denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd");
        string where = string.Empty;
        if (!string.IsNullOrEmpty(tuNgay)) where += $"CONVERT(DATE,hs.NgayTiepNhan,23)  >= @TuNgay";
        if (!string.IsNullOrEmpty(denNgay)) where += $"CONVERT(DATE,hs.NgayTiepNhan,23)  <= @DenNgay";
        string sql = $@"SELECT COUNT(CASE WHEN hs.MucDo = '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}' AND KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}' THEN MaHoSo END) MucDo2NopTrucTuyen,
        COUNT(CASE WHEN hs.NgayTiepNhan IS NULL  AND TrangThaiHoSoId != '5' THEN MaHoSo END) KhongCoNgayTiepNhan,
        COUNT(CASE WHEN hs.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY}) AND hs.NgayKetThucXuLy IS NULL THEN MaHoSo END) KhongCoNgayKetThuc,
        COUNT(CASE WHEN CONVERT(date,hs.NgayTiepNhan, 23) > @CurrentTime THEN MaHoSo END) TiepNhanSauNgayHienTai,
        COUNT(CASE WHEN CONVERT(date,hs.NgayKetThucXuLy, 23) > @CurrentTime THEN MaHoSo END) KetThucSauNgayHienTai,
        COUNT(CASE WHEN CONVERT(date,hs.NgayTiepNhan, 23) > CONVERT(date,hs.NgayKetThucXuLy, 23) THEN MaHoSo END) KetThucHoSoTruocNgayNhan
        FROM Business.HoSos hs
        inner join Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
        WHERE hs.DeletedOn IS NULL AND tt.DeletedOn is null AND TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) {where}";
        var resutlt = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoGayLoiThongKeResponse>(sql, new { TuNgay = tuNgay, DenNgay = denNgay, CurrentTime = currentTime }, null, cancellationToken);
        return Result<HoSoGayLoiThongKeResponse>.Success(resutlt);
    }
}
