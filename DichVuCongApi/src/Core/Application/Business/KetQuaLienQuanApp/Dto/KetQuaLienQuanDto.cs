using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.KetQuaLienQuanApp.Dto;
public class KetQuaLienQuanDto : IDto
{
    public Guid Id { get; set; }
    public string? LoaiKetQua { get; set; }
    public string? SoKyHieu { get; set; }
    public string? TrichYeu { get; set; }
    public Guid? CreatedBy { get; set; }
    public DateTime? NgayKy { get; set; }
    public string NguoiKy { get; set; }
    public string CoQuanBanHanh { get; set; }
    public DateTime? NgayCoHieuLuc { get; set; }
    public DateTime? NgayHetHieuLuc { get; set; }
    public string? DinhKem { get; set; }
    
    [JsonIgnore]
    public int TotalCount { get; set; }
}
