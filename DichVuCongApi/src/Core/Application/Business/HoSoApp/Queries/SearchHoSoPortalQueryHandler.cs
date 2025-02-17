//using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business.Events;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class SearchHoSoPortalQueryWhereBuilder
{
    public static string Build(SearchHoSoPortalQuery req)
    {
        req.ByNguoiGui = true;
        YeuCauThanhToanConstants yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
        string where = string.Empty; // ChoBanHanh = 1 là hồ sơ đang ở trên QLVB
        if (!string.IsNullOrEmpty(req.SearchKeys))
            where += " AND (hs.MaHoSo LIKE '%' + @SearchKeys + '%') ";
        if (!string.IsNullOrEmpty(req.SoKyHieuTrichYeu))
            where += " AND (hs.SoKyHieuKetQua LIKE '%' + @SoKyHieuTrichYeu + '%' OR hs.TrichYeuKetQua LIKE '%' + @SoKyHieuTrichYeu + '%') ";
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND hs.MaHoSo LIKE '%' + @MaHoSo + '%'";
        if (!string.IsNullOrEmpty(req.TrangThaiThuPhi))
            where += " AND TrangThaiThuPhi LIKE '%' + @TrangThaiThuPhi";
        if (!string.IsNullOrEmpty(req.TiepNhanFrom))
            where += " AND hs.NgayTiepNhan >= @TiepNhanFrom";
        if (!string.IsNullOrEmpty(req.TiepNhanTo))
            where += " AND hs.NgayTiepNhan <= @TiepNhanTo";
        if (!string.IsNullOrEmpty(req.HenTraFrom))
            where += " AND hs.NgayHenTra >= @HenTraFrom";
        if (!string.IsNullOrEmpty(req.HoSoToiHan))
        {
            if (req.HoSoToiHan == "3")
            {
                where += " AND hs.NgayHenTra BETWEEN GETDATE() AND DATEADD(DAY, 3, GETDATE()) ";
            }
            else if (req.HoSoToiHan == "2")
            {
                where += " AND hs.NgayHenTra BETWEEN GETDATE() AND DATEADD(DAY, 2, GETDATE()) ";
            }
            else if (req.HoSoToiHan == "1")
            {
                where += " AND hs.NgayHenTra BETWEEN GETDATE() AND DATEADD(DAY, 1, GETDATE()) ";
            }
        }
        if (!string.IsNullOrEmpty(req.HenTraTo))
            where += " AND hs.NgayHenTra <= @HenTraTo";
        if (req.LyDoTuChoi == "Công dân thu hồi")
            where += " AND hs.LyDoTuChoi LIKE N'Thu hồi:%'";
        else if (req.LyDoTuChoi == "Cán bộ từ chối")
            where += " AND hs.LyDoTuChoi NOT LIKE N'Thu hồi:%'";
        if (!string.IsNullOrEmpty(req.NgayTraFrom))
            where += " AND hs.NgayTra >= @NgayTraFrom";
        if (!string.IsNullOrEmpty(req.NgayTraTo))
            where += " AND hs.NgayTra <= @NgayTraTo";
        if (req.DangKyQuaBuuDien == true)
            where += " AND hs.NgayDangKyBuuDien is not null";
        else if (req.DangKyQuaBuuDien == false)
            where += " AND hs.NgayDangKyBuuDien is  null";
        if (!string.IsNullOrEmpty(req.MaTrangThai))
            where += " AND hs.TrangThaiHoSoId = @MaTrangThai";
        if (!string.IsNullOrEmpty(req.SoGiayToChuHoSo))
            where += " AND hs.SoGiayToChuHoSo LIKE '%' + @SoGiayToChuHoSo + '%'";
        if (!string.IsNullOrEmpty(req.NguoiDaXuLy))
            where += " AND hs.NguoiDaXuLy LIKE '%' + @NguoiDaXuLy + '%'";
        if (req.NotInMaTrangThais != null && req.NotInMaTrangThais.Count > 0)
            where += " AND hs.TrangThaiHoSoId NOT IN @NotInMaTrangThais";
        if (req.InMaTrangThais != null && req.InMaTrangThais.Count > 0)
            where += " AND hs.TrangThaiHoSoId IN @InMaTrangThais";
        if (!string.IsNullOrEmpty(req.NguoiXuLyTruoc))
            where += " AND hs.NguoiXuLyTruoc = @NguoiXuLyTruoc";
        if (!string.IsNullOrEmpty(req.NguoiNhanHoSo))
            where += " AND hs.NguoiNhanHoSo = @NguoiNhanHoSo";
        if (!string.IsNullOrEmpty(req.GroupCode))
            where += " AND hs.DonViId = @GroupCode";
        if (req.NhanKetQuaBCCI == true)
            where += " AND hs.HinhThucTra = '1'";
        else if (req.NhanKetQuaBCCI == false)
            where += " AND hs.HinhThucTra = '0'";
        if (req.CanBoBCCIDaDangKy == true)
            where += " AND hs.NgayDangKyBuuDien IS NOT NULL ";
        else if (req.CanBoBCCIDaDangKy == false)
            where += " AND hs.NgayDangKyBuuDien IS NULL";
        if (!string.IsNullOrEmpty(req.KenhThucHien))
            where += " AND hs.KenhThucHien = @KenhThucHien";
        if (!string.IsNullOrEmpty(req.NotEqKenhThucHien))
            where += " AND hs.KenhThucHien <> @NotEqKenhThucHien";
        if (!string.IsNullOrEmpty(req.HinhThucTra))
            where += " AND hs.HinhThucTra = @HinhThucTra";
        if (req.ByCurrentUser == true)
            where += " AND hs.NguoiDangXuLy LIKE '%' + @CurrentUser + '%'";
        if (req.LaNguoiNhanHoSo == true)
            where += " AND hs.NguoiNhanHoSo = @CurrentUser ";
        if (!string.IsNullOrEmpty(req.TenTTHC))
            where += " AND tt.TenTTHC LIKE '%' + @TenTTHC + '%'";
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND hs.MaHoSo LIKE '%' + @MaHoSo + '%'";
        if (!string.IsNullOrEmpty(req.TinhThanhDiaBan))
        {
            where += " AND hs.TinhThanhDiaBan = @TinhThanhDiaBan";
        }
        if (!string.IsNullOrEmpty(req.MaTrangThai))
        {
            if (req.MaTrangThai == "4")
            {
                where += " AND (hs.ChoBanHanh = 0 or hs.ChoBanHanh is null)";
            }
        }
        if (!string.IsNullOrEmpty(req.QuanHuyenDiaBan))
            where += " AND hs.QuanHuyenDiaBan = @QuanHuyenDiaBan";
        if (!string.IsNullOrEmpty(req.XaPhuongDiaBan))
            where += " AND hs.XaPhuongDiaBan = @XaPhuongDiaBan";
        if (req.ByNguoiGui == true)
        {
            where += " AND hs.NguoiGui = @NguoiGui";
            if (!string.IsNullOrEmpty(req.MaTrangThai) && req.MaTrangThai == "5")
            {
                where += $" AND (hs.TrangThaiBoSung = N'{HoSoConstant.TrangThaiBoSungCongDan}' OR hs.TrangThaiBoSung = N'{HoSoConstant.TrangThaiBoSungChoTiepNhan}')";
            }
        }
        if (!string.IsNullOrEmpty(req.TrangThaiBoSung))
        {
            where += $" AND hs.TrangThaiBoSung = @TrangThaiBoSung";
        }
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
        if (req.SearchAllType == false)
        {
            if (req.LaHoSoChungThuc == true)
            {
                where += $" AND hs.LaHoSoChungThuc = 1";
            }
            else
            {
                where += $" AND (hs.LaHoSoChungThuc = 0 OR hs.LaHoSoChungThuc is null)";
            }
        }
        if (req.DaYeuCauBCCILayKetQua == false)
        {
            where += $" AND  hs.NgayTraBuuDien IS NULL AND hs.TrangThaiTraBuuDien IS NULL ";
        }
        else if (req.DaYeuCauBCCILayKetQua == true)
        {
            where += $" AND hs.NgayTraBuuDien IS NOT NULL AND hs.TrangThaiTraBuuDien = '1' ";

        }
        if (req.TrangThaiTheoDoiHoSo == TrangThaiTheoDoiHoSoConstant.CHO_TIEP_NHAN)
        {
            where += $" AND (hs.TrangThaiHoSoId IN ({TrangThaiHoSoConstants.CHO_TIEP_NHAN})) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == TrangThaiTheoDoiHoSoConstant.KHONG_DU_DIEU_KIEN_TIEP_NHAN)
        {
            where += $" AND (hs.TrangThaiHoSoId = '{TrangThaiHoSoConstants.KHONG_DU_DIEU_KIEN_TIEP_NHAN}')";
        }
        else if (req.TrangThaiTheoDoiHoSo == TrangThaiTheoDoiHoSoConstant.DA_NOP_PHI_CHO_TIEP_NHAN)
        {
            where += $" AND (hs.TrangThaiHoSoId IN ({TrangThaiHoSoConstants.CHO_TIEP_NHAN}) AND TrangThaiThuPhi LIKE N'%{yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN}%' ) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == TrangThaiTheoDoiHoSoConstant.CHO_NOP_PHI_THU_TRUOC_CHO_TIEP_NHAN)
        {
            where += $" AND (hs.TrangThaiHoSoId IN ({TrangThaiHoSoConstants.CHO_TIEP_NHAN}) AND TrangThaiThuPhi LIKE N'%{yeuCauThanhToanConstants.TRANG_THAI.CHO_THANH_TOAN}%' ) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == TrangThaiTheoDoiHoSoConstant.DA_TIEP_NHAN)
        {
            where += $" AND (hs.TrangThaiHoSoId IN ({TrangThaiHoSoConstants.DA_TIEP_NHAN}) ) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == TrangThaiTheoDoiHoSoConstant.DA_VA_DANG_XU_LY)
        {
            where += $" AND (hs.TrangThaiHoSoId IN ({TrangThaiHoSoConstants.DA_VA_DANG_XU_LY}) ) ";
        }

        if (!string.IsNullOrEmpty(req.MaTruongHop)) where += " AND hs.MaTruongHop = @MaTruongHop ";
        if (!string.IsNullOrEmpty(req.MaTTHC)) where += " AND hs.MaTTHC = @MaTTHC ";
        if (req.NopHoSoTuNgay.HasValue) where += $" AND hs.NgayNopHoSo >= @NopHoSoTuNgay ";
        if (req.NopHoSoDenNgay.HasValue) where += $" AND hs.NgayNopHoSo <= @NopHoSoDenNgay ";
        if (req.DangKyBuuDienTuNgay.HasValue) where += $" AND hs.NgayDangKyBuuDien >= @DangKyBuuDienTuNgay ";
        if (req.DangKyBuuDienDenNgay.HasValue) where += $" AND hs.NgayDangKyBuuDien <= @DangKyBuuDienDenNgay ";
        if (req.TraKqBuuDienTuNgay.HasValue) where += $" AND hs.NgayTraBuuDien >= @TraKqBuuDienTuNgay ";
        if (req.TraKqBuuDienDenNgay.HasValue) where += $" AND hs.NgayTraBuuDien <= @TraKqBuuDienDenNgay ";

        if (req.Removed == false)
            where += " AND hs.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND hs.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchHoSoPortalQueryHandler : IRequestHandler<SearchHoSoPortalQuery, PaginationResponse<HoSoDto>>
{
    private readonly string tableDanhGiaHaiLong = "Business.DanhGiaHaiLongs";
    private readonly string tableMaVanDon = "[Catalog].[MaVanDonBuuDiens]";
    private readonly string tableLogDGHL = "[Business].[LogThongKeDGHLCongDans]";
    private readonly string tablePhieuKhaoSat = "[Business].[PhieuKhaoSats]";
    private readonly string tableTrangThaiHoSo = "[Business].[TrangThaiHoSos]";
    private readonly string tableTruongHopThuTuc = "[Business].[TruongHopThuTucs]";
    private readonly string tableGiayToHoSo = "[Business].[GiayToHoSos]";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _currentUser;
    public SearchHoSoPortalQueryHandler(IDapperRepository dapperRepository, IUserService currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<PaginationResponse<HoSoDto>> Handle(SearchHoSoPortalQuery request, CancellationToken cancellationToken)
    {
        var user = await _currentUser.GetCurrentUserAsync(cancellationToken);
        string joinTableUserClause = "LEFT JOIN [Identity].[Users] as u ON u.Id = hs.NguoiXuLyTruoc";
        string joinTableUserNguoiXuLyTiep = "LEFT JOIN [Identity].[Users] as u ON u.Id = hs.NguoiDangXuLy";
        string getColUser = ", u.FullName as TenNguoiXuLyTruoc";
        string getColNguoiXuLyTiep = ", u.FullName as NguoiXuLyTiep";
        bool attachUserTable = request.MaTrangThai == "4";
        bool viewDaChuyenXuLyTable = request.ViewHoSo == "da-chuyen-xu-ly";

        var where = SearchHoSoPortalQueryWhereBuilder.Build(request);
        var sql = $@"SELECT hs.ID,hs.NgayXacNhanKetQua,TrangThaiBoSung ,ChuHoSo,hs.TenDiaBan,hs.TenBuocHienTai ,hs.SoKyHieuKetQua,SoDienThoaiChuHoSo, EmailChuHoSo, hs.MaTruongHop, hs.MaTTHC, hs.TrangThaiHoSoId,LyDoTuChoi,LyDoBoSung,hs.TrichYeuHoSo, hs.ViTriDeHoSo,hs.LoaiKetQua,
		            UyQuyen, NgayTiepNhan, NgayHenTra, hs.CreatedOn, hs.MaHoSo,hs.DonViId, KenhThucHien, hs.DinhKemKetQua, hs.TrichYeuKetQua,                   
		             tt.TenTTHC,tt.TrangThaiPhiLePhi ,tt.ThuTucKhongCoKetQua,g.GroupName as TenDonVi, NgayNopHoSo, hs.SoGiayToChuHoSo,{tableLogDGHL}.HoanThanhDanhGia, 
                    hs.DangKyNhanHoSoQuaBCCIData,hs.NgayDangKyBuuDien,hs.NgayTraBuuDien,hs.TrangThaiTraBuuDien, TrangThaiThuPhi,hs.NgayHenTraCaNhan, hs.DinhKemTuChoi
                    {(attachUserTable ? getColUser : "")} {(viewDaChuyenXuLyTable ? getColNguoiXuLyTiep : "")}
                    FROM Business.HoSos as hs
                    INNER JOIN Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                    LEFT JOIN {tableLogDGHL}  on hs.MaHoSo = {tableLogDGHL}.MaHoSo
                    LEFT JOIN Catalog.Groups g on hs.DonViId = g.GroupCode
                    {(attachUserTable ? joinTableUserClause : "")}
                    {(viewDaChuyenXuLyTable ? joinTableUserNguoiXuLyTiep : "")}
                    outer apply (select STRING_AGG (CONVERT(NVARCHAR(700), TrangThai) , '##') as TrangThaiThuPhi from Business.YeuCauThanhToans yctt where hs.MaHoSo = yctt.MaHoSo and yctt.DeletedOn is null ) as yctt
                    {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoDto>(sql, request.PageSize, "CreatedOn Desc", cancellationToken, request.PageNumber, new
        {
            request.MaHoSo,
            request.MaLinhVucChinh,
            request.TiepNhanTo,
            request.TiepNhanFrom,
            request.HoSoToiHan,
            request.HenTraFrom,
            request.HenTraTo,
            request.NgayTraFrom,
            request.NgayTraTo,
            CurrentUser = user.Id.ToString(),
            NguoiGui = user.SoDinhDanh,
            request.MaTrangThai,
            request.NotInMaTrangThais,
            request.InMaTrangThais,
            request.NguoiDaXuLy,
            request.NguoiXuLyTruoc,
            request.GroupCode,
            request.HinhThucTra,
            request.KenhThucHien,
            request.NotEqKenhThucHien,
            request.NguoiNhanHoSo,
            request.TenTTHC,
            request.TrangThaiBoSung,
            request.TrangThaiTheoDoiHoSo,
            request.TrangThaiThuPhi,
            request.TrangThaiTraKq,
            request.DonViTraKq,
            request.SearchKeys,
            request.SoKyHieuTrichYeu,
            request.SoGiayToChuHoSo,
            request.TinhThanhDiaBan,
            request.MaTruongHop,
            request.MaTTHC,
            request.DangKyBuuDienDenNgay,
            request.DangKyBuuDienTuNgay,
            request.DangKyQuaBuuDien,
            request.TraKqBuuDienTuNgay,
            request.TraKqBuuDienDenNgay,
            QuanHuyenDiaBan = request.TinhThanhDiaBan + "." + request.QuanHuyenDiaBan,
            XaPhuongDiaBan = request.TinhThanhDiaBan + "." + request.QuanHuyenDiaBan + "." + request.XaPhuongDiaBan
        });
        return data;
    }
}
