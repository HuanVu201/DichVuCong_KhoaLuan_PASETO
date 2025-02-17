using System.Text.Json.Serialization;
namespace TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Dtos;
public class MenuKetQuaThuTucDto
{
    public PaginationResponse<MenuKQTTDto> MenuKetQuaThuTucs { get; set; }
    public List<NavMenuKQTTDto> NavMenu { get; set; }

}

public class MenuKQTTDto
{
    public string TenMenu { get; set; }
    public Guid? ParentId { get; set; }
    public Guid Id { get; set; }
    public int ThuTuMenu { get; set; }
    public string? IconName { get; set; }
    public string? MaDonVi { get; set; }
    public string? TenDonVi { get; set; }
    public string? QueryStringParams { get; set; }
    public string MaTTHC { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
public class NavMenuKQTTDto
{
    public Guid Id { get; set; }
    public string TenMenu { get; set; }
    public string FullPath { get; set; }
}