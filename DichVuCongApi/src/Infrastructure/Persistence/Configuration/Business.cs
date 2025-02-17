using Ardalis.Specification.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Infrastructure.Persistence.Configuration;

public class DanhMucGiayToChungThucConfig : IEntityTypeConfiguration<DanhMucGiayToChungThuc>
{
    private readonly string _name = nameof(DanhMucGiayToChungThuc);
    public void Configure(EntityTypeBuilder<DanhMucGiayToChungThuc> builder)
    {
        builder.ToTable("DanhMucGiayToChungThucs", SchemaNames.Business);
        builder.HasIndex(x => new
        {
            x.Ma,
        });
    }
}
public class NguoiXuLyHoSoConfig : IEntityTypeConfiguration<NguoiXuLyHoSo>
{
    private readonly string _name = nameof(NguoiXuLyHoSo);
    public void Configure(EntityTypeBuilder<NguoiXuLyHoSo> builder)
    {
        builder.ToTable("NguoiXuLyHoSos", SchemaNames.Business);
        Microsoft.EntityFrameworkCore.SqlServerIndexBuilderExtensions
            .IncludeProperties(builder.HasIndex(x => new { x.NguoiXuLy, x.TrangThai })
                .HasDatabaseName($"{_name}_NguoiXuLy_TrangThai_include_hosoid"),
                x => new { x.HoSoId });
        builder.HasIndex(x => x.HoSoId).HasDatabaseName($"{_name}_HoSoId");

    }
}

public class LogDeletedUserConfig : IEntityTypeConfiguration<LogDeletedUser>
{
    private readonly string _name = nameof(LogDeletedUser);
    public void Configure(EntityTypeBuilder<LogDeletedUser> builder)
    {
        builder.ToTable("LogDeletedUsers", SchemaNames.Business);
        builder.HasIndex(x => new
        {
            x.Id,
        });
    }
}

public class DuThaoXuLyHoSoConfig : IEntityTypeConfiguration<DuThaoXuLyHoSo>
{
    private readonly string _name = nameof(DuThaoXuLyHoSo);
    public void Configure(EntityTypeBuilder<DuThaoXuLyHoSo> builder)
    {
        builder.ToTable("DuThaoXuLyHoSos", SchemaNames.Business);
        builder.HasIndex(x => new
        {
            x.MaHoSo,
        });
        builder.HasIndex(x => new
        {
            x.Loai,
        });
    }
}

public class KetQuaThuTucConfig : IEntityTypeConfiguration<KetQuaThuTuc>
{
    private readonly string _name = nameof(KetQuaThuTuc);
    public void Configure(EntityTypeBuilder<KetQuaThuTuc> builder)
    {
        builder.ToTable("KetQuaThuTucs", SchemaNames.Business);
        builder.HasIndex(x => x.MaTTHC);
    }
}

public class HoSoLienThongConfig : IEntityTypeConfiguration<HoSoLienThong>
{
    private readonly string _name = nameof(HoSoLienThong);
    public void Configure(EntityTypeBuilder<HoSoLienThong> builder)
    {
        builder.ToTable("HoSoLienThongs", SchemaNames.Business);
        builder.HasIndex(x => x.MaHoSo);
    }
}

public class HoSoLienThongLLTPConfig : IEntityTypeConfiguration<HoSoLienThongLLTP>
{
    private readonly string _name = nameof(HoSoLienThongLLTP);
    public void Configure(EntityTypeBuilder<HoSoLienThongLLTP> builder)
    {
        builder.ToTable("HoSoLienThongLLTPs", SchemaNames.Business);
        builder.HasIndex(x => x.MaHoSo);
    }
}


public class TrangThaiHoSoLienThongConfig : IEntityTypeConfiguration<TrangThaiHoSoLienThong>
{
    private readonly string _name = nameof(TrangThaiHoSoLienThong);
    public void Configure(EntityTypeBuilder<TrangThaiHoSoLienThong> builder)
    {
        builder.ToTable("TrangThaiHoSoLienThongs", SchemaNames.Business);
        builder.HasIndex(x => x.MaHoSo);
    }
}

