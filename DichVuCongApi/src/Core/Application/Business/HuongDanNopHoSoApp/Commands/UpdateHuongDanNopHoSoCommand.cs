using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Commands;

namespace TD.DichVuCongApi.Application.Business.HuongDanNopHoSoApp.Commands;
public sealed class UpdateHuongDanNopHoSoCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? DonViId { get; set; }
    public string? MaHoSo { get; set; }
    public string? KenhThucHien { get; set; }
    public string? LoaiDoiTuong { get; set; }
    public string? MaDoiTuong { get; set; }
    public string? ChuHoSo { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? EmailChuHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? LoaiGiayToChuHoSo { get; set; }
    public string? NgaySinhChuHoSo { get; set; }
    public string? TinhThanhChuHoSo { get; set; }
    public string? QuanHuyenChuHoSo { get; set; }
    public string? XaPhuongChuHoSo { get; set; }
    public string? DiaChiChuHoSo { get; set; }
   
    public string? TrichYeuHoSo { get; set; }
    public DateTime? NgayTiepNhan { get; set; }
    public string MaTTHC { get; set; }
    public string? MaLinhVuc { get; set; }
    public string? TenLinhVuc { get; set; }
    public string? TenTruongHop { get; set; }
    public string? MaTruongHop { get; set; }
    public string? TruongHopId { get; set; }
 
  
    public string? LyDoTuChoi { get; set; }
    public string? LyDoBoSung { get; set; }
    public List<ThanhPhanHuongDanNopHoSo> ThanhPhanHoSos { get; set; } = new List<ThanhPhanHuongDanNopHoSo>();

}
