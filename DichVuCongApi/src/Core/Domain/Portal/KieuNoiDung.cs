using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Portal;
public class KieuNoiDung : BaseEntity<DefaultIdType>, IAggregateRoot
{
    private readonly List<KenhTin> _kenhTins = new();
    [MaxLength(255)]
    public string? TenNoiDung { get; private set; }
    public bool? ChoPhepNhapNoiDung { get; private set; }
    public bool? ChoPhepNhapLoaiLienKet { get; private set; }
    public bool? ChoPhepThemTinBai { get; private set; }

    public DateTime? DeletedOn { get; private set; }
    public DefaultIdType? DeletedBy { get; private set; }
    public IReadOnlyCollection<KenhTin> KenhTins => _kenhTins;

    public KieuNoiDung(string? tenNoiDung, bool? choPhepNhapNoiDung, bool? choPhepNhapLoaiLienKet, bool? choPhepThemTinBai)
    {
        TenNoiDung = tenNoiDung;
        ChoPhepNhapNoiDung = choPhepNhapNoiDung;
        ChoPhepNhapLoaiLienKet = choPhepNhapLoaiLienKet;
        ChoPhepThemTinBai = choPhepThemTinBai;
    }

    public static KieuNoiDung Create(string? tenNoiDung, bool? choPhepNhapNoiDung, bool? choPhepNhapLoaiLienKet, bool? choPhepThemTinBai)
    {
        return new(tenNoiDung, choPhepNhapNoiDung, choPhepNhapLoaiLienKet, choPhepThemTinBai);
    }

    public KieuNoiDung Update(string? tenNoiDung, bool? choPhepNhapNoiDung, bool? choPhepNhapLoaiLienKet, bool? choPhepThemTinBai)
    {
        if (!string.IsNullOrEmpty(tenNoiDung) && !TenNoiDung.Equals(tenNoiDung))
            TenNoiDung = tenNoiDung;
        if (choPhepNhapNoiDung != null)
            ChoPhepNhapNoiDung = choPhepNhapNoiDung;
        if (ChoPhepNhapLoaiLienKet != null)
            ChoPhepNhapLoaiLienKet = choPhepNhapLoaiLienKet;
        if (ChoPhepThemTinBai != null)
            ChoPhepThemTinBai = choPhepThemTinBai;
        return this;
    }
    public KieuNoiDung SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public KieuNoiDung Restore()
    {
        DeletedOn = null;
        return this;
    }
}
