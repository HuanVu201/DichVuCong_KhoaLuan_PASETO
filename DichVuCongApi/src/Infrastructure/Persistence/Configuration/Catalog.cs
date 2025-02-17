using DocumentFormat.OpenXml.Wordprocessing;
using Finbuckle.MultiTenant.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Portal;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Footer = TD.DichVuCongApi.Domain.Portal.Footer;

namespace TD.DichVuCongApi.Infrastructure.Persistence.Configuration;

public class KySoNEACConfig : IEntityTypeConfiguration<KySoNEAC>
{
    private readonly string _name = nameof(KySoNEAC);
    public void Configure(EntityTypeBuilder<KySoNEAC> builder)
    {
        builder
         .HasIndex(b => new {b.SoGiayTo, b.NgayKy});
    }
}

public class QuanLyTaiNguyenConfig : IEntityTypeConfiguration<QuanLyTaiNguyen>
{
    private readonly string _name = nameof(QuanLyTaiNguyen);
    public void Configure(EntityTypeBuilder<QuanLyTaiNguyen> builder)
    {
        builder
         .HasIndex(b => new
         {
             b.CreatedBy,
         });

    }
}

public class MenuKetQuaThuTucConfig : IEntityTypeConfiguration<MenuKetQuaThuTuc>
{
    private readonly string _name = nameof(MenuKetQuaThuTuc);
    public void Configure(EntityTypeBuilder<MenuKetQuaThuTuc> builder)
    {
        builder
         .HasIndex(b => new
         {
             b.MaDonVi,
             b.MaTTHC,
             b.MaKetQuaTTHC
         }).IsUnique()
         .HasName($"Idx_{_name}");
    }
}

public class NguoiDungNhomNguoiDungConfig : IEntityTypeConfiguration<NguoiDungNhomNguoiDung>
{
    private readonly string _name = nameof(NguoiDungNhomNguoiDung);
    public void Configure(EntityTypeBuilder<NguoiDungNhomNguoiDung> builder)
    {
        builder
         .HasIndex(b => new
         {
             b.NhomNguoiDungId,
             b.TaiKhoan
         }).IsUnique()
         .HasName($"Idx_{_name}");
    }
}

public class ThayDoiMucDoThuTucConfig : IEntityTypeConfiguration<ThayDoiMucDoThuTuc>
{
    private readonly string _name = nameof(ThayDoiMucDoThuTuc);
    public void Configure(EntityTypeBuilder<ThayDoiMucDoThuTuc> builder)
    {
        builder
         .HasIndex(b => b.DeletedOn)
         .HasName($"Idx_{_name}");
    }
}

public class SoChungThucConfig : IEntityTypeConfiguration<SoChungThuc>
{
    private readonly string _name = nameof(SoChungThuc);
    public void Configure(EntityTypeBuilder<SoChungThuc> builder)
    {
        builder
         .HasIndex(b => b.DonVi)
         .HasName($"Idx_{_name}");
    }
}
public class BuocXuLyConfig : IEntityTypeConfiguration<BuocXuLy>
{
    private readonly string _name = nameof(BuocXuLy);
    public void Configure(EntityTypeBuilder<BuocXuLy> builder)
    {
        builder
         .HasIndex(b => b.TenBuoc)
         .HasName($"Idx_{_name}");
    }
}


public class NhomNguoiDungConfig : IEntityTypeConfiguration<NhomNguoiDung>
{
    private readonly string _name = nameof(NhomNguoiDung);
    public void Configure(EntityTypeBuilder<NhomNguoiDung> builder)
    {
        builder
         .HasIndex(b => b.Ten)
         .HasName($"Idx_{_name}");
    }
}

public class DonViThuTucConfig : IEntityTypeConfiguration<DonViThuTuc>
{
    private readonly string _name = nameof(DonViThuTuc);
    public void Configure(EntityTypeBuilder<DonViThuTuc> builder)
    {
        builder
         .HasIndex(b => new
         {
             b.DonViId,
             b.MaTTHC,
             b.NguoiTiepNhanId,
             b.DeletedOn,
             b.CreatedOn
         })
         .HasName($"Idx_{_name}");
        builder.HasIndex(x => x.DonViId).HasDatabaseName($"Idx_DonViId");
        builder.HasIndex(x => x.MaTTHC).HasDatabaseName($"Idx_MaTTHC");

    }
}
public class ThongBaoConfig : IEntityTypeConfiguration<ThongBao>
{
    private readonly string _name = nameof(ThongBao);
    public void Configure(EntityTypeBuilder<ThongBao> builder)
    {
        builder
         .HasIndex(b => new
         {
             b.DonViId,
         })
         .HasName($"Idx_{_name}");
    }
}


public class ThuTucConfig : IEntityTypeConfiguration<ThuTuc>
{
    private readonly string _name = nameof(ThuTuc);
    public void Configure(EntityTypeBuilder<ThuTuc> builder)
    {
        builder
         .HasIndex(b => new
         {
             b.MaTTHC,
             b.LoaiTTHC,
             b.MaLinhVucChinh
         })
         .HasName($"Idx_{_name}_MaTTHC");
        builder.HasIndex(x => x.MaTTHC);
        builder.HasIndex(x => x.LaPhiDiaGioi);
        builder.HasIndex(x => x.LaThuTucChungThuc);
    }
}

public class ThuTucThietYeuConfig : IEntityTypeConfiguration<ThuTucThietYeu>
{
    private readonly string _name = nameof(ThuTucThietYeu);
    public void Configure(EntityTypeBuilder<ThuTucThietYeu> builder)
    {
        builder
         .HasIndex(b => new
         {
             b.MaTTHC,
         })
         .HasName($"Idx_{_name}_MaTTHC");
        builder.HasIndex(x => x.MaTTHC);
    }
}

