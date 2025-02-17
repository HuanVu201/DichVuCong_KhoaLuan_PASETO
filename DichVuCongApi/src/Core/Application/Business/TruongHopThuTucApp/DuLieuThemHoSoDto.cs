using TD.DichVuCongApi.Application.Business.PhiLePhiApp;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp.Queries;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp;
public class DuLieuThemHoSoDto : IDto
{
    public DuLieuThemHoSoDto()
    {
        PhiLePhis = new List<PhiLePhiDto>();
        ThanhPhanThuTucs = new List<GetDuLieuThemHoSo_ThanhPhanThuTucDto>();
        KetQuaThuTucs = new List<DuLieuThemHoSo_KetQuaThuTuc_Select>();
    }
    public DateTime? NgayHenTra { get; set; }
    public DateTime NgayTiepNhan { get; set; }
    public string TenTTHC { get; set; }
    public bool LaThuTucChungThuc { get; set; }
    public bool TrangThaiPhiLePhi { get; set; }
    public string MucDo { get; set; }
    public string TenDonVi { get; set; }
    public string? DiaChiNhanKetQuaTrucTiep { get; set; }
    public string MaTTHC { get; set; }
    public string? TinhThanhDiaBan { get; set; }
    public string? QuanHuyenDiaBan { get; set; }
    public string? XaPhuongDiaBan { get; set; }
    public Guid Id { get; set; }
    public TruongHopThuTucDetail TruongHopthuTuc { get; set; }
    public List<PhiLePhiDto> PhiLePhis { get; set; }
    public List<GetDuLieuThemHoSo_ThanhPhanThuTucDto> ThanhPhanThuTucs { get; set; }
    public List<DuLieuThemHoSo_KetQuaThuTuc_Select> KetQuaThuTucs { get; set; }
    public UserInfoPortal? TaiKhoan { get; set; }
    public string? UrlVideoTutorial { get; set; }
}

public class UserInfoPortal
{
    public string ID { get; set; }
    public string SoDinhDanh { get; set; }
    public string HoVaTen { get; set; }
    public string FullName { get; set; }
    public string Cha { get; set; }
    public string Me { get; set; }
    public string DanToc { get; set; }
    public string GioiTinh { get; set; }
    public string NguoiDaiDien { get; set; }
    public string NgayThangNamSinh { get; set; }
    public string ChuHo { get; set; }
    public string QueQuan { get; set; }
    public string NoiDangKyKhaiSinh { get; set; }
    public string NoiOHienTai { get; set; }
    public string ThuongTru { get; set; }
    public string TinhTrangHonNhan { get; set; }
    public string TonGiao { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string VoChong { get; set; }

}