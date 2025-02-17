using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class HuongDanNopHoSo : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViId { get; protected set; }
    [MaxLength(50)]
    public string? MaHoSo { get; protected set; }
    [MaxLength(50)]
    public string? LoaiDoiTuong { get; protected set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaDoiTuong { get; protected set; }

    [MaxLength(500)]
    public string? ChuHoSo { get; protected set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? SoDienThoaiChuHoSo { get; protected set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? EmailChuHoSo { get; protected set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? SoGiayToChuHoSo { get; protected set; }
    [MaxLength(100)]
    [Column(TypeName = "varchar")]
    public string? LoaiGiayToChuHoSo { get; protected set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? NgaySinhChuHoSo { get; protected set; }
    [MaxLength(100)]
    public string? TinhThanhChuHoSo { get; protected set; }
    [MaxLength(100)]
    public string? QuanHuyenChuHoSo { get; protected set; }
    [MaxLength(100)]
    public string? XaPhuongChuHoSo { get; protected set; }
    [MaxLength(500)]
    public string? DiaChiChuHoSo { get; protected set; }
    [MaxLength(2000)]
    public string? TrichYeuHoSo { get; protected set; }
    public DateTime? NgayTiepNhan { get; protected set; }
    [MaxLength(500)]
    public string? GhiChu { get; protected set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? NoiNopHoSo { get; protected set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? HoSoCoThanhPhanSoHo { get; protected set; }
    public DateTime? NgayTuChoi { get; protected set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? LoaiDinhDanh { get; protected set; }
    [Column(TypeName = "varchar")]
    [MaxLength(40)]
    public string? SoDinhDanh { get; protected set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaTTHC { get; protected set; }
    [MaxLength(1500)]
    public string? TenTTHC { get; protected set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaLinhVuc { get; protected set; }
    [MaxLength(150)]
    public string? TenLinhVuc { get; protected set; }
    [MaxLength(4000)]
    public string? TenTruongHop { get; protected set; }
    [MaxLength(200)]
    [Column(TypeName = "varchar")]
    public string? MaTruongHop { get; protected set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? TruongHopId { get; protected set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? NguoiNhanHoSo { get; protected set; }

    [MaxLength(1500)]
    public string? LyDoBoSung { get; protected set; }
 
    [MaxLength(500)]
    public string? LyDoTuChoi { get; protected set; }
  
    public HuongDanNopHoSo(DefaultIdType id, string chuHoSo, string soDienThoaiChuHoSo, string diaChiChuHoSo, string soGiayToChuHoSo, string emailChuHoSo,
        string maTTHC, string tenTTHC, string maLinhVuc, string tenLinhVuc, string truongHopId, string tenTruongHop, string trichYeuHoSo, string lyDoBoSung, string lyDoTuChoi,
        string nguoiNhanHoSo, string donViId, DateTime? ngayTiepNhan)
    {
        Id = id;
        ChuHoSo = chuHoSo;
        SoDienThoaiChuHoSo = soDienThoaiChuHoSo;
        DiaChiChuHoSo = diaChiChuHoSo;
        SoGiayToChuHoSo = soGiayToChuHoSo;
        EmailChuHoSo = emailChuHoSo;
        MaTTHC = maTTHC;
        TenTTHC= tenTTHC;
        TruongHopId = truongHopId;
        TenTruongHop = tenTruongHop;
        TrichYeuHoSo = trichYeuHoSo;
        LyDoBoSung = lyDoBoSung;
        LyDoTuChoi = lyDoTuChoi;
        MaLinhVuc = maLinhVuc;
        TenLinhVuc = tenLinhVuc;
        NguoiNhanHoSo = nguoiNhanHoSo;
        NgayTiepNhan = ngayTiepNhan;
        DonViId = donViId;
    }
    public static HuongDanNopHoSo Create(DefaultIdType id,  string chuHoSo, string soDienThoaiChuHoSo, string diaChiChuHoSo, string soGiayToChuHoSo, string emailChuHoSo,
        string maTTHC,string tenTTHC, string maLinhVuc, string tenLinhVuc ,string truongHopId, string tenTruongHop, string trichYeuHoSo, string lyDoBoSung, string lyDoTuChoi, string nguoiNhanHoSo, string donViId, DateTime? ngayTiepNhan)
    {
        return new HuongDanNopHoSo(id, chuHoSo, soDienThoaiChuHoSo, diaChiChuHoSo, soGiayToChuHoSo, emailChuHoSo, maTTHC, tenTTHC, maLinhVuc, tenLinhVuc, truongHopId, tenTruongHop, trichYeuHoSo, lyDoBoSung, lyDoTuChoi, nguoiNhanHoSo, donViId, ngayTiepNhan);
    }
    public HuongDanNopHoSo Update( string chuHoSo, string soDienThoaiChuHoSo, string diaChiChuHoSo, string soGiayToChuHoSo, string emailChuHoSo,
        string maTTHC, string tenTTHC, string maLinhVuc, string tenLinhVuc, string truongHopId, string tenTruongHop, string trichYeuHoSo, string lyDoBoSung, string lyDoTuChoi)
    {
        if( chuHoSo != null) ChuHoSo =chuHoSo != string.Empty ? chuHoSo : null;
        if (soDienThoaiChuHoSo != null) SoDienThoaiChuHoSo = soDienThoaiChuHoSo != string.Empty ? soDienThoaiChuHoSo : null;
        if (diaChiChuHoSo != null) DiaChiChuHoSo = diaChiChuHoSo != string.Empty ? diaChiChuHoSo : null;
        if (soGiayToChuHoSo != null) SoGiayToChuHoSo = soGiayToChuHoSo != string.Empty ? soGiayToChuHoSo : null;
        if (emailChuHoSo != null) EmailChuHoSo = emailChuHoSo != string.Empty ? emailChuHoSo : null;
        if (maTTHC != null) MaTTHC = maTTHC != string.Empty ? maTTHC : null;
        if (tenTTHC != null) TenTTHC = tenTTHC != string.Empty ? tenTTHC : null;
        if (truongHopId != null) TruongHopId = truongHopId != string.Empty ? truongHopId : null;
        if (tenTruongHop != null) TenTruongHop = tenTruongHop != string.Empty ? tenTruongHop : null;
        if (trichYeuHoSo != null) TrichYeuHoSo = trichYeuHoSo != string.Empty ? trichYeuHoSo : null;
        if (lyDoBoSung != null) LyDoBoSung = lyDoBoSung != string.Empty ? lyDoBoSung : null;
        if (lyDoTuChoi != null) LyDoTuChoi = lyDoTuChoi != string.Empty ? lyDoTuChoi : null;
        if (maLinhVuc != null) MaLinhVuc = maLinhVuc != string.Empty ? maLinhVuc : null;
        if (tenLinhVuc != null) TenLinhVuc = tenLinhVuc != string.Empty ? tenLinhVuc : null;

        return this;
    }
    public HuongDanNopHoSo SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }
    public HuongDanNopHoSo Restore()
    {
        DeletedOn = null;
        return this;
    }
}
