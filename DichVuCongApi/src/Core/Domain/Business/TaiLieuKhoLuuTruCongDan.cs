using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class TaiLieuKhoLuuTruCongDan : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    public Guid? KhoLuuTruId { get; set; }
    [MaxLength(200)]
    public string TenGiayTo { get; set; }
    [MaxLength(200)]
    public string DuongDan { get; set; }
    public double? DungLuong { get; set; }
    [MaxLength(100)]
    public string? Nguon { get; set; }
    public int? SoLuotTaiSuDung { get; set; }
    public Guid? LoaiGiayToId { get; set; }
    public string? EformData { get; set; }
    [MaxLength(50)]
    public string? Type { get; set; }
    [MaxLength(50)]
    public string? LoaiNhomGiayToCaNhanId { get; set; }
    [MaxLength(50)]
    public string? MaLinhVuc { get; set; }
    public TaiLieuKhoLuuTruCongDan(Guid? khoLuuTruId, string tenGiayTo, string duongDan, double? dungLuong, string? nguon, int? soLuotTaiSuDung, Guid? loaiGiayToId, string? eformData, string? type, string? loaiNhomGiayToCaNhanId, string? maLinhVuc)
    {
        KhoLuuTruId = khoLuuTruId;
        TenGiayTo = tenGiayTo;
        DuongDan = duongDan;
        DungLuong = dungLuong;
        Nguon = nguon;
        SoLuotTaiSuDung = soLuotTaiSuDung;
        LoaiGiayToId = loaiGiayToId;
        EformData = eformData;
        Type = type;
        LoaiNhomGiayToCaNhanId = loaiNhomGiayToCaNhanId;
        MaLinhVuc = maLinhVuc;
    }

    public static TaiLieuKhoLuuTruCongDan Create(Guid? khoLuuTruId, string tenGiayTo, string duongDan, double? dungLuong, string nguon, int? soLuotTaiSuDung, Guid? loaiGiayToId, string? eformData, string? type, string? loaiNhomGiayToCaNhanId, string? maLinhVuc)
    {
        return new TaiLieuKhoLuuTruCongDan(khoLuuTruId, tenGiayTo, duongDan, dungLuong, nguon, soLuotTaiSuDung, loaiGiayToId, eformData, type, loaiNhomGiayToCaNhanId, maLinhVuc);
    }

    public TaiLieuKhoLuuTruCongDan Update(string? tenGiayTo, string? duongDan, double? dungLuong, bool? taiSuDung, string? eformData, string? type, string? loaiNhomGiayToCaNhanId)
    {
        if (!string.IsNullOrEmpty(tenGiayTo))
            TenGiayTo = tenGiayTo.Trim();
        if (!string.IsNullOrEmpty(duongDan))
            DuongDan = duongDan.Trim();
        if (!string.IsNullOrEmpty(eformData))
            EformData = eformData.Trim();
        if (dungLuong.HasValue)
            DungLuong = dungLuong;
        if (taiSuDung == true)
            SoLuotTaiSuDung += 1;
        if (!string.IsNullOrEmpty(type))
            Type = type.Trim();
        if (!string.IsNullOrEmpty(loaiNhomGiayToCaNhanId))
            LoaiNhomGiayToCaNhanId = loaiNhomGiayToCaNhanId.Trim();

        return this;
    }


    public TaiLieuKhoLuuTruCongDan SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public TaiLieuKhoLuuTruCongDan Restore()
    {
        DeletedOn = null;
        return this;
    }
    public static class Constant
    {
        public const string Nguon_CongDanTaiLen = "Công dân tải lên";
        public const string Nguon_KetQuaGiaiQuyetHoSo = "Kết quả giải quyết hồ sơ";
        public const string Nguon_ThanhPhanHoSo = "Thành phần hồ sơ";
        public const string Nguon_DVCQG = "Dịch vụ công quốc gia";
    }
}
