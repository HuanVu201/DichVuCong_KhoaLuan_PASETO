using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TD.DichVuCongApi.Domain.Business;
public class TrangThaiHoSoLienThong : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]    
    public string MaHoSo { get; private set; }
    [MaxLength(4)]
    [Column(TypeName = "varchar")]
    public string TrangThai { get; private set; }
    [MaxLength(4)]
    [Column(TypeName = "varchar")]
    public string TrangThaiDongBoDVC { get; private set; }
    public string DuLieuBTP { get; private set; }
    public TrangThaiHoSoLienThong()
    {

    }
    public TrangThaiHoSoLienThong(string maHoSo, string trangThai, string trangThaiDongBoDVC, string duLieuBTP)
    {
        MaHoSo = maHoSo;
        TrangThai = trangThai;
        TrangThaiDongBoDVC = trangThaiDongBoDVC;
        DuLieuBTP = duLieuBTP;
    }
}

public class TrangThaiHoSoLienThongConstant
{
    public const string TrangThaiDongBo_ThatBai = "0";
    public const string TrangThaiDongBo_ThanhCong = "1";
    public const string TrangThaiDongBo_ChuaDongBo = "3";
    //public const string TrangThaiDongBo_ThanhCong = "1";
}