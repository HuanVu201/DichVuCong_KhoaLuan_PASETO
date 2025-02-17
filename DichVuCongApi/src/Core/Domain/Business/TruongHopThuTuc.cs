using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Business;
public class TruongHopThuTuc : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(4000)]
    public string Ten { get; private set; }
    [MaxLength(200)]
    [Column(TypeName = "varchar")]
    public string Ma { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string ThuTucId { get; private set; }
    public double? ThoiGianThucHien { get; private set; }
    [MaxLength(50)]
    public string LoaiThoiGianThucHien { get; private set; }
    [MaxLength(50)]
    public string? MaSoBieuMau { get; private set; }
    public bool? BatBuocDinhKemKetQua { get; private set; }
    public bool? BatBuocDungDiaBan { get; private set; } = false;
    public bool? YeuCauNopPhiTrucTuyen { get; private set; }
    public string? DonViTiepNhanRieng { get; private set; }
    public string? EForm { get; private set; }
    public string? EFormKetQua { get; private set; }
    public string? EFormTemplate { get; private set; }
    public string? NodeQuyTrinh { get; private set; }
    public string? EdgeQuyTrinh { get; private set; }
    public bool? BatBuocKySoKetQua { get; private set; }
    public bool? KhongCoNgayHenTra { get; private set; }
    public double? ThoiGianThucHienTrucTuyen { get; private set; }
    public bool? KhongThuBanGiay { get; private set; }
    public bool? ChoChuyenPhiDiaGioi { get; private set; }
    public bool? AnThongTinLienHeNopTrucTuyen { get; private set; } = false;
    public bool? ChoPhepNopUyQuyen { get; private set; } = true;
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? LoaiDuLieuKetNoi { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? LoaiBaoTroXaHoi { get; private set; }
    public bool? KhongNopTrucTuyen { get; private set; }
    [MaxLength(2000)]
    public string? NoteNgayLamViec { get; private set; }
    [MaxLength(0)]
    public string? NoteTraKetQua { get; private set; }

    public TruongHopThuTuc() { }
    public TruongHopThuTuc(string ten, string ma, string maThuTuc, double thoiGianThucHien,
        string loaiThoiGianThucHien, bool? batBuocDinhKemKetQua, bool? yeuCauNopPhiTrucTuyen, string? donViTiepNhanRieng, string? eForm, string? eFormTemplate,
        bool? batBuocKySoKetQua, bool? anThongTinLienHeNopTrucTuyen, bool? khongCoNgayHenTra, bool? khongThuBanGiay, bool? choChuyenPhiDiaGioi, double? thoiGianThucHienTrucTuyen
        , string? nodeQuyTrinh = null, string? edgeQuyTrinh = null, bool? choPhepNopUyQuyen = true, string? maSoBieuMau = null, bool? batBuocDungDiaBan = false, string? noteNgayLamViec = null, string? noteTraKetQua = null)
    {
        Ten = ten;
        Ma = ma;
        BatBuocDungDiaBan = batBuocDungDiaBan;
        ThuTucId = maThuTuc;
        ThoiGianThucHien = thoiGianThucHien;
        LoaiThoiGianThucHien = loaiThoiGianThucHien;
        BatBuocDinhKemKetQua = batBuocDinhKemKetQua;
        KhongThuBanGiay = khongThuBanGiay;
        YeuCauNopPhiTrucTuyen = yeuCauNopPhiTrucTuyen;
        DonViTiepNhanRieng = donViTiepNhanRieng;
        EForm = eForm;
        ChoPhepNopUyQuyen = choPhepNopUyQuyen;
        EFormTemplate = eFormTemplate;
        NodeQuyTrinh = nodeQuyTrinh;
        EdgeQuyTrinh = edgeQuyTrinh;
        BatBuocKySoKetQua = batBuocKySoKetQua;
        AnThongTinLienHeNopTrucTuyen = anThongTinLienHeNopTrucTuyen;
        KhongCoNgayHenTra = khongCoNgayHenTra;
        ChoChuyenPhiDiaGioi = choChuyenPhiDiaGioi;
        ThoiGianThucHienTrucTuyen = thoiGianThucHienTrucTuyen;
        MaSoBieuMau = maSoBieuMau;
        NoteNgayLamViec = noteNgayLamViec;
        NoteTraKetQua = noteTraKetQua;
    }
    public TruongHopThuTuc(DefaultIdType id, string ten, string ma, string maThuTuc, double thoiGianThucHien,
     string loaiThoiGianThucHien, bool? batBuocDinhKemKetQua, bool? yeuCauNopPhiTrucTuyen, string? donViTiepNhanRieng, string? eForm, string? eFormTemplate,
     bool? anThongTinLienHeNopTrucTuyen, bool? khongCoNgayHenTra, bool? khongThuBanGiay, bool? choChuyenPhiDiaGioi, double? thoiGianThucHienTrucTuyen, string? nodeQuyTrinh = null, string? edgeQuyTrinh = null, bool? choPhepNopUyQuyen = true, string? maSoBieuMau = null, bool? batBuocDungDiaBan = false, string? noteNgayLamViec = null, string? noteTraKetQua = null)
    {
        Id = id;
        Ten = ten;
        Ma = ma;
        ThuTucId = maThuTuc;
        ThoiGianThucHien = thoiGianThucHien;
        LoaiThoiGianThucHien = loaiThoiGianThucHien;
        BatBuocDinhKemKetQua = batBuocDinhKemKetQua;
        YeuCauNopPhiTrucTuyen = yeuCauNopPhiTrucTuyen;
        DonViTiepNhanRieng = donViTiepNhanRieng;
        EForm = eForm;
        ChoPhepNopUyQuyen = choPhepNopUyQuyen;
        BatBuocDungDiaBan = batBuocDungDiaBan;
        EFormTemplate = eFormTemplate;
        NodeQuyTrinh = nodeQuyTrinh;
        KhongThuBanGiay = khongThuBanGiay;
        EdgeQuyTrinh = edgeQuyTrinh;
        AnThongTinLienHeNopTrucTuyen = anThongTinLienHeNopTrucTuyen;
        KhongCoNgayHenTra = khongCoNgayHenTra;
        ChoChuyenPhiDiaGioi = choChuyenPhiDiaGioi;
        ThoiGianThucHienTrucTuyen = thoiGianThucHienTrucTuyen;
        MaSoBieuMau = maSoBieuMau;
        NoteNgayLamViec = noteNgayLamViec;
        NoteTraKetQua = noteTraKetQua;
    }
    public static TruongHopThuTuc Create(DefaultIdType id, string ten, string ma, string maThuTuc, double thoiGianThucHien,
      string loaiThoiGianThucHien, bool? batBuocDinhKemKetQua, bool? yeuCauNopPhiTrucTuyen, string? donViTiepNhanRieng, string? eForm, string? eFormTemplate,
      bool? batBuocKySoKetQua, bool? anThongTinLienHeNopTrucTuyen, bool? khongCoNgayHenTra, bool? khongThuBanGiay, bool? choChuyenPhiDiaGioi, double? thoiGianThucHienTrucTuyen, string? nodeQuyTrinh = null, string? edgeQuyTrinh = null, bool? choPhepNopUyQuyen = true, string? maSoBieuMau = null, bool? batBuocDungDiaBan = false)
    {
        return new(id, ten, ma, maThuTuc, thoiGianThucHien,
        loaiThoiGianThucHien, batBuocDinhKemKetQua, yeuCauNopPhiTrucTuyen, donViTiepNhanRieng, eForm, eFormTemplate, anThongTinLienHeNopTrucTuyen, khongCoNgayHenTra, khongThuBanGiay, choChuyenPhiDiaGioi, thoiGianThucHienTrucTuyen, nodeQuyTrinh, edgeQuyTrinh, choPhepNopUyQuyen, maSoBieuMau, batBuocDungDiaBan);
    }

    public static TruongHopThuTuc Create(string ten, string ma, string maThuTuc, double thoiGianThucHien,
        string loaiThoiGianThucHien, bool? batBuocDinhKemKetQua, bool? yeuCauNopPhiTrucTuyen, string? donViTiepNhanRieng, string? eForm, string? eFormTemplate, bool? batBuocKySoKetQua, bool? anThongTinLienHeNopTrucTuyen, bool? khongCoNgayHenTra, bool? khongThuBanGiay, bool? choChuyenPhiDiaGioi, double? thoiGianThucHienTrucTuyen, string? nodeQuyTrinh = null, string? edgeQuyTrinh = null, bool? choPhepNopUyQuyen = true, string? maSoBieuMau = null, bool? batBuocDungDiaBan = false, string? noteNgayLamViec = null, string? noteTraKetQua = null)
    {
        return new(ten, ma, maThuTuc, thoiGianThucHien,
        loaiThoiGianThucHien, batBuocDinhKemKetQua, yeuCauNopPhiTrucTuyen, donViTiepNhanRieng, eForm, eFormTemplate, batBuocKySoKetQua, anThongTinLienHeNopTrucTuyen, khongCoNgayHenTra, khongThuBanGiay, choChuyenPhiDiaGioi, thoiGianThucHienTrucTuyen, nodeQuyTrinh, edgeQuyTrinh, choPhepNopUyQuyen, maSoBieuMau, batBuocDungDiaBan, noteNgayLamViec, noteTraKetQua);
    }

    public TruongHopThuTuc Update(string? ten, string? ma, string? maThuTuc, double? thoiGianThucHien,
        string? loaiThoiGianThucHien, bool? batBuocDinhKemKetQua, bool? yeuCauNopPhiTrucTuyen, string? donViTiepNhanRieng, string? eForm, string? eFormTemplate,
        string? nodeQuyTrinh, string? edgeQuyTrinh, string? eFormKetQua, bool? batBuocKySoKetQua, bool? anThongTinLienHeNopTrucTuyen, bool? choChuyenPhiDiaGioi, bool? khongThuBanGiay,
        double? thoiGianThucHienTrucTuyen, bool? khongCoNgayHenTra, bool? choPhepNopUyQuyen, string? loaiDuLieuKetNoi, string? maSoBieuMau, bool? khongNopTrucTuyen, string? loaiBaoTroXaHoi, bool? batBuocDungDiaBan, string? noteNgayLamViec, string? noteTraKetQua)
    {
        if (!string.IsNullOrEmpty(loaiDuLieuKetNoi))
            LoaiDuLieuKetNoi = loaiDuLieuKetNoi;
        if (!string.IsNullOrEmpty(loaiBaoTroXaHoi))
            LoaiBaoTroXaHoi = loaiBaoTroXaHoi;
        if (khongNopTrucTuyen != null)
            KhongNopTrucTuyen = khongNopTrucTuyen;
        if (!string.IsNullOrEmpty(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma))
            Ma = ma;
        if (!string.IsNullOrEmpty(maThuTuc) && !ThuTucId.Equals(maThuTuc))
            ThuTucId = maThuTuc;
        if (thoiGianThucHien != null)
            ThoiGianThucHien = (double)thoiGianThucHien;
        if (thoiGianThucHienTrucTuyen != null)
            ThoiGianThucHienTrucTuyen = (double)thoiGianThucHienTrucTuyen;
        if (!string.IsNullOrEmpty(loaiThoiGianThucHien) && !LoaiThoiGianThucHien.Equals(loaiThoiGianThucHien))
            LoaiThoiGianThucHien = loaiThoiGianThucHien;
        if (khongCoNgayHenTra != null)
            KhongCoNgayHenTra = (bool)khongCoNgayHenTra;
        if (batBuocDinhKemKetQua != null)
            BatBuocDinhKemKetQua = (bool)batBuocDinhKemKetQua;
        if (yeuCauNopPhiTrucTuyen != null)
            YeuCauNopPhiTrucTuyen = (bool)yeuCauNopPhiTrucTuyen;
        if (donViTiepNhanRieng != null)
            DonViTiepNhanRieng = donViTiepNhanRieng;
        if (!string.IsNullOrEmpty(eForm))
            EForm = eForm;
        if (!string.IsNullOrEmpty(eFormKetQua))
            EFormKetQua = eFormKetQua;
        if (!string.IsNullOrEmpty(eFormTemplate))
            EFormTemplate = eFormTemplate;
        if (!string.IsNullOrEmpty(nodeQuyTrinh))
            NodeQuyTrinh = nodeQuyTrinh;
        if (!string.IsNullOrEmpty(edgeQuyTrinh))
            EdgeQuyTrinh = edgeQuyTrinh;
        if (!string.IsNullOrEmpty(maSoBieuMau))
            MaSoBieuMau = maSoBieuMau;
        if (batBuocKySoKetQua != null)
            BatBuocKySoKetQua = batBuocKySoKetQua;
        if (batBuocDungDiaBan != null)
            BatBuocDungDiaBan = batBuocDungDiaBan;
        if (anThongTinLienHeNopTrucTuyen != null)
            AnThongTinLienHeNopTrucTuyen = (bool)anThongTinLienHeNopTrucTuyen;
        if (choChuyenPhiDiaGioi != null)
            ChoChuyenPhiDiaGioi = (bool)choChuyenPhiDiaGioi;
        if (khongThuBanGiay != null)
            KhongThuBanGiay = (bool)khongThuBanGiay;
        if (choPhepNopUyQuyen != null)
            ChoPhepNopUyQuyen = (bool)choPhepNopUyQuyen;

        NoteNgayLamViec = noteNgayLamViec;
        NoteTraKetQua = noteTraKetQua;
        return this;
    }
    public TruongHopThuTuc SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public TruongHopThuTuc Restore()
    {
        DeletedOn = null;
        return this;
    }

    public TruongHopThuTuc SetLoaiBaoTroXaHoi(string? loaiBaoTroXaHoi)
    {
        LoaiBaoTroXaHoi = loaiBaoTroXaHoi;
        return this;
    }
    public TruongHopThuTuc SetLoaiDuLieuKetNoi(string? loaiDuLieuKetNoi)
    {
        LoaiDuLieuKetNoi = loaiDuLieuKetNoi;
        return this;
    }
    public TruongHopThuTuc SetKhongNopTrucTuyen(bool? khongNopTrucTuyen)
    {
        KhongNopTrucTuyen = khongNopTrucTuyen;
        return this;
    }
    public static class LoaiDuLieuKetNoiBuoc
    {
        public const string LienThongThueILIS = "LienThongThueILIS";
    }
    public static class TrangThaiChiTiet
    {
        public const string ChoPheDuyet = "1";
        public const string ChoPhanCong = "2";
        public const string ThuLyHoSo = "3";
        public const string TraLai = "4";

    }
}

public static class TruongHopThuTuc_LoaiBaoTroXaHoi
{
    public const string HoTroMaiTangPhi = "HoTroMaiTangPhi";
    public const string ThoiHuongTroCapXaHoi = "ThoiHuongTroCapXaHoi";
    public const string ChiTraTroCapHangThang = "ChiTraTroCapHangThang";
    public const string TroGiupXaHoiKhanCapMaiTang = "TroGiupXaHoiKhanCapMaiTang";
}
public static class TruongHopThuTuc_LoaiDuLieuKetNoi
{
    public const string DoiGPLXOto = "DoiGPLXOto";
    public const string DoiGPLXXeMay = "DoiGPLXXeMay";

}