public class TrangThaiDongBoHoSoLLTPConfig : IEntityTypeConfiguration<TrangThaiDongBoHoSoLLTP>
{
    private readonly string _name = nameof(TrangThaiDongBoHoSoLLTP);
    public void Configure(EntityTypeBuilder<TrangThaiDongBoHoSoLLTP> builder)
    {
        builder.ToTable("TrangThaiDongBoHoSoLLTPs", SchemaNames.Business);
        builder.HasIndex(x => x.MaHoSo);
    }
}

public class HoSoChungThucConfig : IEntityTypeConfiguration<HoSoChungThuc>
{
    private readonly string _name = nameof(HoSoChungThuc);
    public void Configure(EntityTypeBuilder<HoSoChungThuc> builder)
    {
        builder.ToTable("HoSoChungThucs", SchemaNames.Business);
        builder.HasIndex(x => new
        {
            x.MaHoSo,
            x.SoChungThucId,
            x.LoaiKetQuaId
        });
        builder.HasIndex(x => x.MaHoSo);
    }
}

public class PhieuKhaoSatConfig : IEntityTypeConfiguration<PhieuKhaoSat>
{
    private readonly string _name = nameof(PhieuKhaoSat);
    public void Configure(EntityTypeBuilder<PhieuKhaoSat> builder)
    {
        builder.ToTable("PhieuKhaoSats", SchemaNames.Business);
        builder.HasIndex(x => x.MaHoSo);
    }
}

public class LogThongKeDGHLCongDanConfig : IEntityTypeConfiguration<LogThongKeDGHLCongDan>
{
    private readonly string _name = nameof(LogThongKeDGHLCongDan);
    public void Configure(EntityTypeBuilder<LogThongKeDGHLCongDan> builder)
    {
        builder.ToTable("LogThongKeDGHLCongDans", SchemaNames.Business);
        builder.HasIndex(x => x.MaHoSo);
    }
}

public class DanhGiaCoQuanConfig : IEntityTypeConfiguration<DanhGiaCoQuan>
{
    private readonly string _name = nameof(DanhGiaCoQuan);
    public void Configure(EntityTypeBuilder<DanhGiaCoQuan> builder)
    {
        builder.ToTable("DanhGiaCoQuans", SchemaNames.Business);
        builder.HasIndex(x => x.MaHoSo);
    }
}

public class QuaTrinhTraoDoiCongDanConfig : IEntityTypeConfiguration<QuaTrinhTraoDoiCongDan>
{
    private readonly string _name = nameof(QuaTrinhTraoDoiCongDan);
    public void Configure(EntityTypeBuilder<QuaTrinhTraoDoiCongDan> builder)
    {
        builder.ToTable("QuaTrinhTraoDoiCongDans", SchemaNames.Business);
        builder.HasIndex(x => x.MaHoSo);
    }
}

public class KetQuaLienQuanConfig : IEntityTypeConfiguration<KetQuaLienQuan>
{
    private readonly string _name = nameof(KetQuaLienQuan);
    public void Configure(EntityTypeBuilder<KetQuaLienQuan> builder)
    {
        builder.ToTable("KetQuaLienQuans", SchemaNames.Business);
        builder.HasIndex(x => new
        {
            x.MaHoSo,
            x.NguoiKy,
            x.TrangThai
        });
        builder.HasIndex(x => x.MaHoSo);
    }
}

public class DuLieuThongKeHoSoConfig : IEntityTypeConfiguration<DuLieuThongKeHoSo>
{
    private readonly string _name = nameof(DuLieuThongKeHoSo);
    public void Configure(EntityTypeBuilder<DuLieuThongKeHoSo> builder)
    {
        builder.ToTable("DuLieuThongKeHoSos", SchemaNames.Business);
    }
}

public class ThanhPhanHoSoBoSungConfig : IEntityTypeConfiguration<ThanhPhanHoSoBoSung>
{
    private readonly string _name = nameof(ThanhPhanHoSoBoSung);
    public void Configure(EntityTypeBuilder<ThanhPhanHoSoBoSung> builder)
    {
        builder.ToTable("ThanhPhanHoSoBoSungs", SchemaNames.Business);
        builder
         .HasIndex(b => b.HoSoBoSungId)
         .HasDatabaseName($"Idx_{_name}_HoSoBoSungId");
        builder
         .HasIndex(b => b.ThanhPhanHoSoId)
         .HasDatabaseName($"Idx_{_name}_ThanhPhanHoSoId");
    }
}

