using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Catalog;
public class Group : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(36)]
    [Column(TypeName = "varchar")]
    public string GroupCode { get; private set; }
    [MaxLength(150)]
    public string GroupName { get; private set; }
    [MaxLength(36)]
    [Column(TypeName = "varchar")]
    public string? OfGroupCode { get; private set; }
    [MaxLength(150)]
    public string? OfGroupName { get; private set; }
    [MaxLength(36)]
    [Column(TypeName = "varchar")]
    public string? OfGroupId { get; private set; }
    public string? FullCode { get; private set; }

    public int? GroupOrder { get; private set; }
    [MaxLength(1000)]
    public string? DonViQuanLy { get; private set; }
    public bool? DonViQuanLyTraHoSo { get; private set; }
    public bool? YeuCauXacNhanCoKetQua { get; private set; }
    public bool? DonViQuanLyThuPhi { get; private set; }
    public bool? Active { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? Agent { get; private set; }
    [MaxLength(1000)]
    public string? Description { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string Type { get; private set; }
    [MaxLength(150)]
    public string? Catalog { get; private set; }
    [MaxLength(150)]
    public string? OtherCatalog { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? TaiKhoanThuHuong { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? MaNganHang { get; private set; }
    [MaxLength(150)]
    public string? TenTaiKhoanThuHuong { get; private set; }
    [MaxLength(20)]
    public string? MaDinhDanh { get; set; }
    [MaxLength(150)]
    public string? LoaiBienLaiThanhToan { get; set; }
    [MaxLength(2000)]
    public string? CauHinhBienLaiThanhToan { get; set; }
    [MaxLength(200)]
    [Column(TypeName = "varchar")]
    public string? MaNhomLienThong { get; private set; }
    [MaxLength(100)]
    public string? SoDienThoai { get; private set; }
    [MaxLength(1000)]
    public string? DiaChi { get; private set; }
    [MaxLength(200)]
    public string? ThoiGianLamViec { get; private set; }
    [MaxLength(200)]
    public string? Email { get; private set; }
    [MaxLength(1000)]
    public string? Website { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? MaTinh { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? MaHuyen { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? MaXa { get; private set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? MaDiaBan { get; private set; }
    public string? CauHinhBuuDien { get; private set; }
    public string? MauSoBienLai { get; private set; }
    public string? KyHieuBienLai { get; private set; }
    public string? SoBienLai { get; private set; }
    [MaxLength(200)]
    public string? MaSoThue { get; set; }
    public int SoHienTai { get; set; }
    public DateTime? NgayHienTai { get; set; }
    public bool? LayCauHinhBienLaiTheoDonViThu { get; set; }
    public bool? coThongKe { get; set; }
    public string? SmsConfig { get; set; }
    public string? Coordinates { get; set; }
    public string? LienThongTNMT { get; set; }
    public Group() { }

    public Group(string groupCode, string groupName, string? ofGroupCode, string? ofGroupName, string? ofGroupId, string? fullCode, int? groupOrder, string? donViQuanLy, bool? donViQuanLyTraHoSo, bool? yeuCauXacNhanCoKetQua, bool? donViQuanLyThuPhi,
        bool? active, string? agent, string? description, string type, string? catalog, string? taiKhoanThuHuong, string? maNganHang, string? tenTaiKhoanThuHuong, string? maDinhDanh, string? loaiBienLaiThanhToan, string? cauHinhBienLaiThanhToan, string? maNhomLienThong, string? otherCatalog, string? diaChi, string? soDienThoai,
        string? thoiGianLamViec, string? email, string? website)
    {
        GroupCode = groupCode;
        GroupName = groupName;
        OfGroupCode = ofGroupCode;
        OfGroupName = ofGroupName;
        OfGroupId = ofGroupId;
        FullCode = fullCode;
        GroupOrder = groupOrder;
        DonViQuanLy = donViQuanLy;
        DonViQuanLyTraHoSo = donViQuanLyTraHoSo;
        YeuCauXacNhanCoKetQua = yeuCauXacNhanCoKetQua;
        DonViQuanLyThuPhi = donViQuanLyThuPhi;
        Active = active;
        Agent = agent;
        Description = description;
        Type = type;
        Catalog = catalog;
        OtherCatalog = otherCatalog;
        TaiKhoanThuHuong = taiKhoanThuHuong;
        MaNganHang = maNganHang;
        TenTaiKhoanThuHuong = tenTaiKhoanThuHuong;
        MaDinhDanh = maDinhDanh;
        LoaiBienLaiThanhToan = loaiBienLaiThanhToan;
        CauHinhBienLaiThanhToan = cauHinhBienLaiThanhToan;
        MaNhomLienThong = maNhomLienThong;
        DiaChi = diaChi;
        SoDienThoai = soDienThoai;
        ThoiGianLamViec = thoiGianLamViec;
        Email = email;
        Website = website;

    }

    public static Group Create(string groupCode, string groupName, string? ofGroupCode, string? ofGroupName, string? ofGroupId,string? fullCode, int? groupOrder, string? donViQuanLy, bool? donViQuanLyTraHoSo, bool? yeuCauXacNhanCoKetQua, bool? donViQuanLyThuPhi,
        bool? active, string? agent, string? description, string type, string? catalog, string? taiKhoanThuHuong, string? maNganHang, string? tenTaiKhoanThuHuong, string? maDinhDanh, string? maNhomLienThong, string? loaiBienLaiThanhToan = null, string? cauHinhBienLaiThanhToan = null, string? otherCatalog = null, string? diaChi = null, string? soDienThoai = null, string? thoiGianLamViec = null
        , string? email = null, string? website = null)
    {
        return new(groupCode, groupName, ofGroupCode, ofGroupName, ofGroupId, fullCode, groupOrder, donViQuanLy, donViQuanLyTraHoSo, yeuCauXacNhanCoKetQua, donViQuanLyThuPhi, active, agent, description, type, catalog, taiKhoanThuHuong, maNganHang, tenTaiKhoanThuHuong, maDinhDanh, loaiBienLaiThanhToan, cauHinhBienLaiThanhToan, maNhomLienThong, otherCatalog, diaChi, soDienThoai, thoiGianLamViec, email, website);
    }

    public Group Update(string? groupCode, string? groupName, string? ofGroupCode, string? ofGroupName, string? ofGroupId, int? groupOrder, string? donViQuanLy, bool? donViQuanLyTraHoSo, bool? yeuCauXacNhanCoKetQua, bool? donViQuanLyThuPhi,
        bool? active, string? agent, string? description, string? type, string? catalog, string? taiKhoanThuHuong, string? maNganHang, string? tenTaiKhoanThuHuong, string? maDinhDanh, string? maNhomLienThong, string? coordinates, string? bienLaiThanhToan = null, string? cauHinhBienLaiThanhToan = null, string? otherCatalog = null, string? diaChi = null, string? soDienThoai = null, string? thoiGianLamViec = null,
        string? email = null, string? website = null, string? maTinh = null, string? maHuyen = null, string? maXa = null, string? maDiaBan = null, string? cauHinhBuuDien = null
        , string? mauSoBienLai = null, string? kyHieuBienLai = null, string? soBienLai = null, string? maSoThue = null, bool? cauHinhBienLaiTheoDonViThu = null, string? lienThongTNMT = null)
    {
        if (groupCode != null)
            GroupCode = groupCode != string.Empty ? groupCode : GroupCode;
        if (groupName != null)
            GroupName = groupName != string.Empty ? groupName : GroupName;
        if (!string.IsNullOrEmpty(ofGroupCode))
            OfGroupCode = ofGroupCode;
        if (!string.IsNullOrEmpty(ofGroupName))
            OfGroupName = ofGroupName;
        if (!string.IsNullOrEmpty(ofGroupId))
            OfGroupId = ofGroupId;
        if (maNhomLienThong != null)
            MaNhomLienThong = maNhomLienThong;
        if (groupOrder != null)
            GroupOrder = (int)groupOrder;
        if (donViQuanLy != null)
            DonViQuanLy = donViQuanLy;
        if (donViQuanLyTraHoSo != null)
            DonViQuanLyTraHoSo = (bool)donViQuanLyTraHoSo;
        if (yeuCauXacNhanCoKetQua != null)
            YeuCauXacNhanCoKetQua = (bool)yeuCauXacNhanCoKetQua;
        if (donViQuanLyThuPhi != null)
            DonViQuanLyThuPhi = (bool)donViQuanLyThuPhi;
        if (active != null)
            Active = (bool)active;
        if (!string.IsNullOrEmpty(agent))
            Agent = agent;
        if (!string.IsNullOrEmpty(description))
            Description = description;
        if (!string.IsNullOrEmpty(type))
            Type = type;
        if (catalog != null)
            Catalog = catalog;
        if (otherCatalog != null)
            OtherCatalog = otherCatalog;
        if (!string.IsNullOrEmpty(taiKhoanThuHuong))
            TaiKhoanThuHuong = taiKhoanThuHuong;
        if (!string.IsNullOrEmpty(maNganHang))
            MaNganHang = maNganHang;
        if (!string.IsNullOrEmpty(tenTaiKhoanThuHuong))
            TenTaiKhoanThuHuong = tenTaiKhoanThuHuong;
        if (!string.IsNullOrEmpty(maDinhDanh))
            MaDinhDanh = maDinhDanh;
        if (!string.IsNullOrEmpty(bienLaiThanhToan))
            LoaiBienLaiThanhToan = bienLaiThanhToan;
        if (!string.IsNullOrEmpty(cauHinhBienLaiThanhToan))
            CauHinhBienLaiThanhToan = cauHinhBienLaiThanhToan;
        if (diaChi != null) DiaChi = diaChi;
        if (soDienThoai != null) SoDienThoai = soDienThoai;
        if (thoiGianLamViec != null) ThoiGianLamViec = thoiGianLamViec;
        if (email != null) Email = email;
        if (website != null) Website = website;
        if (maTinh != null) MaTinh = maTinh;
        if (maHuyen != null) MaHuyen = maHuyen;
        if (maXa != null) MaXa = maXa;
        if (maDiaBan != null) MaDiaBan = maDiaBan;
        if (cauHinhBuuDien != null) CauHinhBuuDien = cauHinhBuuDien;
        if (kyHieuBienLai != null) KyHieuBienLai = kyHieuBienLai;
        if (mauSoBienLai != null) MauSoBienLai = mauSoBienLai;
        if (soBienLai != null) SoBienLai = soBienLai;
        if (maSoThue != null) MaSoThue = maSoThue;
        if (cauHinhBienLaiTheoDonViThu != null) LayCauHinhBienLaiTheoDonViThu = cauHinhBienLaiTheoDonViThu;
        if (!string.IsNullOrEmpty(coordinates))
            Coordinates = coordinates;
        if (lienThongTNMT != null) LienThongTNMT = lienThongTNMT;
        return this;
    }
    public Group SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public Group SetSmsConfig(string smsConfig)
    {
        SmsConfig = smsConfig;
        return this;
    }
    public Group Restore()
    {
        DeletedOn = null;
        return this;
    }
}

public class GroupContants
{
    public const string DON_VI = "don-vi";
    public const string QUAN_HUYEN = "quan-huyen";
    public const string XA_PHUONG = "xa-phuong";
    public const string SO_BAN_NGANH = "so-ban-nganh";
    public const string CNVPDK = "cnvpdk";
}
