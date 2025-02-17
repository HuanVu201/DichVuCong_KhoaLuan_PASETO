
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Business;
public class QuaTrinhXuLyHoSo : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string MaHoSo { get; private set; }
    public DateTime? ThoiGian { get; private set; }
    [MaxLength(40)]
    public string TrangThai { get; private set; }
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? NodeQuyTrinh { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string NguoiGui { get; private set; }
    [MaxLength(500)]
    [Column(TypeName = "varchar")]
    public string? NguoiNhan { get; private set; }
    public double? ThoiHanBuocXuLy { get; private set; }
    [MaxLength(100)]
    public string? LoaiThoiHanBuocXuLy { get; private set; }
    public DateTime? NgayHetHanBuocXuLy { get; private set; }
    [MaxLength(200)]
    public string ThaoTac { get; private set; } = "";
    [MaxLength(2000)]
    public string? NoiDung { get; private set; }
    public string? DinhKem { get; private set; }
    [MaxLength(3)]
    [Column(TypeName = "varchar")]
    public string? TrangThaiDongBoDVCQuocGia { get; private set; }
    [MaxLength(200)]
    public string? TenNguoiGui { get; private set; }
    [MaxLength(600)]
    public string? TenNguoiNhan { get; private set; }

    public QuaTrinhXuLyHoSo() { }
    public QuaTrinhXuLyHoSo(string? maHoSo, string? nguoiGui, string? tenNguoiGui, string? nguoiNhan, string? tenNguoiNhan, DateTime? thoiGian,string trangThai, string? thaoTac = "Tiếp nhận hồ sơ",bool? isDelete = false)
    {
        MaHoSo = maHoSo;
        NguoiGui = nguoiGui;
        TenNguoiGui = tenNguoiGui;
        NguoiNhan = nguoiNhan;
        TenNguoiNhan = tenNguoiNhan;
        ThoiGian = thoiGian;
        ThaoTac = thaoTac;
        DeletedOn = isDelete == true ? thoiGian : null;
        TrangThai = trangThai;

    }
    public QuaTrinhXuLyHoSo(string? maHoSo, string? nodeQuyTrinh, double? thoiHanBuocXuLy, string? loaiThoiHanBuocXuLy, DateTime? ngayHetHanBuocXuLy, string nguoiGui, string? tenNguoiGui,
        string nguoiNhan, string? tenNguoiNhan, DateTime? thoiGian, string? noiDung = null, string? dinhKem = null, string? thaoTac = "Tiếp nhận hồ sơ", string? trangThai = "2")
    {
        MaHoSo = maHoSo;
        if (!string.IsNullOrEmpty(nodeQuyTrinh) && nodeQuyTrinh.Length > 500)
        {
            NodeQuyTrinh = null;
        } else
        {
            NodeQuyTrinh = nodeQuyTrinh;
        }
        ThoiHanBuocXuLy = thoiHanBuocXuLy;
        LoaiThoiHanBuocXuLy = loaiThoiHanBuocXuLy;
        ThaoTac = thaoTac;
        TrangThai = trangThai;
        NgayHetHanBuocXuLy = ngayHetHanBuocXuLy;
        NguoiGui = nguoiGui;
        TenNguoiGui = tenNguoiGui;
        NguoiNhan = nguoiNhan;
        TenNguoiNhan = tenNguoiNhan;
        ThoiGian = thoiGian;
        NoiDung = noiDung;
        DinhKem = dinhKem;
    }
    public QuaTrinhXuLyHoSo(string? maHoSo, string? tenNguoiGui
        , DateTime? thoiGian, string? thaoTac = "Tiếp nhận hồ sơ", bool? isDelete = false)
    {
        MaHoSo = maHoSo;
        TrangThai = "";
        ThaoTac = thaoTac;
        NguoiGui =string.Empty;
        TenNguoiGui = tenNguoiGui;
        DeletedOn = isDelete == true ? thoiGian : null;
        ThoiGian = thoiGian;
    
    }
    public QuaTrinhXuLyHoSo(string? maHoSo, DateTime? thoiGian, string? trangThai, string? nodeQuyTrinh, string? nguoiGui, string? nguoiNhan, double thoiHanBuocXuLy,
        string loaiThoiHanBuocXuLy, DateTime ngayHetHanBuocXuLy, string? thaoTac, string? noiDung, string? dinhKem, string? trangThaiDongBoDVCQuocGia, string? tenNguoiGui,
        string? tenNguoiNhan)
    {
        MaHoSo = maHoSo;
        ThoiGian = thoiGian;
        TrangThai = trangThai;
        NodeQuyTrinh = nodeQuyTrinh;
        NguoiGui = nguoiGui;
        NguoiNhan = nguoiNhan;
        ThoiHanBuocXuLy = thoiHanBuocXuLy;
        LoaiThoiHanBuocXuLy = loaiThoiHanBuocXuLy;
        NgayHetHanBuocXuLy = ngayHetHanBuocXuLy;
        ThaoTac = thaoTac;
        NoiDung = noiDung;
        DinhKem = dinhKem;
        TrangThaiDongBoDVCQuocGia = trangThaiDongBoDVCQuocGia;
        TenNguoiGui = tenNguoiGui;
        TenNguoiNhan = tenNguoiNhan;
    }

    public QuaTrinhXuLyHoSo Update(string? maHoSo, DateTime? thoiGian, string? trangThai, string? nodeQuyTrinh, string? nguoiGui, string? nguoiNhan, double? thoiHanBuocXuLy,
        string? loaiThoiHanBuocXuLy, DateTime? ngayHetHanBuocXuLy, string? thaoTac, string? noiDung, string? dinhKem, string? trangThaiDongBoDVCQuocGia, string? tenNguoiGui,
        string? tenNguoiNhan)
    {
        if (!string.IsNullOrEmpty(MaHoSo) && !MaHoSo.Equals(maHoSo))
            MaHoSo = maHoSo;
        if (thoiGian != null && thoiGian != default)
            ThoiGian = thoiGian;
        if (!string.IsNullOrEmpty(TrangThai) && !TrangThai.Equals(trangThai))
            TrangThai = trangThai;
        if (!string.IsNullOrEmpty(NodeQuyTrinh) && !NodeQuyTrinh.Equals(nodeQuyTrinh))
            NodeQuyTrinh = nodeQuyTrinh;
        if (!string.IsNullOrEmpty(NguoiGui) && !NguoiGui.Equals(nguoiGui))
            NguoiGui = nguoiGui;
        if (!string.IsNullOrEmpty(NguoiNhan) && !NguoiNhan.Equals(nguoiNhan))
            NguoiNhan = nguoiNhan;
        if (thoiHanBuocXuLy != null)
            ThoiHanBuocXuLy = (double)thoiHanBuocXuLy;
        if (!string.IsNullOrEmpty(LoaiThoiHanBuocXuLy) && !LoaiThoiHanBuocXuLy.Equals(loaiThoiHanBuocXuLy))
            LoaiThoiHanBuocXuLy = loaiThoiHanBuocXuLy;
        if (ngayHetHanBuocXuLy != null && ngayHetHanBuocXuLy != default)
            NgayHetHanBuocXuLy = (DateTime)ngayHetHanBuocXuLy;
        if (!string.IsNullOrEmpty(ThaoTac) && !ThaoTac.Equals(thaoTac))
            ThaoTac = thaoTac;
        if (!string.IsNullOrEmpty(NoiDung) )
            NoiDung = noiDung;
        if (!string.IsNullOrEmpty(DinhKem) && !DinhKem.Equals(dinhKem))
            DinhKem = dinhKem;
        if (!string.IsNullOrEmpty(TrangThaiDongBoDVCQuocGia) && !TrangThaiDongBoDVCQuocGia.Equals(trangThaiDongBoDVCQuocGia))
            TrangThaiDongBoDVCQuocGia = trangThaiDongBoDVCQuocGia;
        if (!string.IsNullOrEmpty(TenNguoiGui) && !TenNguoiGui.Equals(tenNguoiGui))
            TenNguoiGui = tenNguoiGui;
        if (!string.IsNullOrEmpty(TenNguoiNhan) && !TenNguoiNhan.Equals(tenNguoiNhan))
            TenNguoiNhan = tenNguoiNhan;
        return this;
    }

    public QuaTrinhXuLyHoSo SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public QuaTrinhXuLyHoSo Restore()
    {
        DeletedOn = null;
        return this;
    }
}
public static class QuaTrinhXuLyHoSoConstant
{
    public const string ChuaDongBo = "0";
    public const string DaDongBo = "1";
}