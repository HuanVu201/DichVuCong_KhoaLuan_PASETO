using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Portal;
public class TrangThai : BaseEntity<DefaultIdType>, IAggregateRoot
{
    private readonly List<TinBai> _tinBais = new();
    [MaxLength(255)]
    public string TenTrangThai { get; private set; }
    public int ThuTu { get; private set; } = int.MaxValue;
    public bool HienThiTrangChu { get; private set; }
    public DateTime? DeletedOn { get; private set; }
    public DefaultIdType? DeletedBy { get; private set; }
    public IReadOnlyCollection<TinBai> TinBais => _tinBais;
    public TrangThai() { }

    public TrangThai(string tenTrangThai, int thuTu, bool hienThiTrangChu)
    {
        TenTrangThai = tenTrangThai;
        ThuTu = thuTu;
        HienThiTrangChu = hienThiTrangChu;
    }

    public static TrangThai Create(string tenTrangThai, int thuTu, bool hienThiTrangChu)
    {
        return new(tenTrangThai, thuTu, hienThiTrangChu);
    }

    public TrangThai Update(string? tenTrangThai, int? thuTu, bool? hienThiTrangChu)
    {
        if (!string.IsNullOrEmpty(tenTrangThai) && !TenTrangThai.Equals(tenTrangThai))
            TenTrangThai = tenTrangThai;
        if (thuTu != null)
            ThuTu = (int)thuTu;
        if (hienThiTrangChu != null)
            HienThiTrangChu = (bool)hienThiTrangChu;
        return this;
    }
    public TrangThai SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public TrangThai Restore()
    {
        DeletedOn = null;
        return this;
    }
}
