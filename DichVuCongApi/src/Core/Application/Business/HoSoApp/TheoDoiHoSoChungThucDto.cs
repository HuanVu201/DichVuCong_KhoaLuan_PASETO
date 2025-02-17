using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Business.HoSoApp;
public class TheoDoiHoSoChungThucDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string MaHoSo { get; set; }
    public string TrangThaiHoSoId { get; set; }
    public string UyQuyen { get; set; }
    public string TenTrangThaiHoSo { get; set; }
    public DateTime NgayDangKy { get; set; }
    public string TenDoiTuongDangKy { get; set; }
    public string SoChungThucGiay { get; set; }
    public string SoChungThucDienTu { get; set; }
    public string MaChungThuc { get; set; }
    public string SoGiayTo { get; set; }
    public string DinhKem { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
