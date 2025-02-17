using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TD.DichVuCongApi.Domain.Business;
public class TrangThaiDongBoHoSoLLTP : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string MaHoSo { get; private set; }
    [MaxLength(4)]
    [Column(TypeName = "varchar")]
    public string TrangThai { get; private set; }
    [MaxLength(4)]
    [Column(TypeName = "varchar")]
    public string TrangThaiDongBoDVC { get; private set; }
    public string DuLieuLLTP { get; private set; }
    [MaxLength(10)]
    [Column(TypeName = "varchar")]
    public string TypeVneid { get; private set; }
    public string DinhKemThuHoi { get; private set; }
    public TrangThaiDongBoHoSoLLTP()
    {

    }
    public TrangThaiDongBoHoSoLLTP(string maHoSo, string trangThai, string trangThaiDongBoDVC, string duLieuLLTP, string typeVneid, string dinhKemThuHoi)
    {
        MaHoSo = maHoSo;
        TrangThai = trangThai;
        TrangThaiDongBoDVC = trangThaiDongBoDVC;
        DuLieuLLTP = duLieuLLTP;
        TypeVneid = typeVneid;
        DinhKemThuHoi = dinhKemThuHoi;
    }
}

public class TrangThaiDongBoHoSoLLTPConstant
{
    public const string TrangThaiDongBo_ThatBai = "0";
    public const string TrangThaiDongBo_ThanhCong = "1";
    public const string TrangThaiDongBo_ChuaDongBo = "3";
    public const string TrangThaiDongBo_Type_KetQua = "ketqua";
    public const string TrangThaiDongBo_Type_ThuHoi = "thuhoi";
    //public const string TrangThaiDongBo_ThanhCong = "1";
}