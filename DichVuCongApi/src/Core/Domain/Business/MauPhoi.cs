using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class MauPhoi : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? LoaiPhoi { get; private set; }
    [MaxLength(200)]
    [Column(TypeName = "varchar")]
    public string? Code { get; private set; }
    [MaxLength(500)]
    public string TenMauPhoi { get; private set; }
    [MaxLength(1000)]
    [Column(TypeName = "varchar")]
    public string? MaDonVi { get; private set; }
    [MaxLength(1000)]
    [Column(TypeName = "varchar")]
    public string? MaLinhVuc { get; private set; }
    [MaxLength(1000)]
    [Column(TypeName = "varchar")]
    public string? MaThuTuc { get; private set; }
    [MaxLength(1000)]
    public string? UrlMauPhoi { get; private set; }
    public string? HtmlPhoi { get; private set; }
    public bool? LaPhoiEmail { get; private set; }
    public bool? LaPhoiMacDinh { get; private set; }
    public string? CustomerId { get; set; }

    public MauPhoi() { }
    public MauPhoi( string loaiPhoi, string code, string tenMauPhoi, string? maDonVi, string? maLinhVuc, string? maThuTuc, string? urlMauPhoi, string? htmlPhoi, bool? laPhoiEmail, bool? laPhoiMacDinh, string? customerId)
    {
        LoaiPhoi = loaiPhoi;
        Code = code;
        TenMauPhoi = tenMauPhoi;
        MaDonVi = maDonVi;
        MaLinhVuc = maLinhVuc;
        MaThuTuc = maThuTuc;
        UrlMauPhoi = urlMauPhoi;
        HtmlPhoi = htmlPhoi;
        LaPhoiEmail = laPhoiEmail;
        LaPhoiMacDinh = laPhoiMacDinh;
        CustomerId = customerId;
    }

    public static MauPhoi Create(string loaiPhoi, string code, string tenMauPhoi, string? maDonVi, string? maLinhVuc, string? maThuTuc, string? urlMauPhoi, string? htmlPhoi, bool? laPhoiEmail, bool? laPhoiMacDinh, string? customerId)
    {
        return new MauPhoi(loaiPhoi, code, tenMauPhoi, maDonVi, maLinhVuc, maThuTuc, urlMauPhoi, htmlPhoi, laPhoiEmail, laPhoiMacDinh, customerId);
    }

    public MauPhoi Update(string? loaiPhoi, string? code, string? tenMauPhoi, string? maDonVi, string? maLinhVuc, string? maThuTuc, string? urlMauPhoi, string? htmlPhoi, bool? laPhoiEmail, bool? laPhoiMacDinh)
    {
        LoaiPhoi = !string.IsNullOrEmpty(loaiPhoi) ? loaiPhoi : LoaiPhoi;
        Code = !string.IsNullOrEmpty(code) ? code : Code;
        TenMauPhoi = !string.IsNullOrEmpty(tenMauPhoi) ? tenMauPhoi : TenMauPhoi;
        MaDonVi = !string.IsNullOrEmpty(maDonVi) ? maDonVi : null;
        MaLinhVuc = !string.IsNullOrEmpty(maLinhVuc) ? maLinhVuc : null;
        MaThuTuc = !string.IsNullOrEmpty(maThuTuc) ? maThuTuc : null;
        UrlMauPhoi = !string.IsNullOrEmpty(urlMauPhoi) ? urlMauPhoi : null;
        HtmlPhoi = !string.IsNullOrEmpty(htmlPhoi) ? htmlPhoi : null;
        if (laPhoiEmail != null)
            LaPhoiEmail = (bool)laPhoiEmail;
        if (laPhoiMacDinh != null)
            LaPhoiMacDinh = (bool)laPhoiMacDinh;
        return this;
    }

    public MauPhoi SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public MauPhoi Restore()
    {
        DeletedOn = null;
        return this;
    }
}
