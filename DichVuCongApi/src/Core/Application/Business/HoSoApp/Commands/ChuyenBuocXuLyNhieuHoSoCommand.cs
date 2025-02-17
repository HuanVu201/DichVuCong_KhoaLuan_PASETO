using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenBuocXuLyNhieuHoSoCommand : ICommand<Dictionary<string, string>>
{
    public List<Guid> Ids { get; set; }
    public string? YKienNguoiChuyenXuLy { get; set; }
    public string? BuocHienTai { get; set; }
    public string? NguoiXuLyTiep { get; set; }
    public string? BuocXuLyTiep { get; set; }
    public string? DonViNguoiTiepNhanXuLy { get; set; }
}