public class LogCSDLDanCuDoanhNghiepConfig : IEntityTypeConfiguration<LogCSDLDanCuDoanhNghiep>
{
    private readonly string _name = nameof(LogCSDLDanCuDoanhNghiep);
    public void Configure(EntityTypeBuilder<LogCSDLDanCuDoanhNghiep> builder)
    {
        builder.ToTable("LogCSDLDanCuDoanhNghieps", SchemaNames.Business);
        builder.HasIndex(x => new
        {
            x.DonViId,
            x.TaiKhoan
        });
    }
}

public class HoSoBoSungConfig : IEntityTypeConfiguration<HoSoBoSung>
{
    private readonly string _name = nameof(HoSoBoSung);
    public void Configure(EntityTypeBuilder<HoSoBoSung> builder)
    {
        builder.ToTable("HoSoBoSungs", SchemaNames.Business);
        builder
         .HasIndex(b => b.MaHoSo)
         .HasDatabaseName($"Idx_{_name}");
    }
}

public class HoSoNhapConfig : IEntityTypeConfiguration<HoSoNhap>
{
    private readonly string _name = nameof(HoSoNhap);
    public void Configure(EntityTypeBuilder<HoSoNhap> builder)
    {
        builder.ToTable("HoSoNhaps", SchemaNames.Business);
        builder
         .HasIndex(b => new
         {
             b.Id,
             b.CreatedBy
         })
         .HasDatabaseName($"Idx_{_name}");
    }
}

public class ThanhPhanHoSoNhapConfig : IEntityTypeConfiguration<ThanhPhanHoSoNhap>
{
    private readonly string _name = nameof(ThanhPhanHoSoNhap);
    public void Configure(EntityTypeBuilder<ThanhPhanHoSoNhap> builder)
    {
        builder.ToTable("ThanhPhanHoSoNhaps", SchemaNames.Business);
        builder
         .HasIndex(b => new
         {
             b.Id,
             b.CreatedBy
         })
         .HasDatabaseName($"Idx_{_name}");
        builder.HasIndex(x => x.HoSoId);
    }
}

public class QuaTrinhXuLyHoSoConfig : IEntityTypeConfiguration<QuaTrinhXuLyHoSo>
{
    private readonly string _name = nameof(QuaTrinhXuLyHoSo);
    public void Configure(EntityTypeBuilder<QuaTrinhXuLyHoSo> builder)
    {
        builder.ToTable("QuaTrinhXuLyHoSos", SchemaNames.Business);
        builder
         .HasIndex(b => b.MaHoSo)
         .HasDatabaseName($"Idx_{_name}");
        builder.HasIndex(x => x.NguoiGui);
        builder.HasIndex(x => x.TrangThaiDongBoDVCQuocGia);
    }
}

public class ThanhPhanHoSoConfig : IEntityTypeConfiguration<ThanhPhanHoSo>
{
    private readonly string _name = nameof(ThanhPhanHoSo);
    public void Configure(EntityTypeBuilder<ThanhPhanHoSo> builder)
    {
        builder.ToTable("ThanhPhanHoSos", SchemaNames.Business);
        builder.HasIndex(b => b.HoSo).HasDatabaseName("Idx_HoSo");
        builder
         .HasIndex(b => new
         {
             b.MaGiayTo,
             b.MaGiayToSoHoa,
             b.MaGiayToKhoQuocGia,
             b.MaKetQuaThayThe
         })
         .HasDatabaseName($"Idx_{_name}");
        builder.HasIndex(x => new
        {
            x.SoChungThucDT,
            x.SoChungThucDienTu
        }).IsUnique();
        builder.HasIndex(b => b.DeletedOn).HasDatabaseName("Idx_DeleteOn");
    }
}

public class GiaoDichThanhToanConfig : IEntityTypeConfiguration<GiaoDichThanhToan>
{
    private readonly string _name = nameof(GiaoDichThanhToan);
    public void Configure(EntityTypeBuilder<GiaoDichThanhToan> builder)
    {
        builder.ToTable("GiaoDichThanhToans", SchemaNames.Business);
        builder
         .HasIndex(b => new
         {
             b.MaThamChieu,
             b.MaKenhThanhToan,
             b.MaPhiLePhi,
             b.MaThuTucDVCQG,
             b.MaDVCThuTucDVCQuocGia,
         })
         .HasDatabaseName($"Idx_{_name}");
    }
}

