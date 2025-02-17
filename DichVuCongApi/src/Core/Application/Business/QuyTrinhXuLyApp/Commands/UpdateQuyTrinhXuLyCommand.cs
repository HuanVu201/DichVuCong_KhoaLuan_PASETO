using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Commands;
public sealed class UpdateQuyTrinhXuLyCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public DefaultIdType? TruongHopId { get; set; }
    public string? TenBuocXuLy { get; set; }
    public double? ThoiGianXuLy { get; set; }
    public string? LoaiThoiGian { get; set; }
    public string? LoaiBuoc { get; set; }
    public string? TenNhomNguoiDung { get; set; }
    public string? TenTrangThaiHoSo { get; set; }
    public DefaultIdType? NhomNguoiDungId { get; set; }
    public string? MaTrangThaiHoSo { get; set; }
    public bool? YeuCauCoKetQuaBuocTruoc { get; set; }
    public bool? ChoPhepChuyenLaiBuocTruoc { get; set; }
    public bool? GuiLienThongQLVB { get; set; }
    public bool? GuiEmail { get; set; }
    public string? BieuMauEmail { get; set; }
    public bool? GuiSMS { get; set; }
    public string? BieuMauSMS { get; set; }
    public double? ThoiGianThucHienTrucTuyen { get; set; }
}
