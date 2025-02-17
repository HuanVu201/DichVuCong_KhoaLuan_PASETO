using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuTTTT;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;

public class SearchHoSoTheoBaoCaoTTTTQueryWhereBuilder
{
    public static string Build(SearchHoSoTheoBaoCaoTTTTQuery req, string hoSosTableName)
    {
        string tableName = "Business.YeuCauThanhToans";
        string thuTucsTableName = "[Catalog].[ThuTucs]";
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.HoSoId))
            where += $" AND {hoSosTableName}.Id = @HoSoId";
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += $" AND Business.YeuCauThanhToans.MaHoSo = @MaHoSo";
        if (!string.IsNullOrEmpty(req.TrangThai))
            where += " AND Business.YeuCauThanhToans.TrangThai = @TrangThai ";
        if (!string.IsNullOrEmpty(req.DonVi))
            where += " AND Business.YeuCauThanhToans.DonVi = @DonVi ";
        if (!string.IsNullOrEmpty(req.DonViThu))
            where += " AND Business.YeuCauThanhToans.DonViThu = @DonViThu ";
        if (!string.IsNullOrEmpty(req.HinhThucThu))
            where += " AND Business.YeuCauThanhToans.HinhThucThu = @HinhThucThu ";
        if (!string.IsNullOrEmpty(req.KenhThucHien))
            where += $" AND {hoSosTableName}.KenhThucHien = @KenhThucHien ";
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
        if (!string.IsNullOrEmpty(req.NguoiGui))
            where += $" AND {hoSosTableName}.NguoiGui = @NguoiGui AND Business.YeuCauThanhToans.TrangThai <> N'{(new TrangThaiYeuCauThanhToanConstants()).CHUA_THANH_TOAN}'";
        if (!string.IsNullOrEmpty(req.TuKhoa))
            where += $" AND ({hoSosTableName}.MaHoSo LIKE '%' + @TuKhoa + '%' OR {hoSosTableName}.ChuHoSo LIKE '%' + @TuKhoa + '%' OR {hoSosTableName}.NguoiUyQuyen LIKE '%' + @TuKhoa + '%' " +
                $"OR Catalog.ThuTucs.TenTTHC LIKE '%' + @TuKhoa + '%' OR Business.YeuCauThanhToans.NguoiNopTienBienLai LIKE '%' + @TuKhoa + '%')";
        if (req.TiepNhanTuNgay.HasValue)
            where += $" AND ({hoSosTableName}.NgayTiepNhan >= @TuNgay)";
        if (req.TiepNhanDenNgay.HasValue)
            where += $" AND ({hoSosTableName}.NgayTiepNhan <= @DenNgay)";
        if (req.ThanhToanTuNgay.HasValue)
            where += $" AND (Business.YeuCauThanhToans.NgayThuPhi >= @ThanhToanTuNgay)";
        if (req.ThanhToanDenNgay.HasValue)
            where += $" AND (Business.YeuCauThanhToans.NgayThuPhi <= @ThanhToanDenNgay)";
        if (req.LaNguoiTiepNhan == true)
            where += $" AND {hoSosTableName}.NguoiNhanHoSo = @NguoiTiepNhan ";
       
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
public class SearchHoSoTheoBaoCaoTTTTQueryHandler : IRequestHandler<SearchHoSoTheoBaoCaoTTTTQuery, PaginationResponse<YeuCauThanhToanDto>>
{
    private readonly string tableName = "Business.YeuCauThanhToans";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly ICommonServices _commonServices;
    public SearchHoSoTheoBaoCaoTTTTQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser, ICommonServices commonServices) {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _commonServices = commonServices;
    } 
    public async Task<PaginationResponse<YeuCauThanhToanDto>> Handle(SearchHoSoTheoBaoCaoTTTTQuery request, CancellationToken cancellationToken)
    {
        CommonSettings commonSettings = _commonServices.Get();
        string hoSosTableName = request.LaDuLieuThongKeCacNam ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        if (request.LaNguoiTiepNhan == true) request.NguoiTiepNhan = _currentUser.GetUserId();
        var where = SearchHoSoTheoBaoCaoTTTTQueryWhereBuilder.Build(request, hoSosTableName);
        string tuNgay = string.Empty;
        string denNgay = string.Empty;
        if (request.TiepNhanTuNgay.HasValue) tuNgay = request.TiepNhanTuNgay.Value.ToString("yyyy-MM-dd");
        if (request.TiepNhanDenNgay.HasValue) denNgay = request.TiepNhanDenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        string thanhToanTuNgay = string.Empty;
        string thanhToanDenNgay = string.Empty;
        if (request.ThanhToanTuNgay.HasValue) thanhToanTuNgay = request.ThanhToanTuNgay.Value.ToString("yyyy-MM-dd");
        if (request.ThanhToanDenNgay.HasValue) thanhToanDenNgay = request.ThanhToanDenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        QuyetDinh766ChiTieuTTTT2WhereBuilder whereBuilder = new QuyetDinh766ChiTieuTTTT2WhereBuilder();
        if (request.MucDos != null && request.MucDos.Count > 0) where += $" AND {hoSosTableName}.MucDo IN @MucDos ";
        if (!string.IsNullOrEmpty(request.TieuChi))
        {
            var tmp = whereBuilder;
            var tmpSql = tmp.GetType().GetProperty(request.TieuChi).GetValue(tmp, null);
            if (tmpSql != null) where += $"AND {tmpSql}";
        }
        var sql = $@"SELECT {hoSosTableName}.ID,{tableName}.MaHoSo,MAX({tableName}.NguoiNopTienBienLai) NguoiNopTienBienLai,
        MAX({hoSosTableName}.ChuHoSo) ChuHoSo,SUM({tableName}.Phi) Phi,SUM({tableName}.LePhi) LePhi,SUM({tableName}.Phi+{tableName}.LePhi) SoTien,MAX({tableName}.NgayThuPhi) NgayThuPhi, MAX({hoSosTableName}.KenhThucHien) KenhThucHien,
        MAX({hoSosTableName}.NgayTiepNhan) NgayTiepNhan, STRING_AGG({tableName}.MauSoBienLai, ';') AS MauSoBienLai,STRING_AGG({tableName}.KyHieuBienLai, ';') AS KyHieuBienLai 
        FROM {tableName}
        INNER JOIN {hoSosTableName}
        ON {tableName}.MaHoSo = {hoSosTableName}.MaHoSo  
        {where}
        GROUP BY {hoSosTableName}.ID,{tableName}.MaHoSo , {hoSosTableName}.KenhThucHien,{tableName}.NguoiNopTienBienLai";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<YeuCauThanhToanDto>(sql, request.PageSize, $"NgayThuPhi DESC", cancellationToken, request.PageNumber, new{
            request.HinhThucThanhToan,
            request.HinhThucThu,
            request.TuKhoa,
            request.DonVi,
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
            ThanhToanTuNgay = thanhToanTuNgay,
            ThanhToanDenNgay= thanhToanDenNgay,
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.MucDos
        });
        return data;
    }
}
