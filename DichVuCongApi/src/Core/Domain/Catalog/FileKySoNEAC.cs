using System.ComponentModel.DataAnnotations;

namespace TD.DichVuCongApi.Domain.Catalog;
public class KySoNEAC : BaseEntity, IAggregateRoot
{
    [MaxLength(50)]
    public string? SoGiayTo { get; private set; }
    [MaxLength(50)]
    public string? CaName { get; private set; }
    [MaxLength(500)]
    public string? DuongDanFile { get; private set; }
    public DateTime NgayKy { get; private set; } = DateTime.Now;

    public KySoNEAC() { }

    public KySoNEAC(string? soGiayTo, string? caName, string? duongDanFile)
    {
        SoGiayTo = soGiayTo;
        CaName = caName;
        DuongDanFile = duongDanFile;
    }
}
