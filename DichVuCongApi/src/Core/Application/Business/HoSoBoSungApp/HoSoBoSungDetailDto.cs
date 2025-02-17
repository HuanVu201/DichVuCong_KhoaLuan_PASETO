namespace TD.DichVuCongApi.Application.Business.HoSoBoSungApp;
public class HoSoBoSungDetailDto : IDto
{
    public string MaHoSo { get; private set; }
    public string? NoiDungBoSung { get; private set; }
    public string? DinhKemNoiDungBoSung { get; private set; }
    public DateTime? NgayBoSung { get; private set; }
    public string? NguoiYeuCauBoSung { get; private set; }
    public DateTime? NgayHenTraTruoc { get; private set; }
    public string? TrangThaiBoSung { get; private set; }
    public string? ThanhPhanBoSung { get; private set; }

}
