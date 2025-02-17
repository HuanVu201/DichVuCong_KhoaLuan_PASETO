using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Domain.Business;
public class QuaTrinhTraoDoiCongDan : BaseEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string MaHoSo { get; protected set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string NguoiGuiTraoDoi { get; protected set; }
    public DateTime NgayGui { get; protected set; }
    [MaxLength(2000)]
    public string NoiDungTraoDoi { get; protected set; }
    public bool? Email { get; protected set; } = false;
    public bool? SMS { get; protected set; } = false;
    public bool? Zalo { get; protected set; } = false;
    public QuaTrinhTraoDoiCongDan() { }
    public QuaTrinhTraoDoiCongDan(string maHoSo, string nguoiGuiTraoDoi, DateTime ngayGui, string noiDungTraoDoi, bool? email, bool? sMS, bool? zalo)
    {
        MaHoSo = maHoSo;
        NguoiGuiTraoDoi = nguoiGuiTraoDoi;
        NgayGui = ngayGui;
        NoiDungTraoDoi = noiDungTraoDoi;
        Email = email;
        SMS = sMS;
        Zalo = zalo;
    }

    public QuaTrinhTraoDoiCongDan Update(string? maHoSo, string? nguoiGuiTraoDoi, DateTime? ngayGui, string? noiDungTraoDoi, bool? email, bool? sMS, bool? zalo)
    {
        if (!string.IsNullOrEmpty(maHoSo))
            MaHoSo = maHoSo;
        if (!string.IsNullOrEmpty(nguoiGuiTraoDoi))
            NguoiGuiTraoDoi = nguoiGuiTraoDoi;
        if (ngayGui != null && ngayGui != default)
            NgayGui = (DateTime)ngayGui;
        if (!string.IsNullOrEmpty(noiDungTraoDoi))
        if (email != null)
            Email = email;
        if (sMS != null)
            SMS = sMS;
        if (zalo != null)
            Zalo = zalo;
        return this;
    }
}
