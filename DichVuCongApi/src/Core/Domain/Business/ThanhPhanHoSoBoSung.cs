using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TD.DichVuCongApi.Domain.Business;
public class ThanhPhanHoSoBoSung : BaseEntity<Guid>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? HoSoBoSungId { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? ThanhPhanHoSoId { get; private set; }

    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? NoiDungBoSung { get; private set; }

    public string? FileDinhKemCu { get; private set; }
    public string? FileDinhKemMoi { get; private set; }

    public ThanhPhanHoSoBoSung() { }

    public ThanhPhanHoSoBoSung(string? hoSoBoSungId, string? thanhPhanHoSoId, string? fileDinhKemCu, string? fileDinhKemMoi, string? noiDungBoSung)
    {
        HoSoBoSungId = hoSoBoSungId;
        ThanhPhanHoSoId = thanhPhanHoSoId;
        FileDinhKemCu = fileDinhKemCu;
        FileDinhKemMoi = fileDinhKemMoi;
        NoiDungBoSung = noiDungBoSung;
    }
}
