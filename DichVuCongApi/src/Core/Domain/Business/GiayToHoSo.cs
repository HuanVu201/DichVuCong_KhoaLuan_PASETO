using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection.Metadata;

namespace TD.DichVuCongApi.Domain.Business;
public class GiayToHoSo : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string? MaHoSo { get; private set; }
    [MaxLength(200)]
    public string? LoaiGiayTo { get; private set; }
    [MaxLength(200)]
    public string? NguoiXuatPhieu { get; private set; }
    public DateTime? NgayXuatPhieu { get; private set; }
    public bool? SuDung { get; private set; }
    [MaxLength(4000)]
    public string? MaGiayTo { get; private set; }
    public string? DocxPhieu { get; private set; }
    public string? PDFPhieu { get; private set; }
    [MaxLength(200)]
    public string? HinhAnhChuKyCongDan { get; private set; }
    public DateTime? NgayKySo { get; private set; }
    [MaxLength(200)]
    public string? NguoiKySo { get; private set; }
    public DateTime? NgayGuiCongDan { get; private set; }
    [MaxLength(100)]
    public string? TrangThaiGuiCongDan { get; private set; }
    [MaxLength(200)]
    public string? NguoiGuiCongDan { get; private set; }
   
    public GiayToHoSo() { }
    public GiayToHoSo(string? maHoSo, string? loaiGiayTo, string? nguoiXuatPhieu, DateTime? ngayXuatPhieu, bool? suDung, string? maGiayTo, string? docxPhieu, string? pdfPhieu,
        string? hinhAnhChuKyCongDan, DateTime? ngayKySo, string? nguoiKySo, DateTime? ngayGuiCongDan, string? trangThaiGuiCongDan, string? nguoiGuiCongDan)
    {
        MaHoSo = maHoSo;
        LoaiGiayTo = loaiGiayTo;
        NguoiXuatPhieu = nguoiXuatPhieu;
        NgayXuatPhieu = ngayXuatPhieu;
        SuDung = suDung;
        MaGiayTo = maGiayTo;
        DocxPhieu = docxPhieu;
        PDFPhieu = pdfPhieu;
        HinhAnhChuKyCongDan = hinhAnhChuKyCongDan;
        NgayKySo = ngayKySo;
        NguoiKySo = nguoiKySo;
        NgayGuiCongDan = ngayGuiCongDan;
        TrangThaiGuiCongDan = trangThaiGuiCongDan;
        NguoiGuiCongDan = nguoiGuiCongDan;
    }
    public static GiayToHoSo Create(string? maHoSo, string? loaiGiayTo, string? nguoiXuatPhieu, DateTime? ngayXuatPhieu, bool? suDung, string? maGiayTo, string? docxPhieu, string? pdfPhieu,
        string? hinhAnhChuKyCongDan, DateTime? ngayKySo, string? nguoiKySo, DateTime? ngayGuiCongDan, string? trangThaiGuiCongDan, string? nguoiGuiCongDan)
    {
        return new(maHoSo, loaiGiayTo, nguoiXuatPhieu, ngayXuatPhieu, suDung, maGiayTo, docxPhieu, pdfPhieu, hinhAnhChuKyCongDan, ngayKySo, nguoiKySo, ngayGuiCongDan, trangThaiGuiCongDan, nguoiGuiCongDan);
    }
    public GiayToHoSo Update(bool? suDung, string? pdfPhieu, string? docxPhieu, string? hinhAnhChuKyCongDan, DateTime? ngayKySo, string? nguoiKySo, DateTime? ngayGuiCongDan, string? trangThaiGuiCongDan, string? nguoiGuiCongDan)
    {
        if (suDung != null)
            SuDung = (bool)suDung;
        if (!string.IsNullOrEmpty(pdfPhieu))
            PDFPhieu = pdfPhieu;
        if (!string.IsNullOrEmpty(docxPhieu))
            DocxPhieu = docxPhieu;
        if (!string.IsNullOrEmpty(hinhAnhChuKyCongDan))
            HinhAnhChuKyCongDan = hinhAnhChuKyCongDan;
        if (ngayKySo != null)
            NgayKySo = ngayKySo;
        if (!string.IsNullOrEmpty(nguoiKySo))
            NguoiKySo = nguoiKySo;
        if (ngayGuiCongDan != null)
            NgayGuiCongDan = ngayGuiCongDan;
        if (!string.IsNullOrEmpty(trangThaiGuiCongDan))
            TrangThaiGuiCongDan = trangThaiGuiCongDan;
        if (!string.IsNullOrEmpty(nguoiGuiCongDan))
            NguoiGuiCongDan = nguoiGuiCongDan;

        return this;
    }
    public GiayToHoSo SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public GiayToHoSo Restore()
    {
        DeletedOn = null;
        return this;
    }
}
