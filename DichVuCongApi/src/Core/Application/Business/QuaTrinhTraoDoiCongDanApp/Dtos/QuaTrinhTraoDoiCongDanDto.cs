using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Dto;
public class QuaTrinhTraoDoiCongDanDto: IDto
{
    public Guid Id { get; set; }
    public string MaHoSo { get; set; }
    public string FullName { get; set; }
    public string NguoiGuiTraoDoi { get; set; }
    public DateTime NgayGui { get; set; }
    public string NoiDungTraoDoi { get; set; }
    public bool? Email { get; set; }
    public bool? SMS { get; set; }
    public bool? Zalo { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}
