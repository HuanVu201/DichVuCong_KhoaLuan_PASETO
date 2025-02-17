using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class ChungTuThue : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    public DefaultIdType HoSoId { get; set; }
    [MaxLength(50)]
    public string Nguon { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string MaSoThue { get; set; }
    public double SoTien { get; set; }
    [MaxLength(1000)]
    public string NoiDungThanhToan { get; set; }
    public DateTime ThoiGianThanhToan { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string MaThongBaoThue { get; set; }
    public bool TrangThaiThanhToan { get; set; }
    [MaxLength(1000)]
    public string BienLai { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string SoCMTNguoiNopTien { get; set; }
    [MaxLength(100)]
    public string HoTenNguoiNopTien { get; set; }
    [MaxLength(50)]
    public string TinhNguoiNopTien { get; set; }
    [MaxLength(50)]
    public string HuyenNguoiNopTien { get; set; }
    [MaxLength(50)]
    public string XaNguoiNopTien { get; set; }
    [MaxLength(100)]
    public string DiaChiNguoiNopTien { get; set; }
    [MaxLength(255)]
    public string MaGCN { get; set; }
    public double TongPhaiNop { get; set; }
    public double TongMienGiam { get; set; }
    public double TongDaNop { get; set; }
    public double TongConPhaiNop { get; set; }
    [MaxLength(255)]
    public string MaKetQua { get; set; }
    [MaxLength(1000)]
    public string DienGiai { get; set; }


    public ChungTuThue(DefaultIdType hoSoId, string nguon, string maSoThue, double soTien, string noiDungThanhToan, DateTime thoiGianThanhToan,
        string maThongBaoThue, bool trangThaiThanhToan, string bienLai, string soCMTNguoiNopTien, string hoTenNguoiNopTien, string tinhNguoiNopTien,
        string huyenNguoiNopTien, string xaNguoiNopTien, string diaChiNguoiNopTien)
    {
        HoSoId = hoSoId;
        Nguon = nguon;
        MaSoThue = maSoThue;
        SoTien = soTien;
        NoiDungThanhToan = noiDungThanhToan;
        ThoiGianThanhToan = thoiGianThanhToan;
        MaThongBaoThue = maThongBaoThue;
        TrangThaiThanhToan = trangThaiThanhToan;
        BienLai = bienLai;
        SoCMTNguoiNopTien = soCMTNguoiNopTien;
        HoTenNguoiNopTien = hoTenNguoiNopTien;
        TinhNguoiNopTien = tinhNguoiNopTien;
        HuyenNguoiNopTien = huyenNguoiNopTien;
        XaNguoiNopTien = xaNguoiNopTien;
        DiaChiNguoiNopTien = diaChiNguoiNopTien;

    }

    public ChungTuThue Update(string? nguon, string? maSoThue, double? soTien, string? noiDungThanhToan, DateTime? thoiGianThanhToan,
        string? maThongBaoThue, bool trangThaiThanhToan, string? bienLai, string? soCMTNguoiNopTien, string? hoTenNguoiNopTien, string? tinhNguoiNopTien,
        string? huyenNguoiNopTien, string? xaNguoiNopTien, string? diaChiNguoiNopTien)
    {
        if (!string.IsNullOrEmpty(nguon))
            Nguon = nguon.Trim();
        if (!string.IsNullOrEmpty(maSoThue))
            MaSoThue = maSoThue.Trim();
        if (soTien.HasValue && soTien >= 0)
            SoTien = soTien.Value;
        if (!string.IsNullOrEmpty(noiDungThanhToan))
            NoiDungThanhToan = noiDungThanhToan.Trim();
        if (thoiGianThanhToan.HasValue)
            ThoiGianThanhToan = thoiGianThanhToan ?? ThoiGianThanhToan;
        if (!string.IsNullOrEmpty(maThongBaoThue))
            MaThongBaoThue = maThongBaoThue.Trim();
        if (trangThaiThanhToan != null)
            TrangThaiThanhToan = trangThaiThanhToan;
        if (!string.IsNullOrEmpty(bienLai))
            BienLai = bienLai.Trim();
        if (!string.IsNullOrEmpty(soCMTNguoiNopTien))
            soCMTNguoiNopTien = soCMTNguoiNopTien.Trim();
        if (!string.IsNullOrEmpty(hoTenNguoiNopTien))
            HoTenNguoiNopTien = hoTenNguoiNopTien.Trim();
        if (!string.IsNullOrEmpty(tinhNguoiNopTien))
            TinhNguoiNopTien = tinhNguoiNopTien.Trim();
        if (!string.IsNullOrEmpty(huyenNguoiNopTien))
            HuyenNguoiNopTien = huyenNguoiNopTien.Trim();
        if (!string.IsNullOrEmpty(xaNguoiNopTien))
            XaNguoiNopTien = xaNguoiNopTien.Trim();
        if (!string.IsNullOrEmpty(diaChiNguoiNopTien))
            DiaChiNguoiNopTien = diaChiNguoiNopTien.Trim();

        return this;
    }

    public ChungTuThue SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public ChungTuThue Restore()
    {
        DeletedOn = null;
        return this;
    }

}
