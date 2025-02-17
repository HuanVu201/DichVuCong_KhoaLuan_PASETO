using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Portal.TrangThaiApp;
using TD.DichVuCongApi.Application.Portal.KenhTinApp;

namespace TD.DichVuCongApi.Application.Portal.TinBaiApp;
public class DetailTinBaiDto : IDto
{
    public Guid Id { get; set; }
    public string TieuDe { get; set; }
    public DateTime NgayBanHanh { get; set; }
    public DateTime? NgayKetThuc { get; set; }
    public string? TrichYeu { get; set; }
    public string? NoiDung { get; set; }
    public string? NguonTin { get; set; }
    public KenhTinBaseDto KenhTin { get; set; }
    public TrangThaiBaseDto TrangThai { get; set; }
    public string? AnhDaiDien { get; set; }
    public string? FileDinhKem { get; set; }
    public string? Tacgia { get; set; }
    public bool? ChoPhepBinhLuan { get; set; }
    public bool? HienThiLenTrangChu { get; set; }
    public bool? TinNoiBat { get; set; }
}
