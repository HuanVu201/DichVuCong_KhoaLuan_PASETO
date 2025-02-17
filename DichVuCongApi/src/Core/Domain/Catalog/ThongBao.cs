using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace TD.DichVuCongApi.Domain.Catalog;
public class ThongBao : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(250)]
    public string TieuDe { get; private set; }
    [MaxLength(2000)]
    public string NoiDung { get; private set; }
    [MaxLength(200)]
    public string? TepDinhKem { get; private set; }
    public Guid DonViId { get; private set; }
    public bool ToanHeThong { get; private set; }
    public bool QuanTrong { get; private set; }
    public bool SuDung { get; private set; }

    public ThongBao() { }

    public ThongBao(string tieuDe, string noiDung, string? tepDinhKem, Guid donViId, bool toanHeThong, bool quanTrong, bool suDung)
    {
        TieuDe = tieuDe;
        NoiDung = noiDung;
        TepDinhKem = tepDinhKem;
        DonViId = donViId;
        ToanHeThong = toanHeThong;
        QuanTrong = quanTrong;
        SuDung = suDung;
    }

    public static ThongBao Create(string tieuDe, string noiDung, string? tepDinhKem, DefaultIdType donViId, bool toanHeThong, bool quanTrong, bool suDung)
    {
        return new(tieuDe, noiDung, tepDinhKem, donViId, toanHeThong, quanTrong, suDung);
    }
    public ThongBao Update(string tieuDe, string noiDung, string? tepDinhKem, DefaultIdType donViId, bool toanHeThong, bool quanTrong, bool suDung)
    {
        if (donViId != null && donViId != default)
            DonViId = (Guid)donViId;
        if (!string.IsNullOrEmpty(tieuDe) && !TieuDe.Equals(tieuDe))
            TieuDe = tieuDe;
        if (!string.IsNullOrEmpty(noiDung) && !NoiDung.Equals(noiDung))
            NoiDung = noiDung;
        if (!string.IsNullOrEmpty(tepDinhKem) && !TepDinhKem.Equals(tepDinhKem))
            TepDinhKem = tepDinhKem;
        if (toanHeThong != null)
            ToanHeThong = (bool)toanHeThong;
        if (quanTrong != null)
            QuanTrong = (bool)quanTrong;
        if (suDung != null)
            SuDung = (bool)suDung;
        SuDung = suDung;
        return this;
    }
    public ThongBao SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ThongBao Restore()
    {
        DeletedOn = null;
        return this;
    }
}
