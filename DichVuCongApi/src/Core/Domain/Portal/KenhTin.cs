
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace TD.DichVuCongApi.Domain.Portal;
public class KenhTin : BaseEntity<DefaultIdType>, IAggregateRoot
{
    private readonly List<TinBai> _tinBais = new();

    [MaxLength(255)]
    public string TenKenhTin { get; private set; }
    public Nullable<Guid> MaKenhTinCha { get; private set; }
    public KenhTin KenhTinCha { get; private set; }
    [MaxLength(500)]
    public string? TomTat { get; private set; }
    public int ThuTu { get; private set; } = int.MaxValue;
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? ImageUrl { get; private set; }
    [ForeignKey("KieuNoiDung")]
    public Guid KieuNoiDungId { get; private set; }
    public KieuNoiDung KieuNoiDung { get; private set; }
    public bool? HienThiMenuChinh { get; private set; }
    public bool? HienThiMenuDoc { get; private set; }
    public bool? HienThiMenuPhu { get; private set; }
    public string? NoiDung { get; private set; }
    [MaxLength(30)]
    public string? LoaiMoLienKet { get; private set; }
    [MaxLength(255)]
    public string? LienKetNgoai { get; private set; }
    public DateTime? DeletedOn { get; private set; }
    public DefaultIdType? DeletedBy { get; private set; }
    public IReadOnlyCollection<TinBai> TinBais => _tinBais;

    public KenhTin()
    {

    }

    public KenhTin(string tenKenhTin, Nullable<Guid> maKenhTinCha, string tomTat, int thuTu, string imageUrl, Guid kieuNoiDungId,
        bool? hienThiMenuChinh, bool? hienThiMenuDoc, bool? hienThiMenuPhu, string noiDung, string? loaiMoLienKet, string? lienKetNgoai)
    {
        TenKenhTin = tenKenhTin;
        MaKenhTinCha = maKenhTinCha;
        TomTat = tomTat;
        ThuTu = thuTu;
        ImageUrl = imageUrl;
        KieuNoiDungId = kieuNoiDungId;
        HienThiMenuChinh = hienThiMenuChinh;
        HienThiMenuDoc = hienThiMenuDoc;
        HienThiMenuPhu = hienThiMenuPhu;
        NoiDung = noiDung;
        LoaiMoLienKet = loaiMoLienKet;
        LienKetNgoai = lienKetNgoai;
    }

    public static KenhTin Create(string tenKenhTin, Nullable<Guid> maKenhTinCha, string tomTat, int thuTu, string imageUrl, Guid kieuNoiDungId,
        bool? hienThiMenuChinh, bool? hienThiMenuDoc, bool? hienThiMenuPhu, string noiDung, string? loaiMoLienKet, string? lienKetNgoai)
    {
        return new(tenKenhTin, maKenhTinCha, tomTat, thuTu, imageUrl, kieuNoiDungId,
         hienThiMenuChinh, hienThiMenuDoc, hienThiMenuPhu, noiDung, loaiMoLienKet, lienKetNgoai);
    }

    public KenhTin Update(string? tenKenhTin, Nullable<Guid> maKenhTinCha, string? tomTat, int? thuTu, string? imageUrl, Nullable<Guid> kieuNoiDungId,
        bool? hienThiMenuChinh, bool? hienThiMenuDoc, bool? hienThiMenuPhu, string noiDung, string? loaiMoLienKet, string? lienKetNgoai)
    {
        if (!string.IsNullOrEmpty(tenKenhTin) && !TenKenhTin.Equals(tenKenhTin))
            TenKenhTin = tenKenhTin;
        if (maKenhTinCha != null && !MaKenhTinCha.Equals(maKenhTinCha))
            MaKenhTinCha = maKenhTinCha;
        if (!string.IsNullOrEmpty(tomTat) && !TomTat.Equals(tomTat))
            TomTat = tomTat;
        if (thuTu != null)
            ThuTu = (int)thuTu;
        if (!string.IsNullOrEmpty(imageUrl) && !ImageUrl.Equals(imageUrl))
            ImageUrl = imageUrl;
        if (kieuNoiDungId != null && !KieuNoiDungId.Equals(kieuNoiDungId))
            KieuNoiDungId = (Guid)kieuNoiDungId;
        if (hienThiMenuChinh != null && HienThiMenuChinh != hienThiMenuChinh)
            HienThiMenuChinh = hienThiMenuChinh;
        if (hienThiMenuDoc != null && HienThiMenuDoc != hienThiMenuDoc)
            HienThiMenuDoc = hienThiMenuDoc;
        if (hienThiMenuPhu != null && HienThiMenuPhu != hienThiMenuPhu)
            HienThiMenuPhu = hienThiMenuPhu;
        if (!string.IsNullOrEmpty(noiDung))
            NoiDung = noiDung;
        if (!string.IsNullOrEmpty(loaiMoLienKet))
            LoaiMoLienKet = loaiMoLienKet;
        if (!string.IsNullOrEmpty(lienKetNgoai))
            LienKetNgoai = lienKetNgoai;
        return this;
    }

    public KenhTin SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public KenhTin Restore()
    {
        DeletedOn = null;
        return this;
    }
}
