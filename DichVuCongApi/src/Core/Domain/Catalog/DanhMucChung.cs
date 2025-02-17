using System.ComponentModel.DataAnnotations;

namespace TD.DichVuCongApi.Domain.Catalog;
public class DanhMucChung : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(200)]
    public string TenDanhMuc { get; private set; }
    [MaxLength(100)]
    public string Code { get; private set; }
    [MaxLength(100)]
    public string? ParentCode { get; private set; }
    public int ThuTu { get; private set; } = 1;
    public bool Active { get; private set; } = true;
    [MaxLength(100)]
    public string Type { get; private set; }


    public DanhMucChung() { }

    public DanhMucChung(string tendanhmuc, string code, int thutu, bool active, string type)
    {
        TenDanhMuc = tendanhmuc;
        Code = code;
        ThuTu = thutu;
        Active = active;
        Type = type;
    }
    public void SetParentCode(string parentCode)
    {
        ParentCode = parentCode;
    }

    public static DanhMucChung Create(string tendanhmuc, string code, int thutu, bool active, string type)
    {
        return new(tendanhmuc, code, thutu, active, type);
    }
    public DanhMucChung Update(string? tendanhmuc, string? code, string? parentCode, int? thutu, bool? active, string? type)
    {
        if (!string.IsNullOrEmpty(tendanhmuc) && !TenDanhMuc.Equals(tendanhmuc))
            TenDanhMuc = tendanhmuc;
        if (!string.IsNullOrEmpty(code) && !Code.Equals(code))
            Code = code;
        if (!string.IsNullOrEmpty(parentCode) && !ParentCode.Equals(parentCode))
            ParentCode = parentCode;
        if (thutu != null)
            ThuTu = (int)thutu;
        if (active != null)
            Active = (bool)active;
        if (!string.IsNullOrEmpty(type) && !Type.Equals(type))
            Type = type;
        return this;
    }
    public DanhMucChung SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public DanhMucChung Restore()
    {
        DeletedOn = null;
        return this;
    }
}
