using System.ComponentModel.DataAnnotations;

namespace TD.DichVuCongApi.Domain.Business;
public class QuyTrinhXuLy : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    public DefaultIdType TruongHopId { get; private set; }
    [MaxLength(300)]
    public string TenBuocXuLy { get; private set; }
    public double ThoiGianXuLy { get; private set; }
    public double? ThoiGianThucHienTrucTuyen { get; private set; }
    [MaxLength(100)]
    public string LoaiThoiGian { get; private set; }
    [MaxLength(25)]
    public string? LoaiBuoc { get; private set; }
    [MaxLength(300)]
    public string? TenNhomNguoiDung { get; private set; }
    public DefaultIdType? NhomNguoiDungId { get; private set; }
    [MaxLength(100)]
    public string? TenTrangThaiHoSo { get; private set; }
    [MaxLength(5)]
    public string? MaTrangThaiHoSo { get; private set; }
    public bool? YeuCauCoKetQuaBuocTruoc { get; private set; } = false;
    public bool? ChoPhepChuyenLaiBuocTruoc { get; private set; } = false;
    public bool? GuiLienThongQLVB { get; private set; }
    public bool? GuiEmail { get; private set; }
    public string? BieuMauEmail { get; private set; }
    public bool? GuiSMS { get; private set; }
    public string? BieuMauSMS { get; private set; }

    public QuyTrinhXuLy() { }
    public QuyTrinhXuLy(DefaultIdType id, DefaultIdType truongHopId, string tenBuocXuLy, double thoiGianXuLy, string loaiThoiGian, string? loaiBuoc, string? tenNhomNguoiDung, DefaultIdType? nhomNguoiDungId,
        string? tenTrangThaiHoSo, string? maTrangThaiHoSo, bool? yeuCauCoKetQuaBuocTruoc, bool? choPhepChuyenLaiBuocTruoc, bool? guiLienThongQLVB, bool? guiEmail, string? bieuMauEmail,
        bool? guiSMS, string? bieuMauSMS, double? thoiGianThucHienTrucTuyen)
    {
        Id = id;
        ThoiGianThucHienTrucTuyen = thoiGianThucHienTrucTuyen;
        TruongHopId = truongHopId;
        TenBuocXuLy = tenBuocXuLy;
        ThoiGianXuLy = thoiGianXuLy;
        LoaiThoiGian = loaiThoiGian;
        LoaiBuoc = loaiBuoc;
        TenNhomNguoiDung = tenNhomNguoiDung;
        NhomNguoiDungId = nhomNguoiDungId;
        TenTrangThaiHoSo = tenTrangThaiHoSo;
        MaTrangThaiHoSo = maTrangThaiHoSo;
        YeuCauCoKetQuaBuocTruoc = yeuCauCoKetQuaBuocTruoc;
        ChoPhepChuyenLaiBuocTruoc = choPhepChuyenLaiBuocTruoc;
        GuiLienThongQLVB = guiLienThongQLVB;
        GuiEmail = guiEmail;
        BieuMauEmail = bieuMauEmail;
        GuiSMS = guiSMS;
        BieuMauSMS = bieuMauSMS;
    }
    // start node
    public QuyTrinhXuLy(DefaultIdType truongHopId, string tenBuocXuLy, double thoiGianXuLy, double thoiGianThucHienTrucTuyen, string loaiThoiGian, string maTrangThaiHoSo)
    {
        TruongHopId = truongHopId;
        TenBuocXuLy = tenBuocXuLy;
        ThoiGianXuLy = thoiGianXuLy;
        LoaiThoiGian = loaiThoiGian;
        MaTrangThaiHoSo = maTrangThaiHoSo;
        ThoiGianThucHienTrucTuyen = thoiGianThucHienTrucTuyen;
    }
    public QuyTrinhXuLy(DefaultIdType id)
    {
        Id = id;
    }
    public static QuyTrinhXuLy Create(DefaultIdType id, DefaultIdType truongHopId, string tenBuocXuLy, double thoiGianXuLy, string loaiThoiGian, string? loaiBuoc, string? tenNhomNguoiDung, DefaultIdType? nhomNguoiDungId,
        string? tenTrangThaiHoSo, string? maTrangThaiHoSo, bool? yeuCauCoKetQuaBuocTruoc, bool? choPhepChuyenLaiBuocTruoc, bool? guiLienThongQLVB, bool? guiEmail, string? bieuMauEmail,
        bool? guiSMS, string? bieuMauSMS, double? thoiGianThucHienTrucTuyen)
    {
        return new(id, truongHopId, tenBuocXuLy, thoiGianXuLy, loaiThoiGian, loaiBuoc, tenNhomNguoiDung, nhomNguoiDungId, tenTrangThaiHoSo,
         maTrangThaiHoSo, yeuCauCoKetQuaBuocTruoc, choPhepChuyenLaiBuocTruoc, guiLienThongQLVB, guiEmail, bieuMauEmail,
         guiSMS, bieuMauSMS, thoiGianThucHienTrucTuyen);
    }

    public QuyTrinhXuLy Update(DefaultIdType? truongHopId, string? tenBuocXuLy, double? thoiGianXuLy, string? loaiThoiGian, string? loaiBuoc, string? tenNhomNguoiDung, DefaultIdType? nhomNguoiDungId,
        string? tenTrangThaiHoSo, string? maTrangThaiHoSo, bool? yeuCauCoKetQuaBuocTruoc, bool? choPhepChuyenLaiBuocTruoc, bool? guiLienThongQLVB, bool? guiEmail, string? bieuMauEmail,
        bool? guiSMS, string? bieuMauSMS, double? thoiGianThucHienTrucTuyen)
    {
        if (thoiGianThucHienTrucTuyen != null)
            ThoiGianThucHienTrucTuyen = thoiGianThucHienTrucTuyen;
        if (truongHopId != null && truongHopId != default)
            TruongHopId = (DefaultIdType)truongHopId;
        if (nhomNguoiDungId != null && nhomNguoiDungId != default)
            NhomNguoiDungId = (DefaultIdType)nhomNguoiDungId;
        if (!string.IsNullOrEmpty(maTrangThaiHoSo))
            MaTrangThaiHoSo = maTrangThaiHoSo;
        if (!string.IsNullOrEmpty(tenBuocXuLy))
            TenBuocXuLy = tenBuocXuLy;
        if (thoiGianXuLy != null)
            ThoiGianXuLy = (double)thoiGianXuLy;
        if (!string.IsNullOrEmpty(loaiThoiGian) )
            LoaiThoiGian = loaiThoiGian;
        if (!string.IsNullOrEmpty(tenNhomNguoiDung))
            TenNhomNguoiDung = tenNhomNguoiDung;
        if (!string.IsNullOrEmpty(tenTrangThaiHoSo) )
            TenTrangThaiHoSo = tenTrangThaiHoSo;
        if (!string.IsNullOrEmpty(loaiBuoc) )
            LoaiBuoc = loaiBuoc;
        if (yeuCauCoKetQuaBuocTruoc != null)
            YeuCauCoKetQuaBuocTruoc = (bool)yeuCauCoKetQuaBuocTruoc;
        if (choPhepChuyenLaiBuocTruoc != null)
            ChoPhepChuyenLaiBuocTruoc = (bool)choPhepChuyenLaiBuocTruoc;
        if (guiLienThongQLVB != null)
            GuiLienThongQLVB = (bool)guiLienThongQLVB;
        if (guiEmail != null)
            GuiEmail = (bool)guiEmail;
        if (guiSMS != null)
            GuiSMS = (bool)guiSMS;
        if (!string.IsNullOrEmpty(bieuMauEmail))
            BieuMauEmail = bieuMauEmail;
        if (!string.IsNullOrEmpty(bieuMauSMS))
            BieuMauSMS = bieuMauSMS;
        return this;
    }

    public QuyTrinhXuLy SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public QuyTrinhXuLy Restore()
    {
        DeletedOn = null;
        return this;
    }
}
