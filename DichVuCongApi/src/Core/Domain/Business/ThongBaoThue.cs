using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class ThongBaoThue : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    public DefaultIdType HoSoId { get; set; }
    [MaxLength(50)]
    public string Nguon { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string MaSoThue { get; set; }
    public double? SoTien { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string SoQuyetDinh { get; set; }
    public DateTime NgayQuyetDinh { get; set; }
    [MaxLength(1000)]
    public string? TenTieuMuc { get; set; }
    [MaxLength(500)]
    public string DuongDanTBT { get; set; }
    public string HoTen { get; set; }
    public ThongBaoThue(DefaultIdType hoSoId, string nguon, string maSoThue, string soQuyetDinh, DateTime ngayQuyetDinh, string? tenTieuMuc, double? soTien)
    {
        HoSoId = hoSoId;
        Nguon = nguon;
        MaSoThue = maSoThue;
        SoQuyetDinh = soQuyetDinh;
        NgayQuyetDinh = ngayQuyetDinh;
        TenTieuMuc = tenTieuMuc;
        SoTien = soTien;
    }

    public ThongBaoThue Update(string? nguon, string? maSoThue, string? soQuyetDinh, DateTime? ngayQuyetDinh, string? tenTieuMuc, double? soTien)
    {
        if (!string.IsNullOrEmpty(nguon))
            Nguon = nguon.Trim();
        if (!string.IsNullOrEmpty(maSoThue))
            MaSoThue = maSoThue.Trim();
        if (!string.IsNullOrEmpty(soQuyetDinh))
            SoQuyetDinh = soQuyetDinh.Trim();
        if (ngayQuyetDinh.HasValue)
            NgayQuyetDinh = ngayQuyetDinh ?? NgayQuyetDinh;
        if (!string.IsNullOrEmpty(tenTieuMuc))
            TenTieuMuc = tenTieuMuc.Trim();
        if (soTien.HasValue && soTien >= 0)
            SoTien = soTien.Value;

        return this;
    }

    public void SetThongBaoThueILIS(string duongDanTBT, string? hoTen)
    {
        DuongDanTBT = duongDanTBT;
        HoTen = hoTen?.Trim() ?? string.Empty;
    }

    public ThongBaoThue SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ThongBaoThue Restore()
    {
        DeletedOn = null;
        return this;
    }

    public static class NguonThue
    {
        public const string TongCucThue = "1";
        public const string TuCapNhat = "2";
        public const string DatDai = "3";
    }
}
