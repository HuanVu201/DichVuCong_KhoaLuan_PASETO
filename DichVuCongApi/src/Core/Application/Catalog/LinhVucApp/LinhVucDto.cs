using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;
public class LinhVucDto : IDto
{
    public Guid Id { get; set; }
    public string Ma { get; set; }
    public string Ten { get; set; }
    public string MaNganh { get; set; }
    public string? GroupCode { get; set; }
    public string? GroupName { get; set; }
    public int SoLuongThuTucCapTinh { get; set; } = 0;
    public int SoLuongThuTucCapHuyen { get; set; } = 0;
    public int SoLuongThuTucCapXa { get; set; } = 0;
    public bool SuDung { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
