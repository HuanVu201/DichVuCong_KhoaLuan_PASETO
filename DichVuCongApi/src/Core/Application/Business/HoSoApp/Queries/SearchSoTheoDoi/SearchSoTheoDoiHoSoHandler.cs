using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchSoTheoDoi;
public class SearchSoTheoDoiHoSoHandler : IRequestHandler<SearchSoTheoDoiHoSoRequest, PaginationResponse<HoSoTiepNhanQuaHanDto>>
{
    private readonly string hoSosTableName = "Business.HoSos";
    private readonly string trangThaiHoSosTableName = "Business.TrangThaiHoSos";
    private readonly string groupsTableName = "Catalog.Groups";
    private readonly string thuTucsTableName = "Catalog.ThuTucs";
    private readonly string usersTableName = "[Identity].[Users]";
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _currentUser;

    public SearchSoTheoDoiHoSoHandler(IDapperRepository dapperRepository, IUserService currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<PaginationResponse<HoSoTiepNhanQuaHanDto>> Handle(SearchSoTheoDoiHoSoRequest request, CancellationToken cancellationToken)
    {
        try
        {
            string where = string.Empty;
            string tiepNhanTuNgay = string.Empty;
            string tiepNhanDenNgay = string.Empty;
            string today = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            if (!string.IsNullOrEmpty(request.SearchKeys))
                where += $" AND (hs.MaHoSo LIKE '%' + @SearchKeys + '%' OR {hoSosTableName}.ChuHoSo LIKE '%' + @SearchKeys + '%') ";
            if (!string.IsNullOrEmpty(request.TrangThaiHoSoId))
                where += $" AND {hoSosTableName}.TrangThaiHoSoId = @TrangThaiHoSoId";
            if (!string.IsNullOrEmpty(request.SoGiayToChuHoSo))
                where += $" AND {hoSosTableName}.SoGiayToChuHoSo LIKE '%' + @SoGiayToChuHoSo + '%'";
            if (!string.IsNullOrEmpty(request.KenhThucHien))
                where += $" AND {hoSosTableName}.KenhThucHien = @KenhThucHien";
            if (!string.IsNullOrEmpty(request.MaLinhVucChinh))
                where += $" AND {groupsTableName}.MaLinhVucChinh = @MaLinhVucChinh ";
            if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
                where += $" AND {groupsTableName}.MaDinhDanh LIKE  @MaDinhDanhCha + '%'";
            if (!string.IsNullOrEmpty(request.MaDinhDanh))
                where += $" AND {groupsTableName}.MaDinhDanh =  @MaDinhDanh ";
            if (!string.IsNullOrEmpty(request.GroupCode))
                where += $" AND {hoSosTableName}.DonViId = @GroupCode";
            if (!string.IsNullOrEmpty(request.MaLinhVucChinh))
                where += $" AND {groupsTableName}.MaLinhVucChinh = @MaLinhVucChinh ";
            if (!string.IsNullOrEmpty(request.MaTTHC))
                where += $" AND {groupsTableName}.MaTTHC = @MaTTHC ";
            if (request.TuNgay.HasValue)
            {
                where += $" AND {hoSosTableName}.NgayTiepNhan >= @TiepNhanTuNgay ";
                tiepNhanTuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd 00:00:00");
            }

            if (request.DenNgay.HasValue)
            {
                where += $" AND {hoSosTableName}.NgayTiepNhan <= @TiepNhanDenNgay ";
                tiepNhanDenNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
            }

            if (!string.IsNullOrEmpty(request.DonViQuanLy))
            {
                where += $" AND ({groupsTableName}.DonViQuanLy = @DonViQuanLy OR {groupsTableName}.GroupCode = @DonViQuanLy OR {groupsTableName}.OfGroupCode = @DonViQuanLy) ";
            }
            if (!string.IsNullOrEmpty(request.NguoiNhanHoSo))
                where += $" AND {hoSosTableName}.NguoiNhanHoSo = @NguoiNhanHoSo";
            string sql = $"SELECT {hoSosTableName}.Id, {hoSosTableName}.MaHoSo, {hoSosTableName}.ChuHoSo, {hoSosTableName}.SoDienThoaiChuHoSo, {hoSosTableName}.TrichYeuHoSo," +
                $"{hoSosTableName}.EmailChuHoSo, {hoSosTableName}.SoGiayToChuHoSo, {hoSosTableName}.NgayKetThucXuLy,{hoSosTableName}.NgayNopHoSo,{hoSosTableName}.NgayTiepNhan, " +
                $"{hoSosTableName}.NgayHenTra, {hoSosTableName}.KenhThucHien, {hoSosTableName}.DonViId, {groupsTableName}.GroupName TenDonVi, {hoSosTableName}.DiaChiChuHoSo," +
                $"{hoSosTableName}.NgayTra, {hoSosTableName}.TrangThaiHoSoId, " +
                $"{hoSosTableName}.MaTTHC, {thuTucsTableName}.TenTTHC, {hoSosTableName}.NguoiNhanHoSo, {hoSosTableName}.SoBoHoSo, {hoSosTableName}.TenDiaBan, {SchemaNames.Identity}.{TableNames.Users}.FullName TenNguoiNhanHoSo " +
                $" FROM {hoSosTableName} " +
                $"INNER JOIN {groupsTableName} " +
                $"ON {hoSosTableName}.DonViId = {groupsTableName}.GroupCode " +
                $"INNER JOIN {thuTucsTableName} ON {hoSosTableName}.MaTTHC = {thuTucsTableName}.MaTTHC " +
                $"LEFT JOIN {SchemaNames.Identity}.{TableNames.Users} ON {SchemaNames.Identity}.{TableNames.Users}.TypeUser = 'CanBo' AND {hoSosTableName}.NguoiNhanHoSo = {SchemaNames.Identity}.{TableNames.Users}.Id   " +
                $"WHERE {hoSosTableName}.DeletedOn IS NULL AND {thuTucsTableName}.DeletedOn IS NULL AND {groupsTableName}.DeletedOn IS NULL" +
                $"{where}";

            var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoTiepNhanQuaHanDto>(sql, request.PageSize, "NgayTiepNhan ASC", cancellationToken, request.PageNumber, new
            {
                request.MaLinhVucChinh,
                request.SoGiayToChuHoSo,
                request.GroupCode,
                request.KenhThucHien,
                request.SearchKeys,
                request.MaTTHC,
                request.MaDinhDanhCha,
                request.MaDinhDanh,
                request.DonViQuanLy,
                request.TrangThaiHoSoId,
                request.NguoiNhanHoSo,
                TiepNhanTuNgay = tiepNhanTuNgay,
                TiepNhanDenNgay = tiepNhanDenNgay,
                Today = today
            });
            return data;

        }
        catch (Exception ex)
        {
            throw ex;
        }

    }
}
