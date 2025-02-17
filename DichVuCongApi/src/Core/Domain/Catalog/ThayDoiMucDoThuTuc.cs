using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Domain.Catalog;
public class ThayDoiMucDoThuTuc : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    public string? ThuTuc { get; private set; }
    public string? DonVi { get; private set; }
    public DateTime? ThoiGian { get; private set; }
    public string? MucDoCu { get; private set; }
    public string? MucDoMoi { get; private set; }
    public string? NguoiCapNhat { get; private set; }
    public ThayDoiMucDoThuTuc() { }
    public ThayDoiMucDoThuTuc(string? thuTuc, string? donVi, DateTime? thoiGian, string? mucDoCu, string? mucDoMoi, string? nguoiCapNhat)
    {
        ThuTuc = thuTuc;
        DonVi = donVi;
        DonVi = donVi;
        ThoiGian = thoiGian;
        MucDoCu = mucDoCu;
        MucDoMoi = mucDoMoi;
        NguoiCapNhat = nguoiCapNhat;
    }
    public static ThayDoiMucDoThuTuc Create(string? thuTuc, string? donVi, DateTime? thoiGian, string? mucDoCu, string? mucDoMoi, string? nguoiCapNhat)
    {
  
        return new(thuTuc, donVi, thoiGian, mucDoCu, mucDoMoi, nguoiCapNhat);
    }
    public ThayDoiMucDoThuTuc SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ThayDoiMucDoThuTuc Restore()
    {
        DeletedOn = null;
        return this;
    }
}
