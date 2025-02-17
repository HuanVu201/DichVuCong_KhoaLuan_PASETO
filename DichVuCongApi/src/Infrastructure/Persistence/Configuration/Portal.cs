using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Portal;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Infrastructure.Persistence.Configuration;

public class BannerConfig : IEntityTypeConfiguration<Banner>
{
    private readonly string _name = nameof(Banner);
    public void Configure(EntityTypeBuilder<Banner> builder)
    {
        builder.ToTable("Banners", SchemaNames.Portal);
        builder
        .HasIndex(b => b.DeletedOn)
        .HasName($"Idx_{_name}_DeletedOn");
    }

}
public class HuongDanSuDungConfig : IEntityTypeConfiguration<HuongDanSuDung>
{
    private readonly string _name = nameof(HuongDanSuDung);
    public void Configure(EntityTypeBuilder<HuongDanSuDung> builder)
    {
        builder.ToTable("HuongDanSuDungs", SchemaNames.Portal);
        builder
        .HasIndex(b => b.DeletedOn)
        .HasName($"Idx_{_name}_DeletedOn");
    }

}

public class QuanLyVanBanConfig : IEntityTypeConfiguration<QuanLyVanBan>
{
    private readonly string _name = nameof(QuanLyVanBan);
    public void Configure(EntityTypeBuilder<QuanLyVanBan> builder)
    {
        builder.ToTable("QuanLyVanBans", SchemaNames.Portal);
        builder
        .HasIndex(b => b.DeletedOn)
        .HasName($"Idx_{_name}_DeletedOn");
    }

}
public class DSTaiLieuHDSDConfig : IEntityTypeConfiguration<DSTaiLieuHDSD>
{
    private readonly string _name = nameof(DSTaiLieuHDSD);
    public void Configure(EntityTypeBuilder<DSTaiLieuHDSD> builder)
    {
        builder.ToTable("DSTaiLieuHDSDs", SchemaNames.Portal);
        builder
        .HasIndex(b => b.DeletedOn)
        .HasName($"Idx_{_name}_DeletedOn");
    }

}

public class CauHoiPhoBienConfig : IEntityTypeConfiguration<CauHoiPhoBien>
{
    private readonly string _name = nameof(CauHoiPhoBien);
    public void Configure(EntityTypeBuilder<CauHoiPhoBien> builder)
    {
        builder.ToTable("CauHoiPhoBiens", SchemaNames.Portal);
        builder
        .HasIndex(b => b.DeletedOn)
        .HasName($"Idx_{_name}_DeletedOn");
    }

}
public class QuanLyLienKetConfig : IEntityTypeConfiguration<QuanLyLienKet>
{
    private readonly string _name = nameof(QuanLyLienKet);
    public void Configure(EntityTypeBuilder<QuanLyLienKet> builder)
    {
        builder.ToTable("QuanLyLienKets", SchemaNames.Portal);
        builder
        .HasIndex(b => b.DeletedOn)
        .HasName($"Idx_{_name}_DeletedOn");
    }

}
public class HoiDapConfig : IEntityTypeConfiguration<HoiDap>
{
    private readonly string _name = nameof(HoiDap);
    public void Configure(EntityTypeBuilder<HoiDap> builder)
    {
        builder.ToTable("HoiDaps", SchemaNames.Portal);
        builder
        .HasIndex(b => b.DeletedOn)
        .HasName($"Idx_{_name}_DeletedOn");
    }

}

public class PhanAnhKienNghiConfig : IEntityTypeConfiguration<PhanAnhKienNghi>
{
    private readonly string _name = nameof(PhanAnhKienNghi);
    public void Configure(EntityTypeBuilder<PhanAnhKienNghi> builder)
    {
        builder.ToTable("PhanAnhKienNghis", SchemaNames.Portal);
        builder
        .HasIndex(b => b.DeletedOn)
        .HasName($"Idx_{_name}_DeletedOn");
    }

}

public class TaiKhoanThuHuongConfig : IEntityTypeConfiguration<TaiKhoanThuHuong>
{
    private readonly string _name = nameof(TaiKhoanThuHuong);
    public void Configure(EntityTypeBuilder<TaiKhoanThuHuong> builder)
    {
        builder.ToTable("TaiKhoanThuHuongs", SchemaNames.Catalog);
        builder
        .HasIndex(b => b.DeletedOn)
        .HasName($"Idx_{_name}_DeletedOn");
    }

}
public class FooterConfig : IEntityTypeConfiguration<Footer>
{
    private readonly string _name = nameof(Footer);
    public void Configure(EntityTypeBuilder<Footer> builder)
    {
        builder.ToTable("Footers", SchemaNames.Portal);

        builder
        .HasIndex(b => b.TieuDe)
        .HasName($"Idx_{_name}_TieuDe");

        builder
        .HasIndex(b => b.DeletedOn)
        .HasName($"Idx_{_name}_DeletedOn");
    }
}
public class KieuNoiDungConfig : IEntityTypeConfiguration<KieuNoiDung>
{
    private readonly string _name = nameof(KieuNoiDung);
    public void Configure(EntityTypeBuilder<KieuNoiDung> builder)
    {
        builder.ToTable("KieuNoiDungs", SchemaNames.Portal);

        builder.HasMany(x => x.KenhTins).WithOne(x => x.KieuNoiDung).IsRequired();
        builder
        .HasIndex(b => b.DeletedOn)
        .HasName($"Idx_{_name}_DeletedOn");
    }
}
public class KenhTinConfig : IEntityTypeConfiguration<KenhTin>
{
    private readonly string _name = nameof(KenhTin);
    public void Configure(EntityTypeBuilder<KenhTin> builder)
    {
        builder.ToTable("KenhTins", SchemaNames.Portal);

        builder.HasMany(x => x.TinBais).WithOne(x => x.KenhTin).IsRequired();
        // 1 kênh tin sẽ có 1 kênh cha, và 1 kênh cha sẽ có nhiều kênh con dựa trên khóa ngoại Makenhtincha
        builder.HasOne(x => x.KenhTinCha).WithMany().HasForeignKey(x => x.MaKenhTinCha);

        builder
        .HasIndex(b => new
        {
            b.TenKenhTin,
            b.MaKenhTinCha,
            b.TomTat,
            b.HienThiMenuChinh,
            b.HienThiMenuDoc,
            b.HienThiMenuPhu,
            b.DeletedOn
        }).IsUnique()
        .HasName($"Idx_{_name}");
    }
}

