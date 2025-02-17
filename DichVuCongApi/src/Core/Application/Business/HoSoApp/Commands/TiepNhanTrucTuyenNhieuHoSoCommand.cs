using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class TiepNhanTrucTuyenNhieuHoSoCommand : ICommand<Dictionary<string, string>>
{
    public List<DefaultIdType> Ids { get; set; }
    public int? ThoiHanBuocXuLy { get; set; }
    public string? TinhThanhDiaBan { get; set; }
    public string? QuanHuyenDiaBan { get; set; }
    public string? XaPhuongDiaBan { get; set; }
    public string? TenDiaBan { get; set; }
    public string? LoaiThoiHanBuocXuLy { get; set; }
    public string? NodeQuyTrinh { get; set; }
    public string? TenBuocHienTai { get; set; }
    public string? BuocHienTai { get; set; }
    public string? BuocXuLyTiep { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? LoaiDoiTuong { get; set; }
    public string? NgaySinhChuHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? NguoiXuLyTiep { get; set; }
    public bool? ChuyenSoHoa { get; set; } = false;
    public List<ThanhPhanHoSoUpdate>? ThanhPhanHoSos { get; set; }
}
