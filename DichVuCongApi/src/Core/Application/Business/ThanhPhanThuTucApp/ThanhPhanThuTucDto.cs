

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp;


public class ThanhPhanThuTucDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string Ten { get; set; }
    public string Ma { get; set; }
    public string ThuTucId { get; set; }
    public string TruongHopId { get; set; }
    public bool BatBuoc { get; set; }
    public int SoBanChinh { get; set; }
    public bool ChoPhepThemToKhai { get; set; }
    public string DinhKem { get; set; }
    public int SoBanSao { get; set; }
    public int STT { get; set; }
    public string MaGiayToKhoQuocGia { get; set; } 
    [JsonIgnore]
    public int TotalCount { get; set; }
}

public class GetDuLieuThemHoSo_ThanhPhanThuTucDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string Ten { get; set; }
    public string Ma { get; set; }
    public bool BatBuoc { get; set; }
    public int SoBanChinh { get; set; }
    public int SoBanSao { get; set; }
    public int STT { get; set; }
    public bool ChoPhepThemToKhai { get; set; }
    public string MauDinhKem { get; set; }
    public string DinhKem { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}