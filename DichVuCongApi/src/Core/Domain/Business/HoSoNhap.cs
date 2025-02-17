using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class HoSoNhap : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViId { get; set; }
    [MaxLength(1000)]
    public string? DonViQuanLy { get; set; }
    public bool? ChoXacNhan { get; set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? KenhThucHien { get; set; }
    [MaxLength(50)]
    public string? LoaiDoiTuong { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaDoiTuong { get; set; }

    [MaxLength(500)]
    public string? ChuHoSo { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? SoDienThoaiChuHoSo { get; set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? EmailChuHoSo { get; set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? SoGiayToChuHoSo { get; set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? LoaiGiayToChuHoSo { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? NgaySinhChuHoSo { get; set; }
    [MaxLength(100)]
    public string? TinhThanhChuHoSo { get; set; }
    [MaxLength(100)]
    public string? QuanHuyenChuHoSo { get; set; }
    [MaxLength(100)]
    public string? XaPhuongChuHoSo { get; set; }
    [MaxLength(500)]
    public string? DiaChiChuHoSo { get; set; }
    public bool? UyQuyen { get; set; }
    [MaxLength(500)]
    public string? NguoiUyQuyen { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? SoDienThoaiNguoiUyQuyen { get; set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? EmailNguoiUyQuyen { get; set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? SoGiayToNguoiUyQuyen { get; set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? LoaiGiayToNguoiUyQuyen { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? NgaySinhNguoiUyQuyen { get; set; }
    [MaxLength(100)]
    public string? TinhThanhNguoiUyQuyen { get; set; }
    [MaxLength(100)]
    public string? QuanHuyenNguoiUyQuyen { get; set; }
    [MaxLength(100)]
    public string? XaPhuongNguoiUyQuyen { get; set; }
    [MaxLength(500)]
    public string? DiaChiNguoiUyQuyen { get; set; }
    [MaxLength(2000)]
    public string? TrichYeuHoSo { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? TrangThaiHoSoId { get; set; }
    [MaxLength(20)]
    public string? HinhThucTra { get; set; }
    [MaxLength(500)]
    public string? GhiChu { get; set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? NoiNopHoSo { get; set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? HoSoCoThanhPhanSoHo { get; set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? TaiKhoanDuocXacThucVoiVNeID { get; set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? DuocThanhToanTrucTuyen { get; set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? LoaiDinhDanh { get; set; }
    [Column(TypeName = "varchar")]
    [MaxLength(40)]
    public string? SoDinhDanh { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaTTHC { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaLinhVuc { get; set; }
    [MaxLength(150)]
    public string? TenLinhVuc { get; set; }
    [MaxLength(4000)]
    public string? TenTruongHop { get; set; }
    [MaxLength(200)]
    [Column(TypeName = "varchar")]
    public string? MaTruongHop { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? TruongHopId { get; set; }
    public double? ThoiGianThucHien { get; set; }
    [MaxLength(50)]
    public string? LoaiThoiGianThucHien { get; set; }
    public bool? ThongBaoEmail { get; set; } = false;
    public bool? ThongBaoZalo { get; set; } = false;
    public bool? ThongBaoSMS { get; set; } = false;
    [MaxLength(3000)]
    [Column(TypeName = "varchar")]
    public string? NguoiXuLyTiep { get; set; }
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? BuocXuLyTiep { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? NguoiNhanHoSo { get; set; }
    [MaxLength(2000)]
    [Column(TypeName = "varchar")]
    public string? NguoiDaXuLy { get; set; }
    [MaxLength(50)]
    public string? MucDo { get; set; }
    public int? SoBoHoSo { get; set; }
    [MaxLength(100)]
    public string? TenBuocHienTai { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? BuocHienTai { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? NguoiXuLyTruoc { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? BuocXuLyTruoc { get; set; }
    [MaxLength(1500)]
    public string? DangKyNhanHoSoQuaBCCIData { get; set; }
    [MaxLength(2000)]
    public string? TrichYeuKetQua { get; set; }
    [MaxLength(1000)]
    public string? DinhKemKetQua { get; set; }
    [MaxLength(100)]
    public string? LoaiVanBanKetQua { get; set; }
    [MaxLength(60)]
    public string? SoKyHieuKetQua { get; set; }
    [MaxLength(50)]
    public string? NguoiKyKetQua { get; set; }
    [MaxLength(300)]
    public string? CoQuanBanHanhKetQua { get; set; }
    public DateTime? NgayBanHanhKetQua { get; set; }
    public DateTime? NgayKyKetQua { get; set; }

    [MaxLength(2000)]
    public string? YKienNguoiChuyenXuLy { get; set; }
    [MaxLength(1000)]
    public string? DinhKemYKienNguoiChuyenXuLy { get; set; }
    [MaxLength(2000)]
    [Column(TypeName = "varchar")]
    public string? NguoiDangXuLy { get; set; }
    public bool? ChuyenNoiBo { get; set; }
    [MaxLength(1500)]
    public string? LyDoXoa { get; set; }
    [MaxLength(50)]
    public string? TrangThaiBoSung { get; set; }
    [MaxLength(50)]
    public string? TrangThaiTruoc { get; set; }
    [MaxLength(1500)]
    public string? LyDoBoSung { get; set; }
    [MaxLength(1000)]
    public string? DinhKemBoSung { get; set; }
    [MaxLength(500)]
    public string? ThongTinTiepNhanBoSung { get; set; }
    public string? ThanhPhanBoSung { get; set; }
    [MaxLength(50)]
    public string? NguoiGui { get; set; }
    public string? EFormData { get; set; }
    public string? EFormKetQuaData { get; set; }
    [MaxLength(500)]
    public string? LyDoTuChoi { get; set; }
    [MaxLength(1000)]
    public string? DinhKemTuChoi { get; set; }
    public bool? ChoBanHanh { get; set; }
    public string? KetQuaDaySangQLVB { get; set; }
    public int? ThoiHanBoSung { get; set; }
    [MaxLength(500)]
    public string? NoiDungBoSung { get; set; }
    public bool? DaSoHoaKetQua { get; set; }
    [MaxLength(1200)]
    public string? DinhKemSoHoa { get; set; }
    [MaxLength(3)]
    [Column(TypeName = "varchar")]
    public string? TrangThaiTraKq { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViTraKq { get; set; }
    public bool? LaHoSoChungThuc { get; set; } = false;
    /// <summary>
    /// đơn vị của người vừa ấn chuyển xử lý
    /// </summary>
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViChuyenXuLy { get; set; }
    public DateTime? HanTiepNhan { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? TinhThanhDiaBan { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? QuanHuyenDiaBan { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? XaPhuongDiaBan { get; set; }
    [MaxLength(1000)]
    public string? TenDiaBan { get; set; }
    public HoSoNhap() { }
    public HoSoNhap(string donViId, string? loaiDoiTuong, string? chuHoSo, string? soDienThoaiChuHoSo, string? emailChuHoSo, string? soGiayToChuHoSo,
        string? loaiGiayToChuHoSo, string? ngaySinhChuHoSo, string? tinhThanhChuHoSo, string? quanHuyenChuHoSo, string? xaPhuongChuHoSo,
        string? diaChiChuHoSo, string? nguoiGui, string maTTHC
        , string? maTruongHop, string? tenTruongHop, string truongHopId, string? eFormData, string? dangKyNhanHoSoQuaBCCIData, string? nguoiDangXuLy, string trichYeuHoSo
        , bool? uyQuyen, string? nguoiUyQuyen, string? soDienThoaiNguoiUyQuyen, string? emailNguoiUyQuyen, string? soGiayToNguoiUyQuyen,
         string? tinhThanhNguoiUyQuyen, string? quanHuyenNguoiUyQuyen, string? xaPhuongNguoiUyQuyen,
        string? diaChiNguoiUyQuyen, string? mucDo, string? hinhThucTra, bool? laHoSoChungThuc = false, string? donViTraKq = null)
    {
        KenhThucHien = "2";
        TrangThaiHoSoId = "1";
        HinhThucTra = hinhThucTra;
        if (!string.IsNullOrEmpty(loaiDoiTuong))
        {
            LoaiDoiTuong = loaiDoiTuong;
        }
        else
        {
            LoaiDoiTuong = "Công dân";
        }
        ChuHoSo = chuHoSo;
        DonViId = donViId;
        SoDienThoaiChuHoSo = soDienThoaiChuHoSo;
        EmailChuHoSo = emailChuHoSo;
        SoGiayToChuHoSo = soGiayToChuHoSo;
        LoaiGiayToChuHoSo = loaiGiayToChuHoSo;
        NgaySinhChuHoSo = ngaySinhChuHoSo;
        TinhThanhChuHoSo = tinhThanhChuHoSo;
        QuanHuyenChuHoSo = quanHuyenChuHoSo;
        XaPhuongChuHoSo = xaPhuongChuHoSo;
        DiaChiChuHoSo = diaChiChuHoSo;
        NguoiGui = nguoiGui;
        MaTTHC = maTTHC;
        MaTruongHop = maTruongHop;
        TenTruongHop = tenTruongHop;
        TruongHopId = truongHopId;
        EFormData = eFormData;
        DangKyNhanHoSoQuaBCCIData = dangKyNhanHoSoQuaBCCIData;
        NguoiDangXuLy = nguoiDangXuLy;
        TrichYeuHoSo = trichYeuHoSo;

        UyQuyen = uyQuyen;
        NguoiUyQuyen = nguoiUyQuyen;
        SoDienThoaiNguoiUyQuyen = soDienThoaiNguoiUyQuyen;
        EmailNguoiUyQuyen = emailNguoiUyQuyen;
        SoGiayToNguoiUyQuyen = soGiayToNguoiUyQuyen;
        TinhThanhNguoiUyQuyen = tinhThanhNguoiUyQuyen;
        QuanHuyenNguoiUyQuyen = quanHuyenNguoiUyQuyen;
        XaPhuongNguoiUyQuyen = xaPhuongNguoiUyQuyen;
        DiaChiNguoiUyQuyen = diaChiNguoiUyQuyen;
        MucDo = mucDo;
        LaHoSoChungThuc = laHoSoChungThuc;
        DonViTraKq = donViTraKq;

    }
    public HoSoNhap Update(string? donViId, string? donViQuanLy, bool? choXacNhan, string? kenhThucHien,
     string? loaiDoiTuong, string? maDoiTuong, string? chuHoSo, string? soDienThoaiChuHoSo, string? emailChuHoSo, string? soGiayToChuHoSo,
     string? loaiGiayToChuHoSo, string? ngaySinhChuHoSo, string? tinhThanhChuHoSo, string? quanHuyenChuHoSo, string? xaPhuongChuHoSo,
     string? diaChiChuHoSo, bool? uyQuyen, string? nguoiUyQuyen, string? soDienThoaiNguoiUyQuyen, string? emailNguoiUyQuyen, string? soGiayToNguoiUyQuyen,
     string? loaiGiayToNguoiUyQuyen, string? ngaySinhNguoiUyQuyen, string? tinhThanhNguoiUyQuyen, string? quanHuyenNguoiUyQuyen, string? xaPhuongNguoiUyQuyen,
     string? diaChiNguoiUyQuyen, string? trichYeuHoSo, string? trangThaiHoSoId, string? hinhThucTra,
     string? ghiChu, string? noiNopHoSo, string? hoSoCoThanhPhanSoHo, string? taiKhoanDuocXacThucVoiVNeID, string? duocThanhToanTrucTuyen,
     string? loaiDinhDanh, string? soDinhDanh, string? maTTHC, string? maLinhVuc, string? tenLinhVuc, string? tenTruongHop,
     string? maTruongHop, string? truongHopId, int? thoiGianThucHien, string? loaiThoiGianThucHien, bool? thongBaoEmail, bool? thongBaoZalo, bool? thongBaoSMS,
     string? nguoiXuLyTiep, string? buocXuLyTiep, string? nguoiNhanHoSo, string? nguoiDaXuLy, string? mucDo, int? soBoHoSo, string? tenBuocHienTai,
     string? buocHienTai, string? nguoiXuLyTruoc, string? buocXuLyTruoc, string? dangKyNhanHoSoQuaBCCIData, string? trichYeuKetQua,
     string? dinhKemKetQua, string? yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy, string? nguoiDangXuLy, string? eFormData, string? tenDiaBan)
    {
        if (!string.IsNullOrEmpty(trichYeuKetQua))
            TrichYeuKetQua = trichYeuKetQua;
        if (!string.IsNullOrEmpty(dinhKemKetQua))
            DinhKemKetQua = dinhKemKetQua;
        if (!string.IsNullOrEmpty(yKienNguoiChuyenXuLy))
            YKienNguoiChuyenXuLy = yKienNguoiChuyenXuLy;
        if (!string.IsNullOrEmpty(dinhKemYKienNguoiChuyenXuLy))
            DinhKemYKienNguoiChuyenXuLy = dinhKemYKienNguoiChuyenXuLy;
        if (!string.IsNullOrEmpty(donViId))
            DonViId = donViId;      
        if (!string.IsNullOrEmpty(tenDiaBan))
            TenDiaBan = tenDiaBan;
        if (!string.IsNullOrEmpty(donViQuanLy))
            DonViQuanLy = donViQuanLy;
        if (choXacNhan != null)
            ChoXacNhan = (bool)choXacNhan;
        if (!string.IsNullOrEmpty(kenhThucHien))
            KenhThucHien = kenhThucHien;
        if (!string.IsNullOrEmpty(ghiChu))
            GhiChu = ghiChu;
        if (!string.IsNullOrEmpty(loaiDoiTuong))
            LoaiDoiTuong = loaiDoiTuong;
        if (!string.IsNullOrEmpty(maDoiTuong))
            MaDoiTuong = maDoiTuong;
        if (!string.IsNullOrEmpty(chuHoSo))
            ChuHoSo = chuHoSo;
        if (!string.IsNullOrEmpty(soDienThoaiChuHoSo))
            SoDienThoaiChuHoSo = soDienThoaiChuHoSo;
        if (!string.IsNullOrEmpty(emailChuHoSo))
            EmailChuHoSo = emailChuHoSo;
        if (!string.IsNullOrEmpty(soGiayToChuHoSo))
            SoGiayToChuHoSo = soGiayToChuHoSo;
        if (!string.IsNullOrEmpty(loaiGiayToChuHoSo))
            LoaiGiayToChuHoSo = loaiGiayToChuHoSo;
        if (!string.IsNullOrEmpty(ngaySinhChuHoSo))
            NgaySinhChuHoSo = ngaySinhChuHoSo;
        if (!string.IsNullOrEmpty(tinhThanhChuHoSo))
            TinhThanhChuHoSo = tinhThanhChuHoSo;
        if (!string.IsNullOrEmpty(quanHuyenChuHoSo))
            QuanHuyenChuHoSo = quanHuyenChuHoSo;
        if (!string.IsNullOrEmpty(xaPhuongChuHoSo))
            XaPhuongChuHoSo = xaPhuongChuHoSo;
        if (!string.IsNullOrEmpty(diaChiChuHoSo))
            DiaChiChuHoSo = diaChiChuHoSo;
        if (uyQuyen != null)
            UyQuyen = (bool)uyQuyen;
        if (!string.IsNullOrEmpty(nguoiUyQuyen))
            NguoiUyQuyen = nguoiUyQuyen;
        if (!string.IsNullOrEmpty(soDienThoaiNguoiUyQuyen))
            SoDienThoaiNguoiUyQuyen = soDienThoaiNguoiUyQuyen;
        if (!string.IsNullOrEmpty(emailNguoiUyQuyen))
            EmailNguoiUyQuyen = emailNguoiUyQuyen;
        if (!string.IsNullOrEmpty(soGiayToNguoiUyQuyen))
            SoGiayToNguoiUyQuyen = soGiayToNguoiUyQuyen;
        if (!string.IsNullOrEmpty(loaiGiayToNguoiUyQuyen))
            LoaiGiayToNguoiUyQuyen = loaiGiayToNguoiUyQuyen;
        if (!string.IsNullOrEmpty(ngaySinhNguoiUyQuyen))
            NgaySinhNguoiUyQuyen = ngaySinhNguoiUyQuyen;
        if (!string.IsNullOrEmpty(tinhThanhNguoiUyQuyen))
            TinhThanhNguoiUyQuyen = tinhThanhNguoiUyQuyen;
        if (!string.IsNullOrEmpty(quanHuyenNguoiUyQuyen))
            QuanHuyenNguoiUyQuyen = quanHuyenNguoiUyQuyen;
        if (!string.IsNullOrEmpty(xaPhuongNguoiUyQuyen))
            XaPhuongNguoiUyQuyen = xaPhuongNguoiUyQuyen;
        if (!string.IsNullOrEmpty(diaChiNguoiUyQuyen))
            DiaChiNguoiUyQuyen = diaChiNguoiUyQuyen;
        if (!string.IsNullOrEmpty(trichYeuHoSo))
            TrichYeuHoSo = trichYeuHoSo;
        if (!string.IsNullOrEmpty(trangThaiHoSoId) && !TrangThaiHoSoId.Equals(trangThaiHoSoId))
            TrangThaiHoSoId = trangThaiHoSoId;
        if (!string.IsNullOrEmpty(hinhThucTra))
            HinhThucTra = hinhThucTra;
        if (!string.IsNullOrEmpty(noiNopHoSo))
            NoiNopHoSo = noiNopHoSo;
        if (!string.IsNullOrEmpty(hoSoCoThanhPhanSoHo))
            HoSoCoThanhPhanSoHo = hoSoCoThanhPhanSoHo;
        if (!string.IsNullOrEmpty(taiKhoanDuocXacThucVoiVNeID))
            TaiKhoanDuocXacThucVoiVNeID = taiKhoanDuocXacThucVoiVNeID;
        if (!string.IsNullOrEmpty(duocThanhToanTrucTuyen))
            DuocThanhToanTrucTuyen = duocThanhToanTrucTuyen;
        if (!string.IsNullOrEmpty(loaiDinhDanh))
            LoaiDinhDanh = loaiDinhDanh;
        if (!string.IsNullOrEmpty(soDinhDanh))
            SoDinhDanh = soDinhDanh;
        if (!string.IsNullOrEmpty(maTTHC))
            MaTTHC = maTTHC;
        if (!string.IsNullOrEmpty(maLinhVuc))
            MaLinhVuc = maLinhVuc;
        if (!string.IsNullOrEmpty(tenLinhVuc))
            TenLinhVuc = tenLinhVuc;
        if (!string.IsNullOrEmpty(tenTruongHop))
            TenTruongHop = tenTruongHop;
        if (!string.IsNullOrEmpty(maTruongHop))
            MaTruongHop = maTruongHop;
        if (!string.IsNullOrEmpty(truongHopId))
            TruongHopId = truongHopId;
        if (thoiGianThucHien != null)
            ThoiGianThucHien = (int)thoiGianThucHien;
        if (!string.IsNullOrEmpty(loaiThoiGianThucHien))
            LoaiThoiGianThucHien = loaiThoiGianThucHien;
        if (thongBaoEmail != null)
            ThongBaoEmail = (bool)thongBaoEmail;
        if (thongBaoZalo != null)
            ThongBaoZalo = (bool)thongBaoZalo;
        if (thongBaoSMS != null)
            ThongBaoSMS = (bool)thongBaoSMS;
        if (!string.IsNullOrEmpty(nguoiXuLyTiep))
            NguoiXuLyTiep = nguoiXuLyTiep;
        if (!string.IsNullOrEmpty(buocXuLyTiep))
            BuocXuLyTiep = buocXuLyTiep;
        if (!string.IsNullOrEmpty(nguoiNhanHoSo))
            NguoiNhanHoSo = nguoiNhanHoSo;
        if (!string.IsNullOrEmpty(nguoiDaXuLy))
            NguoiDaXuLy = nguoiDaXuLy;
        if (!string.IsNullOrEmpty(mucDo))
            MucDo = mucDo;
        if (soBoHoSo != null)
            SoBoHoSo = (int)soBoHoSo;
        if (!string.IsNullOrEmpty(tenBuocHienTai))
            TenBuocHienTai = tenBuocHienTai;
        if (!string.IsNullOrEmpty(buocHienTai))
            BuocHienTai = buocHienTai;
        if (!string.IsNullOrEmpty(nguoiXuLyTruoc))
            NguoiXuLyTruoc = nguoiXuLyTruoc;
        if (!string.IsNullOrEmpty(buocXuLyTruoc))
            BuocXuLyTruoc = buocXuLyTruoc;
        if (dangKyNhanHoSoQuaBCCIData != null)
            DangKyNhanHoSoQuaBCCIData = dangKyNhanHoSoQuaBCCIData;
        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            NguoiDangXuLy = nguoiDangXuLy;
        if (!string.IsNullOrEmpty(eFormData))
            EFormData = eFormData;

        return this;
    }
    public HoSoNhap SoftDelete(DateTime deletedOn, Guid deletedBy, string lyDoXoa)
    {
        LyDoXoa = lyDoXoa;
        DeletedBy = deletedBy;
        DeletedOn = deletedOn;
        return this;
    }
    public HoSoNhap Restore()
    {
        DeletedOn = null;
        return this;
    }
    public HoSoNhap SetNotificationOn()
    {
        ThongBaoEmail = true;
        ThongBaoZalo = true;
        ThongBaoSMS = true;
        return this;
    }
}
