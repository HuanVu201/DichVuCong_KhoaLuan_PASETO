using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class LienThongNVTCDVCQuocGia : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(100)]
    public string File { get; set; }
    [MaxLength(50)]
    public string TrangThai { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string Loai { get; set; }

    public LienThongNVTCDVCQuocGia(string file, string trangThai, string loai)
    {
        File = file;
        TrangThai = trangThai;
        Loai = loai;
    }

    public static LienThongNVTCDVCQuocGia Create(string file, string trangThai, string loai)
    {
        return new LienThongNVTCDVCQuocGia(file, trangThai, loai);
    }

    public LienThongNVTCDVCQuocGia Update(string? file, string? trangThai, string? loai)
    {
        if (!string.IsNullOrEmpty(file))
            File = file.Trim();
        if (!string.IsNullOrEmpty(trangThai))
            TrangThai = trangThai.Trim();
        if (!string.IsNullOrEmpty(loai))
            Loai = loai.Trim();

        return this;
    }

    public LienThongNVTCDVCQuocGia SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public LienThongNVTCDVCQuocGia Restore()
    {
        DeletedOn = null;
        return this;
    }

}