public class TinBaiConfig : IEntityTypeConfiguration<TinBai>
{
    private readonly string _name = nameof(TinBai);
    public void Configure(EntityTypeBuilder<TinBai> builder)
    {
        builder.ToTable("TinBais", SchemaNames.Portal);

        builder
        .HasIndex(b => new
        {
            b.TieuDe,
            b.TrichYeu,
            b.TinNoiBat,
            b.DeletedOn
        }).IsUnique()
         .HasName($"Idx_{_name}");

    }
}

public class TrangThaiConfig : IEntityTypeConfiguration<TrangThai>
{
    private readonly string _name = nameof(TrangThai);
    public void Configure(EntityTypeBuilder<TrangThai> builder)
    {
        builder.ToTable("TrangThais", SchemaNames.Portal);

        builder.HasMany(x => x.TinBais).WithOne(x => x.TrangThai).IsRequired();

        builder
         .HasIndex(b => b.DeletedOn)
         .HasName($"Idx_{_name}_DeletedOn");
    }
}

public class APIChiaSeConfig : IEntityTypeConfiguration<APIChiaSe>
{
    private readonly string _name = nameof(APIChiaSe);
    public void Configure(EntityTypeBuilder<APIChiaSe> builder)
    {
        builder.ToTable("APIChiaSes", SchemaNames.Portal);

        builder
         .HasIndex(b => b.Id)
         .HasName($"Idx_{_name}_Id");
    }
}

public class LichSuAPIChiaSeConfig : IEntityTypeConfiguration<LichSuAPIChiaSe>
{
    private readonly string _name = nameof(LichSuAPIChiaSe);
    public void Configure(EntityTypeBuilder<LichSuAPIChiaSe> builder)
    {
        builder.ToTable("LichSuAPIChiaSes", SchemaNames.Portal);

        builder
         .HasIndex(b => b.Id)
         .HasName($"Idx_{_name}_Id");


    }
}

public class SoLieuBaoCaoTheoKyConfig : IEntityTypeConfiguration<SoLieuBaoCaoTheoKy>
{
    private readonly string _name = nameof(SoLieuBaoCaoTheoKy);
    public void Configure(EntityTypeBuilder<SoLieuBaoCaoTheoKy> builder)
    {
        builder.ToTable("SoLieuBaoCaoTheoKys", SchemaNames.Portal);
        builder
        .HasIndex(b => new { b.MaDinhDanh })
        .HasName($"Idx_{_name}_SoLieuBaoCaoTheoKy_Name");
    }
}

public class SoLieuBaoCaoHienTaiConfig : IEntityTypeConfiguration<SoLieuBaoCaoHienTai>
{
    private readonly string _name = nameof(SoLieuBaoCaoHienTai);
    public void Configure(EntityTypeBuilder<SoLieuBaoCaoHienTai> builder)
    {
        builder.ToTable("SoLieuBaoCaoHienTais", SchemaNames.Portal);
        builder
        .HasIndex(b => new { b.MaDinhDanh })
        .HasName($"Idx_{_name}_SoLieuBaoCaoHienTai_Name");
    }
}

public class LoaiNhomGiayToCaNhanConfig : IEntityTypeConfiguration<LoaiNhomGiayToCaNhan>
{
    private readonly string _name = nameof(LoaiNhomGiayToCaNhan);
    public void Configure(EntityTypeBuilder<LoaiNhomGiayToCaNhan> builder)
    {
        builder.ToTable("LoaiNhomGiayToCaNhans", SchemaNames.Portal);
        builder
        .HasIndex(b => new { b.Id })
        .HasName($"Idx_{_name}_LoaiNhomGiayToCaNhan_Name");
    }
}

public class TaiLieuGiayToCaNhanConfig : IEntityTypeConfiguration<TaiLieuGiayToCaNhan>
{
    private readonly string _name = nameof(TaiLieuGiayToCaNhan);
    public void Configure(EntityTypeBuilder<TaiLieuGiayToCaNhan> builder)
    {
        builder.ToTable("TaiLieuGiayToCaNhans", SchemaNames.Portal);
        builder
        .HasIndex(b => new { b.Id })
        .HasName($"Idx_{_name}_TaiLieuGiayToCaNhan_Name");
    }
}