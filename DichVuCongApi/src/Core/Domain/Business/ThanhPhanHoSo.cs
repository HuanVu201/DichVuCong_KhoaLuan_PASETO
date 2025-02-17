using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business;
public class ThanhPhanHoSo : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(7000)]
    public string? Ten { get; private set; }
    [MaxLength(50)]
    public string? HoSo { get; private set; }
    public int? SoBanChinh { get; private set; }
    public int?SoBanSao { get; private set; }
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? MaGiayToKhoQuocGia { get; private set; }
    public string? DinhKem { get; private set; }
    public bool? NhanBanGiay { get; private set; }
    [MaxLength(200)]
    public string? MaGiayToSoHoa { get; private set; }
    [MaxLength(100)]
    public string? TrangThaiSoHoa { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaGiayTo { get; private set; }
    public bool? DuocLayTuKhoDMQuocGia { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaKetQuaThayThe { get; private set; }
    [MaxLength(500)]
    public string? NoiDungBoSung { get; private set; }
    #region Chứng thực
    public int? SoTrang { get; private set; }
    public int? SoBanGiay { get; private set; }
    /// <summary>
    /// thực hiện ký điện tử giấy tờ này thay vì đóng dấu tay
    /// </summary>
    public bool? KyDienTuBanGiay { get; private set; } = false;
    /// <summary>
    /// dùng với KyDienTuBanGiay để xem giấy tờ này đã ký chưa
    /// </summary>
    public bool? DaChungThucDienTu { get; private set; }
    public string? TrangThaiDuyet { get; private set; }
    /// <summary>
    /// Số chứng thực Giấy
    /// </summary>
    public int? SoChungThucGiay { get; private set; }
    public Guid? NguoiKyChungThuc { get; private set; }
    /// <summary>
    /// Sổ chứng thực giấy
    /// </summary>
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public Guid? SoChungThucG { get; private set; }
    /// <summary>
    /// Số chứng thực Giấy
    /// </summary>
    public int? SoChungThucDienTu { get; private set; }
    /// <summary>
    /// Sổ chứng thực điện từ
    /// </summary>
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public Guid? SoChungThucDT { get; private set; }

    public string? DinhKemGoc { get; private set; }
    #endregion
    public ThanhPhanHoSo() { }

    /// <summary>
    /// Chứng thực 
    /// </summary>
    /// <param name="ten"></param>
    /// <param name="soTrang"></param>
    /// <param name="soBanGiay"></param>
    /// <param name="kyDienTuBanGiay"></param>
    /// <param name="dinhKem"></param>
    /// <param name="maHoSo"></param>
    public ThanhPhanHoSo(string? ten, int? soTrang, int? soBanGiay, bool? kyDienTuBanGiay, string? dinhKem, string maHoSo)
    {
        HoSo = maHoSo;
        Ten = ten;
        SoTrang = soTrang;
        SoBanGiay = soBanGiay;
        KyDienTuBanGiay = kyDienTuBanGiay;
        DinhKem = dinhKem;
    }
       
    public ThanhPhanHoSo(string? ten, string? hoSo, int? soBanChinh, int? soBanSao, string? maGiayToKhoQuocGia, string? dinhKem, bool? nhanBanGiay, string? maGiayToSoHoa, string? trangThaiSoHoa, string? maGiayTo, bool? duocLayTuKhoDMQuocGia, string? maKetQuaThayThe, int? soTrang, int? soBanGiay, bool? kyDienTuBanGiay, string? trangThaiDuyet)
    {
        Ten = ten;
        HoSo = hoSo;
        SoBanChinh = soBanChinh;
        SoBanSao = soBanSao;
        MaGiayToKhoQuocGia = maGiayToKhoQuocGia;
        DinhKem = dinhKem;
        NhanBanGiay = nhanBanGiay;
        MaGiayToSoHoa = maGiayToSoHoa;
        TrangThaiSoHoa = trangThaiSoHoa;
        MaGiayTo = maGiayTo;
        DuocLayTuKhoDMQuocGia = duocLayTuKhoDMQuocGia;
        MaKetQuaThayThe = maKetQuaThayThe;
        SoTrang = soTrang;
        SoBanGiay = soBanGiay;
        KyDienTuBanGiay = kyDienTuBanGiay;
        TrangThaiDuyet = trangThaiDuyet;
    }
    public static ThanhPhanHoSo Create(string? ten, string? hoSo, int? soBanChinh, int? soBanSao, string? maGiayToKhoQuocGia, string? dinhKem, bool? nhanBanGiay, string? maGiayToSoHoa, string? trangThaiSoHoa, string? maGiayTo, bool? duocLayTuKhoDMQuocGia, string? maKetQuaThayThe, int? soTrang, int? soBanGiay, bool? kyDienTuBanGiay, string? trangThaiDuyet)
    {
        return new(ten,hoSo,soBanChinh,soBanSao,maGiayToKhoQuocGia,dinhKem,nhanBanGiay,maGiayToSoHoa,trangThaiSoHoa,maGiayTo,duocLayTuKhoDMQuocGia,maKetQuaThayThe, soTrang, soBanGiay, kyDienTuBanGiay, trangThaiDuyet);
    }
    public ThanhPhanHoSo Update(string? ten, string? hoSo, int? soBanChinh, int? soBanSao, string? maGiayToKhoQuocGia, string? dinhKem, bool? nhanBanGiay, string? maGiayToSoHoa, string? trangThaiSoHoa, string? maGiayTo, bool? duocLayTuKhoDMQuocGia, string? maKetQuaThayThe, string? trangThaiDuyet)
    {
        if (!string.IsNullOrEmpty(ten) && !Ten.Equals(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(hoSo) && !HoSo.Equals(hoSo))
            HoSo =  hoSo;
        if (!string.IsNullOrEmpty(dinhKem) && !DinhKem.Equals(dinhKem))
            DinhKem = dinhKem;
        if (!string.IsNullOrEmpty(maGiayTo) && !MaGiayTo.Equals(maGiayTo))
            MaGiayTo = maGiayTo;
        if (!string.IsNullOrEmpty(maGiayToKhoQuocGia) && !MaGiayToKhoQuocGia.Equals(maGiayToKhoQuocGia))
            MaGiayToKhoQuocGia = maGiayToKhoQuocGia;
        if (!string.IsNullOrEmpty(maKetQuaThayThe) && ! MaKetQuaThayThe.Equals(maKetQuaThayThe))
            MaKetQuaThayThe = maKetQuaThayThe;
        if (!string.IsNullOrEmpty(maGiayToSoHoa) && !MaGiayToSoHoa.Equals(maGiayToSoHoa))
            MaGiayToSoHoa = maGiayToSoHoa;
        if (!string.IsNullOrEmpty(dinhKem) && !DinhKem.Equals(dinhKem))
            DinhKem = dinhKem;
        if (!string.IsNullOrEmpty(trangThaiSoHoa) && !TrangThaiSoHoa.Equals(trangThaiSoHoa))
            TrangThaiSoHoa = trangThaiSoHoa;
        if (duocLayTuKhoDMQuocGia != null)
            DuocLayTuKhoDMQuocGia = (bool)duocLayTuKhoDMQuocGia;
        if (nhanBanGiay != null)
            NhanBanGiay = (bool)nhanBanGiay;
        if (soBanChinh != null)
            SoBanChinh = (int)soBanChinh;
        if (soBanSao != null)
            SoBanSao = (int)soBanSao;
        if (trangThaiDuyet != null)
            TrangThaiDuyet = trangThaiDuyet;
        return this;
    }
    public ThanhPhanHoSo SetDinhKemGoc (string dinhKemGoc)
    {
        DinhKemGoc = dinhKemGoc;
        return this;
    }
    public ThanhPhanHoSo SetDinhKem(string dinhKem)
    {
        DinhKem = dinhKem;
        return this;
    }
    public ThanhPhanHoSo UpdateTiepNhanChungThuc(string? maGiayTo, string? ten, int? soTrang, int? soBanGiay, bool? kyDienTuBanGiay, string? dinhKem)
    {
        if (maGiayTo != null)
            MaGiayTo = maGiayTo;
        if (!string.IsNullOrEmpty(ten))
            Ten = ten;
        if (soTrang != null)
            SoTrang = soTrang;
        if (soBanGiay != null)
            SoBanGiay = soBanGiay;
        if (kyDienTuBanGiay != null)
            KyDienTuBanGiay = kyDienTuBanGiay;
        if (!string.IsNullOrEmpty(dinhKem))
            DinhKem = dinhKem;
        return this;
    }

    public void UpdateHoSo(string? maGiayTo, string? ten, int? soTrang, int? soBanGiay, bool? kyDienTuBanGiay, string? dinhKem, int? soBanChinh, int? soBanSao)
    {
        UpdateTiepNhanChungThuc(maGiayTo, ten, soTrang, soBanGiay, kyDienTuBanGiay, dinhKem);
        SoBanChinh = soBanChinh;
        SoBanSao = soBanSao;
    }

    public ThanhPhanHoSo UpdateTiepNhan(string? ten, string? dinhKem, string? trangThaiSoHoa)
    {
        if (!string.IsNullOrEmpty(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(dinhKem))
            DinhKem = dinhKem;
        if(trangThaiSoHoa != null)
            TrangThaiSoHoa = trangThaiSoHoa;
        return this;
    }

    public ThanhPhanHoSo SetNoiDungBoSung(string? noiDungBoSung)
    {
        if (!string.IsNullOrEmpty(noiDungBoSung))
        {
            NoiDungBoSung = noiDungBoSung;
        }
        return this;
    }
    public ThanhPhanHoSo UpdateThanhPhanChungThucCapSoVaDongDau(string? trangThaiDuyet, Guid? soChungThucDt, int? soChungThucDienTu, Guid? soChungThucG, int? soChungThucGiay, string? dinhKem, Guid? nguoiKyChungThuc)
    {
        if (trangThaiDuyet != null)
            TrangThaiDuyet = trangThaiDuyet;
        if (soChungThucDt != null && soChungThucDt != default)
            SoChungThucDT = soChungThucDt;
        if (soChungThucDienTu != null)
            SoChungThucDienTu = soChungThucDienTu;
        if (soChungThucG != null && soChungThucG != default)
            SoChungThucG = soChungThucG;
        if (soChungThucGiay != null)
            SoChungThucGiay = soChungThucGiay;
        if (!string.IsNullOrEmpty(dinhKem))
            DinhKem = dinhKem;
        if (nguoiKyChungThuc != null && nguoiKyChungThuc != default)
            NguoiKyChungThuc = nguoiKyChungThuc;
        return this;
    }
    public ThanhPhanHoSo SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ThanhPhanHoSo Restore()
    {
        DeletedOn = null;
        return this;
    }

}
public static class ThanhPhanHoSoConstant
{
    public static string TrangThaiDuyet_DaKy = "Đã ký";
    public static string TrangThaiDuyet_ChuaKy = "Chưa ký";
}
