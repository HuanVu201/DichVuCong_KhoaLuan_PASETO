using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business.Events;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class SearchHoSoTheoTrangThaiThuPhiWhereBuilder
{
    public static string Build(SearchHoSoTheoTrangThaiThuPhi req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.SearchKeys))
            where += " AND (hs.MaHoSo LIKE '%' + @SearchKeys + '%' OR hs.ChuHoSo LIKE '%' + @SearchKeys + '%')";
        if (!string.IsNullOrEmpty(req.SoDienThoaiChuHoSo))
            where += " AND hs.SoDienThoaiChuHoSo LIKE '%' + @SoDienThoaiChuHoSo + '%'";
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND hs.MaHoSo LIKE '%' + @MaHoSo + '%'";
        if (!string.IsNullOrEmpty(req.SoDienThoaiNguoiUyQuyen))
            where += " AND hs.SoDienThoaiNguoiUyQuyen LIKE '%' + @SoDienThoaiNguoiUyQuyen + '%'";
        if (!string.IsNullOrEmpty(req.ChuHoSo))
            where += " AND hs.ChuHoSo LIKE N'%' + @ChuHoSo + '%'";
        if (!string.IsNullOrEmpty(req.NguoiUyQuyen))
            where += " AND hs.NguoiUyQuyen LIKE N'%' + @NguoiUyQuyen + '%'";
        if (!string.IsNullOrEmpty(req.TrichYeuHoSo))
            where += " AND hs.TrichYeuHoSo LIKE N'%' + @TrichYeuHoSo + '%'";
        if (!string.IsNullOrEmpty(req.MaLinhVucChinh))
            where += " AND tt.MaLinhVucChinh  = @MaLinhVucChinh";
        if (!string.IsNullOrEmpty(req.ThuTucId))
            where += " AND tt.MaTTHC  = @ThuTucId";
        if (!string.IsNullOrEmpty(req.TiepNhanFrom))
            where += " AND hs.NgayTiepNhan >= @TiepNhanFrom";
        if (!string.IsNullOrEmpty(req.TiepNhanTo))
            where += " AND hs.NgayTiepNhan <= @TiepNhanTo";
        if (!string.IsNullOrEmpty(req.HenTraFrom))
            where += " AND hs.NgayHenTra >= @HenTraFrom";
        if (!string.IsNullOrEmpty(req.HenTraTo))
            where += " AND hs.NgayHenTra <= @HenTraTo";
        if (!string.IsNullOrEmpty(req.MaTrangThai))
            where += " AND hs.TrangThaiHoSoId = @MaTrangThai";
        if (!string.IsNullOrEmpty(req.NguoiDaXuLy))
            where += " AND hs.NguoiDaXuLy LIKE '%' + @NguoiDaXuLy + '%'";
        if (req.NotInMaTrangThais != null && req.NotInMaTrangThais.Count > 0)
            where += " AND hs.TrangThaiHoSoId NOT IN @NotInMaTrangThais";
        if (req.InMaTrangThais != null && req.InMaTrangThais.Count > 0)
            where += " AND hs.TrangThaiHoSoId IN @InMaTrangThais";
        if (!string.IsNullOrEmpty(req.NguoiXuLyTruoc))
            where += " AND hs.NguoiXuLyTruoc = @NguoiXuLyTruoc";
        if (req.LaNguoiNhanHoSo == true)
            where += " AND (hs.NguoiNhanHoSo = @CurrentUser or hs.NguoiDangXuLy = @CurrentUser)";
        if (!string.IsNullOrEmpty(req.GroupCode))
            where += " AND hs.DonViId = @GroupCode";
        if (!string.IsNullOrEmpty(req.SoKyHieuTrichYeu))
            where += " AND (hs.SoKyHieuKetQua LIKE '%' + @SoKyHieuTrichYeu + '%' OR hs.TrichYeuKetQua LIKE '%' + @SoKyHieuTrichYeu + '%') ";
        if (req.NhanKetQuaBCCI == true)
            where += " AND hs.DangKyNhanHoSoQuaBCCIData <> '' and hs.DangKyNhanHoSoQuaBCCIData is not null";
        else if (req.NhanKetQuaBCCI == false)
            where += " AND (hs.DangKyNhanHoSoQuaBCCIData = '' or hs.DangKyNhanHoSoQuaBCCIData is null)";
        if (!string.IsNullOrEmpty(req.KenhThucHien))
            where += " AND hs.KenhThucHien = @KenhThucHien";
        if (!string.IsNullOrEmpty(req.NotEqKenhThucHien))
            where += " AND hs.KenhThucHien <> @NotEqKenhThucHien";
        if (!string.IsNullOrEmpty(req.HinhThucTra))
            where += " AND hs.HinhThucTra = @HinhThucTra";
        if (req.ByCurrentUser == true)
            where += " AND hs.NguoiDangXuLy LIKE '%' + @CurrentUser + '%'";
        if (!string.IsNullOrEmpty(req.TenTTHC))
            where += " AND hs.TenTTHC LIKE '%' + @TenTTHC + '%'";
        if (!string.IsNullOrEmpty(req.TrangThaiTraKq))
        {
            TrangThaiTraKetQuaHoSoConstant trangThaiTraKetQuaHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();
            if (req.TrangThaiTraKq == trangThaiTraKetQuaHoSoConstant.DA_CHUYEN_TRA_KQ)
            {

                if ((req.InMaTrangThais != null && req.InMaTrangThais.Count > 1 && req.InMaTrangThais.Contains("5")))
                {

                    where += $" AND ((hs.TrangThaiTraKq = @TrangThaiTraKq OR hs.TrangThaiTraKq IS NULL OR hs.TrangThaiTraKq = '') AND  (hs.TrangThaiHoSoId <> '5' OR hs.TrangThaiBoSung = N'{HoSoConstant.TrangThaiDaBoSungCongDan}')) ";
                }
                else
                {
                    where += $" AND  (hs.TrangThaiTraKq = @TrangThaiTraKq OR hs.TrangThaiTraKq IS NULL OR hs.TrangThaiTraKq = '')";
                }
            }
            else if (req.TrangThaiTraKq == trangThaiTraKetQuaHoSoConstant.CHO_XAC_NHAN)
            {
                if ((req.InMaTrangThais != null && req.InMaTrangThais.Count > 1 && req.InMaTrangThais.Contains("5")))
                {

                    where += $" AND (hs.TrangThaiTraKq = @TrangThaiTraKq AND  (hs.TrangThaiHoSoId <> '5' OR hs.TrangThaiBoSung = N'{HoSoConstant.TrangThaiBoSungMotCua}')) ";
                }
                else
                {
                    where += $" AND (hs.TrangThaiTraKq = @TrangThaiTraKq )";
                }

            }
            else
            {
                where += $" AND hs.TrangThaiTraKq = @TrangThaiTraKq";
            }

        }
        if (!string.IsNullOrEmpty(req.DonViTraKq))
        {
            where += $" AND hs.DonViTraKq = @DonViTraKq";
        }
        if (!string.IsNullOrEmpty(req.TrangThaiBoSung))
        {
            where += $" AND hs.TrangThaiBoSung = @TrangThaiBoSung";
        }
        // dùng lại đoạn if else này trong gửi thông báo cho app (sửa phải sửa 2 chỗ)
        if (req.TrangThaiChuaHoacKhongThuPhi == true)
        {
            where += $" AND (Business.YeuCauThanhToans.TrangThai = N'Chưa thanh toán' OR (Business.YeuCauThanhToans.TrangThai IS NULL AND tt.TrangThaiPhiLePhi = 1 )) ";
        }
        else
        if (req.TrangThaiChuaHoacKhongThuPhi == false)
        {
            where += $" AND (Business.YeuCauThanhToans.TrangThai != N'Chưa thanh toán' OR (Business.YeuCauThanhToans.TrangThai IS NULL AND tt.TrangThaiPhiLePhi = 0 ))  ";
        }
        if (!string.IsNullOrEmpty(req.TrangThaiThuPhi)) where += $" AND Business.YeuCauThanhToans.TrangThai = @TrangThaiThuPhi ";
        if (!string.IsNullOrEmpty(req.HinhThucThuPhi)) where += $" AND Business.YeuCauThanhToans.HinhThucThu = @HinhThucThuPhi ";
        if (!string.IsNullOrEmpty(req.DonViThuPhi)) where += $" AND Business.YeuCauThanhToans.DonVithu = @DonViThuPhi ";
        if (!string.IsNullOrEmpty(req.DonViYeuCauThuPhi)) where += $" AND Business.YeuCauThanhToans.DonVi = @DonViYeuCauThuPhi ";
        if (req.DangKyQuaBuuDien == false)
            where += " AND hs.HinhThucTra = 0";
        else if (req.DangKyQuaBuuDien == true)
            where += " AND hs.HinhThucTra = 1 ";
        if (req.Removed == false)
            where += " AND hs.DeletedOn is null AND Business.YeuCauThanhToans.DeletedOn IS NULL";
        else if (req.Removed == true)
            where += " AND hs.DeletedOn is not null AND Business.YeuCauThanhToans.DeletedOn IS NOT NULL";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchHoSoTheoTrangThaiThuPhiHandler : IRequestHandler<SearchHoSoTheoTrangThaiThuPhi, PaginationResponse<HoSoDto>>
{
    private readonly string yeuCauThanhToanTableName = "Business.YeuCauThanhToans";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public SearchHoSoTheoTrangThaiThuPhiHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<PaginationResponse<HoSoDto>> Handle(SearchHoSoTheoTrangThaiThuPhi request, CancellationToken cancellationToken)
    {
        //if(request.LaNguoiNhanHoSo == true)
        //{
        //    request.NguoiNhanHoSo = _currentUser.GetUserId().ToString();
        //}
        request.LaNguoiNhanHoSo = true;
        var where = SearchHoSoTheoTrangThaiThuPhiWhereBuilder.Build(request);
        var sql = $@"SELECT DISTINCT hs.ID,hs.DiaChiChuHoSo, ChuHoSo, SoDienThoaiChuHoSo, EmailChuHoSo, hs.MaTruongHop, hs.MaTTHC, hs.TrangThaiHoSoId,hs.TrichYeuHoSo, hs.ViTriDeHoSo,hs.LoaiKetQua,
		            UyQuyen, NgayTiepNhan, NgayHenTra, hs.CreatedOn, hs.MaHoSo, KenhThucHien, hs.TrangThaiTraKq, hs.DonViTraKq,tt.TrangThaiPhiLePhi,
                    CASE WHEN DATEDIFF(day, DATEADD(day, ThoiHanBoSung, NgayYeuCauBoSung), GETDATE()) > 0 THEN 1 ELSE 0 END as DaHetHanBoSung,         
				    tt.TenTTHC, g.GroupName as TenDonVi, NgayNopHoSo, hs.SoGiayToChuHoSo,hs.SoKyHieuKetQua,hs.TrichYeuKetQua,hs.DinhKemKetQua
                    FROM Business.HoSos as hs
                    INNER JOIN Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                    LEFT JOIN Catalog.Groups g on hs.DonViId = g.GroupCode
                    LEFT JOIN {yeuCauThanhToanTableName} ON hs.MaHoSo = {yeuCauThanhToanTableName}.MaHoSo
                    {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoDto>(sql, request.PageSize, "CreatedOn Desc", cancellationToken, request.PageNumber, new
        {
            request.MaLinhVucChinh,
            request.TiepNhanTo,
            request.TiepNhanFrom,
            request.HenTraFrom,
            request.HenTraTo,
            CurrentUser = _currentUser.GetUserId().ToString(),
            request.MaTrangThai,
            request.NotInMaTrangThais,
            request.InMaTrangThais,
            request.NguoiDaXuLy,
            request.NguoiXuLyTruoc,
            request.GroupCode,
            request.SoKyHieuTrichYeu,
            request.HinhThucTra,
            request.KenhThucHien,
            request.NotEqKenhThucHien,
            request.TenTTHC,
            request.TrangThaiBoSung,
            request.HinhThucThuPhi,
            request.TrangThaiThuPhi,
            request.DonViThuPhi,
            request.DonViYeuCauThuPhi,
            request.SearchKeys,
            request.TrangThaiTraKq,
            request.DonViTraKq,
            request.ChuHoSo,
            request.NguoiUyQuyen,
            request.SoDienThoaiChuHoSo,
            request.SoDienThoaiNguoiUyQuyen,
            request.TrichYeuHoSo,
            request.MaHoSo
        });
        return data;
    }
}