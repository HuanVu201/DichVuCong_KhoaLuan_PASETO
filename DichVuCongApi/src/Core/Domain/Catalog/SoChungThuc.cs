using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Business;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Catalog;
public class SoChungThuc : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string DonVi { get; private set; }
    [MaxLength(256)]
    public string? TenSo { get; private set; }
    public int SoBatDau { get; private set; }
    public int SoHienTai { get; private set; }
    public DateTime? NgayBatDau { get; private set; }
    public DateTime? NgayDongSo { get; private set; }
    public bool? TrangThai { get; private set; } = false;
    /// <summary>
    /// Sổ bản giấy, bản điện tử
    /// </summary>
    [MaxLength(20)]
    public string Loai { get; private set; }
    public readonly string tenSuffixDT = "-SCTĐT/BS";
    public readonly string tenSuffixG = "-SCT/BS";
    public SoChungThuc() { }
    public string GetTenSuffix(string? loai)
    {
        if (string.IsNullOrEmpty(loai))
        {
            return "";
        }
        string suffix = string.Empty;
        if (loai == SoChungThucConstant.Loai_Giay)
        {
            suffix += tenSuffixG;
        }
        else if (loai == SoChungThucConstant.Loai_DienTu)
        {
            suffix += tenSuffixDT;
        }
        return suffix;
    }
    public SoChungThuc(string? donVi, string? tenSo, int soBatDau, int soHienTai, DateTime? ngayBatDau,DateTime? ngayDongSo,bool? trangThai, string loai)
    {
        DonVi = donVi;
        string loaiSo = GetTenSuffix(loai);
        //if (tenSo.ToLower().EndsWith(loaiSo))
        //{
        //    TenSo = tenSo;
        //} else
        //{
        //    TenSo = tenSo + loaiSo;
        //}
        TenSo = tenSo;
        SoBatDau = soBatDau;
        SoHienTai = soHienTai;
        NgayBatDau = ngayBatDau;
        NgayDongSo = ngayDongSo;
        TrangThai = trangThai;
        Loai = loai;
    }
    public SoChungThuc Update(string? donVi, string? tenSo, int? soBatDau, int? soHienTai, DateTime? ngayBatDau, DateTime? ngayDongSo, bool? trangThai, string? loai)
    {
        if (!string.IsNullOrEmpty(donVi))
            DonVi = donVi;
        //if (!string.IsNullOrEmpty(tenSo) && !string.IsNullOrEmpty(loai))
        //{
        //    string loaiSo = GetTenSuffix(loai);
        //    if (tenSo.ToLower().EndsWith(loaiSo))
        //    {
        //        TenSo = tenSo;
        //    }
        //    else
        //    {
        //        TenSo = tenSo + loaiSo;
        //    }
        //}
        if (!string.IsNullOrEmpty(tenSo))
        {
            TenSo = tenSo;
        }
        if (soBatDau != null)
            SoBatDau = (int)soBatDau;
        if (soHienTai != null)
            SoHienTai = (int)soHienTai;
        if (ngayBatDau != null)
            NgayBatDau = ngayBatDau;
        if (ngayDongSo != null)
            NgayDongSo = ngayDongSo;
        if (trangThai != null)
            TrangThai = (bool)trangThai;
        if (!string.IsNullOrEmpty(loai))
            Loai = loai;
        return this;
    }
    public SoChungThuc SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public SoChungThuc Restore()
    {
        DeletedOn = null;
        return this;
    }

}

public static class SoChungThucConstant
{
    public static string Loai_Giay = "Giấy";
    public static string Loai_DienTu = "Điện tử";
}
