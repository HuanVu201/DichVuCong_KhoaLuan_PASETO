using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.EmailMapper;
public class QuaTrinhTraoDoiCongDanCreatedEmailMapper : QuaTrinhTraoDoiCongDan
{
    public string NoiDungTraoDoi { get; set; }
    public string TenNguoiXuLy { get; set; }
    public string HoVaTen { get; set; }
    public string TenDonVi { get; set; }
    public string TrichYeuHoSo { get; set; }
    public bool? Email { get; set; }
    public bool? SMS { get; set; }
    public bool? Zalo { get; set; }
    public HoSo HoSo { get; set; }
    public string MaHoSo { get; set; }
}
