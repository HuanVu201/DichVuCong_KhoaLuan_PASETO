namespace TD.DichVuCongApi.Application.Identity.Users;

public class UpdateUserRequest
{
    public string? Id { get; set; } = default!;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? HoVaTen { get; set; }
    public string? FullName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? ChucDanh { get; set; }
    public string? Email { get; set; }
    public FileUploadRequest? Image { get; set; }
    public bool DeleteCurrentImage { get; set; } = false;
    public string? GroupCode { get; set; }
    public bool ActivateUser { get; set; } =true;
    public string? OfficeCode { get; set; }
    public string? OfficeName { get; set; }
    public string? PositionCode { get; set; }
    public string? PositionName { get; set; }
    public int? UserOrder { get; set; }
    public string? Type { get; set; }
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
    public string? TaiKhoanQLVB { get; set; }
    public string? SoSoHoKhau { get; set; }
    public bool? LaCanBoTiepNhan { get; set; }
    public string? ImageUrl { get; set; }
}
