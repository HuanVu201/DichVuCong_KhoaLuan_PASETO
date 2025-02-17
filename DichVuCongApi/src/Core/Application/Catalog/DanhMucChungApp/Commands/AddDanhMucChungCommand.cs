using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Commands;
public class AddDanhMucChungCommand : ICommand<Guid>
{
    public string TenDanhMuc { get; set; }
    public string Code { get; set; }
    public string? ParentCode { get; set; }
    public int ThuTu { get; set; } = 1;
    public bool Active { get; set; } = true;
    public string Type { get; set; }

}
