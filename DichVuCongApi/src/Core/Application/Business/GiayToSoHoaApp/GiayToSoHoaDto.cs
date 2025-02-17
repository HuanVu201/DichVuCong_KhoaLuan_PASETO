

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp;


public class GiayToSoHoaDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string Ten { get; set; }
    public string MaHoSo { get; set; }
    public string ChuHoSo { get; set; }
    public string ChuGiayTo { get; set; }
    public string Ma { get; set; }
    public bool? ThoiHanVinhVien { get; set; }
    public DateTime? ThoiGianSoHoa { get; set; }
    public DateTime? ThoiHanHieuLuc { get; set; }
    public string DinhKem { get; set; }
    public string FullName { get; set; }
    public string GroupName { get; set; }
    public string LoaiSoHoa { get; set; }
    public string? KhoTaiLieuDienTuId { get; set; }
    public double? DungLuong { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
