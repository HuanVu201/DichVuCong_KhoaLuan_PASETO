

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp;


public class DanhGiaHaiLongDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string? LoaiDanhGia { get; set; }
    public string? NguoiDanhGia { get; set; }
    public string? DanhGia { get; set; }
    public DateTime? ThoiGianDanhGia { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
