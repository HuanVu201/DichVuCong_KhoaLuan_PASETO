using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class ThanhPhanHoSoNhap : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(4000)]
    public string? Ten { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string HoSoId { get; private set; }
    public int? SoBanChinh { get; private set; }
    public int? SoBanSao { get; private set; }
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
    #endregion
    public ThanhPhanHoSoNhap() { }

    public ThanhPhanHoSoNhap(string? ten, string hoSoId, int? soBanChinh, int? soBanSao, string? maGiayToKhoQuocGia, string? dinhKem, bool? nhanBanGiay, string? maGiayToSoHoa, string? trangThaiSoHoa, string? maGiayTo, bool? duocLayTuKhoDMQuocGia, string? maKetQuaThayThe, int? soTrang, int? soBanGiay, bool? kyDienTuBanGiay, string? trangThaiDuyet)
    {
        Ten = ten;
        SoBanChinh = soBanChinh;
        SoBanSao = soBanSao;
        HoSoId = hoSoId;
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
    public ThanhPhanHoSoNhap Update(string? ten, int? soBanChinh, int? soBanSao, string? maGiayToKhoQuocGia, string? dinhKem, bool? nhanBanGiay, string? maGiayToSoHoa, string? trangThaiSoHoa, string? maGiayTo, bool? duocLayTuKhoDMQuocGia, string? maKetQuaThayThe, string? trangThaiDuyet)
    {
        if (!string.IsNullOrEmpty(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(dinhKem))
            DinhKem = dinhKem;
        if (!string.IsNullOrEmpty(maGiayTo) )
            MaGiayTo = maGiayTo;
        if (!string.IsNullOrEmpty(maGiayToKhoQuocGia))
            MaGiayToKhoQuocGia = maGiayToKhoQuocGia;
        if (!string.IsNullOrEmpty(maKetQuaThayThe))
            MaKetQuaThayThe = maKetQuaThayThe;
        if (!string.IsNullOrEmpty(maGiayToSoHoa) )
            MaGiayToSoHoa = maGiayToSoHoa;
        if (!string.IsNullOrEmpty(dinhKem))
            DinhKem = dinhKem;
        if (!string.IsNullOrEmpty(trangThaiSoHoa))
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
    public ThanhPhanHoSoNhap SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ThanhPhanHoSoNhap Restore()
    {
        DeletedOn = null;
        return this;
    }

}

