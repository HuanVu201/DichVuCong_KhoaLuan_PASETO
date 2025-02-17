namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;

public class SearchYeuCauThanhToanQueryWhereBuilder
{
    public static string Build(SearchYeuCauThanhToanQuery req)
    {
        string thuTucsTableName = "[Catalog].[ThuTucs]";
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.HoSoId))
            where += " AND Business.HoSos.Id = @HoSoId";
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND Business.YeuCauThanhToans.MaHoSo = @MaHoSo";
        if (!string.IsNullOrEmpty(req.TrangThai))
            where += " AND Business.YeuCauThanhToans.TrangThai = @TrangThai ";
        if (!string.IsNullOrEmpty(req.DonVi))
            where += " AND Business.YeuCauThanhToans.DonVi = @DonVi ";
        if (!string.IsNullOrEmpty(req.DonViThu))
            where += " AND Business.YeuCauThanhToans.DonViThu = @DonViThu ";
        if (!string.IsNullOrEmpty(req.HinhThucThu))
            where += " AND Business.YeuCauThanhToans.HinhThucThu = @HinhThucThu ";
        if (req.KhacHinhThucThus != null && req.KhacHinhThucThus.Count > 0)
            where += " AND Business.YeuCauThanhToans.HinhThucThu NOT IN @KhacHinhThucThus ";
        if (!string.IsNullOrEmpty(req.KenhThucHien))
            where += " AND Business.HoSos.KenhThucHien = @KenhThucHien ";
        if (!string.IsNullOrEmpty(req.MaDinhDanhCha))
            where += $" AND donViYc.MaDinhDanh Like @MaDinhDanhCha +'%'";
        if (!string.IsNullOrEmpty(req.Catalog))
            where += $" AND donViYc.Catalog = @Catalog";
        if (!string.IsNullOrEmpty(req.MaLinhVucChinh))
            where += $" AND {thuTucsTableName}.MaLinhVucChinh = @MaLinhVucChinh";
        if (!string.IsNullOrEmpty(req.MaTTHC))
            where += $" AND {thuTucsTableName}.MaTTHC = @MaTTHC";
        if (!string.IsNullOrEmpty(req.HinhThucThanhToan))
            where += " AND Business.YeuCauThanhToans.HinhThucThanhToan = @HinhThucThanhToan ";
        if (!string.IsNullOrEmpty(req.DoiTacThanhToan))
        {
            where += " AND Business.YeuCauThanhToans.DoiTacThanhToan = @DoiTacThanhToan ";
        }

        if (!string.IsNullOrEmpty(req.NguoiGui))
            where += $" AND Business.HoSos.NguoiGui = @NguoiGui AND Business.YeuCauThanhToans.TrangThai <> N'{(new TrangThaiYeuCauThanhToanConstants()).CHUA_THANH_TOAN}'";
        if (!string.IsNullOrEmpty(req.TuKhoa))
        {
            where += $" AND (Business.HoSos.MaHoSo LIKE '%' + @TuKhoa + '%' OR Business.HoSos.ChuHoSo LIKE '%' + @TuKhoa + '%' OR Business.HoSos.NguoiUyQuyen LIKE '%' + @TuKhoa + '%' " +
                $"OR Catalog.ThuTucs.TenTTHC LIKE '%' + @TuKhoa + '%' OR Business.YeuCauThanhToans.NguoiNopTienBienLai LIKE '%' + @TuKhoa + '%')";
        }
        if (req.KhongCoBienLai == true) where += $" AND Business.YeuCauThanhToans.SoBienLaiPhi IS NULL AND Business.YeuCauThanhToans.SoBienLaiLePhi IS NULL ";
        if (req.TiepNhanTuNgay.HasValue)
            where += $" AND (Business.HoSos.NgayTiepNhan >= @TuNgay)";
        if (req.TiepNhanDenNgay.HasValue)
            where += $" AND (Business.HoSos.NgayTiepNhan <= @DenNgay)";
        if (req.ThanhToanTuNgay.HasValue)
            where += $" AND (Business.YeuCauThanhToans.NgayThuPhi >= @ThanhToanTuNgay)";
        if (req.ThanhToanDenNgay.HasValue)
            where += $" AND (Business.YeuCauThanhToans.NgayThuPhi <= @ThanhToanDenNgay)";
        if (req.HoanPhiTuNgay.HasValue)
            where += $" AND (Business.YeuCauThanhToans.NgayHoanPhi >= @HoanPhiTuNgay)";
        if (req.HoanPhiDenNgay.HasValue)
            where += $" AND (Business.YeuCauThanhToans.NgayHoanPhi <= @HoanPhiDenNgay)";
        if (req.LaNguoiTiepNhan == true)
            where += $" AND Business.HoSos.NguoiNhanHoSo = @NguoiTiepNhan ";
        if (!string.IsNullOrEmpty(req.TieuChi))
        {
            if (req.TieuChi == "HoSoDaThuPhiTrucTiep")
                where += " AND (Business.YeuCauThanhToans.HinhThucThanhToan !='truc-tuyen') ";
            else if (req.TieuChi == "HoSoDaThuPhiTrucTuyen")
                where += " AND Business.YeuCauThanhToans.HinhThucThanhToan ='truc-tuyen' ";
        }

        if (req.Removed == false)
            where += " AND Business.YeuCauThanhToans.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND Business.YeuCauThanhToans.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchYeuCauThanhToanQueryHandler : IRequestHandler<SearchYeuCauThanhToanQuery, PaginationResponse<YeuCauThanhToanDto>>
{
    private readonly string tableName = "Business.YeuCauThanhToans";
    private readonly string hoSosTableName = "Business.HoSos";
    private readonly string userTableName = "[Identity].Users";
    private readonly string groupTableName = "[Catalog].[Groups]";
    private readonly string thuTucsTableName = "[Catalog].[ThuTucs]";
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public SearchYeuCauThanhToanQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<PaginationResponse<YeuCauThanhToanDto>> Handle(SearchYeuCauThanhToanQuery request, CancellationToken cancellationToken)
    {
        if (request.LaNguoiTiepNhan == true) request.NguoiTiepNhan = _currentUser.GetUserId();
        string where = SearchYeuCauThanhToanQueryWhereBuilder.Build(request);
        string tuNgay = string.Empty;
        string denNgay = string.Empty;
        if (request.TiepNhanTuNgay.HasValue) tuNgay = request.TiepNhanTuNgay.Value.ToString("yyyy-MM-dd");
        if (request.TiepNhanDenNgay.HasValue) denNgay = request.TiepNhanDenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        string thanhToanTuNgay = string.Empty;
        string thanhToanDenNgay = string.Empty;
        if (request.ThanhToanTuNgay.HasValue) thanhToanTuNgay = request.ThanhToanTuNgay.Value.ToString("yyyy-MM-dd");
        if (request.ThanhToanDenNgay.HasValue) thanhToanDenNgay = request.ThanhToanDenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        string hoanPhiTuNgay = string.Empty;
        string hoanPhiDenNgay = string.Empty;
        if (request.HoanPhiTuNgay.HasValue) hoanPhiTuNgay = request.HoanPhiTuNgay.Value.ToString("yyyy-MM-dd");
        if (request.HoanPhiDenNgay.HasValue) hoanPhiDenNgay = request.HoanPhiDenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        string sql = $@"SELECT {tableName}.ID,{tableName}.Ma,{tableName}.MaHoSo, {tableName}.Phi, {tableName}.LePhi,{hoSosTableName}.ID HoSoId,{tableName}.NgayThuPhi,{tableName}.LyDoHuy,{tableName}.LyDoHoanPhi,{tableName}.NgayYeuCau,
        {hoSosTableName}.ChuHoSo, {hoSosTableName}.DiaChiChuHoSo, {hoSosTableName}.TrichYeuHoSo,  {hoSosTableName}.NguoiUyQuyen, {hoSosTableName}.SoGiayToChuHoSo,{hoSosTableName}.TrangThaiHoSoId, 
        {tableName}.SoTien, {tableName}.HinhThucThu, {tableName}.TrangThai, {hoSosTableName}.NguoiNhanHoSo,{hoSosTableName}.NgayTiepNhan, {thuTucsTableName}.TenTTHC,
        {tableName}.DiaChiBienLai,{tableName}.MaSoThueBienLai,{tableName}.NguoiNopTienBienLai,{tableName}.MauSoBienLai,{tableName}.KyHieuBienLai,{tableName}.SoBienLaiPhi,{tableName}.SoBienLaiLePhi,
        {tableName}.SoTaiKhoanHoanPhi,{tableName}.TenNganHangHoanPhi,{tableName}.TenTaiKhoanHoanPhi,{tableName}.NgayHoanPhi,{tableName}.HinhThucThanhToan,{hoSosTableName}.KenhThucHien, {tableName}.MaThamChieuGiaoDich, 
        {tableName}.DonVi,donViYc.GroupName TenDonVi, donViThu.LoaiBienLaiThanhToan, {tableName}.DonViThu,donViThu.GroupName TenDonViThu, {userTableName}.fullName as TenNguoiYeuCau, {tableName}.CreatedOn , {tableName}.LastModifiedOn
        FROM {tableName}
        INNER JOIN {hoSosTableName}
        ON {tableName}.MaHoSo = {hoSosTableName}.MaHoSo
        INNER JOIN {thuTucsTableName}
        ON {thuTucsTableName}.MaTTHC = {hoSosTableName}.MaTTHC
        LEFT JOIN {userTableName}
        ON {tableName}.NguoiYeuCau = {userTableName}.Id
        INNER JOIN {groupTableName} donViYc 
        ON {tableName}.DonVi = donViYc.GroupCode
        INNER JOIN {groupTableName} donViThu
        ON {tableName}.DonViThu = donViThu.GroupCode
        {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<YeuCauThanhToanDto>(sql, request.PageSize, $"LastModifiedOn DESC", cancellationToken, request.PageNumber, new
        {
            request.HinhThucThanhToan,
            request.HinhThucThu,
            request.TuKhoa,
            request.DonVi,
            request.NguoiGui,
            request.DonViThu,
            request.HoSoId,
            request.TrangThai,
            request.MaHoSo,
            request.NguoiTiepNhan,
            request.KenhThucHien,
            request.MaTTHC,
            request.MaLinhVucChinh,
            request.Catalog,
            request.MaDinhDanhCha,
            request.KhacHinhThucThus,
            request.DoiTacThanhToan,
            ThanhToanTuNgay = thanhToanTuNgay,
            ThanhToanDenNgay = thanhToanDenNgay,
            TuNgay = tuNgay,
            DenNgay = denNgay,
            HoanPhiTuNgay = hoanPhiTuNgay,
            HoanPhiDenNgay = hoanPhiDenNgay,
        });
        return data;
    }
}
