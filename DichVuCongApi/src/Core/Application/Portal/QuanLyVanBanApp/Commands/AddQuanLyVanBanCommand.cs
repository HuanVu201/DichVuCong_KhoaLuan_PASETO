using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Portal.QuanLyVanBanApp.Commands;
public class AddQuanLyVanBanCommand : ICommand<DefaultIdType>
{
    public string SoKyHieu { get;  set; }
    public DateTime? NgayBanHanh { get;  set; }
    public string LoaiVanBan { get;  set; }
    public bool? CongKhai { get;  set; }
    public int? ThuTu { get; set; }
    public string? FileDinhKem { get; set; }
    public string TrichYeu { get; set; }
    public string MaLinhVuc { get; set; }
    public string CoQuanBanHanh { get; set; }

}
