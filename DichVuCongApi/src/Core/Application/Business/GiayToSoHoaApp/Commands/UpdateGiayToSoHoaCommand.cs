using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Commands;
public sealed class UpdateGiayToSoHoaCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? Ten { get; set; }
    public string? Ma { get; set; }
    public string? MaGiayToKhoQuocGia { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaGiayTo { get; set; }
    public string? DonViId { get; set; }
    public string? NguoiSoHoa { get; set; }
    public DateTime? ThoiGianSoHoa { get; set; }
    public DateTime? ThoiHanHieuLuc { get; set; }
    public DateTime? NgayBanHanh { get; set; }
    public string? PhamViHieuLuc { get; set; }
    public string? TrichYeuNoiDung { get; set; }
    public string? ChuGiayTo { get; set; }
    public string? CoQuanBanHanh { get; set; }
    public string? NguoiKy { get; set; }
    public string? LoaiSoHoa { get; set; }
    public string? DinhKem { get; set; }
    public string? SoKyHieu { get; set; }
    public string? JsonOcr { get; set; }
    public bool? ThoiHanVinhVien { get; set; }
    public string? MaHoSo { get; set; }
    public string? DinhKemSoHoa { get; set; }
}

