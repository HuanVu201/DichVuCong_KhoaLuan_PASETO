using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Dto;
public class ThanhPhanHoSoChungThucDto : IDto
{
    public Guid Id { get; set; }
    public string Ten { get; set; }
    public string SoTrang { get; set; }
    public string SoBanGiay { get; set; }
    public string DinhKem { get; set; }
    public string DaChungThucDienTu { get; set; }
    public bool KyDienTuBanGiay { get; set; }
    public string TenKetQua { get; set; }
    public string DinhKemGoc { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
