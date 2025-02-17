using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Domain.Catalog;
public class QuanLyTaiNguyen : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(500)]
    public string? DinhKem { get;private set; }
    [MaxLength(256)]
    public string? Ten { get; private set; }
    [MaxLength(500)]
    public string? Mota { get; private set; }
    public int? KichThuocTep { get; private set; }
    public bool? Public { get; private set; } = false;
    public bool? SuDung { get; private set; } = true;
    public int? ThuTu { get; private set; } 
    public QuanLyTaiNguyen() { }
    public QuanLyTaiNguyen(string? dinhKem, string? ten, string? mota, bool? @public, bool? suDung, int? thuTu,int? kichThuocTep)
    {
        DinhKem = dinhKem;
        Ten = ten;
        Mota = mota;
        Public = @public;
        SuDung = suDung;
        ThuTu = thuTu;
        KichThuocTep = kichThuocTep;
    }

    public QuanLyTaiNguyen Update(string? dinhKem, string? ten, string? mota, bool? @public, bool? suDung, int? thuTu,int? kichThuocTep)
    {
        if (dinhKem != null)
            DinhKem = dinhKem;
        if(ten != null)
            Ten = ten;
        if(mota != null)
            Mota = mota;
        if(@public != null)
            Public = (bool)@public;
        if (suDung != null)
            SuDung = (bool)suDung;
        if (thuTu != null)
            ThuTu = thuTu;
        if (kichThuocTep != null)
            KichThuocTep = kichThuocTep;
        return this;
    }

    public QuanLyTaiNguyen SoftDelete()
    {
        //SuDung = false;
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public QuanLyTaiNguyen Restore()
    {
        //SuDung = true;
        DeletedOn = null;

        return this;
    }
}
