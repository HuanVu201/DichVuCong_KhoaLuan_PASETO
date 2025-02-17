using System;
using System.Text.RegularExpressions;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
using TD.DichVuCongApi.Domain.Business.Events;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class SearchHoSoQueryWhereBuilder
{
    public static string Build(SearchHoSoQuery req)
    {
        YeuCauThanhToanConstants yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
        TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        BaoCaoTongHopConstants _baoCaoTongHopConstants = new BaoCaoTongHopConstants();

        string where = string.Empty; // ChoBanHanh = 1 là hồ sơ đang ở trên QLVB
        bool laViewChoKyDuyetPhiDiaGioi = req.ViewHoSo == "cho-ky-duyet-phi-dia-gioi";
        if (laViewChoKyDuyetPhiDiaGioi)
        {
            where += " AND hs.ChoBanHanh = 1";
            req.MaTrangThai = string.Empty;
        }
        if (!string.IsNullOrEmpty(req.SearchKeys))
            where += " AND (hs.MaHoSo LIKE '%' + @SearchKeys + '%' OR hs.ChuHoSo LIKE '%' + @SearchKeys + '%')";
        if (!string.IsNullOrEmpty(req.SoDienThoaiChuHoSo))
            where += " AND hs.SoDienThoaiChuHoSo LIKE '%' + @SoDienThoaiChuHoSo + '%'";
        if (!string.IsNullOrEmpty(req.SoDienThoaiNguoiUyQuyen))
            where += " AND hs.SoDienThoaiNguoiUyQuyen LIKE '%' + @SoDienThoaiNguoiUyQuyen + '%'";
        if (!string.IsNullOrEmpty(req.ChuHoSo))
            where += " AND hs.ChuHoSo LIKE '%' + @ChuHoSo + '%'";
        if (!string.IsNullOrEmpty(req.DiaChiChuHoSo))
            where += " AND hs.DiaChiChuHoSo LIKE '%' + @DiaChiChuHoSo + '%'";
        if (req.DaKySo == true)
            where += " AND hs.DinhKemKetQua LIKE '%_signed%'";
        else if (req.DaKySo == false)
            where += " AND hs.DinhKemKetQua NOT LIKE '%_signed%'";
        if (!string.IsNullOrEmpty(req.LoaiLienThong))
        {
            if (req.LoaiLienThong == "LTKS")
                where += " AND  hs.LoaiDuLieuKetNoi = 'LTKS'";
            else if (req.LoaiLienThong == "LTKT")
                where += " AND  hs.LoaiDuLieuKetNoi = 'LTKT'";
        }
        if (!string.IsNullOrEmpty(req.NguoiUyQuyen))
            where += " AND hs.NguoiUyQuyen LIKE '%' + @NguoiUyQuyen + '%'";
        if (!string.IsNullOrEmpty(req.HoSoTaiKhoan))
            where += " AND ( NguoiDangXuLy LIKE '%' + @HoSoTaiKhoan + '%' Or NguoiNhanHoSo LIKE '%' + @HoSoTaiKhoan + '%' Or NguoiDaXuLy LIKE '%' + @HoSoTaiKhoan + '%' Or NguoiXuLyTiep LIKE '%' +  @HoSoTaiKhoan + '%' Or NguoiXuLyTruoc LIKE '%' +  @HoSoTaiKhoan + '%')";
        if (!string.IsNullOrEmpty(req.TrichYeuHoSo))
            where += " AND hs.TrichYeuHoSo LIKE '%' + @TrichYeuHoSo + '%'";
        if (!string.IsNullOrEmpty(req.MaHoSoLienThong))
            where += " AND hs.MaHoSoKhac LIKE '%' + @MaHoSoLienThong + '%'";
        if (!string.IsNullOrEmpty(req.SoKyHieuKetQua))
            where += " AND hs.SoKyHieuKetQua LIKE '%' + @SoKyHieuKetQua + '%'";
        if (!string.IsNullOrEmpty(req.MaLinhVucChinh))
            where += " AND (tt.MaLinhVucChinh = @MaLinhVucChinh ) ";
        if (!string.IsNullOrEmpty(req.ThuTucId))
            where += " AND (tt.MaTTHC = @ThuTucId ) ";
        if (!string.IsNullOrEmpty(req.SoKyHieuTrichYeu))
            where += " AND (hs.SoKyHieuKetQua LIKE '%' + @SoKyHieuTrichYeu + '%' OR hs.TrichYeuKetQua LIKE '%' + @SoKyHieuTrichYeu + '%') ";
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND hs.MaHoSo LIKE '%' + @MaHoSo + '%'";
        if (!string.IsNullOrEmpty(req.TrangThaiHoSoId))
            where += " AND hs.TrangThaiHoSoId = @TrangThaiHoSoId";
        if (!string.IsNullOrEmpty(req.TrangThaiThuPhi))
            where += " AND TrangThaiThuPhi = @TrangThaiThuPhi";
        if (!string.IsNullOrEmpty(req.TiepNhanFrom))
            where += " AND hs.NgayTiepNhan >= @TiepNhanFrom";
        if (!string.IsNullOrEmpty(req.TiepNhanTo))
            where += " AND hs.NgayTiepNhan <= @TiepNhanTo";
        if (!string.IsNullOrEmpty(req.HenTraFrom))
            where += " AND hs.NgayHenTra >= @HenTraFrom";
        if (req.CoNgayTiepNhan == true)
            where += " AND hs.NgayTiepNhan is not null";
        if (!string.IsNullOrEmpty(req.TrangThaiPhiDiaGioi))
        {
            where += " AND hs.TrangThaiPhiDiaGioi = @TrangThaiPhiDiaGioi";
        }
        if (!string.IsNullOrEmpty(req.KhongThuocTrangThaiPhiDiaGioi))
        {
            where += " AND hs.TrangThaiPhiDiaGioi != @KhongThuocTrangThaiPhiDiaGioi";
        }
        if (req.ByNguoiNhanPhiDiaGioi == true)
        {
            where += " AND hs.NguoiNhanPhiDiaGioi = @CurrentUser";
        }
        if (!string.IsNullOrEmpty(req.HoSoToiHan))
        {
            if (req.HoSoToiHan == "3")
            {
                where += " AND CONVERT(DATE, hs.NgayHenTra) = CONVERT(DATE, DATEADD(DAY, 3, GETDATE())) ";
            }
            else if (req.HoSoToiHan == "2")
            {
                where += " AND CONVERT(DATE, hs.NgayHenTra) = CONVERT(DATE, DATEADD(DAY, 2, GETDATE())) ";
            }
            else if (req.HoSoToiHan == "1")
            {
                where += " AND CONVERT(DATE, hs.NgayHenTra) = CONVERT(DATE, DATEADD(DAY, 1, GETDATE())) ";
            }
            else if (req.HoSoToiHan == "0")
            {
                where += " AND CAST(hs.NgayHenTra AS DATE) = CAST(GETDATE() AS DATE) ";
            }
            else if (req.HoSoToiHan == "get-all")
            {
                where += " AND CONVERT(DATE, hs.NgayHenTra) BETWEEN CONVERT(DATE, GETDATE()) AND CONVERT(DATE, DATEADD(DAY, 3, GETDATE())) ";
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
            where += " AND hs.TrangThaiHoSoId = CAST(@MaTrangThai as varchar(5))";
        if (!string.IsNullOrEmpty(req.SoGiayToChuHoSo))
            where += " AND hs.SoGiayToChuHoSo LIKE '%' + @SoGiayToChuHoSo + '%'";
        if (!string.IsNullOrEmpty(req.NguoiDaXuLy))
            where += " AND hs.NguoiDaXuLy LIKE '%' + @NguoiDaXuLy + '%'";
        if (!string.IsNullOrEmpty(req.NguoiDangXuLy))
            where += " AND hs.NguoiDangXuLy LIKE '%' + @NguoiDangXuLy + '%'";
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
        if (!string.IsNullOrEmpty(req.GroupCode2))
            where += " AND hs.DonViId = @GroupCode2";
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
            where += " AND (hs.NguoiNhanHoSo = @CurrentUser or hs.NguoiDangXuLy = @CurrentUser)";
        if (!string.IsNullOrEmpty(req.TenTTHC))
            where += " AND tt.TenTTHC LIKE '%' + @TenTTHC + '%'";
        if (!string.IsNullOrEmpty(req.TinhThanhDiaBan))
        {
            where += " AND hs.TinhThanhDiaBan = @TinhThanhDiaBan";
        }
        if (!string.IsNullOrEmpty(req.MaTrangThai))
        {
            if (req.MaTrangThai == "4" || req.MaTrangThai == "2" || req.MaTrangThai == "6")
            {
                where += " AND hs.ChoBanHanh = 0";
            }
        }
        if (!string.IsNullOrEmpty(req.QuanHuyenDiaBan))
            where += " AND hs.QuanHuyenDiaBan = @QuanHuyenDiaBan";
        if (!string.IsNullOrEmpty(req.XaPhuongDiaBan))
            where += " AND hs.XaPhuongDiaBan = @XaPhuongDiaBan";
        if (!string.IsNullOrEmpty(req.TrangThaiBoSung))
        {
            where += $" AND hs.TrangThaiBoSung = @TrangThaiBoSung";
        }
        if (!string.IsNullOrEmpty(req.TrangThaiTraKq))
        {
            TrangThaiTraKetQuaHoSoConstant trangThaiTraKetQuaHoSoConstant = new TrangThaiTraKetQuaHoSoConstant();
            if (req.TrangThaiTraKq == trangThaiTraKetQuaHoSoConstant.DA_CHUYEN_TRA_KQ)
            {

                if (req.InMaTrangThais != null && req.InMaTrangThais.Count > 1 && req.InMaTrangThais.Contains("5"))
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
                if (req.InMaTrangThais != null && req.InMaTrangThais.Count > 1 && req.InMaTrangThais.Contains("5"))
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
                where += $" AND (hs.LaHoSoChungThuc = 0 )";
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

        if (req.TieuChiThongKeHoSoTrongNgay == "tiep-nhan-trong-ngay")
        {
            where += $" AND (TrangThaiHoSoId not in ('1','3') and (NgayTiepNhan >= CAST(GETDATE() AS DATE) AND NgayTiepNhan < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))))";
        }
        else if (req.TieuChiThongKeHoSoTrongNgay == "tiep-nhan-truc-tiep-trong-ngay")
        {
            where += $" AND (TrangThaiHoSoId not in ('1','3') and (NgayTiepNhan >= CAST(GETDATE() AS DATE) AND NgayTiepNhan < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))) and KenhThucHien = '1')";
        }
        else if (req.TieuChiThongKeHoSoTrongNgay == "tiep-nhan-truc-tuyen-trong-ngay")
        {
            where += $" AND (TrangThaiHoSoId not in ('1','3') and (NgayTiepNhan >= CAST(GETDATE() AS DATE) AND NgayTiepNhan < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))) and KenhThucHien = '2')";
        }
        else if (req.TieuChiThongKeHoSoTrongNgay == "tiep-nhan-qua-bcci-trong-ngay")
        {
            where += $" AND (TrangThaiHoSoId not in ('1','3') and (NgayTiepNhan >= CAST(GETDATE() AS DATE) AND NgayTiepNhan < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))) and KenhThucHien = '3')";
        }
        else if (req.TieuChiThongKeHoSoTrongNgay == "co-ket-qua-trong-ngay")
        {
            where += $" AND (TrangThaiHoSoId in ('9','10') and TrangThaiTraKq != 1 and (NgayKetThucXuLy >= CAST(GETDATE() AS DATE) AND NgayKetThucXuLy < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))))";
        }
        else if (req.TieuChiThongKeHoSoTrongNgay == "da-tra-cong-dan-trong-ngay")
        {
            where += $" AND (TrangThaiHoSoId = '10' and (NgayTra >= CAST(GETDATE() AS DATE) AND NgayTra < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))))";
        }
        else if (req.TieuChiThongKeHoSoTrongNgay == "thu-phi-le-phi-trong-ngay")
        {
            where += $" AND ( yctt.TrangThaiThuPhi = N'Đã thanh toán' and (yctt.NgayThuPhi >= CAST(GETDATE() AS DATE) AND yctt.NgayThuPhi < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))))";
        }
        else if (req.TieuChiThongKeHoSoTrongNgay == "yeu-cau-tra-lai-xin-rut-trong-ngay")
        {
            where += $" AND (TrangThaiHoSoId = '9'and LoaiKetQua = N'Trả lại/Xin rút' and (NgayKetThucXuLy >= CAST(GETDATE() AS DATE) AND NgayKetThucXuLy < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))))";
        }
        else if (req.TieuChiThongKeHoSoTrongNgay == "yeu-cau-bo-sung-trong-ngay")
        {
            where += $" AND (TrangThaiHoSoId = '5'and (NgayYeuCauBoSung >= CAST(GETDATE() AS DATE) AND NgayYeuCauBoSung < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))))";
        }
        if (req.DangKyTraKQQuaBuuDien == true)
        {
            where += $" AND (hs.HinhThucTra = '1' OR hs.NgayDangKyBuuDien IS NOT NULL) ";
        }
        if (req.TrangThaiTheoDoiHoSo == TrangThaiTheoDoiHoSoConstant.CHO_TIEP_NHAN)
        {
            where += $" AND (hs.TrangThaiHoSoId IN ({TrangThaiHoSoConstants.CHO_TIEP_NHAN})) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == TrangThaiTheoDoiHoSoConstant.KHONG_DU_DIEU_KIEN_TIEP_NHAN)
        {
            where += $" AND (hs.TrangThaiHoSoId = {TrangThaiHoSoConstants.KHONG_DU_DIEU_KIEN_TIEP_NHAN})";
        }
        else if (req.TrangThaiTheoDoiHoSo == TrangThaiTheoDoiHoSoConstant.DA_NOP_PHI_CHO_TIEP_NHAN)
        {
            where += $" AND (hs.TrangThaiHoSoId IN ({TrangThaiHoSoConstants.CHO_TIEP_NHAN}) AND TrangThaiThuPhi = N'{yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN}' ) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == TrangThaiTheoDoiHoSoConstant.CHO_NOP_PHI_THU_TRUOC_CHO_TIEP_NHAN)
        {
            where += $" AND (hs.TrangThaiHoSoId IN ({TrangThaiHoSoConstants.CHO_TIEP_NHAN}) AND TrangThaiThuPhi = N'{yeuCauThanhToanConstants.TRANG_THAI.CHO_THANH_TOAN}' ) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == TrangThaiTheoDoiHoSoConstant.DA_TIEP_NHAN)
        {
            where += $" AND (hs.TrangThaiHoSoId IN ({TrangThaiHoSoConstants.DA_TIEP_NHAN}) ) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == TrangThaiTheoDoiHoSoConstant.DA_VA_DANG_XU_LY)
        {
            where += $" AND (hs.TrangThaiHoSoId IN ({TrangThaiHoSoConstants.DA_VA_DANG_XU_LY}) ) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == "cho-tiep-nhan-khong-co-trang-thai-thu-phi")
        {
            where += $" AND (hs.TrangThaiHoSoId = '1' and yctt.TrangThaiThuPhi is null  ) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == "du-dieu-kien-da-nop-phi-cho-tiep-nhan")
        {
            where += $" AND (TrangThaiHoSoId = '1' and yctt.TrangThaiThuPhi = N'Đã thanh toán') ";
        }
        else if (req.TrangThaiTheoDoiHoSo == "du-dieu-kien-chua-nop-phi-cho-tiep-nhan")
        {
            where += $" AND (TrangThaiHoSoId = '1' AND (yctt.TrangThaiThuPhi = N'Chờ thanh toán' OR yctt.TrangThaiThuPhi = N'Chưa thanh toán') ) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == "moi-tiep-nhan")
        {
            where += $" AND  TrangThaiHoSoId = '2'  ";
        }
        else if (req.TrangThaiTheoDoiHoSo == "dang-xu-ly")
        {
            where += $" AND  TrangThaiHoSoId = '4'";
        }
        else if (req.TrangThaiTheoDoiHoSo == "dung-xu-ly")
        {
            where += $" AND  TrangThaiHoSoId = '8'";
        }
        else if (req.TrangThaiTheoDoiHoSo == "cho-thuc-hien-nghia-vu-tai-chinh")
        {
            where += $" AND  TrangThaiHoSoId = '6'";
        }
        else if (req.TrangThaiTheoDoiHoSo == "cho-bo-sung")
        {
            where += $" AND ( TrangThaiHoSoId = '5' and TrangThaiTraKq = '1')";
        }
        else if (req.TrangThaiTheoDoiHoSo == "cho-xac-nhan-ket-qua")
        {
            where += $" AND ( TrangThaiHoSoId = '9' and TrangThaiTraKq = '1' and LoaiKetQua != N'Trả lại/Xin rút')";
        }
        else if (req.TrangThaiTheoDoiHoSo == "cho-xac-nhan-bo-sung")
        {
            where += $" AND ( TrangThaiHoSoId = '5' and TrangThaiTraKq = '1')";
        }
        else if (req.TrangThaiTheoDoiHoSo == "cho-xac-nhan-tra-lai")
        {
            where += $" AND ( TrangThaiHoSoId = '9' and TrangThaiTraKq = '1' and LoaiKetQua = N'Trả lại/Xin rút')";
        }
        else if (req.TrangThaiTheoDoiHoSo == "cho-tra")
        {
            where += $" AND (TrangThaiHoSoId = '9' and TrangThaiTraKq = '1')";
        }
        else if (req.TrangThaiTheoDoiHoSo == "MucDo2NopTrucTuyen")
        {
            where += $" AND hs.MucDo = '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}' AND hs.KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}' AND hs.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";
        }
        else if (req.TrangThaiTheoDoiHoSo == "KhongCoNgayTiepNhan")
        {
            where += $" AND hs.NgayTiepNhan IS NULL  AND TrangThaiHoSoId != '5'  AND hs.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == "KhongCoNgayKetThuc")
        {
            where += $" AND hs.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY}) AND hs.NgayKetThucXuLy IS NULL  AND hs.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == "TiepNhanSauNgayHienTai")
        {
            where += $" AND CONVERT(date,hs.NgayTiepNhan, 23) > @CurrentTime AND hs.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == "KetThucSauNgayHienTai")
        {
            where += $" AND CONVERT(date,hs.NgayKetThucXuLy, 23) > @CurrentTime AND hs.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == "KetThucHoSoTruocNgayNhan")
        {
            where += $" AND CONVERT(date,hs.NgayTiepNhan, 23) > CONVERT(date,hs.NgayKetThucXuLy, 23) AND hs.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == "DaXuLyQuaHan")
        {
            where += $" AND hs.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY}) AND CONVERT(DATE,NgayKetThucXuLy,23) > CONVERT(DATE,NgayHenTra,23) ";
        }
        else if (req.TrangThaiTheoDoiHoSo == "DangXuLyQuaHan")
        {
            where += $" AND hs.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DANG_XU_LY}) AND CONVERT(DATE,NgayHenTra,23)  < @TiepNhanTo ";
        }
        else if (req.TrangThaiTheoDoiHoSo == "NopQuaVNeID")
        {
            where += $" AND hs.LoaiDuLieuKetNoi IN ('LLTPVneid', 'LLTPVneidUyQuyen')";
        }
        if (!string.IsNullOrEmpty(req.MaTruongHop)) where += " AND hs.MaTruongHop = @MaTruongHop ";
        if (!string.IsNullOrEmpty(req.MaTTHC)) where += " AND hs.MaTTHC = @MaTTHC ";
        if (req.NopHoSoTuNgay.HasValue) where += $" AND hs.NgayNopHoSo >= @NopHoSoTuNgay ";
        if (req.NopHoSoDenNgay.HasValue) where += $" AND hs.NgayNopHoSo <= @NopHoSoDenNgay ";
        if (req.DangKyBuuDienTuNgay.HasValue) where += $" AND hs.NgayDangKyBuuDien >= @DangKyBuuDienTuNgay ";
        if (req.DangKyBuuDienDenNgay.HasValue) where += $" AND hs.NgayDangKyBuuDien <= @DangKyBuuDienDenNgay ";
        if (req.TraKqBuuDienTuNgay.HasValue) where += $" AND hs.NgayTraBuuDien >= @TraKqBuuDienTuNgay ";
        if (req.TraKqBuuDienDenNgay.HasValue) where += $" AND hs.NgayTraBuuDien <= @TraKqBuuDienDenNgay ";
        if (!string.IsNullOrEmpty(req.DonViQuanLy))
        {
            where += $" AND (g.DonViQuanLy = @DonViQuanLy OR g.GroupCode = @DonViQuanLy OR g.OfGroupCode = @DonViQuanLy) ";
        }

        if (req.LoaiDoiTuong == LoaiChuHoSoConstant.CongDan)
        {
            where += $" AND hs.LoaiDoiTuong != N'{LoaiChuHoSoConstant.DoanhNghiep}' AND hs.LoaiDoiTuong != N'{LoaiChuHoSoConstant.CoQuanNhaNuoc}' ";
        }
        else if (!string.IsNullOrEmpty(req.LoaiDoiTuong))
        {
            where += $" AND hs.LoaiDoiTuong = @LoaiDoiTuong ";
        }
        if (!string.IsNullOrEmpty(req.LoaiKetQua)) where += $" AND hs.LoaiKetQua = @LoaiKetQua";
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
public class SearchHoSoQueryHandler : IRequestHandler<SearchHoSoQuery, PaginationResponse<HoSoDto>>
{
    private readonly string tableLogDGHL = "[Business].[LogThongKeDGHLCongDans]";
    private readonly string tablePhieuKhaoSat = "[Business].[PhieuKhaoSats]";
    private readonly string tableTrangThaiHoSo = "[Business].[TrangThaiHoSos]";
    private readonly string tableTruongHopThuTuc = "[Business].[TruongHopThuTucs]";
    private readonly string tableGiayToHoSo = "[Business].[GiayToHoSos]";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public SearchHoSoQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    private string GetOrderBy(string[]? keys, string defaultOrder = "CreatedOn DESC")
    {
        List<string> res = new List<string>();
        if (keys == null)
        {
            return defaultOrder;
        }
        Dictionary<string, string> result = new Dictionary<string, string>();
        result.Add("LastModifiedOn", "LastModifiedOn DESC");
        result.Add("NgayXacNhanKetQua", "NgayXacNhanKetQua DESC");
        for (int i = 0; i < keys.Count(); i++)
        {
            var key = keys[i];
            if (result.ContainsKey(key))
            {
                res.Add(result[key]);
            }
        }
        if (res.Count > 0)
            return string.Join(",", res);
        else return defaultOrder;
    }
    public async Task<PaginationResponse<HoSoDto>> Handle(SearchHoSoQuery request, CancellationToken cancellationToken)
    {
        if(request.GroupCode2 == "0A97F0DB-325A-6205-69D4-F7131F368F64")
        {
            request.DonViQuanLy = "0A97F0DB-325A-6205-69D4-F7131F368F64";
            request.GroupCode2 = null;
        }
        string currentTime = GetCurrentTime.Get(DateTime.UtcNow).ToString("yyyy-MM-dd");
        string joinYcctTable = "outer apply (select STRING_AGG (CONVERT(NVARCHAR(700), TrangThai) , '##') as TrangThaiThuPhi from Business.YeuCauThanhToans yctt where hs.MaHoSo = yctt.MaHoSo and yctt.DeletedOn is null ) as yctt";
        string joinYcctBaoGomNgayThuPhiTable = "outer apply (select STRING_AGG (CONVERT(NVARCHAR(700), TrangThai) , '##') as TrangThaiThuPhi, CAST(NgayThuPhi AS DATE) AS NgayThuPhi from Business.YeuCauThanhToans yctt where hs.MaHoSo = yctt.MaHoSo and yctt.DeletedOn is null group by CAST(NgayThuPhi AS DATE)) as yctt";
        string joinTableUserClause = "LEFT JOIN [Identity].[Users] as u ON u.Id = hs.NguoiXuLyTruoc";
        string joinTableUserNguoiXuLyTiep = "LEFT JOIN [Identity].[Users] as u ON u.Id = hs.NguoiDangXuLy";
        string outerApplyVPUB = "outer apply (SELECT STRING_AGG(k.LoaiKetQua, ', ') AS LoaiKetQuaHSLT, STRING_AGG(k.SoKyHieu, ', ') AS SoKyHieuHSLT,STRING_AGG(k.TrichYeu, ', ') AS TrichyeuHSLT,STRING_AGG (CONVERT(NVARCHAR(700), DinhKem) , '##') as DinhKemHSLT FROM  Business.KetQuaLienQuans k where hs.MaHoSo = k.MaHoSo) as kqlq";
        string getColUser = ", u.FullName as TenNguoiXuLyTruoc";
        string getColNguoiXuLyTiep = ", u.FullName as NguoiXuLyTiep";
        string getColKQLQ = ", kqlq.LoaiKetQuaHSLT, kqlq.TrichyeuHSLT, kqlq.DinhKemHSLT, kqlq.SoKyHieuHSLT";
        string getColYctt = ", TrangThaiThuPhi";
        bool attachUserTable = request.MaTrangThai == "4";
        bool viewDaChuyenXuLyTable = request.ViewHoSo == "da-chuyen-xu-ly";
        bool viewVPUB = request.ViewHoSo == "dang-xu-ly-lien-thong";

        var where = SearchHoSoQueryWhereBuilder.Build(request);
        var sql = $@"SELECT hs.ID,hs.NgayXacNhanKetQua, ChuHoSo,hs.TenDiaBan,hs.TenBuocHienTai,NgayLuuViTriHoSo,NguoiLuuViTriHoSo ,hs.SoKyHieuKetQua,SoDienThoaiChuHoSo, EmailChuHoSo, hs.MaTruongHop, hs.MaTTHC, hs.TrangThaiHoSoId,LyDoTuChoi,LyDoBoSung,hs.TrichYeuHoSo, hs.ViTriDeHoSo,hs.LoaiKetQua, hs.DiaChiChuHoSo,
		            UyQuyen, hs.NguoiUyQuyen, hs.SoDienThoaiNguoiUyQuyen, NgayTiepNhan, NgayHenTra, hs.CreatedOn, hs.NgayChuyenXuLy, hs.LastModifiedOn, hs.MaHoSo,hs.DonViId, KenhThucHien,thtt.BatBuocDinhKemKetQua, thtt.Ten as TenTruongHop,thtt.BatBuocKySoKetQua, hs.DinhKemKetQua, hs.TrichYeuKetQua
                    , tt.TenTTHC,tt.TrangThaiPhiLePhi ,tt.ThuTucKhongCoKetQua,g.GroupName as TenDonVi, NgayNopHoSo, hs.SoGiayToChuHoSo,
                    hs.DangKyNhanHoSoQuaBCCIData,hs.NgayDangKyBuuDien,hs.NgayTraBuuDien,hs.TrangThaiTraBuuDien, hs.NgayHenTraCaNhan, hs.DinhKemTuChoi, hs.LoaiDuLieuKetNoi
                    {(request.HienThiTrangThaiThanhToan ? getColYctt : "")}
                    {(attachUserTable ? getColUser : "")} {(viewDaChuyenXuLyTable ? getColNguoiXuLyTiep : "")} {(viewVPUB ? getColKQLQ : "")}
                    FROM Business.HoSos as hs
                    INNER JOIN Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                    LEFT JOIN Catalog.Groups g on hs.DonViId = g.GroupCode
                    LEFT JOIN {tableTruongHopThuTuc} thtt ON thtt.Ma = hs.MaTruongHop
                    {(attachUserTable ? joinTableUserClause : "")}
                    {(viewDaChuyenXuLyTable ? joinTableUserNguoiXuLyTiep : "")}
                    {(request.HienThiTrangThaiThanhToan ? joinYcctTable : "")}
                    {(request.HienThiTrangThaiThanhToanBaoGomNgayThuPhi ? joinYcctBaoGomNgayThuPhiTable : "")}
                    {(viewVPUB ? outerApplyVPUB : "")}
                    {where}";
        string order = string.Empty;
        string defaultOrder = string.Empty;
        if (viewVPUB)
        {
            defaultOrder = "NgayChuyenXuLy DESC";
        }
        defaultOrder = "CreatedOn Desc";

        order = GetOrderBy(request.OrderBy, defaultOrder);

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoDto>(sql, request.PageSize, order, cancellationToken, request.PageNumber, new
        {
            request.MaHoSo,
            request.MaLinhVucChinh,
            request.TiepNhanTo,
            request.TiepNhanFrom,
            request.HoSoToiHan,
            request.HenTraFrom,
            request.HenTraTo,
            request.NgayTraFrom,
            request.HoSoTaiKhoan,
            request.NgayTraTo,
            CurrentUser = _currentUser.GetUserId().ToString(),
            request.MaTrangThai,
            request.NotInMaTrangThais,
            request.InMaTrangThais,
            request.NguoiDaXuLy,
            request.NguoiDangXuLy,
            request.NguoiXuLyTruoc,
            request.GroupCode,
            request.GroupCode2,
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
            XaPhuongDiaBan = request.TinhThanhDiaBan + "." + request.QuanHuyenDiaBan + "." + request.XaPhuongDiaBan,
            request.TrangThaiHoSoId,
            request.NopHoSoTuNgay,
            request.NopHoSoDenNgay,
            request.ThuTucId,
            request.ChuHoSo,
            request.NguoiUyQuyen,
            request.SoDienThoaiChuHoSo,
            request.SoDienThoaiNguoiUyQuyen,
            request.TrichYeuHoSo,
            request.LoaiDoiTuong,
            request.DonViQuanLy,
            request.MaHoSoLienThong,
            request.SoKyHieuKetQua,
            request.LoaiKetQua,
            CurrentTime = currentTime,
            request.TrangThaiPhiDiaGioi,
            request.KhongThuocTrangThaiPhiDiaGioi,
            request.DiaChiChuHoSo
        });
        return data;
    }
}
