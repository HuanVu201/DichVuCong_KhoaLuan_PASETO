using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Business;
public class HoSoChungThuc : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string MaHoSo { get; private set; }
    [MaxLength(50)]
    [Column(TypeName ="varchar")]
    public string SoChungThucId { get; private set; }
    public Guid? ThanhPhanHoSoId { get; private set; }
    public int So { get; private set; }
    [MaxLength(100)]
    [Column(TypeName ="varchar")]
    public string LoaiKetQuaId { get; private set; }
    public DateTime NgayChungThuc { get; private set; }
    public string DinhKem { get; private set; }

    public HoSoChungThuc() { }

    public HoSoChungThuc(string maHoSo, string soChungThucId, int so, string loaiKetQuaId, DateTime ngayChungThuc, string dinhKem, DefaultIdType thanhPhanHoSoId)
    {
        MaHoSo = maHoSo;
        SoChungThucId = soChungThucId;
        So = so;
        LoaiKetQuaId = loaiKetQuaId;
        NgayChungThuc = ngayChungThuc;
        DinhKem = dinhKem;
        ThanhPhanHoSoId = thanhPhanHoSoId;
    }
}

