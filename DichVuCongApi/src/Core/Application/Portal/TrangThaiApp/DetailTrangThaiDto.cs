using TD.DichVuCongApi.Application.Portal.TinBaiApp;

namespace TD.DichVuCongApi.Application.Portal.TrangThaiApp;
public class DetailTrangThaiDto : IDto
{
    public string TenTrangThai { get; set; }
    public int ThuTu { get; set; }
    public List<TinBaiDto> TinBais { get; set; }
}
