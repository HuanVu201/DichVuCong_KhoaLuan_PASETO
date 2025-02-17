using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Commands;
public class AddMenuKetQuaThuTucCommand : ICommand<Guid>
{
    public string TenMenu { get; set; }
    public Guid? ParentId { get; set; }
    public int ThuTuMenu { get; set; } = 1;
    public bool Active { get; set; } = true;
    public string? IconName { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaTTHC { get; set; }
    public string? Catalog { get; set; }
    public string? MaKetQuaTTHC { get; set; }
}

