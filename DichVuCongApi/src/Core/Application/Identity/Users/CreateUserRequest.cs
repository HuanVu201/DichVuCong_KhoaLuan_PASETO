namespace TD.DichVuCongApi.Application.Identity.Users;

public class CreateUserRequest
{
    public string? FullName { get; set; }
    public string? HoVaTen { get; set; }
    public string? TypeUser { get; set; } 
    public string? Email { get; set; } = default!;
    public string UserName { get; set; } = default!;
    public string Password { get; set; } = default!;
    public string ConfirmPassword { get; set; } = default!;
    public string? PhoneNumber { get; set; }
    public string? GroupCode { get; set; }
    public string? OfficeCode { get; set; }
    public string? OfficeName { get; set; }
    public string? PositionCode { get; set; }
    public string? PositionName { get; set; }
    public int? UserOrder { get; set; }
    public string? Type { get; set; }
    public bool? IsActive { get; set; }
    public string? Gender { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? SoCMND { get; set; }
    public string? GioiTinh { get; set; }
    public string? DanToc { get; set; }
    public string? TonGiao { get; set; }
    public string? TinhTrangHonNhan { get; set; }
    public string? NhomMau { get; set; }
    public string? NamSinh { get; set; }
    public string? NgayThangNamSinh { get; set; }
    public string? QuocTich { get; set; }
    public string? NoiDangKyKhaiSinh { get; set; }
    public string? QueQuan { get; set; }
    public string? ThuongTru { get; set; }
    public string? NoiOHienTai { get; set; }
    public string? Cha { get; set; }
    public string? Me { get; set; }
    public string? VoChong { get; set; }
    public string? NguoiDaiDien { get; set; }
    public string? ChuHo { get; set; }
    public string? SoSoHoKhau { get; set; }
    public string? ChucDanh { get; set; }
    public bool? LaCanBoTiepNhan { get; set; }   
}
public class CreateUserWithDefaultPasswordRequest
{
    public string? FirstName { get; set; }
    public string FullName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; } = default!;
    public string UserName { get; set; } = default!;
    public string? Password { get; set; } = default!;
    public string? ConfirmPassword { get; set; } = default!;
    public string? PhoneNumber { get; set; }
    public string GroupCode { get; set; }
    public string? GroupName { get; set; }
    public string? OfficeCode { get; set; }
    public string? PositionCode { get; set; }
    public string? OfficeName { get; set; }
    public string? MaDinhDanhOfficeCode { get; set; }
    public string? PositionName { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? ChucDanh { get; set; }
    public bool? LaCanBoTiepNhan { get; set; }
    public int? UserOrder { get; set; }
    public string? TypeUser { get; set; }
    public bool? IsActive { get; set; }
    public string? Gender { get; set; }

}