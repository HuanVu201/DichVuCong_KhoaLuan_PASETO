namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class NopHoSoTrucTuyenEvent : HoSoEvent
{
    public string NgayHenTraEmail { get; set; }
    public string TenDonVi { get; set; }
    public string HoTenNguoiNop { get; set; }
    public string NgayNopHoSo { get; set; }
    public string TenTTHC { get; set; }
    public string IdCongDan { get; set; }
    public string? GroupCode { get; set; }
    

    public NopHoSoTrucTuyenEvent(Business.HoSo hoSo, string tenDonVi, string tenTTHC) : base(hoSo)
    {
        NgayHenTraEmail = hoSo.NgayHenTra.HasValue && hoSo.NgayHenTra.Value != default ? HoSoEventUtils.GetFormatedNgayThangNam(hoSo.NgayHenTra) : "";
        TenDonVi = tenDonVi;
        TenTTHC = tenTTHC;
        HoTenNguoiNop = hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo;
        IdCongDan = hoSo.UyQuyen == true ? hoSo.SoGiayToNguoiUyQuyen : hoSo.SoGiayToChuHoSo;
        NgayNopHoSo = HoSoEventUtils.GetFormatedNgayThangNam(hoSo.NgayNopHoSo);
    }
}
