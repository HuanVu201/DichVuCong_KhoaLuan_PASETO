using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace TD.DichVuCongApi.Domain.Catalog;
public class LinhVuc : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(300)]
    public string Ten { get; private set; }
    [MaxLength(50)]
    public string Ma { get; private set; }
    [MaxLength(50)]
    public string MaNganh { get; private set; }
    public bool? SuDung { get; private set; } = true;
    public int? SoLuongThuTuc { get; private set; } = 0;
    public int? SoLuongThuTucCapTinh { get; private set; } = 0;
    public int? SoLuongThuTucCapHuyen { get; set; } = 0;
    public int? SoLuongThuTucCapXa { get; private set; } = 0;
    public LinhVuc() { }
    public LinhVuc(string ten, string ma, string maNganh, bool? suDung, int? soLuongThuTuc, int? soLuongThuTucCapTinh, int? soLuongThuTucCapHuyen, int? soLuongThuTucCapXa)
    {
        Ten = ten;
        Ma = ma;
        MaNganh = maNganh;
        SuDung = suDung;
        SoLuongThuTuc = soLuongThuTuc;
        SoLuongThuTucCapTinh = soLuongThuTucCapTinh;
        SoLuongThuTucCapHuyen = soLuongThuTucCapHuyen;
        SoLuongThuTucCapXa = soLuongThuTucCapXa;
    }
    public static LinhVuc Create(string ten, string ma, string maNganh, bool? suDung, int? soLuongThuTuc, int? soLuongThuTucCapTinh, int? soLuongThuTucCapHuyen, int? soLuongThuTucCapXa)
    {
        return new(ten, ma, maNganh, suDung, soLuongThuTuc, soLuongThuTucCapTinh, soLuongThuTucCapHuyen, soLuongThuTucCapXa);
    }

    public LinhVuc Update(string? ten, string? ma, string? maNganh, bool? suDung, int? soLuongThuTuc, int? soLuongThuTucCapTinh, int? soLuongThuTucCapHuyen, int? soLuongThuTucCapXa)
    {
        if (!string.IsNullOrEmpty(ten) && !Ten.Equals(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma) && !Ma.Equals(ma))
            Ma = ma;
        if (!string.IsNullOrEmpty(maNganh) && !MaNganh.Equals(maNganh))
            MaNganh = maNganh;
        if (suDung != null)
            SuDung = suDung;
        if (soLuongThuTuc != null)
            SoLuongThuTuc = (int)soLuongThuTuc;
        if (soLuongThuTucCapTinh != null)
            SoLuongThuTucCapTinh = (int)soLuongThuTucCapTinh;
        if (soLuongThuTucCapHuyen != null)
            SoLuongThuTucCapHuyen = (int)soLuongThuTucCapHuyen;
        if (soLuongThuTucCapXa != null)
            SoLuongThuTucCapXa = (int)soLuongThuTucCapXa;
        return this;
    }
    public LinhVuc SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public LinhVuc Restore()
    {
        DeletedOn = null;
        return this;
    }
}
