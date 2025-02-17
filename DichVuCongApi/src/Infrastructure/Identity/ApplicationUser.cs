using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TD.DichVuCongApi.Infrastructure.Identity;

public class ApplicationUser : IdentityUser
{
    [MaxLength(150)]
    public string? FullName { get; set; }
    [MaxLength(1000)]
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; }
    [MaxLength(150)]
    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? TypeUser { get; set; }
    public string? ObjectId { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? GroupCode { get; set; }
    [MaxLength(250)]
    public string? GroupName { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? OfficeCode { get; set; }
    [MaxLength(150)]
    public string? OfficeName { get; set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? PositionCode { get; set; }
    [MaxLength(150)]
    public string? PositionName { get; set; }
    public int UserOrder { get; set; }
    public bool? IsSystemAccount { get; set; }
    [MaxLength(35)]
    [Column(TypeName = "varchar")]
    public string? SoDinhDanh { get; set; }
    [MaxLength(16)]
    [Column(TypeName = "varchar")]
    public string? SoCMND { get; set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? GioiTinh { get; set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? DanToc { get; set; }
    [MaxLength(12)]
    [Column(TypeName = "varchar")]
    public string? TonGiao { get; set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? TinhTrangHonNhan { get; set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? NhomMau { get; set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? NamSinh { get; set; }
    [MaxLength(80)]
    [Column(TypeName = "varchar")]
    public string? NgayThangNamSinh { get; set; }
    [MaxLength(10)]
    [Column(TypeName = "varchar")]
    public string? QuocTich { get; set; }
    [MaxLength(750)]
    public string? NoiDangKyKhaiSinh { get; set; }
    [MaxLength(750)]
    public string? QueQuan { get; set; }
    [MaxLength(750)]
    public string? ThuongTru { get; set; }
    [MaxLength(750)]
    public string? NoiOHienTai { get; set; }
    [MaxLength(300)]
    public string? Cha { get; set; }
    [MaxLength(300)]
    public string? Me { get; set; }
    [MaxLength(300)]
    public string? VoChong { get; set; }
    [MaxLength(300)]
    public string? NguoiDaiDien { get; set; }
    [MaxLength(300)]
    public string? ChuHo { get; set; }
    [MaxLength(300)]
    public string? HoVaTen { get; set; }
    public bool? LaCanBoTiepNhan { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? SoSoHoKhau { get; set; }
    public string? UserInfoDVCQG { get; set; }
    public string? IdTokenDVCQG { get; set; }
    [MaxLength(2000)]
    [Column(TypeName = "varchar")]
    public string? AccessTokenDVCQG { get; set; }

    public bool? TaiKhoanHeThongQLVB { get; set; } = false;

    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaDinhDanhOfficeCode { get; set; }
    [MaxLength(250)]
    public string? ChucDanh { get; set; }
    [MaxLength(250)]
    public string? TaiKhoanQLVB { get; set; }
    public bool? DaXacThucCSDLDC { get; set; }
    public Guid? CreatedBy { get; set; }
    public DateTime? CreatedOn { get; private set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModifiedOn { get; set; }
    public DateTime? DeletedOn { get; set; }
    public Guid? DeletedBy { get; set; }
    public bool? CongDanDinhDanh { get; set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? OtpCSDLDC { get; set; }
    public ApplicationUser()
    {
        CreatedOn = DateTime.Now;
        LastModifiedOn = DateTime.Now;
    }
    public static class ApplicationUserType
    {
        public const string Admin = nameof(Admin);
        public const string CanBo = nameof(CanBo);
        public const string CongDan = nameof(CongDan);
    }
}