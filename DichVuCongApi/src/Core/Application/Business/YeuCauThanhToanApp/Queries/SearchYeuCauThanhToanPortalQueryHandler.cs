using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
public class SearchYeuCauThanhToanPortalQueryWhereBuilder
{
    public static string Build(SearchYeuCauThanhToanPortalQuery req)
    {
        string tableName = "Business.YeuCauThanhToans";
        string hoSosTableName = "Business.HoSos";
        string userTableName = "[Identity].Users";
        string groupTableName = "[Catalog].[Groups]";
        string thuTucsTableName = "[Catalog].[ThuTucs]";
        string where = "Business.YeuCauThanhToans.TrangThai = N'Đã thanh toán'";
        if (!string.IsNullOrEmpty(req.SoGiayToChuHoSo))
            where += " AND (Business.HoSos.SoGiayToChuHoSo = @SoGiayToChuHoSo OR Business.HoSos.SoGiayToNguoiUyQuyen = @SoGiayToChuHoSo)";
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND Business.YeuCauThanhToans.MaHoSo = @MaHoSo";
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
public class SearchYeuCauThanhToanPortalQueryHandler : IRequestHandler<SearchYeuCauThanhToanPortalQuery, PaginationResponse<YeuCauThanhToanPortalDto>>
{
    private readonly string tableName = "Business.YeuCauThanhToans";
    private readonly string hoSosTableName = "Business.HoSos";
    private readonly string userTableName = "[Identity].Users";
    private readonly string groupTableName = "[Catalog].[Groups]";
    private readonly string thuTucsTableName = "[Catalog].[ThuTucs]";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public SearchYeuCauThanhToanPortalQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<PaginationResponse<YeuCauThanhToanPortalDto>> Handle(SearchYeuCauThanhToanPortalQuery request, CancellationToken cancellationToken)
    {

        var where = SearchYeuCauThanhToanPortalQueryWhereBuilder.Build(request);

        var sql = $@"SELECT {tableName}.ID, {tableName}.MaHoSo, {tableName}.Phi, {tableName}.LePhi, {tableName}.NgayThuPhi,
        {hoSosTableName}.ChuHoSo, {hoSosTableName}.DiaChiChuHoSo, {hoSosTableName}.TrichYeuHoSo, {hoSosTableName}.SoGiayToChuHoSo, 
        {hoSosTableName}.NgayTiepNhan, {hoSosTableName}.NgayHenTra, {tableName}.CreatedOn , {tableName}.LastModifiedOn, {userTableName}.fullName as TenNguoiYeuCau,
        {tableName}.DonVi,donViYc.GroupName TenDonVi, {tableName}.DonViThu,donViThu.GroupName TenDonViThu, donViThu.LoaiBienLaiThanhToan
        FROM {tableName}
        INNER JOIN {hoSosTableName}
        ON {tableName}.MaHoSo = {hoSosTableName}.MaHoSo
        INNER JOIN {thuTucsTableName}
        ON {thuTucsTableName}.MaTTHC = {hoSosTableName}.MaTTHC
        LEFT JOIN {userTableName}
        ON {tableName}.NguoiYeuCau = {userTableName}.Id
        LEFT JOIN {groupTableName} donViYc 
        ON {tableName}.DonVi = donViYc.GroupCode
        LEFT JOIN {groupTableName} donViThu
        ON {tableName}.DonViThu = donViThu.GroupCode
        {where}";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<YeuCauThanhToanPortalDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);

        return data;
    }
}

