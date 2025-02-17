using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;

namespace TD.DichVuCongApi.Application.Business.ActionApp.Dtos;
public class DetailActionDto : IDto
{
    public string Ten { get; set; }
    public string? Ma { get; set; }
    public string? IconName { get; set; }
    public string? ColorCode { get; set; }
    public bool? ShowInModal { get; set; }
    public bool? ShowInTable { get; set; }
    public int ThuTu { get; set; }
    public string? Quyen { get; set; }
    public string? MoTa { get; set; }
    public IReadOnlyList<NguoiTiepNhanSelect>? ApplyForUserData { get; set; }
    public string? ApplyForUserGroups { get; set; }
    public string? ApplyForUsers { get; set; }
    
}
