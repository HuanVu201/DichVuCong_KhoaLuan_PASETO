using TD.DichVuCongApi.Application.Abstractions.Messaging;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;
public class TiepNhanHoSoChungThucCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    [JsonIgnore]
    public bool IsMultiple { get; set; } = false;
    public int? ThoiHanBuocXuLy { get; set; }
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

    public List<TiepNhanChungThuc_ThanhPhanHoSo>? ThanhPhanHoSos { get; set; }
}

public class TiepNhanChungThuc_ThanhPhanHoSo
{
    public Guid Id { get; set; }
    public string DinhKem { get; set; }
    public int SoTrang { get; set; }
    public int SoBanGiay { get; set; }
    public bool KyDienTuBanGiay { get; set; }
    public string MaGiayTo { get; set; }
    public string Ten { get; set; }
    public string HoSo { get; set; }


}