using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ThayDoiTruongHopThuTucHoSoCommand: ICommand
{
    public Guid HoSoId { get; set; }
    public Guid TruongHopThuTucId { get; set; }
    //public int? ThoiHanBuocXuLy { get; set; }
    //public string? LoaiThoiHanBuocXuLy { get; set; }
    //public string? TenBuocHienTai { get; set; }
    //public string? BuocHienTai { get; set; }
    //public string? NguoiXuLyTiep { get; set; }
    //public string? BuocXuLyTiep { get; set; }
}
