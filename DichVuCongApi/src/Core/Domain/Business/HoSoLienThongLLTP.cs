using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace TD.DichVuCongApi.Domain.Business;
public class HoSoLienThongLLTP : BaseEntity, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string MaHoSo { get; private set; }
    [MaxLength(500)]
    public string DuongDanDuLieu { get; private set; }
    public string DuongDanTaiLieuLog { get; private set; }
    public DateTime CreatedOn { get; private set; } = DateTime.Now;

    public HoSoLienThongLLTP() { }
    public HoSoLienThongLLTP(string maHoSo, string duongDanDuLieu)
    {
        MaHoSo = maHoSo;
        DuongDanDuLieu = duongDanDuLieu;
        DuongDanTaiLieuLog = DuongDanDuLieu;
    }
    public HoSoLienThongLLTP SetDuongDanTaiLieuLog(string duongDanTaiLieu)
    {
        DuongDanTaiLieuLog += "##" + duongDanTaiLieu;
        return this;
    }
}
