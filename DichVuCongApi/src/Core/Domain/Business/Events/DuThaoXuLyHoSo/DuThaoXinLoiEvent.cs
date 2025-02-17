namespace TD.DichVuCongApi.Domain.Business.Events.DuThaoXuLyHoSo;
public class DuThaoXinLoiEvent : DomainEvent
{
    public DateTime? NgayHenTraCu { get; set; }
    public DateTime NgayHenTraMoi { get; set; }
    public string TenDonVi { get; set; }
    public DateTime? NgayTiepNhan { get; set; }
    public string TenThuTuc { get; set; }
    public string MaHoSo { get; set; }
    public string DinhKemYKienNguoiChuyenXuLy { get; set; }
    public Business.HoSo HoSo { get; set; }
    public DuThaoXinLoiEvent(Business.HoSo hoSo, DateTime? ngayHenTraCu, DateTime ngayHenTraMoi, string tenDonVi, DateTime? ngayTiepNhan, string tenThuTuc, string maHoSo, string dinhKemYKienNguoiChuyenXuLy)
    {
        NgayHenTraCu = ngayHenTraCu;
        HoSo = hoSo;
        NgayHenTraMoi = ngayHenTraMoi;
        TenDonVi = tenDonVi;
        NgayTiepNhan = ngayTiepNhan;
        TenThuTuc = tenThuTuc;
        MaHoSo = maHoSo;
        DinhKemYKienNguoiChuyenXuLy = dinhKemYKienNguoiChuyenXuLy;
    }
}
