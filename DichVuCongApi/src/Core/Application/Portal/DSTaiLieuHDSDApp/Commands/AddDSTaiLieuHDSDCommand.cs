using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.DSTaiLieuHDSDApp.Commands;
public class AddDSTaiLieuHDSDCommand : ICommand<DefaultIdType>
{
    public int? ThuTu { get; set; }
    public string TenTaiLieu { get; set; }
    public string? TepDinhKem { get; set; }
    public string? TaiLieuDanhCho { get; set; }

    public string? MoTa { get; set; }
    public DateTime NgayDang { get; set; }


}
