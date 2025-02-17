using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace TD.DichVuCongApi.Domain.Business;
public class ThanhPhanThuTuc : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(7000)]
    public string Ten { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? Ma { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string ThuTucId { get; private set; }
    [MaxLength(150)]
    [Column(TypeName = "varchar")]
    public string TruongHopId { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaGiayToKhoQuocGia { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaGiayToThayTheKhoQuocGia { get; private set; }
    [MaxLength(500)]
    public string? DinhKem { get; private set; }
    public bool BatBuoc { get; private set; } = false;
    public int? SoBanChinh { get; private set; }
    public int? SoBanSao { get; private set; }

    public bool? ChoPhepThemToKhai { get; private set; } = false;
    public int? STT { get; private set; }


    public ThanhPhanThuTuc() { }
    public ThanhPhanThuTuc(string ten, string? ma, string thuTucId, string truongHopId, string? maGiayToKhoQuocGia, string? dinhKem, bool batBuoc, int? soBanChinh, int? soBanSao, bool? choPhepThemToKhai = false, int? stt = null)
    {
        Ten = ten;
        Ma = ma;
        ThuTucId = thuTucId;
        TruongHopId = truongHopId;
        MaGiayToKhoQuocGia = maGiayToKhoQuocGia;
        DinhKem = dinhKem;
        BatBuoc = batBuoc;
        SoBanChinh = soBanChinh;
        SoBanSao = soBanSao;
        ChoPhepThemToKhai = choPhepThemToKhai;
        STT = stt;
    }
    public static ThanhPhanThuTuc Create(string ten, string? ma, string thuTucId, string truongHopId, string? maGiayToKhoQuocGia, string? dinhKem, bool batBuoc, int? soBanChinh, int? soBanSao, bool? choPhepThemToKhai = false, int? stt = null)
    {
        return new(ten, ma, thuTucId, truongHopId, maGiayToKhoQuocGia, dinhKem, batBuoc, soBanChinh, soBanSao, choPhepThemToKhai,stt);
    }

    public ThanhPhanThuTuc Update(string? ten, string? ma, string? thuTucId, string? truongHopId, string? maGiayToKhoQuocGia, string? dinhKem, bool? batBuoc, int? soBanChinh, int? soBanSao, bool? choPhepThemToKhai, int? stt)
    {
        if (!string.IsNullOrEmpty(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma))
            Ma = ma;
        if (!string.IsNullOrEmpty(thuTucId))
            ThuTucId = thuTucId;
        if (!string.IsNullOrEmpty(truongHopId))
            TruongHopId = truongHopId;
        if (!string.IsNullOrEmpty(maGiayToKhoQuocGia))
            MaGiayToKhoQuocGia = maGiayToKhoQuocGia;
        DinhKem = dinhKem;
        if (batBuoc != null)
            BatBuoc = (bool)batBuoc;
        if (batBuoc != null)
            SoBanChinh = (int)soBanChinh;
        if (batBuoc != null)
            SoBanSao = (int)soBanSao;
        if (stt != null)
            STT = (int)stt;
        if (choPhepThemToKhai != null)
            ChoPhepThemToKhai = choPhepThemToKhai;
        return this;
    }

    public ThanhPhanThuTuc SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ThanhPhanThuTuc Restore()
    {
        DeletedOn = null;
        return this;
    }
}
