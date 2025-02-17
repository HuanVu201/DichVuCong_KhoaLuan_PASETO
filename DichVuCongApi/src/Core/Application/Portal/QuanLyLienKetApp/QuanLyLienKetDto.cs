
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Portal.QuanLyLienKetApp;


public class QuanLyLienKetDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string Ten { get; set; }
    public string Ma { get; set; }
    public string LinkLienKet { get; set; }
    public int ThuTu { get; set; }
    public bool SuDung { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
