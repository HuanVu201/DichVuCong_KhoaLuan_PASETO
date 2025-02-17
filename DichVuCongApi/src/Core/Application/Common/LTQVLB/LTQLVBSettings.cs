namespace TD.DichVuCongApi.Application.Common.LTQVLB;
public class LTQLVBSettings
{
    public string urlLienThongQLVB { get; set; }
    public string tokenLienThongQLVB { get; set; }
    public string authorizationSchema { get; set; }
    public string maDonViDongBo { get; set; }
    public string gioiHanSoLuongXuLy { get; set; }
    public double? gioiHanDungLuongUpload { get; set; }
    public List<string>? danhSachDonViUBTinh { get; set; }
    public bool? themMaHoSoVaoTrichYeu { get; set; }
}