public class GiayToSoHoaConfig : IEntityTypeConfiguration<GiayToSoHoa>
{
    private readonly string _name = nameof(GiayToSoHoa);
    public void Configure(EntityTypeBuilder<GiayToSoHoa> builder)
    {
        builder.ToTable("GiayToSoHoas", SchemaNames.Business);
        builder
         .HasIndex(b => new
         {
             b.MaGiayTo,
             b.Ma,
             b.MaGiayToKhoQuocGia,
             b.MaDinhDanh
         })
         .HasDatabaseName($"Idx_{_name}");
        builder.HasIndex(x => new
        {
            x.MaLinhVuc,
            x.MaTTHC,
            x.TrangThaiSoHoa
        });
        builder.HasIndex(x => x.DinhKem).HasFilter($"{nameof(GiayToSoHoa.DeletedOn)} IS NULL AND {nameof(GiayToSoHoa.LoaiSoHoa)} = '{GiayToSoHoa.GiayToSoHoa_LoaiSoHoa.KetQua}'")
            .HasDatabaseName("IDX_GiayToSoHoa_DinhKem_DeletedOn");
    }
}

public class GiayToHoSoConfig : IEntityTypeConfiguration<GiayToHoSo>
{
    private readonly string _name = nameof(GiayToHoSo);
    public void Configure(EntityTypeBuilder<GiayToHoSo> builder)
    {
        builder.ToTable("GiayToHoSos", SchemaNames.Business);
        builder
         .HasIndex(b => new
         {
             b.MaHoSo,
             b.LoaiGiayTo
         })
         .HasDatabaseName($"Idx_{_name}");
        builder.HasIndex(x => x.MaHoSo).HasDatabaseName("Idx_MaHoSo");
        builder.HasIndex(x => new
        {
            x.DeletedOn,
            x.SuDung
        }).HasDatabaseName("Idx_SuDungDeleteOn");
    }
}

public class YeuCauThanhToanConfig : IEntityTypeConfiguration<YeuCauThanhToan>
{
    private readonly string _name = nameof(YeuCauThanhToan);
    public void Configure(EntityTypeBuilder<YeuCauThanhToan> builder)
    {
        builder.ToTable("YeuCauThanhToans", SchemaNames.Business);
        builder
         .HasIndex(b => b.MaHoSo)
         .HasDatabaseName($"Idx_{_name}");
        builder.HasIndex(x => x.DeletedOn).HasDatabaseName("Idx_DeletedOn");

    }
}

public class ScreenActionConfig : IEntityTypeConfiguration<ScreenAction>
{
    private readonly string _name = nameof(ScreenAction);
    public void Configure(EntityTypeBuilder<ScreenAction> builder)
    {
        builder.ToTable("ScreenActions", SchemaNames.Business);
        builder
         .HasIndex(b => b.ScreenId)
         .HasDatabaseName($"Idx_{_name}");
    }
}

public class ScreenConfig : IEntityTypeConfiguration<Screen>
{
    private readonly string _name = nameof(Screen);
    public void Configure(EntityTypeBuilder<Screen> builder)
    {
        builder.ToTable("Screens", SchemaNames.Business);
        builder
         .HasIndex(b => b.Ma)
         .HasDatabaseName($"Idx_{_name}");
    }
}

public class ActionConfig : IEntityTypeConfiguration<Domain.Business.Action>
{
    private readonly string _name = nameof(Domain.Business.Action);
    public void Configure(EntityTypeBuilder<Domain.Business.Action> builder)
    {
        builder.ToTable("Actions", SchemaNames.Business);
        builder
         .HasIndex(b => b.Ten)
         .HasDatabaseName($"Idx_{_name}");
    }
}

