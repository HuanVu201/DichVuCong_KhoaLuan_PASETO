using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Portal;
public class CauHoiPhoBien : BaseEntity<DefaultIdType>, IAggregateRoot
{
    public string TieuDe { get; private set; }
    public string? Type {  get; private set; }
    public string? NoiDungCauHoi { get; private set; }
    public string? NoiDungTraLoi { get; private set; }
    public DateTime? DeletedOn { get; private set; }
    public DefaultIdType? DeletedBy { get; private set; }

    public CauHoiPhoBien() { }
    public CauHoiPhoBien(string tieuDe, string noiDungCauHoi, string noiDungTraLoi, string? type)
    {
        NoiDungCauHoi = noiDungCauHoi;
        NoiDungTraLoi = noiDungTraLoi;
        TieuDe = tieuDe;
        Type = type;
    }


    public static CauHoiPhoBien Create(string tieuDe, string noiDungCauHoi, string? noiDungTraLoi, string? type)
    {
        return new(tieuDe, noiDungCauHoi, noiDungTraLoi,type);
    }

    public CauHoiPhoBien Update(string? tieuDe, string? noiDungCauHoi, string? noiDungTraLoi,string? type)
    {
        if (!string.IsNullOrEmpty(tieuDe) && !TieuDe.Equals(tieuDe))
            TieuDe = tieuDe;
        if (!string.IsNullOrEmpty(noiDungTraLoi) && !NoiDungTraLoi.Equals(noiDungTraLoi))
            NoiDungTraLoi = noiDungTraLoi;
        if (!string.IsNullOrEmpty(noiDungCauHoi) && !NoiDungCauHoi.Equals(noiDungCauHoi))
            NoiDungCauHoi = noiDungCauHoi;
        if (!string.IsNullOrEmpty(type) && !Type.Equals(type))
            Type = type;
        return this;
    }
    public CauHoiPhoBien SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public CauHoiPhoBien Restore()
    {
        DeletedOn = null;
        return this;
    }
}
