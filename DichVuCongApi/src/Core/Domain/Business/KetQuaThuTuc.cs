using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Business;
public class KetQuaThuTuc : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? MaNhanDienOCR { get; private set; }
    [MaxLength(100)]
    public string? MaKetQua { get; private set; }
    [MaxLength(500)]
    public string? TenKetQua { get; private set; }
    [MaxLength(255)]
    public string? TenTep { get; private set; }
    [MaxLength(500)]
    public string? Url { get; private set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string MaTTHC { get; private set; }
    public string? EFormKetQua { get; private set; }
    public int? ThoiHanMacDinh { get; private set; } = 6;
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? LoaiThoiHan { get; private set; }
    public bool? LaGiayToThongDung { get; private set; } = false;
    [MaxLength(500)]
    public string? DinhKemPhoi { get; private set; }
    public KetQuaThuTuc(string? maNhanDienOCR, string? maKetQua, string? tenKetQua, string? tenTep, string? url, string? maTTHC, string eFormKetQua, int? thoiHanMacDinh, string? loaiThoiHan, bool? laGiayToThongDung)
    {
        MaNhanDienOCR = maNhanDienOCR;
        MaKetQua = maKetQua;
        TenKetQua = tenKetQua;
        TenTep = tenTep;
        Url = url;
        MaTTHC = maTTHC;
        EFormKetQua = eFormKetQua;
        ThoiHanMacDinh = thoiHanMacDinh;
        LoaiThoiHan = loaiThoiHan;
        LaGiayToThongDung = laGiayToThongDung;
    }

    public KetQuaThuTuc Update(string? maNhanDienOCR, string? maKetQua, string? tenKetQua, string? tenTep, string? url, string? maTTHC, string? eFormKetQua, int? thoiHanMacDinh, string? loaiThoiHan, bool? laGiayToThongDung, string? dinhKemPhoi)
    {
        if (maNhanDienOCR != null)
            MaNhanDienOCR = maNhanDienOCR;
        if (maKetQua != null)
            MaKetQua = maKetQua;
        if (tenKetQua != null)
            TenKetQua = tenKetQua;
        if (tenTep != null)
            TenTep = tenTep;
        if (url != null)
            Url = url;
        if (maTTHC != null)
            MaTTHC = maTTHC;
        if (eFormKetQua != null)
            EFormKetQua = eFormKetQua;
        if (thoiHanMacDinh != null)
            ThoiHanMacDinh = thoiHanMacDinh;
        if (loaiThoiHan != null)
            LoaiThoiHan = loaiThoiHan;
        if (laGiayToThongDung != null)
            LaGiayToThongDung = laGiayToThongDung;
        if (dinhKemPhoi != null)
            DinhKemPhoi = dinhKemPhoi;

        return this;
    }
    public KetQuaThuTuc SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public KetQuaThuTuc Restore()
    {
        DeletedOn = null;
        return this;
    }
}

