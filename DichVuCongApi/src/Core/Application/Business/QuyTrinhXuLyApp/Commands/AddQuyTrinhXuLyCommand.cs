using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Commands;
public class AddQuyTrinhXuLyCommand : ICommand
{
    public List<QuyTrinhParams> QuyTrinhs { get; set; }
}
public class QuyTrinhParams
{
    public QuyTrinhParams(DefaultIdType id, DefaultIdType truongHopId, string tenBuocXuLy, double thoiGianXuLy, string loaiThoiGian, string? loaiBuoc, string? tenNhomNguoiDung, string? tenTrangThaiHoSo, DefaultIdType? nhomNguoiDungId, string? maTrangThaiHoSo, bool? yeuCauCoKetQuaBuocTruoc, bool? choPhepChuyenLaiBuocTruoc, bool? guiLienThongQLVB, bool? guiEmail, string? bieuMauEmail, bool? guiSMS, string? bieuMauSMS, double? thoiGianThucHienTrucTuyen)
    {
        Id = id;
        TruongHopId = truongHopId;
        TenBuocXuLy = tenBuocXuLy;
        ThoiGianXuLy = thoiGianXuLy;
        LoaiThoiGian = loaiThoiGian;
        LoaiBuoc = loaiBuoc;
        TenNhomNguoiDung = tenNhomNguoiDung;
        TenTrangThaiHoSo = tenTrangThaiHoSo;
        NhomNguoiDungId = nhomNguoiDungId;
        MaTrangThaiHoSo = maTrangThaiHoSo;
        YeuCauCoKetQuaBuocTruoc = yeuCauCoKetQuaBuocTruoc;
        ChoPhepChuyenLaiBuocTruoc = choPhepChuyenLaiBuocTruoc;
        GuiLienThongQLVB = guiLienThongQLVB;
        GuiEmail = guiEmail;
        BieuMauEmail = bieuMauEmail;
        GuiSMS = guiSMS;
        BieuMauSMS = bieuMauSMS;
        ThoiGianThucHienTrucTuyen = thoiGianThucHienTrucTuyen;
    }

    public DefaultIdType Id { get; set; }
    public DefaultIdType TruongHopId { get; set; }
    public string TenBuocXuLy { get; set; }
    public double ThoiGianXuLy { get; set; }
    public string LoaiThoiGian { get; set; }
    public string? LoaiBuoc { get; set; }
    public string? TenNhomNguoiDung { get; set; }
    public string? TenTrangThaiHoSo { get; set; }
    public DefaultIdType? NhomNguoiDungId { get; set; }
    public string? MaTrangThaiHoSo { get; set; }
    public bool? YeuCauCoKetQuaBuocTruoc { get; set; } = false;
    public bool? ChoPhepChuyenLaiBuocTruoc { get; set; } = false;
    public bool? GuiLienThongQLVB { get; set; }
    public bool? GuiEmail { get; set; }
    public string? BieuMauEmail { get; set; }
    public bool? GuiSMS { get; set; }
    public string? BieuMauSMS { get; set; }
    public double? ThoiGianThucHienTrucTuyen { get; set; }
}