public class HoSoConfig : IEntityTypeConfiguration<HoSo>
{
    private readonly string _name = nameof(HoSo);
    public void Configure(EntityTypeBuilder<HoSo> builder)
    {
        builder.ToTable("HoSos", SchemaNames.Business);
        builder
         .HasIndex(b => new
         {
             b.MaHoSo,
             b.DonViId
         }).IsUnique()
         .HasDatabaseName($"Idx_{_name}");
        builder
         .HasIndex(b => b.MaTTHC).HasDatabaseName($"Idx_MaTTHC");
        builder.HasIndex(x => x.MaHoSo).HasDatabaseName($"Idx_MaHoSo");
        builder.HasIndex(x => x.MaHoSoKhac).HasDatabaseName($"Idx_MaHoSoKhac");
        builder.HasIndex(x => x.DeletedOn).HasDatabaseName($"Idx_DeletedOn");
        builder.HasIndex(x => new
        {
            x.TrangThaiHoSoId,
            x.LaHoSoChungThuc
        });
        builder.HasIndex(x => x.NgayTiepNhan);
        builder.HasIndex(x => x.CreatedOn);
        builder.HasIndex(x => x.TrangThaiSoHoa);
        /*
        builder.HasIndex(x => x.MaTruongHop).HasDatabaseName($"Idx_MaTruongHop");
        builder.HasIndex(x => x.DonViId).HasDatabaseName($"Idx_DonViId");
        builder.HasIndex(x => x.NguoiDangXuLy).HasDatabaseName($"Idx_NguoiDangXuLy");
        builder.HasIndex(x => x.NguoiDaXuLy).HasDatabaseName($"Idx_NguoiDaXuLy");
        builder.HasIndex(x => x.NguoiNhanHoSo).HasDatabaseName($"Idx_NguoiNhanHoSo");
        builder.HasIndex(x => x.LoaiDuLieuKetNoi).HasDatabaseName($"Idx_LoaiDuLieuKetNoi");
        builder.HasIndex(x => x.NgayTiepNhan).HasDatabaseName($"Idx_NgayTiepNhan");
        builder.HasIndex(x => x.NgayHenTra).HasDatabaseName($"Idx_NgayHenTra");
        builder.HasIndex(x => x.NgayKetThucXuLy).HasDatabaseName($"Idx_NgayKetThucXuLy");
        builder.HasIndex(b => new
         {
             b.NguoiDangXuLy,
             b.TrangThaiHoSoId,
             b.LaHoSoChungThuc,
             b.ChoBanHanh,
             b.DeletedOn
         }).HasDatabaseName($"Idx_SearchMain");
        builder.HasIndex(b => new
        {
            b.NguoiGui,
            b.LaHoSoChungThuc,
            b.DeletedOn
        }).HasDatabaseName($"Idx_SearchCongDanPortal");
        builder.HasIndex(b => new
        {
            b.TrangThaiHoSoId,
            b.HinhThucTra,
            b.TrangThaiTraKq,
            b.TrangThaiBoSung,
            b.LaHoSoChungThuc,
            b.DonViTraKq,
            b.DeletedOn
        }).HasDatabaseName($"Idx_SearchTraKetQua");
        builder.HasIndex(b => new
        {
            b.TrangThaiHoSoId,
            b.TrangThaiBoSung,
            b.NguoiDangXuLy,
            b.LaHoSoChungThuc,
            b.TrangThaiTraKq,
            b.DeletedOn
        }).HasDatabaseName($"Idx_SearchBoSung");
        */
    }
}

public class QuyTrinhXuLyConfig : IEntityTypeConfiguration<QuyTrinhXuLy>
{
    private readonly string _name = nameof(QuyTrinhXuLy);
    public void Configure(EntityTypeBuilder<QuyTrinhXuLy> builder)
    {
        builder.ToTable("QuyTrinhXuLys", SchemaNames.Business);
        builder
         .HasIndex(b => b.TruongHopId)
         .HasDatabaseName($"Idx_{_name}");
    }
}

public class TrangThaiHoSoConfig : IEntityTypeConfiguration<TrangThaiHoSo>
{
    private readonly string _name = nameof(TrangThaiHoSo);
    public void Configure(EntityTypeBuilder<TrangThaiHoSo> builder)
    {
        builder.ToTable("TrangThaiHoSos", SchemaNames.Business);
        builder
         .HasIndex(b => b.Ten)
         .HasDatabaseName($"Idx_{_name}");
    }
}

