

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Portal.DSTaiLieuHDSDApp;


public class DSTaiLieuHDSDDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public int ThuTu { get; set; }
    public string TenTaiLieu { get; set; }
    public string TepDinhKem { get; set; }
    public string TaiLieuDanhCho { get; set; }
    public string MoTa { get; set; }
    public string NgayDang { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
