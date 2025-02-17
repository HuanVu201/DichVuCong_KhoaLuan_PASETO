using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Domain.Portal;
public class APIChiaSe : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(200)]
    [Column(TypeName = "varchar")]
    public string MaApiChiaSe { get; set; }
    [MaxLength(500)]
    public string TenApiChiaSe { get; set; }
    [MaxLength(1000)]
    [Column(TypeName = "nvarchar")]
    public string? NoiDung { get; set; }
    public int? GioiHan { get; set; }
    [MaxLength(1000)]
    [Column(TypeName = "varchar")]
    public string? DuongDan { get; set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? NgayGoi { get; set; }
    public int? SoLuotGoiTrongNgay { get; set; }
    public string? ThamSoDauVao { get; set; }
    public string? ThamSoDauRa { get; set; }
    public string? HuongDanGoi { get; set; }

    public APIChiaSe() { }
    public APIChiaSe(string? maApiChiaSe, string? tenApiChiaSe, string? noiDung, int? gioiHan, string? duongDan, string? ngayGoi, int? soLuotGoiTrongNgay, string? thamSoDauVao, string? thamSoDauRa, string? huongDanGoi)
    {
        MaApiChiaSe = maApiChiaSe;
        TenApiChiaSe = tenApiChiaSe;
        NoiDung = noiDung;
        GioiHan = gioiHan;
        DuongDan = duongDan;
        NgayGoi = ngayGoi;
        SoLuotGoiTrongNgay = soLuotGoiTrongNgay;
        ThamSoDauVao = thamSoDauVao;
        ThamSoDauRa = thamSoDauRa;
        HuongDanGoi = huongDanGoi;
    }

    public static APIChiaSe Create(string? maApiChiaSe, string? tenApiChiaSe, string? noiDung, int? gioiHan, string? duongDan, string? ngayGoi, int? soLuotGoiTrongNgay, string? thamSoDauVao, string? thamSoDauRa, string? huongDanGoi)
    {
        return new APIChiaSe(maApiChiaSe, tenApiChiaSe, noiDung, gioiHan, duongDan, ngayGoi, soLuotGoiTrongNgay, thamSoDauVao, thamSoDauRa, huongDanGoi);
    }

    public APIChiaSe Update(string? maApiChiaSe, string? tenApiChiaSe, string? noiDung, int? gioiHan, string? duongDan, string? ngayGoi, int? soLuotGoiTrongNgay, string? thamSoDauVao, string? thamSoDauRa, string? huongDanGoi)
    {
        MaApiChiaSe = !string.IsNullOrEmpty(maApiChiaSe) ? maApiChiaSe : MaApiChiaSe;
        TenApiChiaSe = !string.IsNullOrEmpty(tenApiChiaSe) ? tenApiChiaSe : TenApiChiaSe;
        NoiDung = !string.IsNullOrEmpty(noiDung) ? noiDung : NoiDung;
        if (gioiHan.HasValue)
        {
            GioiHan = gioiHan;
        }
        DuongDan = !string.IsNullOrEmpty(duongDan) ? duongDan : DuongDan;
        NgayGoi = !string.IsNullOrEmpty(ngayGoi) ? ngayGoi : NgayGoi;
        ThamSoDauVao = !string.IsNullOrEmpty(thamSoDauVao) ? thamSoDauVao : ThamSoDauVao;
        ThamSoDauRa = !string.IsNullOrEmpty(thamSoDauRa) ? thamSoDauRa : ThamSoDauRa;
        HuongDanGoi = !string.IsNullOrEmpty(huongDanGoi) ? huongDanGoi : HuongDanGoi;
        if (soLuotGoiTrongNgay.HasValue)
        {
            SoLuotGoiTrongNgay = soLuotGoiTrongNgay;
        }

        return this;
    }

    public APIChiaSe SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public APIChiaSe Restore()
    {
        DeletedOn = null;
        return this;
    }
}