public class ThanhPhanThuTucConfig : IEntityTypeConfiguration<ThanhPhanThuTuc>
{
    private readonly string _name = nameof(ThanhPhanThuTuc);
    public void Configure(EntityTypeBuilder<ThanhPhanThuTuc> builder)
    {
        builder.ToTable("ThanhPhanThuTucs", SchemaNames.Business);
        builder
         .HasIndex(b => b.ThuTucId)
         .HasDatabaseName($"Idx_{_name}_thuTucId");
        builder.HasIndex(x => x.TruongHopId);
    }
}

public class PhiLePhiConfig : IEntityTypeConfiguration<PhiLePhi>
{
    private readonly string _name = nameof(PhiLePhi);
    public void Configure(EntityTypeBuilder<PhiLePhi> builder)
    {
        builder.ToTable("PhiLePhis", SchemaNames.Business);
        builder
         .HasIndex(b => new
         {
             b.ThuTucId,
             b.Loai,
         })
         .HasDatabaseName($"Idx_{_name}");
    }
}

public class TruongHopThuTucConfig : IEntityTypeConfiguration<TruongHopThuTuc>
{
    private readonly string _name = nameof(TruongHopThuTuc);
    public void Configure(EntityTypeBuilder<TruongHopThuTuc> builder)
    {
        builder.ToTable("TruongHopThuTucs", SchemaNames.Business);
        builder
         .HasIndex(b => b.ThuTucId)
         .HasDatabaseName($"Idx_{_name}_ThuTuc");
        builder.HasIndex(b => b.Ma).HasDatabaseName("Idx_Ma");
        builder.HasIndex(b => b.KhongNopTrucTuyen);
    }
}

public class LoaiPhiLePhiConfig : IEntityTypeConfiguration<LoaiPhiLePhi>
{
    private readonly string _name = nameof(LoaiPhiLePhi);
    public void Configure(EntityTypeBuilder<LoaiPhiLePhi> builder)
    {
        builder.ToTable("LoaiPhiLePhis", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.Ma, b.SuDung })
         .HasDatabaseName($"Idx_{_name}_LoaiLephi_Name");
    }
}

public class DanhGiaHaiLongConfig : IEntityTypeConfiguration<DanhGiaHaiLong>
{
    private readonly string _name = nameof(DanhGiaHaiLong);
    public void Configure(EntityTypeBuilder<DanhGiaHaiLong> builder)
    {
        builder.ToTable("DanhGiaHaiLongs", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.MaHoSo })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}

public class MauPhoiConfig : IEntityTypeConfiguration<MauPhoi>
{
    private readonly string _name = nameof(MauPhoi);
    public void Configure(EntityTypeBuilder<MauPhoi> builder)
    {
        builder.ToTable("MauPhois", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.LoaiPhoi })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}

public class KhoTaiLieuDienTuConfig : IEntityTypeConfiguration<KhoTaiLieuDienTu>
{
    private readonly string _name = nameof(KhoTaiLieuDienTu);
    public void Configure(EntityTypeBuilder<KhoTaiLieuDienTu> builder)
    {
        builder.ToTable("KhoTaiLieuDienTus", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.TenKhoTaiLieu })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}

public class PhienBanGiayToSoHoaKhoTaiLieuDienTuConfig : IEntityTypeConfiguration<PhienBanGiayToSoHoaKhoTaiLieuDienTu>
{
    private readonly string _name = nameof(PhienBanGiayToSoHoaKhoTaiLieuDienTu);
    public void Configure(EntityTypeBuilder<PhienBanGiayToSoHoaKhoTaiLieuDienTu> builder)
    {
        builder.ToTable("PhienBanGiayToSoHoaKhoTaiLieuDienTus", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.MaGiayTo })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}

public class GiayToSoHoaChiaSeConfig : IEntityTypeConfiguration<GiayToSoHoaChiaSe>
{
    private readonly string _name = nameof(GiayToSoHoaChiaSe);
    public void Configure(EntityTypeBuilder<GiayToSoHoaChiaSe> builder)
    {
        builder.ToTable("GiayToSoHoaChiaSes", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.MaDinhDanhChiaSe })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}

public class ChuKySoCaNhanConfig : IEntityTypeConfiguration<ChuKySoCaNhan>
{
    private readonly string _name = nameof(ChuKySoCaNhan);
    public void Configure(EntityTypeBuilder<ChuKySoCaNhan> builder)
    {
        builder.ToTable("ChuKySoCaNhans", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.UserName })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}