public class MaVanDonBuuDienConfig : IEntityTypeConfiguration<MaVanDonBuuDien>
{
    private readonly string _name = nameof(MaVanDonBuuDien);
    public void Configure(EntityTypeBuilder<MaVanDonBuuDien> builder)
    {
        builder
         .HasIndex(b => b.HoSo)
         .HasName($"Idx_{_name}");
    }
}

public class LinhVucConfig : IEntityTypeConfiguration<LinhVuc>
{
    private readonly string _name = nameof(MauPhoi);
    public void Configure(EntityTypeBuilder<LinhVuc> builder)
    {
        builder
         .HasIndex(b => new
         {
             b.Ma,
             b.Ten,
             b.MaNganh
         })
         .HasName($"Idx_{_name}_LinhVuc_Active");
    }
}


public class MenuConfig : IEntityTypeConfiguration<Menu>
{
    private readonly string _name = nameof(Menu);
    public void Configure(EntityTypeBuilder<Menu> builder)
    {
        builder
         .HasIndex(b => b.Active)
         .HasName($"Idx_{_name}_Menu_Active");
    }
}
public class NgayNghiConfig : IEntityTypeConfiguration<NgayNghi>
{
    private readonly string _name = nameof(NgayNghi);
    public void Configure(EntityTypeBuilder<NgayNghi> builder)
    {
        builder
         .HasIndex(b => new { b.Date, b.Description })
         .HasName($"Idx_{_name}_NgayNghi_Name");
    }
}

public class ConfigConfig : IEntityTypeConfiguration<Config>
{
    private readonly string _name = nameof(Config);
    public void Configure(EntityTypeBuilder<Config> builder)
    {
        builder
         .HasIndex(b => new
         {
             b.Ten,
             b.Code,
             b.Module,
             b.Active
         })
         .HasName($"Idx_{_name}_Config");
    }
}

public class GroupConfig : IEntityTypeConfiguration<Group>
{
    private readonly string _name = nameof(Group);
    public void Configure(EntityTypeBuilder<Group> builder)
    {
        builder.HasIndex(b => b.GroupCode).HasDatabaseName("Idx_GroupCode");
        builder.HasIndex(b => b.GroupName).HasDatabaseName("Idx_GroupName");
        builder.HasIndex(b => b.MaDinhDanh).HasDatabaseName("Idx_MaDinhDanh");
        builder.HasIndex(b => b.OfGroupCode).HasDatabaseName("Idx_OfGroupCode");
        builder
         .HasIndex(b => new
         {
             b.GroupCode,
             b.GroupName,
             b.OfGroupCode,
             b.MaDinhDanh,
             b.MaNhomLienThong,
         })
         .HasName($"Idx_{_name}_Search");
    }
}

public class DanhMucChungConfig : IEntityTypeConfiguration<DanhMucChung>
{
    private readonly string _name = nameof(DanhMucChung);
    public void Configure(EntityTypeBuilder<DanhMucChung> builder)
    {
        builder
        .HasIndex(b => new
        {
            b.Type
        })
        .HasName($"Idx_{_name}_Type");
        builder
        .HasIndex(b => new
        {
            b.TenDanhMuc,
            b.Type
        })
        .HasName($"Idx_{_name}_DanhMucChung_TenDanhMuc_Type");
        builder
        .HasIndex(b => new
        {
            b.TenDanhMuc,
            b.Type,
            b.ParentCode
        })
        .HasName($"Idx_{_name}_DanhMucChung_TenDanhMuc_Type_ParentCode");
        builder
        .HasIndex(b => new
        {
            b.Type,
            b.ParentCode
        })
        .HasName($"Idx_{_name}_DanhMucChung_Type_ParentCode");
    }
}

public class DiaBanConfig : IEntityTypeConfiguration<DiaBan>
{
    private readonly string _name = nameof(DiaBan);
    public void Configure(EntityTypeBuilder<DiaBan> builder)
    {

        builder
        .HasIndex(b => new
        {
            b.TenDiaBan,
            b.MaDiaBan
        })
        .HasName($"Idx_{_name}_DiaBan_Name");
    }
}

public class NhomThuTucConfig : IEntityTypeConfiguration<NhomThuTuc>
{
    private readonly string _name = nameof(NhomThuTuc);
    public void Configure(EntityTypeBuilder<NhomThuTuc> builder)
    {

        builder
        .HasIndex(b => new
        {
            b.Ten
        })
        .HasName($"Idx_{_name}_NhomThuTuc_Name");
    }
}


public class LoaiThuTucConfig : IEntityTypeConfiguration<LoaiThuTuc>
{
    private readonly string _name = nameof(LoaiThuTuc);
    public void Configure(EntityTypeBuilder<LoaiThuTuc> builder)
    {

        builder
        .HasIndex(b => new
        {
            b.Ten
        })
        .HasName($"Idx_{_name}_LoaiThuTuc_Name");
    }
}
public class ThuTucThuocLoaiConfig : IEntityTypeConfiguration<ThuTucThuocLoai>
{
    private readonly string _name = nameof(ThuTucThuocLoai);
    public void Configure(EntityTypeBuilder<ThuTucThuocLoai> builder)
    {

        builder
        .HasIndex(b => new
        {
            b.ThuTucID
        })
        .HasName($"Idx_{_name}_ThuTucThuocLoai_Name");
    }
}
