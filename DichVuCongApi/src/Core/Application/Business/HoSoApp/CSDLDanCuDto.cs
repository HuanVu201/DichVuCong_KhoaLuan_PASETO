using System;

namespace TD.DichVuCongApi.Application.Business.HoSoApp;

public class CSDLDanCuDto : IDto
{
    public string SoDinhDanh { get; set; }
    public string LoaiTaiKhoan { get; set; }
    public string SoCMND { get; set; }
    public string MaSoThue { get; set; }
    public HoVaTen HoVaTen { get; set; }
    public string GioiTinh { get; set; }
    public string ThuDienTu { get; set; }
    public string DanToc { get; set; }
    public string TonGiao { get; set; }
    public string TinhTrangHonNhan { get; set; }
    public string NhomMau { get; set; }
    public NgayThangNamSinh NgayThangNamSinh { get; set; }
    public DiaChi NoiDangKyKhaiSinh { get; set; }
    public string QuocTich { get; set; }
    public DiaChi QueQuan { get; set; }
    public DiaChi ThuongTru { get; set; }
    public DiaChi NoiOHienTai { get; set; }
    public NguoiThan Cha { get; set; }
    public NguoiThan Me { get; set; }
    public NguoiThan VoChong { get; set; }
    public NguoiThan NguoiDaiDien { get; set; }
    public ChuHo ChuHo { get; set; }
    public string SoSoHoKhau { get; set; }
}
public class HoVaTen
{
    public string Ho { get; set; }
    public string ChuDem { get; set; }
    public string Ten { get; set; }
}

public class NgayThangNamSinh
{
    public string Nam { get; set; }
    public string NgayThangNam { get; set; }
}
public class DiaChi
{
    public string MaTinhThanh { get; set; }
    public string MaQuanHuyen { get; set; }
    public string MaPhuongXa { get; set; }
    public string TenTinhThanh { get; set; }
    public string TenQuanHuyen { get; set; }
    public string TenPhuongXa { get; set; }
    public string ChiTiet { get; set; }
    public string QuocGia { get; set; }
}

public class NguoiThan
{
    public string HoVaTen { get; set; }
    public string QuocTich { get; set; }
    public string SoDinhDanh { get; set; }
    public string SoCMND { get; set; }
}

public class ChuHo
{
    public string QuanHe { get; set; }
    public string SoDinhDanh { get; set; }
    public string SoCMND { get; set; }
    public string HoVaTen { get; set; }
}

public class CSDLDanCuJSONResponse
{
    public Envelope Envelope { get; set; }
}
public class Envelope
{
    public Body Body { get; set; }

}
public class Body
{
    public CongdanCollection CongdanCollection { get; set; }
}
public class CongdanCollection
{
    public CSDLDanCuDto CongDan { get; set; }
}