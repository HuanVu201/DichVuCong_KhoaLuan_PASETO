namespace TD.DichVuCongApi.Application.Common.KetNoi.BGTVT;
public class GPLXParams
{
    public string? MaHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? SoDienThoai { get; set; }
    public string? GioiTinh { get; set; }
    public string? NgaySinh { get; set; }
    public string? QuocTich { get; set; }
    public string? CMND { get; set; }
    public string? NgayCap { get; set; }
    public string? NoiCap { get; set; }
    public string? CMNDCu { get; set; }
    public string? DiaChiThuongTru { get; set; }
    public string? DiaChiCuTru { get; set; }

    public string ThuTuc { get; set; }
    public string NguoiNhan { get; set; }
    public string? NgayTiepNhan { get; set; }
    public string? NgayHenTra { get; set; }
    public string? NgayTraKetQua { get; set; }
    public string? NgayTraCongDan { get; set; }
    public string? TrangThai { get; set; }

    public string? SoGPLX { get; set; }
    public string? DonViCapGPLX { get; set; }
    public string? HangGPLX { get; set; }
    public string? NgayCapGPLX { get; set; }
    public string? NoiCapGPLX { get; set; }
    public string? KenhThucHien { get; set; }
    public string? LoaiDuLieuKetNoi { get; set; }
}

public class DataGPLXInput
{
    public string session { get; set; }
    public string service { get; set; }
    public string donViXuLy { get; set; }
    public string ngayNhan1 { get; set; }
    public string ngayNhan2 { get; set; }
}

public class HoSoGPLX
{
    public string maDangKyCu { get; set; }
    public string maDangKyDvc { get; set; }
    public string maHoSo { get; set; }
    public string hoTen { get; set; }
    public string hoTenIn { get; set; }
    public string hoDem { get; set; }
    public string ten { get; set; }
    public string gioiTinh { get; set; }
    public string ngaySinh { get; set; }
    public string quocTich { get; set; }
    public string soCmndCu { get; set; }
    public string soCmnd { get; set; }
    public string noiCapCmnd { get; set; }
    public string ngayCapCmnd { get; set; }
    public string noiCuTru { get; set; }
    public string dvhcNoiCuTru { get; set; }
    public string noiThuongTru { get; set; }
    public string dvhcNoiThuongTru { get; set; }
    public string anhChanDung { get; set; }
    public string maDonVi { get; set; }
    public string ngayNhanHoSo { get; set; }
    public string nguoiNhanHoSo { get; set; }
    public string ngayHenTraGplx { get; set; }
    public string loaiHoSo { get; set; }
    public string noiHocLaiXe { get; set; }
    public string namHocLaiXe { get; set; }
    public string hangDaoTao { get; set; }
    public string soNamLaiXe { get; set; }
    public string soKmLxAnToan { get; set; }
    public string lyDoDoiGplx { get; set; }
    public string mucDichDoiGplx { get; set; }
    public string maDonViVpdk { get; set; }
    public List<GplxDaCap> gplxDaCap { get; set; }
    public List<HoSoDinhKem> hoSoDinhKem { get; set; }
}

public class GplxDaCap
{
    public string sogplx { get; set; }
    public string soserigplx { get; set; }
    public string noicapgplx { get; set; }
    public string ngaycapgplx { get; set; }
    public string ngayhethangplx { get; set; }
    public string hanggplxgplx { get; set; }
    public string ngaytrungtuyen { get; set; }
}

public class HoSoDinhKem
{
    public string magiayto { get; set; }
    public string tengiayto { get; set; }
    public string filedinhkem { get; set; }
}

public class DataGPLX
{
    public List<HoSoGPLX> data { get; set; }
    public string error_code { get; set; }
}

public class DataGPLXChiTietInput
{
    public string session { get; set; }
    public string service { get; set; }
    public string donViXuLy { get; set; }
    public string mahoso { get; set; }
}

public class HoSoGPLXChiTiet
{
    public string MaTTHC { get; set; }
    public string MaDVC { get; set; }
    public string TenDVC { get; set; }
    public string MaHoSo { get; set; }
    public string HoTenNguoiNop { get; set; }
    public string MaTrangThai { get; set; }
    public string TrangThaiHoSo { get; set; }
    public string DonViXuLy { get; set; }
    public string MaDonViXuLy { get; set; }
    public string NgayNop { get; set; }
    public string NgayTiepNhan { get; set; }
    public string NgayHenTra { get; set; }
    public string HinhThucNhanKQ { get; set; }
}

public class DataGPLXChiTiet
{
    public List<HoSoGPLXChiTiet> data { get; set; }
    public string error_code { get; set; }
}

public class DataLogin
{
    public string error_code { get; set; }
    public string result { get; set; }
    public string session { get; set; }
}

public class DataLoginInput
{
    public string username { get; set; }
    public string password { get; set; }
}

public class LayTaiLieuInput
{
    public string session { get; set; }
    public string service { get; set; }
    public string donViXuLy { get; set; }
    public string duongdanteptin { get; set; }
}

public class TepTinDinhKemData
{
    public string error_code { get; set; }
    public List<TepTinDinhKem> TepTinDinhKem { get; set; }
}

public class TepTinDinhKem
{
    public string Base64 { get; set; }
    public string DuongDan { get; set; }
    public string TenTaiLieu { get; set; }
}