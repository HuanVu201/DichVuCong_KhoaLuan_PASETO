using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class NhacViecQuery : IQuery<object>
{
    public List<string> Menus { get; set; }
}

public class NhacViecDto : IDto
{
    public int MoiDangKy { get; set; }
    public int DuocTiepNhan { get; set; }
    public int KhongDuocTiepNhan { get; set; }
    public int DangXuLy { get; set; }
    public int HoSoToiHan { get; set; }
    public int HoSoTiepNhanToiHan { get; set; }
    public int HoSoTiepNhanQuaHan { get; set; }
    public int HoSoQuaHan { get; set; }
    public int ChoMotCuaBoSung { get; set; }
    public int ChoCongDanBoSung { get; set; }
    public int DaGuiBoSung { get; set; }
    public int HoanThanhBoSung { get; set; }
    public int YeuCauThucHienNghiaVuTaiChinh { get; set; }
    public int DaChuyenXuLy { get; set; }
    public int CongDanYeuCauRutHoSo { get; set; }
    public int DungXuLy { get; set; }
    public int DaChuyenXuLyCoKetQua { get; set; }
    public int TongXuLy { get; set; }
    public int ChoTraBCCI { get; set; }
    public int ChoTraKetQua { get; set; }
    public int ChoXacNhanTraKq { get; set; }
    public int DuThaoXinLoiChoThongQua { get; set; }
    public int DuThaoTraLaiXinRutChoThongQua { get; set; }
    public int DuThaoBoSungChoThongQua { get; set; }
}