public class HuongDanNopHoSoConfig : IEntityTypeConfiguration<HuongDanNopHoSo>
{
    private readonly string _name = nameof(HuongDanNopHoSo);
    public void Configure(EntityTypeBuilder<HuongDanNopHoSo> builder)
    {
        builder.ToTable("HuongDanNopHoSos", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.MaHoSo })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}

public class ThanhPhanHuongDanNopHoSoConfig : IEntityTypeConfiguration<ThanhPhanHuongDanNopHoSo>
{
    private readonly string _name = nameof(ThanhPhanHuongDanNopHoSo);
    public void Configure(EntityTypeBuilder<ThanhPhanHuongDanNopHoSo> builder)
    {
        builder.ToTable("ThanhPhanHuongDanNopHoSos", SchemaNames.Business);
    }
}

public class KhoLuuTruCongDanConfig : IEntityTypeConfiguration<KhoLuuTruCongDan>
{
    private readonly string _name = nameof(KhoLuuTruCongDan);
    public void Configure(EntityTypeBuilder<KhoLuuTruCongDan> builder)
    {
        builder.ToTable("KhoLuuTruCongDans", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.SoDinhDanh })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}

public class TaiLieuKhoLuuTruCongDanConfig : IEntityTypeConfiguration<TaiLieuKhoLuuTruCongDan>
{
    private readonly string _name = nameof(TaiLieuKhoLuuTruCongDan);
    public void Configure(EntityTypeBuilder<TaiLieuKhoLuuTruCongDan> builder)
    {
        builder.ToTable("TaiLieuKhoLuuTruCongDans", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.KhoLuuTruId })
         .HasDatabaseName($"Idx_{_name}_Name");

        builder.HasIndex(x => x.Nguon).HasDatabaseName($"Idx_Nguon");
    }
}

public class ChiaSeTaiLieuKhoLuuTruCongDanConfig : IEntityTypeConfiguration<ChiaSeTaiLieuKhoLuuTruCongDan>
{
    private readonly string _name = nameof(ChiaSeTaiLieuKhoLuuTruCongDan);
    public void Configure(EntityTypeBuilder<ChiaSeTaiLieuKhoLuuTruCongDan> builder)
    {
        builder.ToTable("ChiaSeTaiLieuKhoLuuTruCongDans", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.TaiLieuLuuTruId })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}

public class LoaiGiayToKhoLuuTruConfig : IEntityTypeConfiguration<LoaiGiayToKhoLuuTru>
{
    private readonly string _name = nameof(LoaiGiayToKhoLuuTru);
    public void Configure(EntityTypeBuilder<LoaiGiayToKhoLuuTru> builder)
    {
        builder.ToTable("LoaiGiayToKhoLuuTrus", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.Ma })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}

public class ThongBaoThueConfig : IEntityTypeConfiguration<ThongBaoThue>
{
    private readonly string _name = nameof(ThongBaoThue);
    public void Configure(EntityTypeBuilder<ThongBaoThue> builder)
    {
        builder.ToTable("ThongBaoThues", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.HoSoId })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}

public class ChungTuThueConfig : IEntityTypeConfiguration<ChungTuThue>
{
    private readonly string _name = nameof(ChungTuThue);
    public void Configure(EntityTypeBuilder<ChungTuThue> builder)
    {
        builder.ToTable("ChungTuThues", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.HoSoId })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}

public class LienThongNVTCDVCQuocGiaConfig : IEntityTypeConfiguration<LienThongNVTCDVCQuocGia>
{
    private readonly string _name = nameof(LienThongNVTCDVCQuocGia);
    public void Configure(EntityTypeBuilder<LienThongNVTCDVCQuocGia> builder)
    {
        builder.ToTable("LienThongNVTCDVCQuocGias", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.Loai })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}

public class LogVBDLISConfig : IEntityTypeConfiguration<LogVBDLIS>
{
    private readonly string _name = nameof(LogVBDLIS);
    public void Configure(EntityTypeBuilder<LogVBDLIS> builder)
    {
        builder.ToTable("LogVBDLISs", SchemaNames.Business);
        builder
         .HasIndex(b => new { b.MaHoSo })
         .HasDatabaseName($"Idx_{_name}_Name");
    }
}
