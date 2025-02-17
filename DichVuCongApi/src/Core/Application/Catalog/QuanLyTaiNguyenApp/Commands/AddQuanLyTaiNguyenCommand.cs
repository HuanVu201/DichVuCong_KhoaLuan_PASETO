using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Commands;
public class AddQuanLyTaiNguyenCommand : ICommand<DefaultIdType>
{
    public string? DinhKem { get; set; }
    public string? Ten { get; set; }
    public string? Mota { get; set; }
    public int? KichThuocTep { get; set; }
    public bool? Public { get; set; } = false;
    public bool? SuDung { get; set; } = true;
    public int? ThuTu { get; set; }
}
