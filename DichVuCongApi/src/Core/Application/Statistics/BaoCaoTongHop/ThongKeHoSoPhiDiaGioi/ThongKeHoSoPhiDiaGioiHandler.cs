namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeHoSoPhiDiaGioi;
public class ThongKeHoSoPhiDiaGioiHandler : IRequestHandler<ThongKeHoSoPhiDiaGioiRequest, PaginationResponse<ThongKeHoSoPhiDiaGioiResponse>>
{
    private readonly IDapperRepository _dapperRepository;
    public ThongKeHoSoPhiDiaGioiHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<PaginationResponse<ThongKeHoSoPhiDiaGioiResponse>> Handle(ThongKeHoSoPhiDiaGioiRequest request, CancellationToken cancellationToken)
    {
        string tiepNhanTuNgay = string.Empty;
        string tiepNhanDenNgay = string.Empty;
        string where = "WHERE hs.DeletedOn IS NULL AND tt.DeletedOn IS NUll AND hs.NguoiNhanPhiDiaGioi IS NOT NULL ";
        if (request.TuNgay.HasValue)
        {
            where += $" AND hs.NgayTiepNhan >= @TiepNhanTuNgay ";
            tiepNhanTuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd 00:00:00");
        }

        if (request.DenNgay.HasValue)
        {
            where += $" AND hs.NgayTiepNhan <= @TiepNhanDenNgay ";
            tiepNhanDenNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        }

        if (!string.IsNullOrEmpty(request.MaTTHC)) where += $" AND hs.MaTTHC = @MaTTHC ";
        if (!string.IsNullOrEmpty(request.MaLinhVucChinh)) where += $" AND tt.MaLinhVucChinh = @MaLinhVucChinh ";
        if (!string.IsNullOrEmpty(request.DonViId)) where += $" AND hs.DonViId = @DonViId ";
        if (!string.IsNullOrEmpty(request.DonViPhiDiaGioi)) where += $" AND hs.DonViPhiDiaGioi = @DonViPhiDiaGioi ";
        string sql = $"SELECT  hs.Id, hs.[DonViId], NguoiNhanHoSo, TrichYeuHoSo, ChuHoSo, DiaChiChuHoSo, SoDienThoaiChuHoSo," +
            $" NgayTiepNhan, NgayHenTra, NgayKetThucXuLy, DonViPhiDiaGioi, MaHoSo, lv.Ma MaLinhVuc, lv.Ten TenLinhVuc, tt.MaTTHC, tt.TenTTHC " +
            $"FROM [Business].[HoSos] hs " +
            "INNER JOIN Catalog.Groups gr ON hs.DonViId = gr.GroupCode " +
            "INNER JOIN Catalog.ThuTucs tt ON hs.MaTTHC = tt.MaTTHC " +
            "INNER JOIN Catalog.LinhVucs lv ON tt.MaLinhVucChinh = lv.Ma " +
            $"{where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThongKeHoSoPhiDiaGioiResponse>(sql, request.PageSize, "MaLinhVuc ASC, MaTTHC ASC, NgayTiepNhan ASC", cancellationToken, request.PageNumber, new
        {
            request.MaLinhVucChinh,
            request.MaTTHC,
            request.DonViId,
            request.DonViPhiDiaGioi,
            TiepNhanTuNgay = tiepNhanTuNgay,
            TiepNhanDenNgay = tiepNhanDenNgay,
        });
        return data;
    }
}
