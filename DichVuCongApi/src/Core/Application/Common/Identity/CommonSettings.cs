namespace TD.DichVuCongApi.Application.Common.Identity;
public class CommonSettings
{
    public XuLyHoSoSettings? XuLyHoSo { get; set; }
    public string? DefaultPassword { get; set; }
    public string? DeleteSecurityCode { get; set; }
    public string? QuerySecurityCode { get; set; }
    public string? ProvinceCode { get; set; }
    public string? PrefixStatisticTableName { get; set; }
    public string? DanhSachHoSoThongKeTableName { get; set; }
}

public class XuLyHoSoSettings
{
    public List<string>? MaTTHCKhongThuPhi { get; set; }
}