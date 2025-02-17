using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Portal;
public class DSTaiLieuHDSD : BaseEntity<DefaultIdType>, IAggregateRoot
{
    public int? ThuTu {  get; private set; }
    public string TenTaiLieu {  get; private set; }
    public string TepDinhKem {  get; private set; }
    public string MoTa {  get; private set; }
    public string? TaiLieuDanhCho {  get; private set; }
    public DateTime? NgayDang {  get; private set; }
    public DateTime? DeletedOn { get; private set; }
    public DefaultIdType? DeletedBy { get; private set; }

    public DSTaiLieuHDSD() { }
    public DSTaiLieuHDSD(int? thuTu, string tenTaiLieu, string tepDinhKem, string? moTa,DateTime? ngayDang, string? taiLieuDanhCho)
    {
        TenTaiLieu = tenTaiLieu;
        ThuTu = thuTu;
        TepDinhKem = tepDinhKem;
        MoTa = moTa;
        NgayDang = ngayDang;
        TaiLieuDanhCho = taiLieuDanhCho;
    }


    public static DSTaiLieuHDSD Create(int? thuTu, string tenTaiLieu, string? tepDinhKem, string? moTa, DateTime? ngayDang,string? taiLieuDanhCho)
    {
        return new(thuTu, tenTaiLieu, tepDinhKem, moTa,ngayDang,taiLieuDanhCho);
    }

    public DSTaiLieuHDSD Update(int? thuTu, string? tenTaiLieu, string? tepDinhKem, string? moTa, DateTime? ngayDang, string? taiLieuDanhCho)
    {
        if (!string.IsNullOrEmpty(tenTaiLieu) && !TenTaiLieu.Equals(tenTaiLieu))
            TenTaiLieu = tenTaiLieu;
        if (!string.IsNullOrEmpty(tepDinhKem) && !TepDinhKem.Equals(tepDinhKem))
            TepDinhKem = tepDinhKem;
        if (!string.IsNullOrEmpty(taiLieuDanhCho))
            TaiLieuDanhCho = taiLieuDanhCho;
        if (!string.IsNullOrEmpty(moTa) && !MoTa.Equals(moTa))
            MoTa = moTa;
        if (thuTu != null)
            ThuTu = (int)thuTu;
        if (ngayDang != null && ngayDang != default)
            NgayDang = (DateTime)ngayDang;
        return this;
    }
    public DSTaiLieuHDSD SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public DSTaiLieuHDSD Restore()
    {
        DeletedOn = null;
        return this;
    }
}
