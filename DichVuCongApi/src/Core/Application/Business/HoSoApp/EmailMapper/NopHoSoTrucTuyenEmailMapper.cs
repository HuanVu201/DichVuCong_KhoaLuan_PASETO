using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.EmailMapper;
public class NopHoSoTrucTuyenEmailMapper : HoSo
{
    public string TenDonVi { get; set; }
    public string TenTTHC { get; set; }
    public string NgayHenTraEmail { get; set; }
    public string HoTenNguoiNop { get; set; }
    public string NgayNopHoSoString { get; set; }
    public string LinkDangKy { get; set; }
    public string SoDienThoaiHoTro { get; set; }
}
