namespace TD.DichVuCongApi.Application.Identity.Users;

public class UserDetailsDto
{


    public Guid Id { get; set; }
    public string? FullName { get; set; }
    public string? UserName { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public bool IsActive { get; set; } = true;

    public bool EmailConfirmed { get; set; }

    public string? PhoneNumber { get; set; }

    public string? ImageUrl { get; set; }
    public string? GroupCode { get; set; }
    public string? GroupName { get; set; }

    public string? OfficeCode { get; set; }
    public string? OfficeName { get; set; }
    public string? PositionCode { get; set; }
    public string? PositionName { get; set; }
    public int? UserOrder { get; set; }
    public string? TypeUser { get; set; }
    public bool ? LaCanBoTiepNhan { get; set; }

    public string? SoCMND { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? NgayThangNamSinh { get; set; }
    public string? NamSinh { get; set; }

    public string? GioiTinh { get; set; }
    public string? NoiDangKyKhaiSinh { get; set; }
    public string? QueQuan { get; set; }
    public string? ThuongTru { get; set; }
    public bool? TaiKhoanHeThongQLVB { get; set; }
    public string? MaDinhDanhOfficeCode { get; set; }
    public string? ChucDanh { get; set; }
    public string? TaiKhoanQLVB { get; set; }
    public Guid? CreatedBy { get; set; }
    public DateTime? CreatedOn { get; private set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModifiedOn { get; set; }

    public string? IdTokenDVCQG { get; set; }
    public string? AccessTokenDVCQG { get; set; }
    public bool? CongDanDinhDanh { get; set; }
}
public class UserDto
{


    public Guid Id { get; set; }
    public string? FullName { get; set; }
    public string? UserName { get; set; }


    public string? Email { get; set; }


    public bool EmailConfirmed { get; set; }

    public string? PhoneNumber { get; set; }

    public string? GroupCode { get; set; }
    public string? GroupName { get; set; }

    public string? OfficeCode { get; set; }
    public string? OfficeName { get; set; }
    public string? PositionCode { get; set; }
    public string? PositionName { get; set; }
    public int? UserOrder { get; set; }
    public string? TypeUser { get; set; }
    public bool? LaCanBoTiepNhan { get; set; }

    public string? SoCMND { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? NgayThangNamSinh { get; set; }
    public string? NamSinh { get; set; }

    public string? TaiKhoanQLVB { get; set; }
    public string? GioiTinh { get; set; }
    public string? NoiDangKyKhaiSinh { get; set; }
    public string? QueQuan { get; set; }
    public string? ThuongTru { get; set; }
    public bool? TaiKhoanHeThongQLVB { get; set; }
    public string? MaDinhDanhOfficeCode { get; set; }
    public string? ChucDanh { get; set; }
    public Guid? CreatedBy { get; set; }
    public DateTime? CreatedOn { get; private set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModifiedOn { get; set; }
    public bool? CongDanDinhDanh { get; set; }
    public string? ImageUrl { get; set; }

}