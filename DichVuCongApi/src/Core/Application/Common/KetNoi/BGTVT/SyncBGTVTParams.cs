namespace TD.DichVuCongApi.Application.Common.KetNoi.BGTVT;
public class HoSoBGTVTResponsePagination
{
    public int total { get; set; }
    public List<HoSoBGTVTResponse> data { get; set; }
}

public class HoSoBGTVTResponse
{
    public string MaHoSo { get; set; }
    public string MaTTHC { get; set; }
    public string TenTTHC { get; set; }
    public string TenLinhVuc { get; set; }
    public string TrichYeuHoSo { get; set; }
    public string KenhThucHien { get; set; }
    public string DonViXuLy { get; set; }
    public string MaDoiTuong { get; set; }
    public string ChuHoSo { get; set; }
    public string SoDienThoai { get; set; }
    public string Email { get; set; }
    public string DiaChi { get; set; }
    public string MaTinh { get; set; }
    public string TenTinh { get; set; }
    public string MaHuyen { get; set; }
    public string TenHuyen { get; set; }
    public string MaXa { get; set; }
    public string TenXa { get; set; }
    public string NgayGuiHoSo { get; set; }
    public string NgayTiepNhan { get; set; }
    public string NgayHenTra { get; set; }
    public string NgayKetThucXuLy { get; set; }
    public string NgayTra { get; set; }
    public string TrangThaiHoSo { get; set; }
    public string TenTrangThaiHoSo { get; set; }
    public string NguoiNop { get; set; }
    public string MaNguoiNop { get; set; }
    public string DienThoaiNguoiNop { get; set; }
    public string EmaiNguoiNop { get; set; }
    public string NgayHuyHoSo { get; set; }
    public string MaDonViXuLy { get; set; }
}
