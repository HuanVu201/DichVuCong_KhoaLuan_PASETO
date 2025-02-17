
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class GetCSDLDanCuQuery : IQuery<UserCSDLResponse>
{
    public string? HoVaTen { get; set;  }
    public string? Nam { get; set;  }
    public string? NgayThangNam { get; set; }
    public string? SoDinhDanh { get; set;  }
    public string? SoCMND { get; set; }
    public string? MaHoSo { get; set; }
    public bool? UpdateEntity { get; set; } = false;
    [JsonIgnore]
    public string? Url { get; set; }
    [JsonIgnore]
    public string? MaDVC { get; set; }
    [JsonIgnore]
    public string? MaTichHop { get; set; }
    [JsonIgnore]
    public string? MaCanBo { get; set; }
    [JsonIgnore]
    public string? MaYeuCau { get; set; }
    public string? OTP { get; set; }
}

public class UserCSDLResponse
{
    public string? FullName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? HoVaTen { get; set; }
    public string? GroupCode { get; set; }
    public string? GroupName { get; set; }
    public string? PositionCode { get; set; }
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
}