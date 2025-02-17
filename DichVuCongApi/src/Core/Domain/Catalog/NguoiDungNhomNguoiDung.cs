using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Catalog;

public class NguoiDungNhomNguoiDung : BaseEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(36)]
    [Column(TypeName = "varchar")]
    public string TaiKhoan { get; private set; }
    [MaxLength(36)]
    [Column(TypeName = "varchar")]
    public string NhomNguoiDungId { get; private set; }

    public NguoiDungNhomNguoiDung() { }
    public NguoiDungNhomNguoiDung(string taiKhoan, string nhomNguoiDungId)
    {
        TaiKhoan = taiKhoan;
        NhomNguoiDungId = nhomNguoiDungId;
    }

}

public class NguoiDungNhomNguoiDungConstant
{
    public const string NguoiDungNhomNguoiDungKey = nameof(NguoiDungNhomNguoiDungKey);
}