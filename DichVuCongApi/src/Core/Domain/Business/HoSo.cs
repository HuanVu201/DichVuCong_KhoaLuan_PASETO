using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TD.DichVuCongApi.Domain.Business.Events;

namespace TD.DichVuCongApi.Domain.Business;
public class HoSo : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViId { get; set; }
    [MaxLength(50)]
    public string? MaHoSo { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaHoSoKhac { get; set; }
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
    public DateTime? NgayTiepNhan { get; set; }
    public DateTime? NgayHenTra { get; set; }
    public DateTime? NgayLuuViTriHoSo { get; set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TrangThaiHoSoId { get; set; }
    public DateTime? NgayTra { get; set; }
    [MaxLength(20)]
    public string? HinhThucTra { get; set; } = "0";
    public DateTime? NgayKetThucXuLy { get; set; }
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
    public DateTime? NgayTuChoi { get; set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? LoaiDinhDanh { get; set; }
    [Column(TypeName = "varchar")]
    [MaxLength(40)]
    public string? SoDinhDanh { get; set; }
    public DateTime? NgayNopHoSo { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaTTHC { get; set; }
    [MaxLength(50)]
    public string? MaLinhVuc { get; set; }
    [MaxLength(500)]
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
    [MaxLength(1000)]
    [Column(TypeName = "varchar")]
    public string? NguoiXuLyTiep { get; set; }
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? BuocXuLyTiep { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? NguoiNhanHoSo { get; set; }

    [MaxLength(50)]
    [Column(TypeName = "nvarchar")]
    public string? NguoiLuuViTriHoSo { get; set; }
    [MaxLength(1000)]
    [Column(TypeName = "varchar")]
    public string? NguoiDaXuLy { get; set; }
    [MaxLength(5)]
    public string? MucDo { get; set; }
    public int? SoBoHoSo { get; set; }
    [MaxLength(255)]
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
    public string? DinhKemKetQua { get; set; }
    [MaxLength(150)]
    public string? LoaiVanBanKetQua { get; set; }
    [MaxLength(100)]
    public string? SoKyHieuKetQua { get; set; }
    [MaxLength(300)]
    public string? NguoiKyKetQua { get; set; }
    [MaxLength(300)]
    public string? CoQuanBanHanhKetQua { get; set; }
    public DateTime? NgayBanHanhKetQua { get; set; }
    public DateTime? NgayKyKetQua { get; set; }

    [MaxLength(2000)]
    public string? YKienNguoiChuyenXuLy { get; set; }
    public string? DinhKemYKienNguoiChuyenXuLy { get; set; }
    [MaxLength(1000)]
    [Column(TypeName = "varchar")]
    public string? NguoiDangXuLy { get; set; }
    public bool? ChuyenNoiBo { get; set; }
    [MaxLength(1500)]
    public string? LyDoXoa { get; set; }
    public DateTime? NgayTiepNhanCaNhan { get; set; }
    public DateTime? NgayHenTraCaNhan { get; set; }
    [MaxLength(50)]
    public string? TrangThaiBoSung { get; set; }
    [MaxLength(50)]
    public string? TrangThaiTruoc { get; set; }
    public DateTime? NgayYeuCauBoSung { get; set; }
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
    [MaxLength(2000)]
    public string? LyDoTuChoi { get; set; }
    [MaxLength(1000)]
    public string? DinhKemTuChoi { get; set; }
    public bool? ChoBanHanh { get; set; } = false;
    public string? KetQuaDaySangQLVB { get; set; }
    public DateTime? NgayCongDanBoSung { get; set; }
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
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViChuyenXuLy { get; set; } // đơn vị của người vừa ấn chuyển xử lý
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

    [MaxLength(500)]
    public string? ViTriDeHoSo { get; set; }
    [MaxLength(100)]
    public string? LoaiNguoiNhanKetQua { get; set; }
    [MaxLength(150)]
    public string? HoTenNguoiNhanKetQua { get; set; }
    [MaxLength(1000)]
    public string? BanGocThuLai { get; set; }
    [MaxLength(100)]
    public string? SoLuongBanGocThuLai { get; set; }
    [MaxLength(300)]
    public string? DinhKemNhanKetQua { get; set; }
    [MaxLength(300)]
    public string? ChuKyNguoiNhanKetQua { get; set; }
    [MaxLength(50)]
    public string? LoaiKetQua { get; set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? TrangThaiDongBoDVC { get; set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? LoaiDuLieuKetNoi { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? TrangThaiTraBuuDien { get; set; }
    public string? NgayDangKyNhanKqQua { get; set; }
    public DateTime? NgayDangKyBuuDien { get; set; }
    public DateTime? NgayTraBuuDien { get; set; }
    public DateTime? NgayXacNhanKetQua { get; set; }
    public DateTime? NgayChuyenXuLy { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViPhiDiaGioi { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? NguoiNhanPhiDiaGioi { get; set; }
    public DateTime? NgayNhanPhiDiaGioi { get; set; }
    public DateTime? NgayGuiPhiDiaGioi { get; set; }
    public DateTime? NgayTraPhiDiaGioi { get; set; }
    [MaxLength(3)]
    [Column(TypeName = "varchar")]
    public string? TrangThaiPhiDiaGioi { get; set; }

    [MaxLength(3)]
    [Column(TypeName = "varchar")]
    public string? TrangThaiSoHoa { get; set; }

    [MaxLength(450)]
    [Column(TypeName = "varchar")]
    public string? DonViDaChuyenXuLy { get; set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? TrangThaiChiTiet { get; set; }

    public HoSo() { }

    public HoSo(string donViId, string maHoSo, string kenhThucHien,
        string loaiDoiTuong, string maDoiTuong, string? chuHoSo, string soDienThoaiChuHoSo, string emailChuHoSo, string soGiayToChuHoSo,
        string loaiGiayToChuHoSo, string ngaySinhChuHoSo, string tinhThanhChuHoSo, string quanHuyenChuHoSo, string xaPhuongChuHoSo,
        string diaChiChuHoSo, bool? uyQuyen, string? nguoiUyQuyen, string? soDienThoaiNguoiUyQuyen, string? emailNguoiUyQuyen, string? soGiayToNguoiUyQuyen,
        string? loaiGiayToNguoiUyQuyen, string? ngaySinhNguoiUyQuyen, string? tinhThanhNguoiUyQuyen, string? quanHuyenNguoiUyQuyen, string? xaPhuongNguoiUyQuyen,
        string? diaChiNguoiUyQuyen, string? trichYeuHoSo, DateTime? ngayTiepNhan, DateTime? ngayHenTra, string trangThaiHoSoId, DateTime? ngayTra, string hinhThucTra,
        DateTime? ngayKetThucXuLy, string ghiChu, string noiNopHoSo, string hoSoCoThanhPhanSoHo, string taiKhoanDuocXacThucVoiVNeID, string duocThanhToanTrucTuyen,
        DateTime? ngayTuChoi, string loaiDinhDanh, string soDinhDanh, DateTime? ngayNopHoSo, string? maTTHC, string? maLinhVuc, string? tenLinhVuc, string? tenTruongHop,
        string? maTruongHop, string? truongHopId, int? thoiGianThucHien, string? loaiThoiGianThucHien, bool? thongBaoEmail, bool? thongBaoZalo, bool? thongBaoSMS,
        string? nguoiXuLyTiep, string? buocXuLyTiep, string? nguoiNhanHoSo, string? nguoiDaXuLy, string? mucDo, int? soBoHoSo, string? tenBuocHienTai,
        string? buocHienTai, string? nguoiXuLyTruoc, string? buocXuLyTruoc, string? dangKyNhanHoSoQuaBCCIData, string? trichYeuKetQua,
        string? dinhKemKetQua, string? yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy, string? nguoiDangXuLy, string? nguoiGui,
        DateTime? ngayTiepNhanCaNhan, DateTime? ngayHenTraCaNhan, string? eFormData, bool? laHoSoChungThuc, string? donViTraKq, string donViChuyenXuLy,
        string? tinhThanhDiaBan, string? quanHuyenDiaBan, string? xaPhuongDiaBan, string? tenDiaBan, string? loaiKetQua = null)
    {
        TenDiaBan = tenDiaBan;
        TinhThanhDiaBan = tinhThanhDiaBan;
        QuanHuyenDiaBan = quanHuyenDiaBan;
        XaPhuongDiaBan = xaPhuongDiaBan;
        TrichYeuKetQua = trichYeuKetQua;
        DinhKemKetQua = dinhKemKetQua;
        YKienNguoiChuyenXuLy = yKienNguoiChuyenXuLy;
        DinhKemYKienNguoiChuyenXuLy = dinhKemYKienNguoiChuyenXuLy;
        DonViId = donViId;
        MaHoSo = maHoSo;
        KenhThucHien = kenhThucHien;
        LoaiDoiTuong = loaiDoiTuong;
        MaDoiTuong = maDoiTuong;
        ChuHoSo = chuHoSo;
        SoDienThoaiChuHoSo = soDienThoaiChuHoSo;
        EmailChuHoSo = emailChuHoSo;
        SoGiayToChuHoSo = soGiayToChuHoSo;
        LoaiGiayToChuHoSo = loaiGiayToChuHoSo;
        NgaySinhChuHoSo = ngaySinhChuHoSo;
        TinhThanhChuHoSo = tinhThanhChuHoSo;
        QuanHuyenChuHoSo = quanHuyenChuHoSo;
        XaPhuongChuHoSo = xaPhuongChuHoSo;
        DiaChiChuHoSo = diaChiChuHoSo;
        UyQuyen = uyQuyen;
        NguoiUyQuyen = nguoiUyQuyen;
        SoDienThoaiNguoiUyQuyen = soDienThoaiNguoiUyQuyen;
        EmailNguoiUyQuyen = emailNguoiUyQuyen;
        SoGiayToNguoiUyQuyen = soGiayToNguoiUyQuyen;
        LoaiGiayToNguoiUyQuyen = loaiGiayToNguoiUyQuyen;
        NgaySinhNguoiUyQuyen = ngaySinhNguoiUyQuyen;
        TinhThanhNguoiUyQuyen = tinhThanhNguoiUyQuyen;
        QuanHuyenNguoiUyQuyen = quanHuyenNguoiUyQuyen;
        XaPhuongNguoiUyQuyen = xaPhuongNguoiUyQuyen;
        DiaChiNguoiUyQuyen = diaChiNguoiUyQuyen;
        TrichYeuHoSo = trichYeuHoSo;
        NgayTiepNhan = ngayTiepNhan;
        NgayHenTra = ngayHenTra;
        TrangThaiHoSoId = trangThaiHoSoId;
        NgayTra = ngayTra;
        HinhThucTra = hinhThucTra;
        NgayKetThucXuLy = ngayKetThucXuLy;
        GhiChu = ghiChu;
        NoiNopHoSo = noiNopHoSo;
        HoSoCoThanhPhanSoHo = hoSoCoThanhPhanSoHo;
        TaiKhoanDuocXacThucVoiVNeID = taiKhoanDuocXacThucVoiVNeID;
        DuocThanhToanTrucTuyen = duocThanhToanTrucTuyen;
        NgayTuChoi = ngayTuChoi;
        LoaiDinhDanh = loaiDinhDanh;
        SoDinhDanh = soDinhDanh;
        NgayNopHoSo = ngayNopHoSo;
        MaTTHC = maTTHC;
        MaLinhVuc = maLinhVuc;
        TenLinhVuc = tenLinhVuc;
        TenTruongHop = tenTruongHop;
        MaTruongHop = maTruongHop;
        TruongHopId = truongHopId;
        ThoiGianThucHien = thoiGianThucHien;
        LoaiThoiGianThucHien = loaiThoiGianThucHien;
        ThongBaoEmail = thongBaoEmail;
        ThongBaoZalo = thongBaoZalo;
        ThongBaoSMS = thongBaoSMS;
        NguoiXuLyTiep = nguoiXuLyTiep;
        BuocXuLyTiep = buocXuLyTiep;
        NguoiNhanHoSo = nguoiNhanHoSo;
        NguoiDaXuLy = nguoiDaXuLy;

        MucDo = mucDo;
        SoBoHoSo = soBoHoSo;
        TenBuocHienTai = tenBuocHienTai;
        BuocHienTai = buocHienTai;
        NguoiXuLyTruoc = nguoiXuLyTruoc;
        BuocXuLyTruoc = buocXuLyTruoc;

        DangKyNhanHoSoQuaBCCIData = dangKyNhanHoSoQuaBCCIData;
        NguoiDangXuLy = nguoiDangXuLy;
        NguoiGui = nguoiGui;
        NgayTiepNhanCaNhan = ngayTiepNhanCaNhan;
        NgayHenTraCaNhan = ngayHenTraCaNhan;
        EFormData = eFormData;
        LaHoSoChungThuc = laHoSoChungThuc;
        DonViTraKq = donViTraKq;
        DonViChuyenXuLy = donViChuyenXuLy;
        LoaiKetQua = loaiKetQua;

        NgaySinhChuHoSo = GetBirthYearFromID(soGiayToChuHoSo)?.ToString();
        NgaySinhNguoiUyQuyen = GetBirthYearFromID(soGiayToNguoiUyQuyen)?.ToString();
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;

    }

    public HoSo(string donViId, string maHoSo, string? loaiDoiTuong, string? chuHoSo, string? soDienThoaiChuHoSo, string? emailChuHoSo, string? soGiayToChuHoSo,
        string? loaiGiayToChuHoSo, string? ngaySinhChuHoSo, string? tinhThanhChuHoSo, string? quanHuyenChuHoSo, string? xaPhuongChuHoSo,
        string? diaChiChuHoSo, string? nguoiGui, string maTTHC, string? maTruongHop, string? tenTruongHop, string truongHopId, string? eFormData, string? dangKyNhanHoSoQuaBCCIData, string? nguoiDangXuLy, string trichYeuHoSo, DateTime? ngayTiepNhan,
        bool? uyQuyen, string? nguoiUyQuyen, string? soDienThoaiNguoiUyQuyen, string? emailNguoiUyQuyen, string? soGiayToNguoiUyQuyen,
        string? tinhThanhNguoiUyQuyen, string? quanHuyenNguoiUyQuyen, string? xaPhuongNguoiUyQuyen,
        string? diaChiNguoiUyQuyen, string? maThuTuc, DateTime? ngayNopHoSo, DateTime? ngayHenTraCaNhan, string? mucDo, string? hinhThucTra, bool? laHoSoChungThuc = false, string? donViTraKq = null, string? loaiKetQua = null, DateTime? hanTiepNhan = null)
    {
        KenhThucHien = "2";
        TrangThaiHoSoId = "1";
        MaHoSo = maHoSo;
        if (!string.IsNullOrEmpty(loaiDoiTuong))
        {
            LoaiDoiTuong = loaiDoiTuong;
        }
        else
        {
            LoaiDoiTuong = LoaiChuHoSoConstant.CongDan;
        }
        if (laHoSoChungThuc == true)
        {
            HinhThucTra = "0";
        }
        else
        {
            HinhThucTra = hinhThucTra;
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
        NgayTiepNhan = ngayTiepNhan;

        UyQuyen = uyQuyen;
        NguoiUyQuyen = nguoiUyQuyen;
        SoDienThoaiNguoiUyQuyen = soDienThoaiNguoiUyQuyen;
        EmailNguoiUyQuyen = emailNguoiUyQuyen;
        SoGiayToNguoiUyQuyen = soGiayToNguoiUyQuyen;
        TinhThanhNguoiUyQuyen = tinhThanhNguoiUyQuyen;
        QuanHuyenNguoiUyQuyen = quanHuyenNguoiUyQuyen;
        XaPhuongNguoiUyQuyen = xaPhuongNguoiUyQuyen;
        DiaChiNguoiUyQuyen = diaChiNguoiUyQuyen;
        NgayNopHoSo = ngayNopHoSo;
        NgayHenTraCaNhan = ngayHenTraCaNhan;
        MucDo = mucDo;
        LaHoSoChungThuc = laHoSoChungThuc;
        DonViTraKq = donViTraKq;
        LoaiKetQua = loaiKetQua;
        HanTiepNhan = hanTiepNhan;
        NgaySinhChuHoSo = GetBirthYearFromID(soGiayToChuHoSo)?.ToString();
        NgaySinhNguoiUyQuyen = GetBirthYearFromID(soGiayToNguoiUyQuyen)?.ToString();
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
    }

    public static HoSo Create(string donViId, string maHoSo, string kenhThucHien,
        string loaiDoiTuong, string maDoiTuong, string? chuHoSo, string soDienThoaiChuHoSo, string emailChuHoSo, string soGiayToChuHoSo,
        string loaiGiayToChuHoSo, string ngaySinhChuHoSo, string tinhThanhChuHoSo, string quanHuyenChuHoSo, string xaPhuongChuHoSo,
        string diaChiChuHoSo, bool? uyQuyen, string? nguoiUyQuyen, string? soDienThoaiNguoiUyQuyen, string? emailNguoiUyQuyen, string? soGiayToNguoiUyQuyen,
        string? loaiGiayToNguoiUyQuyen, string? ngaySinhNguoiUyQuyen, string? tinhThanhNguoiUyQuyen, string? quanHuyenNguoiUyQuyen, string? xaPhuongNguoiUyQuyen,
        string? diaChiNguoiUyQuyen, string? trichYeuHoSo, DateTime? ngayTiepNhan, DateTime? ngayHenTra, string trangThaiHoSoId, DateTime? ngayTra, string hinhThucTra,
        DateTime? ngayKetThucXuLy, string ghiChu, string noiNopHoSo, string hoSoCoThanhPhanSoHo, string taiKhoanDuocXacThucVoiVNeID, string duocThanhToanTrucTuyen,
        DateTime? ngayTuChoi, string loaiDinhDanh, string soDinhDanh, DateTime? ngayNopHoSo, string? maTTHC, string? maLinhVuc, string? tenLinhVuc, string? tenTruongHop,
        string? maTruongHop, string? truongHopId, int? thoiGianThucHien, string? loaiThoiGianThucHien, bool? thongBaoEmail, bool? thongBaoZalo, bool? thongBaoSMS,
        string? nguoiXuLyTiep, string? buocXuLyTiep, string? nguoiNhanHoSo, string? nguoiDaXuLy, string? mucDo, int? soBoHoSo, string? tenBuocHienTai,
        string? buocHienTai, string? nguoiXuLyTruoc, string? buocXuLyTruoc, string? dangKyNhanHoSoQuaBCCIData, string? trichYeuKetQua,
        string? dinhKemKetQua, string? yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy, string? nguoiDangXuLy, string nguoiGui,
        DateTime? ngayTiepNhanCaNhan, DateTime? ngayHenTraCaNhan, string? eFormData, bool? laHoSoChungThuc, string? donViTraKq, string donViChuyenXuLy,
        string? tinhThanhDiaBan, string? quanHuyenDiaBan, string? xaPhuongDiaBan, string? tenDiaBan)
    {
        return new(donViId, maHoSo, kenhThucHien,
        loaiDoiTuong, maDoiTuong, chuHoSo, soDienThoaiChuHoSo, emailChuHoSo, soGiayToChuHoSo,
        loaiGiayToChuHoSo, ngaySinhChuHoSo, tinhThanhChuHoSo, quanHuyenChuHoSo, xaPhuongChuHoSo,
        diaChiChuHoSo, uyQuyen, nguoiUyQuyen, soDienThoaiNguoiUyQuyen, emailNguoiUyQuyen, soGiayToNguoiUyQuyen,
        loaiGiayToNguoiUyQuyen, ngaySinhNguoiUyQuyen, tinhThanhNguoiUyQuyen, quanHuyenNguoiUyQuyen, xaPhuongNguoiUyQuyen,
        diaChiNguoiUyQuyen, trichYeuHoSo, ngayTiepNhan, ngayHenTra, trangThaiHoSoId, ngayTra, hinhThucTra,
        ngayKetThucXuLy, ghiChu, noiNopHoSo, hoSoCoThanhPhanSoHo, taiKhoanDuocXacThucVoiVNeID, duocThanhToanTrucTuyen,
        ngayTuChoi, loaiDinhDanh, soDinhDanh, ngayNopHoSo, maTTHC, maLinhVuc, tenLinhVuc, tenTruongHop, maTruongHop, truongHopId, thoiGianThucHien,
        loaiThoiGianThucHien, thongBaoEmail, thongBaoZalo, thongBaoSMS, nguoiXuLyTiep, buocXuLyTiep, nguoiNhanHoSo, nguoiDaXuLy, mucDo, soBoHoSo, tenBuocHienTai,
        buocHienTai, nguoiXuLyTruoc, buocXuLyTruoc, dangKyNhanHoSoQuaBCCIData, trichYeuKetQua, dinhKemKetQua, yKienNguoiChuyenXuLy,
        dinhKemYKienNguoiChuyenXuLy, nguoiDangXuLy, nguoiGui, ngayTiepNhanCaNhan, ngayHenTraCaNhan, eFormData, laHoSoChungThuc, donViTraKq,
        donViChuyenXuLy, tinhThanhDiaBan, quanHuyenDiaBan, xaPhuongDiaBan, tenDiaBan);
    }

    public HoSo UpdateLoaiDuLieuKetNoi(string loaiDuLieuKetNoi)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        LoaiDuLieuKetNoi = loaiDuLieuKetNoi;
        return this;
    }

    public HoSo SetMaHoSoKhac(string maHoSoKhac)
    {
        MaHoSoKhac = maHoSoKhac;
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        return this;
    }
    public void ThemMoiHoSoPhiDiaGioi(string? donViPhiDiaGioi, string nguoiNhanPhiDiaGioi)
    {
        DonViPhiDiaGioi = donViPhiDiaGioi;
        DonViId = donViPhiDiaGioi;
        TrangThaiPhiDiaGioi = HoSo_TrangThaiPhiDiaGioi.DuocTiepNhan;
        NgayNhanPhiDiaGioi = DateTime.Now;
        TrangThaiHoSoId = "1";
        NguoiNhanPhiDiaGioi = nguoiNhanPhiDiaGioi;
    }
    public void ChuyenHoSoPhiDiaGioi(string? nguoiDangXuLy)
    {
        TrangThaiPhiDiaGioi = HoSo_TrangThaiPhiDiaGioi.ChoDonViTiepNhan;
        NgayGuiPhiDiaGioi = DateTime.Now;
        NguoiDangXuLy = nguoiDangXuLy;
        // NguoiDaXuLy = ??
    }
    public void SetTrangThaiPhiDiaGioi(string? trangThaiPhiDiaGioi)
    {
        TrangThaiPhiDiaGioi = trangThaiPhiDiaGioi;
    }
    public void SetTrangThaiSoHoa(string? trangThaiSoHoa)
    {
        TrangThaiSoHoa = trangThaiSoHoa;
    }


    public HoSo SetKetQuaChinh(string? dinhKemKetQua, string? loaiVanBanKetQua, string? soKyHieuKetQua, string? coQuanBanHanhKetQua, DateTime? ngayBanHanhKetQua, string? trichYeuKetQua)
    {
        if (!string.IsNullOrEmpty(dinhKemKetQua))
        {
            DinhKemKetQua = dinhKemKetQua;
        }

        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (loaiVanBanKetQua != null)
            LoaiVanBanKetQua = loaiVanBanKetQua;
        if (soKyHieuKetQua != null)
            SoKyHieuKetQua = soKyHieuKetQua;
        if (trichYeuKetQua != null)
            TrichYeuKetQua = trichYeuKetQua;
        if (coQuanBanHanhKetQua != null)
            CoQuanBanHanhKetQua = coQuanBanHanhKetQua;
        if (ngayBanHanhKetQua.HasValue && ngayBanHanhKetQua.Value != DateTime.MinValue)
            NgayBanHanhKetQua = ngayBanHanhKetQua;
        return this;
    }

    public HoSo SetLinhVuc(string? malinhVuc, string tenLinhVuc)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        MaLinhVuc = malinhVuc;
        TenLinhVuc = tenLinhVuc;
        return this;
    }

    public HoSo SetHinhThucTra(string? hinhThucTra)
    {
        HinhThucTra = hinhThucTra;
        return this;
    }

    public HoSo SetDataBaoTroXaHoi(string trangThai, DateTime? ngayTiepNhan, DateTime? ngayHenTra, DateTime? ngayKetThucXuLy, string nguoiNhanHoSo)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        TrangThaiHoSoId = trangThai;
        NgayTiepNhan = ngayTiepNhan;
        NgayHenTra = ngayHenTra;
        NgayKetThucXuLy = ngayKetThucXuLy;
        NgayTra = ngayKetThucXuLy;
        if (nguoiNhanHoSo.Contains("##"))
        {
            string[] nguoiTiepNhanList = nguoiNhanHoSo.Split("##");
            NguoiNhanHoSo = nguoiTiepNhanList[0];
        }
        else
        {
            NguoiNhanHoSo = nguoiNhanHoSo;
        }

        return this;
    }

    public HoSo UpdateThongBaoKhuyenMai(string donViId, string maHoSo, string? loaiDoiTuong, string? chuHoSo, string? soDienThoaiChuHoSo, string? emailChuHoSo, string? soGiayToChuHoSo,
        string? loaiDuLieuKetNoi, string? tinhThanhChuHoSo, string? quanHuyenChuHoSo, string? xaPhuongChuHoSo,
        string? diaChiChuHoSo, string? nguoiGui, string maTTHC
        , string? maTruongHop, string? tenTruongHop, string truongHopId, string? eFormData, string? nguoiDangXuLy, string trichYeuHoSo
        , bool? uyQuyen, string? nguoiUyQuyen, string? soDienThoaiNguoiUyQuyen, DateTime? ngayNopHoSo, string? trangThaiHoSoId)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;

        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            TrangThaiHoSoId = trangThaiHoSoId;
        if (ngayNopHoSo.HasValue && ngayNopHoSo != default)
            NgayNopHoSo = ngayNopHoSo;
        if (!string.IsNullOrEmpty(donViId))
            DonViId = donViId;
        if (!string.IsNullOrEmpty(maHoSo))
            MaHoSo = maHoSo;
        if (!string.IsNullOrEmpty(loaiDoiTuong))
            LoaiDoiTuong = loaiDoiTuong;
        if (!string.IsNullOrEmpty(chuHoSo))
            ChuHoSo = chuHoSo;
        if (!string.IsNullOrEmpty(soDienThoaiChuHoSo))
            SoDienThoaiChuHoSo = soDienThoaiChuHoSo;
        if (!string.IsNullOrEmpty(emailChuHoSo))
            EmailChuHoSo = emailChuHoSo;
        if (!string.IsNullOrEmpty(soGiayToChuHoSo))
            SoGiayToChuHoSo = soGiayToChuHoSo;
        if (!string.IsNullOrEmpty(loaiDuLieuKetNoi))
            LoaiDuLieuKetNoi = loaiDuLieuKetNoi;
        if (!string.IsNullOrEmpty(tinhThanhChuHoSo))
            TinhThanhChuHoSo = tinhThanhChuHoSo;
        if (!string.IsNullOrEmpty(quanHuyenChuHoSo))
            QuanHuyenChuHoSo = quanHuyenChuHoSo;
        if (!string.IsNullOrEmpty(xaPhuongChuHoSo))
            XaPhuongChuHoSo = xaPhuongChuHoSo;
        if (!string.IsNullOrEmpty(diaChiChuHoSo))
            DiaChiChuHoSo = diaChiChuHoSo;
        if (!string.IsNullOrEmpty(nguoiGui))
            NguoiGui = nguoiGui;
        if (!string.IsNullOrEmpty(maTTHC))
            MaTTHC = maTTHC;
        if (!string.IsNullOrEmpty(maTruongHop))
            MaTruongHop = maTruongHop;
        if (!string.IsNullOrEmpty(tenTruongHop))
            TenTruongHop = tenTruongHop;
        if (!string.IsNullOrEmpty(truongHopId))
            TruongHopId = truongHopId;
        if (!string.IsNullOrEmpty(eFormData))
            EFormData = eFormData;
        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            NguoiDangXuLy = nguoiDangXuLy;
        if (!string.IsNullOrEmpty(trichYeuHoSo))
            TrichYeuHoSo = trichYeuHoSo;
        if (uyQuyen != null)
            UyQuyen = (bool)uyQuyen;
        if (!string.IsNullOrEmpty(nguoiUyQuyen))
            NguoiUyQuyen = nguoiUyQuyen;
        if (!string.IsNullOrEmpty(soDienThoaiNguoiUyQuyen))
            SoDienThoaiNguoiUyQuyen = soDienThoaiNguoiUyQuyen;
        return this;
    }
    public HoSo SetDonViDaChuyenXuLy(string donViChuyenXuLy)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        DonViDaChuyenXuLy += "##" + donViChuyenXuLy;
        DonViDaChuyenXuLy = RemoveDuplicateIds(DonViDaChuyenXuLy);
        return this;
    }
    public HoSo Update(string? donViId, string? maHoSo, string? donViQuanLy, bool? choXacNhan, string? kenhThucHien, string? loaiDoiTuong, string? maDoiTuong, string? chuHoSo, string? soDienThoaiChuHoSo, string? emailChuHoSo, string? soGiayToChuHoSo,
        string? loaiGiayToChuHoSo, string? ngaySinhChuHoSo, string? tinhThanhChuHoSo, string? quanHuyenChuHoSo, string? xaPhuongChuHoSo,
        string? diaChiChuHoSo, bool? uyQuyen, string? nguoiUyQuyen, string? soDienThoaiNguoiUyQuyen, string? emailNguoiUyQuyen, string? soGiayToNguoiUyQuyen,
        string? loaiGiayToNguoiUyQuyen, string? ngaySinhNguoiUyQuyen, string? tinhThanhNguoiUyQuyen, string? quanHuyenNguoiUyQuyen, string? xaPhuongNguoiUyQuyen,
        string? diaChiNguoiUyQuyen, string? trichYeuHoSo, DateTime? ngayTiepNhan, DateTime? ngayHenTra, string? trangThaiHoSoId, DateTime? ngayTra, string? hinhThucTra,
        DateTime? ngayKetThucXuLy, string? ghiChu, string? noiNopHoSo, string? hoSoCoThanhPhanSoHo, string? taiKhoanDuocXacThucVoiVNeID, string? duocThanhToanTrucTuyen,
        DateTime? ngayTuChoi, string? loaiDinhDanh, string? soDinhDanh, DateTime? ngayNopHoSo, string? maTTHC, string? maLinhVuc, string? tenLinhVuc, string? tenTruongHop,
        string? maTruongHop, string? truongHopId, int? thoiGianThucHien, string? loaiThoiGianThucHien, bool? thongBaoEmail, bool? thongBaoZalo, bool? thongBaoSMS,
        string? nguoiXuLyTiep, string? buocXuLyTiep, string? nguoiNhanHoSo, string? nguoiDaXuLy, string? mucDo, int? soBoHoSo, string? tenBuocHienTai,
        string? buocHienTai, string? nguoiXuLyTruoc, string? buocXuLyTruoc, string? dangKyNhanHoSoQuaBCCIData, string? trichYeuKetQua,
        string? dinhKemKetQua, string? yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy, string? nguoiDangXuLy, string? eFormData, string? tenDiaBan, string? loaiVanBanKetQua,
        string? soKyHieuKetQua, string? nguoiKyKetQua, string? coQuanBanHanhKetQua, DateTime? ngayBanHanhKetQua, DateTime? ngayKyKetQua, string? loaiKetQua, string? trangThaiTraKq, DateTime? ngayYeuCauBoSung = null)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;

        if (!string.IsNullOrEmpty(soKyHieuKetQua))
            SoKyHieuKetQua = soKyHieuKetQua;
        if (!string.IsNullOrEmpty(nguoiKyKetQua))
            NguoiKyKetQua = nguoiKyKetQua;
        if (!string.IsNullOrEmpty(coQuanBanHanhKetQua))
            CoQuanBanHanhKetQua = coQuanBanHanhKetQua;
        if (ngayBanHanhKetQua != null)
            NgayBanHanhKetQua = ngayBanHanhKetQua;
        if (ngayKyKetQua != null)
            NgayKyKetQua = ngayKyKetQua;
        if (!string.IsNullOrEmpty(loaiVanBanKetQua))
            LoaiVanBanKetQua = loaiVanBanKetQua;
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
        if (!string.IsNullOrEmpty(maHoSo))
            MaHoSo = maHoSo;
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
        if (ngayTiepNhan != null && ngayTiepNhan != default)
            NgayTiepNhan = ngayTiepNhan;
        if (ngayHenTra != null && ngayHenTra != default)
            NgayHenTra = ngayHenTra;
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            TrangThaiHoSoId = trangThaiHoSoId;
        if (ngayTra != null && ngayTra != default)
            NgayTra = ngayTra;
        if (!string.IsNullOrEmpty(hinhThucTra))
            HinhThucTra = hinhThucTra;
        if (ngayKetThucXuLy != null && ngayKetThucXuLy != default)
            NgayKetThucXuLy = ngayKetThucXuLy;
        if (!string.IsNullOrEmpty(noiNopHoSo))
            NoiNopHoSo = noiNopHoSo;
        if (!string.IsNullOrEmpty(hoSoCoThanhPhanSoHo))
            HoSoCoThanhPhanSoHo = hoSoCoThanhPhanSoHo;
        if (!string.IsNullOrEmpty(taiKhoanDuocXacThucVoiVNeID))
            TaiKhoanDuocXacThucVoiVNeID = taiKhoanDuocXacThucVoiVNeID;
        if (!string.IsNullOrEmpty(duocThanhToanTrucTuyen))
            DuocThanhToanTrucTuyen = duocThanhToanTrucTuyen;
        if (ngayTuChoi != null && ngayTuChoi != default)
            NgayTuChoi = ngayTuChoi;
        if (!string.IsNullOrEmpty(loaiDinhDanh))
            LoaiDinhDanh = loaiDinhDanh;
        if (!string.IsNullOrEmpty(soDinhDanh))
            SoDinhDanh = soDinhDanh;
        if (ngayNopHoSo != null && ngayNopHoSo != default)
            NgayNopHoSo = ngayNopHoSo;
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
        if (!string.IsNullOrEmpty(loaiKetQua))
            LoaiKetQua = loaiKetQua;
        if (!string.IsNullOrEmpty(trangThaiTraKq))
            TrangThaiTraKq = trangThaiTraKq;
        if (ngayYeuCauBoSung.HasValue) NgayYeuCauBoSung = ngayYeuCauBoSung;
        return this;
    }

    public HoSo SetTrangThaiHoSoId(string trangThaiHoSoId)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
        {
            TrangThaiHoSoId = trangThaiHoSoId;
        }
        return this;
    }
    public HoSo SetKenhThucHien(string kenhThucHien)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(kenhThucHien))
        {
            KenhThucHien = kenhThucHien;
        }
        return this;
    }
    public HoSo SetLoaiDuLieuKetNoi(string loaiDuLieuKetNoi)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(loaiDuLieuKetNoi))
        {
            LoaiDuLieuKetNoi = loaiDuLieuKetNoi;
        }
        return this;
    }
    public HoSo SetBuocHienTai(string buocHienTai)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(buocHienTai))
        {
            BuocHienTai = buocHienTai;
        }
        return this;
    }

    public void SetDiaBanHoSo(string? tenDiaBan, string? tinhThanhDiaBan, string? quanHuyenDiaBan, string? xaPhuongDiaBan)
    {
        if (!string.IsNullOrEmpty(tenDiaBan))
        {
            TenDiaBan = tenDiaBan;
        }
        if (!string.IsNullOrEmpty(tinhThanhDiaBan))
        {
            TinhThanhDiaBan = tinhThanhDiaBan;
        }
        if (!string.IsNullOrEmpty(quanHuyenDiaBan))
        {
            QuanHuyenDiaBan = quanHuyenDiaBan;
        }
        if (!string.IsNullOrEmpty(xaPhuongDiaBan))
        {
            XaPhuongDiaBan = xaPhuongDiaBan;
        }
    }
    public HoSo SetTiepNhanHoSoILIS(string nguoiDangXuLy, string nguoiDaXuLy, string loaiDuLieuKetNoi, string trangThaiHoSoId)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(nguoiDaXuLy)) // phải cho cái này trước NguoiDangXuLy ở dưới
        {
            if (NguoiDangXuLy != null)
            {
                NguoiDaXuLy = NguoiDaXuLy + "##" + NguoiDangXuLy;
            }
            else
            {
                NguoiDaXuLy = nguoiDaXuLy; // NguoiDaXuLy là null thì thêm người đang đăng nhập vào
            }

            NguoiDaXuLy = RemoveDuplicateIds(NguoiDaXuLy?.ToLower());
        }

        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            NguoiDangXuLy = nguoiDangXuLy;
        LoaiDuLieuKetNoi = loaiDuLieuKetNoi;
        TrangThaiHoSoId = trangThaiHoSoId;
        return this;
    }
    public void CapNhatKetQuaILIS(DateTime? ngayHenTra, DateTime? ngayYeuCauBoSung, DateTime? ngayHenTraCaNhan, string? buocHienTai, string? tenBuocHienTai)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (ngayHenTraCaNhan.HasValue && ngayHenTraCaNhan != default)
            NgayHenTraCaNhan = ngayHenTraCaNhan;
        if (ngayYeuCauBoSung.HasValue && ngayYeuCauBoSung != default)
            NgayYeuCauBoSung = ngayYeuCauBoSung;
        if (ngayHenTra.HasValue && ngayHenTra != default)
            NgayHenTra = ngayHenTra;
        if (!string.IsNullOrEmpty(buocHienTai))
            BuocHienTai = buocHienTai;
        if (!string.IsNullOrEmpty(tenBuocHienTai))
            BuocHienTai = tenBuocHienTai;
    }

    public HoSo SetNguoiNhanHoSo(string nguoiNhanHoSo)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(nguoiNhanHoSo))
        {
            NguoiNhanHoSo = nguoiNhanHoSo;
        }
        return this;
    }
    public HoSo SetNgayHenTra(DateTime? ngayHentra)
    {
        NgayHenTra = ngayHentra;
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        return this;
    }

    // public HoSo ChuyenBuocXuLy(string? tenBuocHienTai, string? buocHienTai, string? nguoiXuLyTiep, string? buocXuLyTiep, string? nguoiXuLyTruoc, string? buocXuLyTruoc, string? nguoiDaXuLy
    //    , string? nguoiDangXuLy, string? trichYeuKetQua, string? dinhKemKetQua, string? yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy, string? trangThaiHoSoId, DateTime ngayTiepNhanCacNhan)
    // {
    //    ChuyenNoiBo = false;
    //    NgayTiepNhanCaNhan = ngayTiepNhanCacNhan;
    //    if (!string.IsNullOrEmpty(nguoiXuLyTiep))
    //        NguoiXuLyTiep = nguoiXuLyTiep;
    //    if (!string.IsNullOrEmpty(buocXuLyTiep) && !BuocXuLyTiep.Equals(buocXuLyTiep))
    //        BuocXuLyTiep = buocXuLyTiep;
    //    if (!string.IsNullOrEmpty(nguoiDaXuLy))
    //    {
    //        if (NguoiDangXuLy != null)
    //        {
    //            NguoiDaXuLy = NguoiDaXuLy + "##" + NguoiDangXuLy;
    //        }
    //        else
    //        {
    //            NguoiDaXuLy = nguoiDaXuLy; // NguoiDaXuLy là null thì thêm người đang đăng nhập vào
    //        }
    //    }
    //    if (!string.IsNullOrEmpty(tenBuocHienTai) && !TenBuocHienTai.Equals(tenBuocHienTai))
    //        TenBuocHienTai = tenBuocHienTai;
    //    if (!string.IsNullOrEmpty(buocHienTai) && !BuocHienTai.Equals(buocHienTai))
    //        BuocHienTai = buocHienTai;
    //    if (!string.IsNullOrEmpty(nguoiXuLyTruoc))
    //        NguoiXuLyTruoc = nguoiXuLyTruoc;
    //    if (!string.IsNullOrEmpty(buocXuLyTruoc))
    //        BuocXuLyTruoc = buocXuLyTruoc;
    //    if (!string.IsNullOrEmpty(nguoiDangXuLy) && !NguoiDangXuLy.Equals(nguoiDangXuLy))
    //        NguoiDangXuLy = nguoiDangXuLy;
    //    if (!string.IsNullOrEmpty(trichYeuKetQua))
    //        TrichYeuKetQua = trichYeuKetQua;
    //    if (!string.IsNullOrEmpty(dinhKemKetQua))
    //        DinhKemKetQua = dinhKemKetQua;
    //    if (!string.IsNullOrEmpty(yKienNguoiChuyenXuLy) )
    //        YKienNguoiChuyenXuLy = yKienNguoiChuyenXuLy;
    //    if (!string.IsNullOrEmpty(dinhKemYKienNguoiChuyenXuLy))
    //        DinhKemYKienNguoiChuyenXuLy = dinhKemYKienNguoiChuyenXuLy;
    //    if (!string.IsNullOrEmpty(trangThaiHoSoId) && !TrangThaiHoSoId.Equals(trangThaiHoSoId))
    //        TrangThaiHoSoId = trangThaiHoSoId;
    //    return this;
    // }

    public HoSo SetDangChoBanHanh(bool choBanHanh)
    {
        ChoBanHanh = choBanHanh;
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;

        return this;
    }

    public void CapNhatHoSoTheoCauHinhNode(string? loaiDuLieuKetNoi, string? trangThaiChiTiet)
    {
        if (loaiDuLieuKetNoi == null)
            return;
        if(loaiDuLieuKetNoi == TruongHopThuTuc.LoaiDuLieuKetNoiBuoc.LienThongThueILIS)
        {
            NguoiDangXuLy = string.Empty;
        }
        TrangThaiChiTiet = trangThaiChiTiet;
    }

    public HoSo SetNgayKetThucXuLy(DateTime? ngayKetThucXuLy)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;

        if (ngayKetThucXuLy.HasValue && ngayKetThucXuLy != DateTime.MinValue)
        {
            NgayKetThucXuLy = ngayKetThucXuLy;
        }

        return this;
    }

    public HoSo ChuyenBuocXuLy(string? tenBuocHienTai, string? buocHienTai, string? nguoiXuLyTiep, string? buocXuLyTiep, string? nguoiXuLyTruoc, string? buocXuLyTruoc, string? nguoiDaXuLy
        , string? nguoiDangXuLy, string? trichYeuKetQua, string? dinhKemKetQua, string? yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy, string? trangThaiHoSoId, DateTime? ngayTiepNhanCaNhan,
        DateTime? ngayHenTraCaNhan, DateTime? ngayYeuCauBoSung, DateTime? ngayHenTra, DateTime? ngayTraKetQua, string? trangThaiTraKq, string? donViTraKq, string? loaiVanBanKetQua
        , string? soKyHieuKetQua, string? nguoiKyKetQua, string? coQuanBanHanhKetQua, DateTime? ngayBanHanhKetQua, DateTime? ngayKyKetQua, string? donViChuyenXuLy, DateTime? ngayKetThucXuLy, string? nguoiNhanHoSo, string? loaiKetQua = null)
    {
        string trangThaiCu = TrangThaiHoSoId;
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        ChuyenNoiBo = false;
        ChoBanHanh = false;
        NgayChuyenXuLy = DateTime.Now;
        if (donViChuyenXuLy != null)
            DonViChuyenXuLy = donViChuyenXuLy;
        if (loaiVanBanKetQua != null)
            LoaiVanBanKetQua = loaiVanBanKetQua;
        if (soKyHieuKetQua != null)
            SoKyHieuKetQua = soKyHieuKetQua;
        if (nguoiKyKetQua != null)
            NguoiKyKetQua = nguoiKyKetQua;
        if (coQuanBanHanhKetQua != null)
            CoQuanBanHanhKetQua = coQuanBanHanhKetQua;
        NgayBanHanhKetQua = ngayBanHanhKetQua;
        NgayKyKetQua = ngayKyKetQua;

        if (!string.IsNullOrEmpty(tenBuocHienTai))
            TenBuocHienTai = tenBuocHienTai;
        if (!string.IsNullOrEmpty(buocHienTai))
            BuocHienTai = buocHienTai;
        if (!string.IsNullOrEmpty(nguoiXuLyTiep))
            NguoiXuLyTiep = nguoiXuLyTiep;
        if (buocXuLyTiep != null)
            BuocXuLyTiep = buocXuLyTiep;
        if (trichYeuKetQua != null)
            TrichYeuKetQua = trichYeuKetQua;
        if (!string.IsNullOrEmpty(nguoiXuLyTruoc))
            NguoiXuLyTruoc = nguoiXuLyTruoc;
        if (!string.IsNullOrEmpty(buocXuLyTruoc))
            BuocXuLyTruoc = buocXuLyTruoc;

        if (!string.IsNullOrEmpty(trangThaiHoSoId))
        {
            TrangThaiHoSoId = trangThaiHoSoId;
            if (trangThaiHoSoId == "9" && ngayKetThucXuLy.HasValue && ngayKetThucXuLy != DateTime.MinValue)
            {
                NgayKetThucXuLy = ngayKetThucXuLy;
            }
        }
        if (!string.IsNullOrEmpty(yKienNguoiChuyenXuLy))
            YKienNguoiChuyenXuLy = yKienNguoiChuyenXuLy;
        if (dinhKemKetQua != null)
        {
            DinhKemKetQua = dinhKemKetQua;
        }
        if (!string.IsNullOrEmpty(dinhKemYKienNguoiChuyenXuLy))
            DinhKemYKienNguoiChuyenXuLy = dinhKemYKienNguoiChuyenXuLy;
        if (ngayTiepNhanCaNhan.HasValue && ngayTiepNhanCaNhan != default)
            NgayTiepNhanCaNhan = ngayTiepNhanCaNhan;
        if (ngayHenTraCaNhan.HasValue && ngayHenTraCaNhan != default)
            NgayHenTraCaNhan = ngayHenTraCaNhan;
        if (ngayYeuCauBoSung.HasValue && ngayYeuCauBoSung != default)
            NgayYeuCauBoSung = ngayYeuCauBoSung;
        if (ngayHenTra.HasValue && ngayHenTra != default)
            NgayHenTra = ngayHenTra;
        if (ngayTraKetQua.HasValue && ngayTraKetQua != default && trangThaiHoSoId == "10")
            NgayTra = ngayTraKetQua;
        if (!string.IsNullOrEmpty(nguoiDaXuLy)) // phải cho cái này trước NguoiDangXuLy ở dưới
        {
            if (NguoiDangXuLy != null)
            {
                NguoiDaXuLy = NguoiDaXuLy + "##" + NguoiDangXuLy;
            }
            else
            {
                NguoiDaXuLy = nguoiDaXuLy; // NguoiDaXuLy là null thì thêm người đang đăng nhập vào
            }

            NguoiDaXuLy = RemoveDuplicateIds(NguoiDaXuLy?.ToLower());
        }

        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            NguoiDangXuLy = nguoiDangXuLy;
        if (trangThaiTraKq != null) TrangThaiTraKq = trangThaiTraKq;
        if (!string.IsNullOrEmpty(donViTraKq)) DonViTraKq = donViTraKq;
        if (!string.IsNullOrEmpty(loaiKetQua)) LoaiKetQua = loaiKetQua;
        if((LoaiDuLieuKetNoi == "SyncGPLX" || LoaiDuLieuKetNoi == "GPLX" || LoaiDuLieuKetNoi == "SyncGPLXBGT") && !string.IsNullOrEmpty(nguoiNhanHoSo) && trangThaiCu == "2")
        {
            NguoiNhanHoSo = nguoiNhanHoSo;
        }
        return this;
    }

    public static string RemoveDuplicateIds(string input)
    {
        HashSet<string> uniqueIds = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        // Split the input string by "##"
        string[] ids = input.Split(new string[] { "##" }, StringSplitOptions.RemoveEmptyEntries);

        // Iterate through each id and add to the HashSet if it's not already present
        foreach (string id in ids)
        {
            if (!uniqueIds.Contains(id))
            {
                uniqueIds.Add(id);
            }
        }

        // Join the unique IDs back into a string separated by "##"
        string result = string.Join("##", uniqueIds);

        return result.ToLower();
    }

    public HoSo ChuyenPhiDiaGioi(string? donViId, string? nguoiDangXuLy)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;

        if (donViId != null) DonViId = donViId;
        if (nguoiDangXuLy != null) NguoiDangXuLy = nguoiDangXuLy;
        return this;
    }

    public HoSo SetSoDinhDanh(string? soDinhDanh)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(soDinhDanh))
        {
            SoDinhDanh = soDinhDanh;
        }

        return this;
    }

    public HoSo ThayDoiTruongHop(string? tenBuocHienTai, string? buocHienTai, string? tenTruongHop, string? maTruongHop, string? truongHopId, DateTime? ngayHenTra, double? thoiGianThucHien, string? loaiThoiGianThucHien)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        NguoiXuLyTiep = null;
        BuocXuLyTiep = null;
        if (!string.IsNullOrEmpty(tenBuocHienTai))
            TenBuocHienTai = tenBuocHienTai;
        if (!string.IsNullOrEmpty(buocHienTai))
            BuocHienTai = buocHienTai;
        if (!string.IsNullOrEmpty(tenTruongHop))
            TenTruongHop = tenTruongHop;
        if (!string.IsNullOrEmpty(maTruongHop))
            MaTruongHop = maTruongHop;
        if (!string.IsNullOrEmpty(truongHopId))
            TruongHopId = truongHopId;
        NgayHenTra = ngayHenTra;
        ThoiGianThucHien = thoiGianThucHien;
        LoaiThoiGianThucHien = loaiThoiGianThucHien;
        return this;
    }

    public HoSo TraKetQua(string? trichYeuKetQua, string? dinhKemKetQua, DateTime? ngayTra)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        TrangThaiHoSoId = "10";
        NgayTra = ngayTra;
        TenBuocHienTai = "Đã trả kết quả";
        if (!string.IsNullOrEmpty(trichYeuKetQua))
            TrichYeuKetQua = trichYeuKetQua;
        if (!string.IsNullOrEmpty(dinhKemKetQua))
            DinhKemKetQua = dinhKemKetQua;
        if (!string.IsNullOrEmpty(DonViPhiDiaGioi))
        {
            NgayTraPhiDiaGioi = DateTime.Now;
            TrangThaiPhiDiaGioi = HoSo_TrangThaiPhiDiaGioi.DaTraKetQua;
        }
        return this;
    }

    public HoSo SetDinhKemKetQua(string dinhKemKetQua)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        DinhKemKetQua = dinhKemKetQua;
        return this;
    }

    public HoSo XacNhanKetQua(string? trangThaiTraKq, string? donViTraKq, string? loaiKetQua = null, DateTime? ngayXacNhanKetQua = null)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (trangThaiTraKq != null) TrangThaiTraKq = trangThaiTraKq;
        if (!string.IsNullOrEmpty(donViTraKq)) DonViTraKq = donViTraKq;
        if (loaiKetQua != null) LoaiKetQua = loaiKetQua;
        if (ngayXacNhanKetQua != null)
            NgayXacNhanKetQua = ngayXacNhanKetQua;
        return this;
    }

    public HoSo TuChoiTiepNhanHoSoTrucTuyen(string trangThaiId, DateTime ngayKetThucXuLy, string? lyDoTuChoi, string? dinhKemTuChoi, string? nguoiNhanHoSo)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        TrangThaiHoSoId = trangThaiId;
        NgayKetThucXuLy = ngayKetThucXuLy;
        if (!string.IsNullOrEmpty(lyDoTuChoi))
        {
            LyDoTuChoi = lyDoTuChoi;
        }

        if (!string.IsNullOrEmpty(dinhKemTuChoi))
        {
            DinhKemTuChoi = dinhKemTuChoi;
        }

        if (!string.IsNullOrEmpty(nguoiNhanHoSo))
        {
            NguoiNhanHoSo = nguoiNhanHoSo;
        }

        return this;
    }

    public HoSo ChuyenNoiBoHoSo(string? nguoiDaXuLy, string? nguoiDangXuLy, string nguoiXuLyTruoc)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        ChuyenNoiBo = true;
        NguoiXuLyTruoc = nguoiXuLyTruoc;
        if (!string.IsNullOrEmpty(nguoiDaXuLy))
        {
            if (NguoiDangXuLy != null)
            {
                NguoiDaXuLy = NguoiDaXuLy + "##" + NguoiDangXuLy;
            }
            else
            {
                NguoiDaXuLy = nguoiDaXuLy; // NguoiDaXuLy là null thì thêm người đang đăng nhập vào
            }

            NguoiDaXuLy = RemoveDuplicateIds(NguoiDaXuLy?.ToLower());
        }

        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            NguoiDangXuLy = nguoiDangXuLy;
        return this;
    }

    public HoSo CapNhatKetQua(string? trichYeuKetQua, string? dinhKemKetQua, string? eFormKetQuaData, string? loaiVanBanKetQua
        , string? soKyHieuKetQua, string? nguoiKyKetQua, string? coQuanBanHanhKetQua, DateTime? ngayBanHanhKetQua, DateTime? ngayKyKetQua, string? donViChuyenXuLy, string? loaiKetQua)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;

        if (donViChuyenXuLy != null)
            DonViChuyenXuLy = donViChuyenXuLy;
        if (!string.IsNullOrEmpty(trichYeuKetQua))
            TrichYeuKetQua = trichYeuKetQua;
        DinhKemKetQua = dinhKemKetQua;
        if (eFormKetQuaData != null)
            EFormKetQuaData = eFormKetQuaData;
        if (loaiVanBanKetQua != null)
            LoaiVanBanKetQua = loaiVanBanKetQua;
        if (soKyHieuKetQua != null)
            SoKyHieuKetQua = soKyHieuKetQua;
        if (nguoiKyKetQua != null)
            NguoiKyKetQua = nguoiKyKetQua;
        if (coQuanBanHanhKetQua != null)
            CoQuanBanHanhKetQua = coQuanBanHanhKetQua;
        if (ngayBanHanhKetQua.HasValue && ngayBanHanhKetQua != default)
            NgayBanHanhKetQua = ngayBanHanhKetQua;
        if (ngayKyKetQua.HasValue && ngayKyKetQua != default)
            NgayKyKetQua = ngayKyKetQua;
        if (!string.IsNullOrEmpty(loaiKetQua))
        {
            LoaiKetQua = loaiKetQua;
        }

        return this;
    }

    public HoSo DatLaiNgayHenTra(DateTime? ngayHenTra)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (ngayHenTra.HasValue) NgayHenTra = ngayHenTra;
        return this;
    }

    public HoSo DatLaiQuyTrinh(string? tenBuocHienTai, string? buocHienTai, string? nguoiDangXuLy, string? trangThaiHoSoId, DateTime? ngayHenTraCaNhan, DateTime? ngayYeuCauBoSung)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        ChuyenNoiBo = false;
        if (!string.IsNullOrEmpty(tenBuocHienTai))
            TenBuocHienTai = tenBuocHienTai;
        if (!string.IsNullOrEmpty(buocHienTai))
            BuocHienTai = buocHienTai;

        if (ngayHenTraCaNhan.HasValue && ngayHenTraCaNhan != default)
            NgayHenTraCaNhan = ngayHenTraCaNhan;
        if (ngayYeuCauBoSung.HasValue && ngayYeuCauBoSung.Value != default)
            NgayYeuCauBoSung = ngayYeuCauBoSung.Value;

        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            NguoiDangXuLy = nguoiDangXuLy;
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            TrangThaiHoSoId = trangThaiHoSoId;
        ChoBanHanh = false;
        return this;
    }

    public HoSo UpdateTrangThaiHoSo(string? trangThaiHoSoId, string? lyDoTuChoi)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            TrangThaiHoSoId = trangThaiHoSoId;
        if (!string.IsNullOrEmpty(lyDoTuChoi))
            LyDoTuChoi = lyDoTuChoi;
        return this;
    }

    public HoSo DatLaiHoSoQuaHan(DateTime? ngayHenTra)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (ngayHenTra.HasValue && ngayHenTra != default)
            NgayKetThucXuLy = ngayHenTra;
        return this;
    }

    public HoSo ThuHoiHoSo(string? nguoiDangXuLy, string? buocXuLyTruoc, string? trangThaiHoSoId, string? buocHienTai, string? tenBuocHienTai, DateTime? ngayTiepNhanCaNhan)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        ChoBanHanh = false;
        ChuyenNoiBo = false;
        YKienNguoiChuyenXuLy = string.Empty;
        DinhKemYKienNguoiChuyenXuLy = string.Empty;
        NguoiXuLyTruoc = string.Empty;
        if (buocXuLyTruoc != null) // nhận ""
            BuocXuLyTruoc = buocXuLyTruoc;
        if (ngayTiepNhanCaNhan.HasValue && ngayTiepNhanCaNhan != default)
            NgayTiepNhanCaNhan = ngayTiepNhanCaNhan;
        if (!string.IsNullOrEmpty(nguoiDangXuLy))
        {
            var nguoiDaXuLyList = NguoiDaXuLy.ToLower().Split("##").ToList();
            nguoiDaXuLyList.Remove(nguoiDangXuLy.ToLower());
            NguoiDaXuLy = string.Join("##", nguoiDaXuLyList);
            NguoiDaXuLy = RemoveDuplicateIds(NguoiDaXuLy);
            NguoiDangXuLy = nguoiDangXuLy;
        }

        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            TrangThaiHoSoId = trangThaiHoSoId;
        else
            TrangThaiHoSoId = "2";
        if (!string.IsNullOrEmpty(buocHienTai))
            BuocHienTai = buocHienTai;
        if (!string.IsNullOrEmpty(tenBuocHienTai))
            TenBuocHienTai = tenBuocHienTai;

        return this;
    }

    public HoSo YeuCauCongDanhBoSung(string? trangThaiBoSung)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        NgayCongDanBoSung = null;
        if (!string.IsNullOrEmpty(trangThaiBoSung) && !TrangThaiBoSung.Equals(trangThaiBoSung))
            TrangThaiBoSung = trangThaiBoSung;
        return this;
    }

    public HoSo YeuCauMotCuaBoSung(string? trangThaiTruoc, string? trangThaiHoSoId, DateTime? ngayYeuCauBoSung, string? lyDoBoSung, string? dinhKemBoSung,
        string? thanhPhanBoSung, string? nguoiXuLyTruoc, string? trangThaiBoSung, string? yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy,
        string? nguoiDangXuLy, string? nguoiDaXuLy, int? thoiHanBoSung, string? noiDungBoSung, string? trangThaiTraKq, string? donViTraKq, string loaiKetQua = null)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        ChoBanHanh = false;
        if (!string.IsNullOrEmpty(trangThaiTruoc))
            TrangThaiTruoc = trangThaiTruoc;
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            TrangThaiHoSoId = trangThaiHoSoId;
        if (!string.IsNullOrEmpty(lyDoBoSung))
            LyDoBoSung = lyDoBoSung;
        if (!string.IsNullOrEmpty(dinhKemBoSung))
            DinhKemBoSung = dinhKemBoSung;
        if (!string.IsNullOrEmpty(thanhPhanBoSung))
            ThanhPhanBoSung = thanhPhanBoSung;
        if (ngayYeuCauBoSung.HasValue && ngayYeuCauBoSung != default)
            NgayYeuCauBoSung = ngayYeuCauBoSung;
        if (noiDungBoSung != null)
            NoiDungBoSung = noiDungBoSung;
        if (thoiHanBoSung != null)
            ThoiHanBoSung = (int)thoiHanBoSung;
        if (!string.IsNullOrEmpty(nguoiXuLyTruoc))
            NguoiXuLyTruoc = nguoiXuLyTruoc;
        if (trangThaiTraKq != null)
            TrangThaiTraKq = trangThaiTraKq;
        if (donViTraKq != null)
            DonViTraKq = donViTraKq;
        if (!string.IsNullOrEmpty(nguoiDaXuLy))
        {
            if (NguoiDangXuLy != null)
            {
                NguoiDaXuLy = NguoiDaXuLy + "##" + NguoiDangXuLy;
            }
            else
            {
                NguoiDaXuLy = nguoiDaXuLy; // NguoiDaXuLy là null thì thêm người đang đăng nhập vào
            }

            NguoiDaXuLy = RemoveDuplicateIds(NguoiDaXuLy.ToLower());
        }

        if (!string.IsNullOrEmpty(trangThaiBoSung))
            TrangThaiBoSung = trangThaiBoSung;
        if (!string.IsNullOrEmpty(yKienNguoiChuyenXuLy))
            YKienNguoiChuyenXuLy = yKienNguoiChuyenXuLy;
        if (!string.IsNullOrEmpty(dinhKemYKienNguoiChuyenXuLy))
            DinhKemYKienNguoiChuyenXuLy = dinhKemYKienNguoiChuyenXuLy;
        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            NguoiDangXuLy = nguoiDangXuLy;
        if (!string.IsNullOrEmpty(loaiKetQua))
            LoaiKetQua = loaiKetQua;
        return this;
    }

    public HoSo TraLaiHoSo(string? nguoiDangXuLy, string? nguoiXuLyTruoc, string? buocXuLyTruoc, string? trangThaiHoSoId, string? buocHienTai, string? tenBuocHienTai, DateTime? ngayTiepNhanCaNhan)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        ChoBanHanh = false;
        ChuyenNoiBo = false;
        YKienNguoiChuyenXuLy = "Trả lại";
        DinhKemYKienNguoiChuyenXuLy = string.Empty;

        // NgayHenTraCaNhan = null;
        if (buocXuLyTruoc != null) // nhận ""
            BuocXuLyTruoc = buocXuLyTruoc;
        if (ngayTiepNhanCaNhan.HasValue && ngayTiepNhanCaNhan != default)
            NgayTiepNhanCaNhan = ngayTiepNhanCaNhan;
        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            NguoiDangXuLy = nguoiDangXuLy;
        if (!string.IsNullOrEmpty(nguoiXuLyTruoc))
            NguoiXuLyTruoc = nguoiXuLyTruoc;
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            TrangThaiHoSoId = trangThaiHoSoId;
        else
            TrangThaiHoSoId = "2";
        if (!string.IsNullOrEmpty(buocHienTai))
            BuocHienTai = buocHienTai;
        if (!string.IsNullOrEmpty(tenBuocHienTai) && !TenBuocHienTai.Equals(tenBuocHienTai))
            TenBuocHienTai = tenBuocHienTai;
        return this;
    }

    public HoSo MotCuaCapNhatBoSung(string? thongTinTiepNhanBoSung)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(thongTinTiepNhanBoSung))
            ThongTinTiepNhanBoSung = thongTinTiepNhanBoSung;
        return this;
    }

    public HoSo HoanThanhBoSungTheoNghiDinh(DateTime? ngayHenTra, DateTime? ngayHenTraCaNhan, string buocHienTai)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        NgayHenTra = ngayHenTra;
        NgayHenTraCaNhan = ngayHenTraCaNhan;
        NguoiDangXuLy = NguoiNhanHoSo;
        BuocHienTai = buocHienTai;
        TrangThaiHoSoId = "2";
        return this;
    }

    public HoSo MotCuaGuiBoSung(string? nguoiDaXuLy, string? trangThaiBoSung,
        string? trangThaiHoSoId, string? nguoiDangXuLy, string? nguoiXuLyTruoc, DateTime? ngayHenTra, DateTime? ngayHenTraCaNhan, string?
        yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(nguoiDaXuLy))
        {
            if (NguoiDangXuLy != null)
            {
                NguoiDaXuLy = NguoiDaXuLy + "##" + NguoiDangXuLy;
            }
            else
            {
                NguoiDaXuLy = nguoiDaXuLy; // NguoiDaXuLy là null thì thêm người đang đăng nhập vào
            }

            NguoiDaXuLy = RemoveDuplicateIds(NguoiDaXuLy.ToLower());
        }

        if (!string.IsNullOrEmpty(trangThaiBoSung))
            TrangThaiBoSung = trangThaiBoSung;
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            TrangThaiHoSoId = trangThaiHoSoId;
        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            NguoiDangXuLy = nguoiDangXuLy;
        if (!string.IsNullOrEmpty(nguoiXuLyTruoc))
            NguoiXuLyTruoc = nguoiXuLyTruoc;
        if (ngayHenTra.HasValue && ngayHenTra != default)
            NgayHenTra = ngayHenTra;
        if (ngayHenTraCaNhan.HasValue && ngayHenTraCaNhan != default)
            NgayHenTraCaNhan = ngayHenTraCaNhan;
        if (!string.IsNullOrEmpty(yKienNguoiChuyenXuLy))
            YKienNguoiChuyenXuLy = yKienNguoiChuyenXuLy;
        if (!string.IsNullOrEmpty(dinhKemYKienNguoiChuyenXuLy) && dinhKemYKienNguoiChuyenXuLy != "##")
            DinhKemYKienNguoiChuyenXuLy = dinhKemYKienNguoiChuyenXuLy;
        return this;
    }

    public HoSo MotCuaGuiBoSungGuiVBDLIS(string? nguoiDaXuLy, string? trangThaiBoSung,
        string? trangThaiHoSoId, string? nguoiXuLyTruoc, DateTime? ngayHenTra, string?
        yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        NguoiDangXuLy = null;
        if (!string.IsNullOrEmpty(nguoiDaXuLy))
        {
            if (NguoiDangXuLy != null)
            {
                NguoiDaXuLy = NguoiDaXuLy + "##" + NguoiDangXuLy;
            }
            else
            {
                NguoiDaXuLy = nguoiDaXuLy; // NguoiDaXuLy là null thì thêm người đang đăng nhập vào
            }

            NguoiDaXuLy = RemoveDuplicateIds(NguoiDaXuLy.ToLower());
        }

        if (!string.IsNullOrEmpty(trangThaiBoSung))
            TrangThaiBoSung = trangThaiBoSung;
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            TrangThaiHoSoId = trangThaiHoSoId;
        if (!string.IsNullOrEmpty(nguoiXuLyTruoc))
            NguoiXuLyTruoc = nguoiXuLyTruoc;
        if (ngayHenTra.HasValue && ngayHenTra != default)
            NgayHenTra = ngayHenTra;
        if (!string.IsNullOrEmpty(yKienNguoiChuyenXuLy))
            YKienNguoiChuyenXuLy = yKienNguoiChuyenXuLy;
        if (!string.IsNullOrEmpty(dinhKemYKienNguoiChuyenXuLy) && dinhKemYKienNguoiChuyenXuLy != "##")
            DinhKemYKienNguoiChuyenXuLy = dinhKemYKienNguoiChuyenXuLy;
        return this;
    }
    public HoSo CongDanGuiBoSung(string? trangThaiHoSoId, string? trangThaiTruoc, string? nguoiXuLyTruoc, string? trangThaiBoSung, string? yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy, DateTime? ngayCongDanBoSung)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (trangThaiHoSoId != null)
            TrangThaiHoSoId = trangThaiHoSoId;
        if (trangThaiTruoc != null)
            TrangThaiTruoc = trangThaiTruoc;
        if (nguoiXuLyTruoc != null)
            NguoiXuLyTruoc = nguoiXuLyTruoc;
        if (trangThaiBoSung != null)
            TrangThaiBoSung = trangThaiBoSung;
        if (yKienNguoiChuyenXuLy != null)
            YKienNguoiChuyenXuLy = yKienNguoiChuyenXuLy;
        if (!string.IsNullOrEmpty(dinhKemYKienNguoiChuyenXuLy) && dinhKemYKienNguoiChuyenXuLy != "##")
            DinhKemYKienNguoiChuyenXuLy = dinhKemYKienNguoiChuyenXuLy;
        if (ngayCongDanBoSung != null)
            NgayCongDanBoSung = ngayCongDanBoSung;
        return this;
    }

    public HoSo TiepNhanHoSoTrucTuyen(string? tenBuocHienTai, string? buocHienTai, string? nguoiXuLyTiep, string? buocXuLyTiep, string? nguoiNhanHoSo
        , string? nguoiDangXuLy, string? trangThaiHoSoId, DateTime? ngayTiepNhanCaNhan, DateTime? ngayHenTraCaNhan,
         DateTime? ngayHenTra, DateTime? ngayTiepNhan, double? thoiGianThucHien, string? loaiThoiGianThucHien,
        string? tinhThanhDiaBan, string? quanHuyenDiaBan, string? xaPhuongDiaBan, string? tenDiaBan)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(tenBuocHienTai))
            TenBuocHienTai = tenBuocHienTai;
        if (!string.IsNullOrEmpty(buocHienTai))
            BuocHienTai = buocHienTai;
        if (!string.IsNullOrEmpty(nguoiXuLyTiep))
            NguoiXuLyTiep = nguoiXuLyTiep;
        if (!string.IsNullOrEmpty(buocXuLyTiep))
            BuocXuLyTiep = buocXuLyTiep;
        if (!string.IsNullOrEmpty(nguoiNhanHoSo))
            NguoiNhanHoSo = nguoiNhanHoSo;
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            TrangThaiHoSoId = trangThaiHoSoId;

        if (ngayTiepNhanCaNhan.HasValue && ngayTiepNhanCaNhan != default)
            NgayTiepNhanCaNhan = ngayTiepNhanCaNhan;
        if (ngayHenTraCaNhan.HasValue && ngayHenTraCaNhan != default)
            NgayHenTraCaNhan = ngayHenTraCaNhan;
        if (thoiGianThucHien != null)
            ThoiGianThucHien = (double)thoiGianThucHien;
        if (!string.IsNullOrEmpty(loaiThoiGianThucHien))
            LoaiThoiGianThucHien = loaiThoiGianThucHien;
        if (ngayHenTra.HasValue && ngayHenTra != default)
            NgayHenTra = ngayHenTra;
        if (ngayTiepNhan.HasValue && ngayTiepNhan != default && NgayTiepNhan == null)
            NgayTiepNhan = ngayTiepNhan;

        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            NguoiDangXuLy = nguoiDangXuLy;
        if (!string.IsNullOrEmpty(tenDiaBan))
            TenDiaBan = tenDiaBan;
        if (!string.IsNullOrEmpty(tinhThanhDiaBan))
            TinhThanhDiaBan = tinhThanhDiaBan;
        if (!string.IsNullOrEmpty(quanHuyenDiaBan))
            QuanHuyenDiaBan = quanHuyenDiaBan;
        if (!string.IsNullOrEmpty(xaPhuongDiaBan))
            XaPhuongDiaBan = xaPhuongDiaBan;
        return this;
    }

    public HoSo TiepNhanHoSoChungThuc(string? tenBuocHienTai, string? buocHienTai, string? nguoiXuLyTiep, string? buocXuLyTiep, string? nguoiNhanHoSo
        , string? nguoiDangXuLy, string? trangThaiHoSoId, DateTime? ngayTiepNhanCaNhan, DateTime? ngayHenTraCaNhan,
         DateTime? ngayHenTra, DateTime? ngayTiepNhan, double? thoiGianThucHien, string? loaiThoiGianThucHien)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(tenBuocHienTai))
            TenBuocHienTai = tenBuocHienTai;
        if (!string.IsNullOrEmpty(buocHienTai))
            BuocHienTai = buocHienTai;
        if (!string.IsNullOrEmpty(nguoiXuLyTiep))
            NguoiXuLyTiep = nguoiXuLyTiep;
        if (!string.IsNullOrEmpty(buocXuLyTiep))
            BuocXuLyTiep = buocXuLyTiep;
        if (!string.IsNullOrEmpty(nguoiNhanHoSo))
            NguoiNhanHoSo = nguoiNhanHoSo;
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
            TrangThaiHoSoId = trangThaiHoSoId;

        if (ngayTiepNhanCaNhan.HasValue && ngayTiepNhanCaNhan != default)
            NgayTiepNhanCaNhan = ngayTiepNhanCaNhan;
        if (ngayHenTraCaNhan.HasValue && ngayHenTraCaNhan != default)
            NgayHenTraCaNhan = ngayHenTraCaNhan;
        if (thoiGianThucHien != null)
            ThoiGianThucHien = (double)thoiGianThucHien;
        if (!string.IsNullOrEmpty(loaiThoiGianThucHien))
            LoaiThoiGianThucHien = loaiThoiGianThucHien;
        if (ngayHenTra.HasValue && ngayHenTra != default)
            NgayHenTra = ngayHenTra;
        if (ngayTiepNhan.HasValue && ngayTiepNhan != default)
            NgayTiepNhan = ngayTiepNhan;

        if (!string.IsNullOrEmpty(nguoiDangXuLy))
            NguoiDangXuLy = nguoiDangXuLy;
        return this;
    }

    public HoSo LienThongQLVB(bool choBanHanh, string ketQuaDaySangQLVB, string nguoiDangXuLy, string nguoiXuLyTiep)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        ChoBanHanh = choBanHanh;
        KetQuaDaySangQLVB = ketQuaDaySangQLVB;
        string newNguoiXuLyTiep = string.Empty;
        string nguoiDaXuLyAndNguoiHienTai = !string.IsNullOrEmpty(NguoiDaXuLy) ? NguoiDaXuLy + "##" + nguoiDangXuLy : "" + "##" + nguoiDangXuLy;
        nguoiDaXuLyAndNguoiHienTai = nguoiDaXuLyAndNguoiHienTai.ToLower();

        // nếu như những người xử lý tiếp của node sau khi đồng bộ về từ QLVB mà chứa 1 trong những người đã xử lý => lấy người đã xử lý đó.
        if (!string.IsNullOrEmpty(nguoiDaXuLyAndNguoiHienTai) && nguoiDaXuLyAndNguoiHienTai.Contains("##"))
        {
            string[] nguoiDaXuLys = nguoiDaXuLyAndNguoiHienTai.Split("##");
            for (int i = 0; i < nguoiDaXuLys.Length; i++)
            {
                string nguoiDaXuLy = nguoiDaXuLys[i];
                if (!string.IsNullOrEmpty(nguoiDaXuLy))
                {
                    if (nguoiXuLyTiep.ToLower().Contains(nguoiDaXuLy))
                    {
                        if (i > 0 && !string.IsNullOrEmpty(newNguoiXuLyTiep))
                        {
                            newNguoiXuLyTiep += "##";
                        }
                        newNguoiXuLyTiep += nguoiDaXuLy;
                    }
                }
            }
        }

        // không có người đã xử lý nào => lấy hết
        if (string.IsNullOrEmpty(newNguoiXuLyTiep))
        {
            NguoiXuLyTiep = nguoiXuLyTiep.ToLower();
        }
        else
        {
            NguoiXuLyTiep = newNguoiXuLyTiep.ToLower();
        }

        NguoiXuLyTiep = RemoveDuplicateIds(NguoiXuLyTiep);
        string nguoiDangXuLyLower = nguoiDangXuLy.ToLower();
        if (NguoiXuLyTiep.Contains(nguoiDangXuLyLower))
        {
            NguoiXuLyTiep = nguoiDangXuLyLower;
            return this;
        }
        // if (!string.IsNullOrEmpty(nguoiXuLyTiep))
        // {
        //    NguoiXuLyTiep = nguoiXuLyTiep;
        // }
        return this;
    }

    /// <summary>
    /// đồng bộ hồ sơ quản lý văn bản
    /// </summary>
    /// <returns></returns>
    public HoSo DongBoHoSoQLVB(string? trichYeuKetQua, string? dinhKemKetQua, string? nguoiXuLyTruoc, string? buocXuLyTruoc, string? tenBuocHienTai, string? buocHienTai)
    {
        // chắc chắn sau bước qlvb sẽ chỉ có 1 quy trình.
        ChoBanHanh = false;
        if (!string.IsNullOrEmpty(trichYeuKetQua))
            TrichYeuKetQua = trichYeuKetQua;
        if (!string.IsNullOrEmpty(dinhKemKetQua))
        {
            if (string.IsNullOrEmpty(DinhKemKetQua))
            {
                DinhKemKetQua = dinhKemKetQua;
            }
            else
            {
                DinhKemKetQua = DinhKemKetQua + "##" + dinhKemKetQua;
            }
        }

        if (!string.IsNullOrEmpty(nguoiXuLyTruoc))
            NguoiXuLyTruoc = nguoiXuLyTruoc;
        if (!string.IsNullOrEmpty(buocXuLyTruoc))
            BuocXuLyTruoc = buocXuLyTruoc;
        if (!string.IsNullOrEmpty(tenBuocHienTai))
            TenBuocHienTai = tenBuocHienTai;
        if (!string.IsNullOrEmpty(buocHienTai))
            BuocHienTai = buocHienTai;

        return this;
    }

    public HoSo ThemMoiDuThaoBoSung(string buocXuLyTiep, string? tenBuocHienTai, string? nguoiXuLyTiep, string nguoiDaXuLy)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        ChoBanHanh = true;
        BuocXuLyTiep = buocXuLyTiep;
        NguoiXuLyTiep = nguoiXuLyTiep;
        TenBuocHienTai = tenBuocHienTai;
        if (!string.IsNullOrEmpty(nguoiDaXuLy))
        {
            if (NguoiDangXuLy != null)
            {
                NguoiDaXuLy = NguoiDaXuLy + "##" + NguoiDangXuLy;
            }
            else
            {
                NguoiDaXuLy = nguoiDaXuLy; // NguoiDaXuLy là null thì thêm người đang đăng nhập vào
            }
        }

        NguoiDangXuLy = nguoiDaXuLy?.ToLower();
        NguoiDaXuLy = RemoveDuplicateIds(NguoiDaXuLy);

        return this;
    }
    public HoSo SetTrangThaiTraKq(string trangThaiTraKq)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        TrangThaiTraKq = trangThaiTraKq;
        return this;
    }
    public HoSo ChuyenTraHoSo(string? buocHienTai, string? tenBuocHienTai, string? yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy, DateTime? ngayKetThucXuLy, string? trangThaiTraKq, string? donViTraKq, string? loaiKetQua = null)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        TrangThaiHoSoId = "9";
        if (!string.IsNullOrEmpty(buocHienTai))
            BuocHienTai = buocHienTai;
        if (!string.IsNullOrEmpty(tenBuocHienTai))
            TenBuocHienTai = tenBuocHienTai;
        if (yKienNguoiChuyenXuLy != null)
            YKienNguoiChuyenXuLy = yKienNguoiChuyenXuLy;
        if (!string.IsNullOrEmpty(dinhKemYKienNguoiChuyenXuLy) && dinhKemYKienNguoiChuyenXuLy != "##")
            DinhKemYKienNguoiChuyenXuLy = dinhKemYKienNguoiChuyenXuLy;
        if (trangThaiTraKq != null)
            TrangThaiTraKq = trangThaiTraKq;
        if (donViTraKq != null)
            DonViTraKq = donViTraKq;
        if (ngayKetThucXuLy.HasValue && ngayKetThucXuLy != DateTime.MinValue)
        {
            NgayKetThucXuLy = ngayKetThucXuLy;
        }
        ChoBanHanh = false;
        LoaiKetQua = loaiKetQua;
        return this;
    }

    public HoSo DuThaoXinLoiSuccess(string? yKienNguoiChuyenXuLy, string? dinhKemYKienNguoiChuyenXuLy)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (yKienNguoiChuyenXuLy != null)
            YKienNguoiChuyenXuLy = yKienNguoiChuyenXuLy;
        if (!string.IsNullOrEmpty(dinhKemYKienNguoiChuyenXuLy) && dinhKemYKienNguoiChuyenXuLy != "##")
            DinhKemYKienNguoiChuyenXuLy = dinhKemYKienNguoiChuyenXuLy;
        return this;
    }

    public HoSo UpdateViTriDeHoSo(string? viTriDeHoSo, DateTime? thoiGian, string? nguoiGhiChu)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (viTriDeHoSo != null)
            ViTriDeHoSo = viTriDeHoSo;
        if (thoiGian != null)
            NgayLuuViTriHoSo = thoiGian;
        if (nguoiGhiChu != null)
            NguoiLuuViTriHoSo = nguoiGhiChu;
        return this;
    }

    public HoSo UpdateTrKetQuaHCC(string? loaiNguoiNhanKetQua, string? hoTenNguoiNhanKetQua, string? banGocThuLai, string? soLuongBanGocThuLai, string? dinhKemNhanKetQua, string? chuKyNguoiNhanKetQua)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;

        if (!string.IsNullOrEmpty(loaiNguoiNhanKetQua))
            LoaiNguoiNhanKetQua = loaiNguoiNhanKetQua;
        if (!string.IsNullOrEmpty(hoTenNguoiNhanKetQua))
            HoTenNguoiNhanKetQua = hoTenNguoiNhanKetQua;
        if (!string.IsNullOrEmpty(banGocThuLai))
            BanGocThuLai = banGocThuLai;
        if (!string.IsNullOrEmpty(soLuongBanGocThuLai))
            SoLuongBanGocThuLai = soLuongBanGocThuLai;
        if (!string.IsNullOrEmpty(dinhKemNhanKetQua))
            DinhKemNhanKetQua = dinhKemNhanKetQua;
        if (!string.IsNullOrEmpty(chuKyNguoiNhanKetQua))
            ChuKyNguoiNhanKetQua = chuKyNguoiNhanKetQua;

        return this;
    }

    public HoSo SetDataDuThao(string? trichYeuKetQua, string? dinhKemKetQua, string? loaiVanBanKetQua
        , string? soKyHieuKetQua, string? nguoiKyKetQua, string? coQuanBanHanhKetQua, DateTime? ngayBanHanhKetQua, DateTime? ngayKyKetQua)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(trichYeuKetQua))
            TrichYeuKetQua = trichYeuKetQua;
        if (!string.IsNullOrEmpty(dinhKemKetQua))
            DinhKemKetQua = dinhKemKetQua;
        if (loaiVanBanKetQua != null)
            LoaiVanBanKetQua = loaiVanBanKetQua;
        if (soKyHieuKetQua != null)
            SoKyHieuKetQua = soKyHieuKetQua;
        if (nguoiKyKetQua != null)
            NguoiKyKetQua = nguoiKyKetQua;
        if (coQuanBanHanhKetQua != null)
            CoQuanBanHanhKetQua = coQuanBanHanhKetQua;
        if (ngayBanHanhKetQua.HasValue && ngayBanHanhKetQua != default)
            NgayBanHanhKetQua = ngayBanHanhKetQua;
        if (ngayKyKetQua.HasValue && ngayKyKetQua != default)
            NgayKyKetQua = ngayKyKetQua;
        return this;
    }

    public HoSo YeuCauThuPhi()
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        TrangThaiHoSoId = "6";
        return this;
    }

    public HoSo TraBoSung(string trangThaiBoSung)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        TrangThaiBoSung = trangThaiBoSung;
        return this;
    }

    public HoSo SuaDangKyNhanKqQuaBCCIData(string dangKyNhanHoSoQuaBCCIData, DateTime? ngayDangKyBuuDien = null)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        HinhThucTra = "1";
        if (ngayDangKyBuuDien.HasValue)
            NgayDangKyBuuDien = ngayDangKyBuuDien.Value;
        if (dangKyNhanHoSoQuaBCCIData != null) DangKyNhanHoSoQuaBCCIData = dangKyNhanHoSoQuaBCCIData;
        return this;
    }

    public HoSo ThuHoiDangKyNhanKqQuaBCCIData()
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        HinhThucTra = "1";
        NgayTraBuuDien = null;
        TrangThaiTraBuuDien = null;
        NgayDangKyBuuDien = null;
        return this;
    }

    public HoSo BCCITraKq(DateTime? ngayTraBuuDien = null)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (ngayTraBuuDien.HasValue) NgayTraBuuDien = ngayTraBuuDien.Value;
        else NgayTraBuuDien = DateTime.UtcNow;
        TrangThaiTraBuuDien = "1";
        return this;
    }

    public HoSo BCCIThuHoiKq()
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        NgayTraBuuDien = null;
        TrangThaiTraBuuDien = null;
        return this;
    }

    public HoSo UpdateNguoiDangXuLy(string nguoiDangXuLy)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(nguoiDangXuLy))
        {
            NguoiDangXuLy = nguoiDangXuLy;
        }
        NguoiDangXuLy = RemoveDuplicateIds(NguoiDangXuLy);

        return this;
    }

    public HoSo SoftDelete(DateTime deletedOn, Guid deletedBy, string lyDoXoa)
    {
        LyDoXoa = lyDoXoa;
        DeletedBy = deletedBy;
        DeletedOn = deletedOn;
        return this;
    }

    public HoSo Restore()
    {
        DeletedOn = null;
        return this;
    }

    public HoSo SetNotificationOn()
    {
        ThongBaoEmail = true;
        ThongBaoZalo = true;
        ThongBaoSMS = true;
        return this;
    }

    public HoSo SetThoiGianThucHien(double? thoiGianThucHien, double? thoiGianThucHienTrucTuyen, string? loaiThoiGianThucHien)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (thoiGianThucHien != null)
        {
            if (KenhThucHien == "2")
            {
                ThoiGianThucHien = thoiGianThucHienTrucTuyen;
            }
            else if (KenhThucHien == "1")
            {
                ThoiGianThucHien = thoiGianThucHien;
            }
        }
        if (!string.IsNullOrEmpty(loaiThoiGianThucHien))
        {
            LoaiThoiGianThucHien = loaiThoiGianThucHien;
        }
        return this;
    }

    public HoSo SetThongTinChuHoSoKhaiSinh(string chuHoSo, string ngaySinh, string soGiayToChuHoSo)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(chuHoSo))
        {
            ChuHoSo = chuHoSo;
        }
        NgaySinhChuHoSo = ngaySinh;
        SoGiayToChuHoSo = soGiayToChuHoSo;
        return this;
    }

    public HoSo DongBoTaoMoiHoSo(string? maLinhVuc, string? tenLinhVuc, DateTime? ngayHenTra, string? nguoiNhanHoSo, string? buocHienTai, string? kenhThucHien)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        TrangThaiHoSoId = "2";
        SoBoHoSo = 1;
        KenhThucHien = "2";
        if (!string.IsNullOrEmpty(kenhThucHien))
        {
            KenhThucHien = kenhThucHien;
        }

        if (!string.IsNullOrEmpty(maLinhVuc))
        {
            MaLinhVuc = maLinhVuc;
        }

        if (!string.IsNullOrEmpty(tenLinhVuc))
        {
            TenLinhVuc = tenLinhVuc;
        }

        if (ngayHenTra.HasValue && ngayHenTra != DateTime.MinValue)
        {
            NgayHenTra = ngayHenTra;
        }

        if (!string.IsNullOrEmpty(nguoiNhanHoSo))
        {
            NguoiNhanHoSo = nguoiNhanHoSo;
        }

        if (!string.IsNullOrEmpty(buocHienTai))
        {
            BuocHienTai = buocHienTai;
        }

        return this;
    }
    public HoSo AddGPLX(string? maLinhVuc, string? tenLinhVuc, DateTime? ngayHenTra, string? nguoiNhanHoSo, string? buocHienTai, string? kenhThucHien)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        TrangThaiHoSoId = "2";
        SoBoHoSo = 1;
        KenhThucHien = "2";
        if (!string.IsNullOrEmpty(kenhThucHien))
        {
            KenhThucHien = kenhThucHien;
        }

        LoaiDuLieuKetNoi = "GPLX";
        if (!string.IsNullOrEmpty(maLinhVuc))
        {
            MaLinhVuc = maLinhVuc;
        }

        if (!string.IsNullOrEmpty(tenLinhVuc))
        {
            TenLinhVuc = tenLinhVuc;
        }

        if (ngayHenTra.HasValue && ngayHenTra != DateTime.MinValue)
        {
            NgayHenTra = ngayHenTra;
        }

        if (!string.IsNullOrEmpty(nguoiNhanHoSo))
        {
            NguoiNhanHoSo = nguoiNhanHoSo;
        }

        if (!string.IsNullOrEmpty(buocHienTai))
        {
            BuocHienTai = buocHienTai;
        }

        return this;
    }

    public HoSo SyncGPLX(string? maLinhVuc, string? tenLinhVuc, DateTime? ngayHenTra, string? nguoiNhanHoSo, string? buocHienTai)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        TrangThaiHoSoId = "2";
        SoBoHoSo = 1;
        KenhThucHien = "2";
        LoaiDuLieuKetNoi = "SyncGPLX";
        if (!string.IsNullOrEmpty(maLinhVuc))
        {
            MaLinhVuc = maLinhVuc;
        }

        if (!string.IsNullOrEmpty(tenLinhVuc))
        {
            TenLinhVuc = tenLinhVuc;
        }

        if (ngayHenTra.HasValue && ngayHenTra != DateTime.MinValue)
        {
            NgayHenTra = ngayHenTra;
        }

        if (!string.IsNullOrEmpty(nguoiNhanHoSo))
        {
            NguoiNhanHoSo = nguoiNhanHoSo;
        }

        if (!string.IsNullOrEmpty(buocHienTai))
        {
            BuocHienTai = buocHienTai;
        }

        return this;
    }

    public HoSo KetThucHoSoThuTucKhuyenMai(string? trangThaiHoSoId, DateTime? ngayHenTra, DateTime? ngayKetThucXuLy, string? dinhKemKetQua)
    {
        TrangThaiDongBoDVC = HoSo_TrangThaiDongBoDVC.ChuaDongBo;
        if (!string.IsNullOrEmpty(trangThaiHoSoId))
        {
            TrangThaiHoSoId = trangThaiHoSoId;
        }

        if (!string.IsNullOrEmpty(dinhKemKetQua))
        {
            DinhKemKetQua = dinhKemKetQua;
        }

        if (ngayHenTra.HasValue && ngayHenTra != DateTime.MinValue)
        {
            NgayHenTra = ngayHenTra;
        }

        if (ngayKetThucXuLy.HasValue && ngayKetThucXuLy != DateTime.MinValue)
        {
            NgayKetThucXuLy = ngayKetThucXuLy;
        }

        return this;
    }
    public static int? GetBirthYearFromID(string soCCCD)
    {
        if (string.IsNullOrEmpty(soCCCD))
        {
            return null;
        }

        if(soCCCD.Length != 12)
        {
            return null;
        }
        // Lấy 2 chữ số của năm sinh từ mã số (vị trí 4 và 5 trong chuỗi)
        try
        {
            int yearPart = int.Parse(soCCCD.Substring(4, 2));

            // Xác định thế kỷ dựa vào mã giới tính (số ở vị trí thứ 3 trong chuỗi)
            int genderCode = int.Parse(soCCCD.Substring(3, 1));
            int century = 1900;

            if (genderCode == 0 || genderCode == 1)
            {
                century = 1900;
            }
            else if (genderCode == 2 || genderCode == 3)
            {
                century = 2000;
            }
            else if (genderCode == 4 || genderCode == 5)
            {
                century = 2100;
            }
            else if (genderCode == 6 || genderCode == 7)
            {
                century = 2200;
            }
            else if (genderCode == 8 || genderCode == 9)
            {
                century = 2300;
            }

            return century + yearPart;
        }
        catch (Exception e)
        {
            return null;
        }

    }
    public HoSo SetId(Guid id)
    {
        Id = id;
        return this;
    }

    public class LoaiDuLieuKetNoiData
    {
        public const string BaoTroXaHoi = nameof(BaoTroXaHoi);
        public const string BaoTroXaHoiTinh = nameof(BaoTroXaHoiTinh);
        public const string BTXHT_Convert = nameof(BTXHT_Convert);
        public const string GPLX = nameof(GPLX);
        public const string LLTPMCDT = nameof(LLTPMCDT);
        public const string LLTPVneid = nameof(LLTPVneid);
        public const string LLTPVneidUyQuyen = nameof(LLTPVneidUyQuyen);
        public const string LTKS = nameof(LTKS);
        public const string LTKT = nameof(LTKT);
        public const string LTTP = nameof(LTTP);
        public const string SyncGPLX = nameof(SyncGPLX);
        public const string SyncGPLXBGT = nameof(SyncGPLXBGT);
        public const string TBKM = nameof(TBKM);
        public const string TBKMBS = nameof(TBKMBS);
    }
}

public class HoSoQLVB : HoSo
{
    public string TenTTHC { get; set; }
    public string TenDonVi { get; set; }
    public string MaDinhDanhDonVi { get; set; }
    public string Catalog { get; set; }
    public string GroupName { get; set; }
    public string OfGroupName { get; set; }
    public string SoDienThoai { get; set; }
    public bool? TrangThaiPhiLePhi { get; set; }
    public string? LienThongTNMT { get; set; }
}

public static class HoSo_TrangThaiDongBoDVC
{
    public const string DaDongBo = "1";
    public const string ChuaDongBo = "0";
}
public static class HoSo_TrangThaiPhiDiaGioi
{
    public const string DuocTiepNhan = "1";
    public const string DangXuLy = "2";
    public const string DaTraKetQua = "3";
    public const string ChoDonViTiepNhan = "4";
}
public static class HoSo_TrangThaiSoHoa
{
    public const string ChoSoHoa = "1";
    public const string DaSoHoa = "2";
}