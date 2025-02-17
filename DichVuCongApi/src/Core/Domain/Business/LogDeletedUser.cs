using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Domain.Business;
public class LogDeletedUser : BaseEntity<Guid>, IAggregateRoot
{
    [MaxLength(150)]
    public string? FullName { get; set; }
    [MaxLength(150)]
    public string? UserName { get; set; }

    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? TypeUser { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? GroupCode { get; set; }
    [MaxLength(250)]
    public string? GroupName { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? OfficeCode { get; set; }
    [MaxLength(150)]
    public string? OfficeName { get; set; }
    [MaxLength(20)]
    [Column(TypeName = "varchar")]
    public string? PositionCode { get; set; }
    [MaxLength(150)]
    public string? PositionName { get; set; }
    [MaxLength(35)]
    [Column(TypeName = "varchar")]
    public string? SoDinhDanh { get; set; }
    [MaxLength(16)]
    [Column(TypeName = "varchar")]
    public string? SoCMND { get; set; }
    [MaxLength(2)]
    [Column(TypeName = "varchar")]
    public string? GioiTinh { get; set; }
    [MaxLength(5)]
    [Column(TypeName = "varchar")]
    public string? DanToc { get; set; }
    [MaxLength(12)]
    [Column(TypeName = "varchar")]
    public string? TonGiao { get; set; }
    [MaxLength(80)]
    [Column(TypeName = "varchar")]
    public string? NgayThangNamSinh { get; set; }
   
    [MaxLength(750)]
    public string? NoiDangKyKhaiSinh { get; set; }
    [MaxLength(750)]
    public string? QueQuan { get; set; }
    [MaxLength(750)]
    public string? ThuongTru { get; set; }
    [MaxLength(750)]
    public string? NoiOHienTai { get; set; }
    [MaxLength(300)]
    public string? Cha { get; set; }
    [MaxLength(300)]
    public string? Me { get; set; }
    [MaxLength(300)]
    public string? VoChong { get; set; }
    [MaxLength(300)]
    public string? NguoiDaiDien { get; set; }
    [MaxLength(300)]
    public string? ChuHo { get; set; }
    [MaxLength(300)]
    public string? HoVaTen { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? SoSoHoKhau { get; set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string? MaDinhDanhOfficeCode { get; set; }
    [MaxLength(250)]
    public string? ChucDanh { get; set; }
    public Guid? CreatedBy { get; set; }
    public DateTime? CreatedOn { get; private set; }
    public DateTime? ThoiGianXoa { get; private set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModifiedOn { get; set; }
    public DateTime? DeletedOn { get; set; }
    public Guid? DeletedBy { get; set; }

    public LogDeletedUser(Guid id,string? fullName,
        string? userName,
        string? typeUser,
        string? groupCode,
        string? groupName,
        string? officeCode,
        string? officeName,
        string? positionCode,
        string? positionName,
        string? soDinhDanh,
        string? soCMND,
        string? gioiTinh,
        string? danToc,
        string? tonGiao,
        string? ngayThangNamSinh,
        string? noiDangKyKhaiSinh,
        string? queQuan,
        string? thuongTru,
        string? noiOHienTai,
        string? cha,
        string? me,
        string? voChong,
        string? nguoiDaiDien,
        string? chuHo,
        string? hoVaTen,
        string? soSoHoKhau,
        string? maDinhDanhOfficeCode,
        string? chucDanh,
        DateTime? thoiGianXoa,
        Guid? deletedBy
     )
    {
        Id = id;
        FullName = fullName;
        UserName = userName;
        TypeUser = typeUser;
        GroupCode = groupCode;
        GroupName = groupName;
        OfficeCode = officeCode;
        OfficeName = officeName;
        PositionCode = positionCode;
        PositionName = positionName;
        SoDinhDanh = soDinhDanh;
        SoCMND = soCMND;
        GioiTinh = gioiTinh;
        DanToc = danToc;
        TonGiao = tonGiao;
        NgayThangNamSinh = ngayThangNamSinh;
        NoiDangKyKhaiSinh = noiDangKyKhaiSinh;
        QueQuan = queQuan;
        ThuongTru = thuongTru;
        NoiOHienTai = noiOHienTai;
        Cha = cha;
        Me = me;
        VoChong = voChong;
        NguoiDaiDien = nguoiDaiDien;
        ChuHo = chuHo;
        HoVaTen = hoVaTen;
        SoSoHoKhau = soSoHoKhau;
        MaDinhDanhOfficeCode = maDinhDanhOfficeCode;
        ChucDanh = chucDanh;
        ThoiGianXoa = thoiGianXoa;
        DeletedBy = deletedBy;
    }
}
