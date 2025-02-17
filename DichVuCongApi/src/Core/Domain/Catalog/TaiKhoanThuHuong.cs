using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Catalog;
public class TaiKhoanThuHuong : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    public string TKThuHuong { get; private set; }

    [MaxLength(50)]
    public string MaNHThuHuong { get; private set; }

    [MaxLength(256)]
    public string TenTKThuHuong { get; private set; }

    [MaxLength(500)]
    public string MoTa { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? DonViId { get; private set; }

    public TaiKhoanThuHuong() { }
    public TaiKhoanThuHuong(string tkThuHuong, string maNHThuHuong, string tenTKThuHuong, string moTa, string? donViId)
    {
        TKThuHuong = tkThuHuong;
        MaNHThuHuong = maNHThuHuong;
        TenTKThuHuong = tenTKThuHuong;
        MoTa = moTa;
        DonViId = donViId;

    }
    public static TaiKhoanThuHuong Create(string tkThuHuong, string maNHThuHuong, string tenTKThuHuong, string moTa, string? donViId)
    {
        return new(tkThuHuong,maNHThuHuong,tenTKThuHuong, moTa, donViId);
    }
    public TaiKhoanThuHuong Update(string? tkThuHuong, string? maNHThuHuong, string? tenTKThuHuong, string? moTa, string? donViId)
    {
        if (!string.IsNullOrEmpty(donViId))
            DonViId = donViId;
        if (!string.IsNullOrEmpty(tkThuHuong) && !TKThuHuong.Equals(tkThuHuong))
            TKThuHuong = tkThuHuong;
        if (!string.IsNullOrEmpty(maNHThuHuong) && !MaNHThuHuong.Equals(maNHThuHuong))
            MaNHThuHuong = maNHThuHuong;
        if (!string.IsNullOrEmpty(tenTKThuHuong) && !TenTKThuHuong.Equals(tenTKThuHuong))
            TenTKThuHuong = tenTKThuHuong;
        if (!string.IsNullOrEmpty(moTa) && !MoTa.Equals(moTa))
            MoTa = moTa;
        return this;
    }
    public TaiKhoanThuHuong SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public TaiKhoanThuHuong Restore()
    {
        DeletedOn = null;
        return this;
    }




}
