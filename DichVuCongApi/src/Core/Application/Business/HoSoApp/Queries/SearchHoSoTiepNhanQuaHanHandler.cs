using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Identity.Users;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchHoSoTiepNhanQuaHanHandler : IRequestHandler<SearchHoSoTiepNhanQuaHan, List<HoSoTiepNhanQuaHanDto>>
{
    private readonly string hoSosTableName = "Business.HoSos";
    private readonly string trangThaiHoSosTableName = "Business.TrangThaiHoSos";
    private readonly string groupsTableName = "Catalog.Groups";
    private readonly string thuTucsTableName = "Catalog.ThuTucs";
    private readonly string usersTableName = "[Identity].[Users]";
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _currentUser;

    public SearchHoSoTiepNhanQuaHanHandler(IDapperRepository dapperRepository, IUserService currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<List<HoSoTiepNhanQuaHanDto>> Handle(SearchHoSoTiepNhanQuaHan request, CancellationToken cancellationToken)
    {
        string where = string.Empty;
        string tiepNhanTuNgay = string.Empty;
        string tiepNhanDenNgay = string.Empty;
        string today = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        if (!string.IsNullOrEmpty(request.SearchKeys))
            where += $" AND ({hoSosTableName}.MaHoSo LIKE '%' + @SearchKeys + '%' OR {hoSosTableName}.ChuHoSo LIKE '%' + @SearchKeys + '%') ";
        if (!string.IsNullOrEmpty(request.MaTrangThai))
            where += $" AND {hoSosTableName}.TrangThaiHoSoId = @MaTrangThai";
        if (!string.IsNullOrEmpty(request.SoGiayToChuHoSo))
            where += $" AND {hoSosTableName}.SoGiayToChuHoSo LIKE '%' + @SoGiayToChuHoSo + '%'";
        if (!string.IsNullOrEmpty(request.KenhThucHien))
            where += $" AND {hoSosTableName}.KenhThucHien = @KenhThucHien";
        if (!string.IsNullOrEmpty(request.MaLinhVucChinh))
            where += $" AND {groupsTableName}.MaLinhVucChinh = @MaLinhVucChinh ";
        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            if (request.ChiBaoGomDonViCon == true)
            {
                where += $" AND (MaDinhDanh Like @MaDinhDanhCha +'%' AND MaDinhDanh != @MaDinhDanhCha) ";
            }
            else
            {
                where += $" AND MaDinhDanh Like @MaDinhDanhCha +'%' ";
            }
        }
        if (!string.IsNullOrEmpty(request.MaDinhDanh))
            where += $" AND {groupsTableName}.MaDinhDanh =  @MaDinhDanh ";
        if (!string.IsNullOrEmpty(request.Catalog))
            where += $" AND {groupsTableName}.Catalog =  @Catalog ";
        if (!string.IsNullOrEmpty(request.MaLinhVucChinh))
            where += $" AND {groupsTableName}.MaLinhVucChinh = @MaLinhVucChinh ";
        if (!string.IsNullOrEmpty(request.MaTTHC))
            where += $" AND {groupsTableName}.MaTTHC = @MaTTHC ";
        if (request.TiepNhanTuNgay.HasValue)
        {
            where += $" AND {hoSosTableName}.NgayTiepNhan >= @TiepNhanTuNgay ";
            tiepNhanTuNgay = request.TiepNhanTuNgay.Value.ToString("yyyy-MM-dd 00:00:00");
        }

        if (request.TiepNhanDenNgay.HasValue)
        {
            where += $" AND {hoSosTableName}.NgayTiepNhan <= @TiepNhanDenNgay ";
            tiepNhanDenNgay = request.TiepNhanDenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        }

        if (request.DaTiepNhan == true)
        {
            where += $" AND {hoSosTableName}.TrangThaiHoSoId NOT IN ('1','3') " +
                $"AND {hoSosTableName}.NgayTiepNhan IS NOT NULL " +
                $"AND {hoSosTableName}.NgayTiepNhan > {hoSosTableName}.HanTiepNhan ";
        }
        else if (request.DaTiepNhan == false)
        {
            where += $" AND {hoSosTableName}.TrangThaiHoSoId = '1' " +
                $"AND {hoSosTableName}.HanTiepNhan <= @Today ";
        }
        else
        {
            where += $"AND (({hoSosTableName}.TrangThaiHoSoId NOT IN ('1','3') " +
                $"AND {hoSosTableName}.NgayTiepNhan IS NOT NULL " +
                $"AND {hoSosTableName}.NgayTiepNhan > {hoSosTableName}.HanTiepNhan) OR ({hoSosTableName}.TrangThaiHoSoId = '1' AND {hoSosTableName}.HanTiepNhan <= @Today ))  ";
        }

        string sql = $"SELECT {hoSosTableName}.Id, {hoSosTableName}.MaHoSo, {hoSosTableName}.ChuHoSo, {hoSosTableName}.SoDienThoaiChuHoSo," +
            $"{hoSosTableName}.EmailChuHoSo, {hoSosTableName}.SoGiayToChuHoSo,{hoSosTableName}.NgayTra, {hoSosTableName}.NgayKetThucXuLy,{hoSosTableName}.NgayNopHoSo,{hoSosTableName}.NgayTiepNhan, " +
            $"{hoSosTableName}.NgayHenTra, {hoSosTableName}.KenhThucHien, {hoSosTableName}.DonViId, {groupsTableName}.GroupName TenDonVi, {hoSosTableName}.DiaChiChuHoSo," +
            $"{hoSosTableName}.NgayTra, {hoSosTableName}.TrangThaiHoSoId, {trangThaiHoSosTableName}.Ten TenTrangThaiHoSo, " +
            $"{hoSosTableName}.MaTTHC, {thuTucsTableName}.TenTTHC, {hoSosTableName}.NguoiNhanHoSo, {usersTableName}.FullName TenNguoiNhanHoSo" +
            $" FROM {hoSosTableName} " +
            $"INNER JOIN {groupsTableName} " +
            $"ON {hoSosTableName}.DonViId = {groupsTableName}.GroupCode " +
            $"INNER JOIN {usersTableName} ON {usersTableName}.Id = {hoSosTableName}.NguoiNhanHoSo " +
            $"INNER JOIN {thuTucsTableName} ON {hoSosTableName}.MaTTHC = {thuTucsTableName}.MaTTHC " +
            $"INNER JOIN {trangThaiHoSosTableName} ON {hoSosTableName}.TrangThaiHoSoId = {trangThaiHoSosTableName}.Ma " +
            $"WHERE {hoSosTableName}.DeletedOn IS NULL AND {hoSosTableName}.HanTiepNhan IS NOT NULL " +
            $"{where} " +
            $"ORDER BY {groupsTableName}.GroupOrder, {hoSosTableName}.NgayTiepNhan DESC";
        var data = await _dapperRepository.QueryAsync<HoSoTiepNhanQuaHanDto>(sql, new
        {
            request.MaLinhVucChinh,
            request.SoGiayToChuHoSo,
            request.GroupCode,
            request.KenhThucHien,
            request.SearchKeys,
            request.MaTTHC,
            request.MaDinhDanhCha,
            request.MaDinhDanh,
            request.Catalog,
            TiepNhanTuNgay = tiepNhanTuNgay,
            TiepNhanDenNgay = tiepNhanDenNgay,
            Today = today
        }, null, cancellationToken);
        if (data == null) return null;
        return data.ToList();
    }
}
