using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TD.DichVuCongApi.Domain.Catalog;
public class DonViThuTuc : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaTTHC { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViId { get; private set; }
    [MaxLength(2000)]
    [Column(TypeName = "varchar")]
    public string? NguoiTiepNhanId { get; private set; }
    [MaxLength(100)]
    [Column(TypeName = "nvarchar")]
    public string? MucDo { get; private set; }
    [MaxLength(150)]
    [Column(TypeName = "varchar")]
    public string? UrlRedirect { get; private set; }
    [MaxLength(150)]
    [Column(TypeName = "varchar")]
    public string? MaSoThue { get; private set; }
    [MaxLength(150)]
    [Column(TypeName = "nvarchar")]
    public string? DonViMaSoThue { get; private set; }
    public Guid? TaiKhoanThuHuongId { get; private set; }

    public DonViThuTuc() { }
    public DonViThuTuc(string? maTTHC, string? donViId, string? nguoiTiepNhanId, string? mucDo, string? urlRedirect, string? maSoThue, string? donViMaSoThue, DefaultIdType? taiKhoanThuHuongId)
    {
        MaTTHC = maTTHC;
        DonViId = donViId;
        NguoiTiepNhanId = Business.HoSo.RemoveDuplicateIds(nguoiTiepNhanId);
        MucDo = mucDo;
        UrlRedirect = urlRedirect;
        MaSoThue = maSoThue;
        DonViMaSoThue = donViMaSoThue;
        TaiKhoanThuHuongId = taiKhoanThuHuongId;
    }
    public static DonViThuTuc Create(string? maTTHC, string? donViId, string? nguoiTiepNhanId, string? mucDo,
        string? urlRedirect, string? maSoThue, string? donViMaSoThue, DefaultIdType? taiKhoanThuHuongId)
    {
        return new(maTTHC, donViId, Business.HoSo.RemoveDuplicateIds(nguoiTiepNhanId), mucDo, urlRedirect, maSoThue, donViMaSoThue,taiKhoanThuHuongId);
    }

    public DonViThuTuc Update(string? maTTHC, string? donViId, string? nguoiTiepNhanId, string? mucDo,
       string? urlRedirect, string? maSoThue, string? donViMaSoThue, DefaultIdType? taiKhoanThuHuongId)
    {

        if (!string.IsNullOrEmpty(maTTHC) && !MaTTHC.Equals(maTTHC))
            MaTTHC = maTTHC;
        if (!string.IsNullOrEmpty(donViId))
            DonViId = donViId;
        if (taiKhoanThuHuongId != null && taiKhoanThuHuongId != default)
            TaiKhoanThuHuongId = (Guid)taiKhoanThuHuongId;
        if (!string.IsNullOrEmpty(nguoiTiepNhanId))
            NguoiTiepNhanId = Business.HoSo.RemoveDuplicateIds(nguoiTiepNhanId);
        if (!string.IsNullOrEmpty(mucDo))
            MucDo = mucDo;
        if (urlRedirect != null)
            UrlRedirect = urlRedirect;
        if (!string.IsNullOrEmpty(maSoThue) )
            MaSoThue = maSoThue;
        if (!string.IsNullOrEmpty(donViMaSoThue))
            DonViMaSoThue = donViMaSoThue;
        return this;
    }

    public DonViThuTuc SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public DonViThuTuc Restore()
    {
        DeletedOn = null;
        return this;
    }
}
