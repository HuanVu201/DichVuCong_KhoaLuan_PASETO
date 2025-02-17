using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Commands;
public class AdminAddTaiLieuKhoLuuTruCongDanCommand : ICommand
{
    public string TenGiayTo { get; set; }
    public string DuongDan { get; set; }
    public string? Nguon { get; set; }
    public Guid? LoaiGiayToId { get; set; }
    public string SoGiayToChuHoSo { get; set; }
}
