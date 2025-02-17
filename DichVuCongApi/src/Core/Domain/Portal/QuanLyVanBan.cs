using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Portal;
public class QuanLyVanBan : BaseEntity<DefaultIdType>, IAggregateRoot
{
    public string SoKyHieu { get; private set; }
    public DateTime? NgaybanHanh { get; private set; }
    public string LoaiVanBan { get; private set; }
    public bool? CongKhai { get; private set; } = false;
    public int? ThuTu { get; private set; } = 1;
    public string TrichYeu { get; private set; } 
    public string? FileDinhKem { get; private set; } 
    public string MaLinhVuc { get; private set; } 
    public string CoQuanBanHanh { get; private set; } 

    public DateTime? DeletedOn { get; set; }
    public DefaultIdType? DeletedBy { get; set; }
    public QuanLyVanBan() { }
    public QuanLyVanBan(string soKyHieu, DateTime? ngayBanHanh, string loaiVanBan, bool? congKhai, int? thuTu, string trichYeu,string? fileDinhKem,string maLinhVuc, string coQuanBanHanh)
    {
        SoKyHieu = soKyHieu;
        NgaybanHanh = ngayBanHanh;
        LoaiVanBan = loaiVanBan;
        CongKhai = congKhai;
        ThuTu = thuTu;
        TrichYeu = trichYeu;
        FileDinhKem = fileDinhKem;
        MaLinhVuc = maLinhVuc;
        CoQuanBanHanh = coQuanBanHanh;
    }

    public static QuanLyVanBan Create(string soKyHieu, DateTime? ngayBanHanh, string loaiVanBan, bool? congKhai, int? thuTu, string trichYeu, string? fileDinhKem, string maLinhVuc, string coQuanBanHanh)
    {
        return new(soKyHieu, ngayBanHanh, loaiVanBan, congKhai, thuTu, trichYeu, fileDinhKem, maLinhVuc, coQuanBanHanh);
    }

    public QuanLyVanBan Update(string? soKyHieu, DateTime? ngayBanHanh, string? loaiVanBan, bool? congKhai, int? thuTu, string? trichYeu, string? fileDinhKem, string? maLinhVuc, string? coQuanBanHanh)
    {
        if (!string.IsNullOrEmpty(soKyHieu) && !SoKyHieu.Equals(soKyHieu))
            SoKyHieu = soKyHieu;
        if (!string.IsNullOrEmpty(loaiVanBan) && !LoaiVanBan.Equals(loaiVanBan))
            LoaiVanBan = loaiVanBan;
        if (!string.IsNullOrEmpty(trichYeu) && !TrichYeu.Equals(trichYeu))
            TrichYeu = trichYeu;
        if (!string.IsNullOrEmpty(fileDinhKem) && !FileDinhKem.Equals(fileDinhKem))
            FileDinhKem = fileDinhKem;
        if (!string.IsNullOrEmpty(maLinhVuc) && !MaLinhVuc.Equals(maLinhVuc))
            MaLinhVuc = maLinhVuc;
        if (!string.IsNullOrEmpty(coQuanBanHanh) && !CoQuanBanHanh.Equals(coQuanBanHanh))
            CoQuanBanHanh = coQuanBanHanh;
        if (congKhai != null)
            CongKhai = congKhai;
        if (ngayBanHanh != null)
            NgaybanHanh = (DateTime)ngayBanHanh;
        if (thuTu != null)
            ThuTu = thuTu;
        return this;
    }
    public QuanLyVanBan SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public QuanLyVanBan Restore()
    {
        DeletedOn = null;
        return this;
    }
}
