using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenBuocXuLyHoSoCommand : ICommand
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
    public string? LoaiVanBanKetQua { get; set; }
    public string? SoKyHieuKetQua { get; set; }
    public string? NguoiKyKetQua { get; set; }
    public string? CoQuanBanHanhKetQua { get; set; }
    public DateTime? NgayBanHanhKetQua { get; set; }
    public DateTime? NgayKyKetQua { get; set; }
    public string? DonViNguoiTiepNhanXuLy { get; set; }
    
}

