using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Dtos;
public class HoSoNhapDto
{
    public DefaultIdType Id { get; set; }
    public string ChuHoSo { get; set; }
    public string SoDienThoaiChuHoSo { get; set; }
    public string EmailChuHoSo { get; set; }
    public string TrichYeuHoSo { get; set; }
    public bool UyQuyen { get; set; }
    public string SoGiayToChuHoSo { get; set; }
    public string CreatedOn { get; set; }
    public string TenDonVi { get; set; }
    public string MaTruongHop { get; set; }
    public string MaTTHC { get; set; }
    public string DonViId { get; set; }
    public string? DangKyNhanHoSoQuaBCCIData { get; set; }
    public DateTime? NgayTao { get; set; }
  
    [JsonIgnore]
    public int TotalCount { get; set; }
}

public class CountHoSoNhapDto
{
    public int SoLuongHoSoNhap { get; set; }

}
