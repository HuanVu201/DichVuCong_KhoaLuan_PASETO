using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;
public class CapSoVaDongDauHoSoChungThucCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public string? DinhKemKetQua { get; set; }

    public string? YKienNguoiChuyenXuLy { get; set; }
    public string? DinhKemYKienNguoiChuyenXuLy { get; set; }
    //public string? MaTrangThaiHoSo { get; set; }

    /// <summary>
    /// đầu vào của bảng quá trình xử lý hồ sơ
    /// </summary>
    public string? NodeQuyTrinh { get; set; }
    public int? ThoiHanBuocXuLy { get; set; }
    public string? LoaiThoiHanBuocXuLy { get; set; }
    //public string? NgayHetHanBuocXuLy { get; set; }
    //public string? ThaoTac { get; set; }
    // end


    public string? TenBuocHienTai { get; set; }
    public string? BuocHienTai { get; set; }
    public string? NguoiXuLyTiep { get; set; }
    public string? BuocXuLyTiep { get; set; }

    public Guid LoaiKetQuaId { get; set; }
    public Guid SoChungThucId { get; set; }

    public IReadOnlyList<CapSoVaDongDau_ThanhPhanHoSo> ThanhPhanHoSos { get; set; }
}

public class CapSoVaDongDau_ThanhPhanHoSo
{
    public Guid Id { get; set; }
    public string DinhKem { get; set; }
}