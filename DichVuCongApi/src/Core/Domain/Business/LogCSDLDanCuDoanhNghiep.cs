using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;

namespace TD.DichVuCongApi.Domain.Business;
public class LogCSDLDanCuDoanhNghiep : BaseEntity<Guid>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? TaiKhoan { get; set; }
    public DateTime? ThoiGian { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViId { get; set; }
    [MaxLength(500)]
    public string? Input { get; set; }
    [MaxLength(50)]
    public string? Loai { get; set; }

    public LogCSDLDanCuDoanhNghiep(string? taiKhoan, DateTime? thoiGian, string? donViId, string? input, string? loai)
    {
        TaiKhoan = taiKhoan;
        ThoiGian = thoiGian;
        DonViId = donViId;
        Input = input;
        Loai = loai;
    }
}
