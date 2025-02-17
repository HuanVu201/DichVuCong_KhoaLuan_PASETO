using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Business");

            migrationBuilder.EnsureSchema(
                name: "Catalog");

            migrationBuilder.CreateTable(
                name: "Actions",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Ma = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    UuTien = table.Column<int>(type: "int", nullable: false),
                    Quyen = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Actions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BuocXuLys",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenBuoc = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuocXuLys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Configs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ThuTu = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Module = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Configs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DanhMucChungs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenDanhMuc = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ThuTu = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhMucChungs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DiaBans",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenDiaBan = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    MaDiaBan = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    ThuTu = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiaBans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DonViThuTucs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ThuTucId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DonViId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NguoiTiepNhanId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MucDo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    TKThuHuong = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    MaNHThuHuong = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    TenTKThuHuong = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UrlRedirect = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false),
                    MaSoThue = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false),
                    DonViMaSoThue = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonViThuTucs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GroupCode = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: false),
                    GroupName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    OfGroupCode = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    OfGroupName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    OfGroupId = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    GroupOrder = table.Column<int>(type: "int", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: true),
                    Agent = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Type = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    Catalog = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    TaiKhoanThuHuong = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    MaNganHang = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    TenTaiKhoanThuHuong = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HoSos",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ThuTucId = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    DonViId = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    LinhVucId = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    MaHoSo = table.Column<string>(type: "varchar(28)", maxLength: 28, nullable: true),
                    KenhThucHien = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    LoaiDoiTuong = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    MaDoiTuong = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    ChuHoSo = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    SoDienThoaiChuHoSo = table.Column<string>(type: "varchar(13)", maxLength: 13, nullable: true),
                    EmailChuHoSo = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    SoGiayToChuHoSo = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    LoaiGiayToChuHoSo = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    NgaySinhChuHoSo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    TinhThanhChuHoSo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    QuanHuyenChuHoSo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    XaPhuongChuHoSo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    DiaChiChuHoSo = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    UyQuyen = table.Column<bool>(type: "bit", nullable: true),
                    NguoiUyQuyen = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    SoDienThoaiNguoiUyQuyen = table.Column<string>(type: "varchar(13)", maxLength: 13, nullable: true),
                    EmailNguoiUyQuyen = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    SoGiayToNguoiUyQuyen = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    LoaiGiayToNguoiUyQuyen = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    NgaySinhNguoiUyQuyen = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    TinhThanhNguoiUyQuyen = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    QuanHuyenNguoiUyQuyen = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    XaPhuongNguoiUyQuyen = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    DiaChiNguoiUyQuyen = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    TrichYeuHoSo = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    NgayTiepNhan = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    NgayHenTra = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    TrangThaiHoSoId = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    NgayTra = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    HinhThucTra = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    NgayKetThucXuLy = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    GhiChu = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    NoiNopHoSo = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    HoSoCoThanhPhanSoHo = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    TaiKhoanDuocXacThucVoiVNeID = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    DuocThanhToanTrucTuyen = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    NgayTuChoi = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    LoaiDinhDanh = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: true),
                    SoDinhDanh = table.Column<string>(type: "varchar(40)", maxLength: 40, nullable: true),
                    NgayNopHoSo = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    MaTTHC = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    MaLinhVuc = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    TenLinhVuc = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    TenTruongHop = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    MaTruongHop = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    TruongHopId = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    ThoiGianThucHien = table.Column<int>(type: "int", nullable: true),
                    LoaiThoiGianThucHien = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ThongBaoEmail = table.Column<bool>(type: "bit", nullable: true),
                    ThongBaoZalo = table.Column<bool>(type: "bit", nullable: true),
                    ThongBaoSMS = table.Column<bool>(type: "bit", nullable: true),
                    NguoiXuLyTiep = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    BuocXuLyTiep = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    NguoiNhanHoSo = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    NguoiDaXuLy = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    MucDo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SoBoHoSo = table.Column<int>(type: "int", nullable: true),
                    TenBuocHienTai = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    BuocHienTai = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    NguoiXuLyTruoc = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    BuocXuLyTruoc = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoSos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LinhVucs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Ma = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    MaNganh = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    SoLuongThuTuc = table.Column<int>(type: "int", nullable: true),
                    SoLuongThuTucCapTinh = table.Column<int>(type: "int", nullable: true),
                    SoLuongThuTucCapHuyen = table.Column<int>(type: "int", nullable: true),
                    SoLuongThuTucCapXa = table.Column<int>(type: "int", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LinhVucs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoaiPhiLePhis",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ma = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SuDung = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoaiPhiLePhis", x => x.Id);
                });


            migrationBuilder.CreateTable(
                name: "NgayNghis",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NgayNghis", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NhomNguoiDungs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Ma = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    MoTa = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NhomNguoiDungs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhiLePhis",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Ma = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    ThuTucId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    TruongHopId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    Loai = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SoTien = table.Column<int>(type: "int", nullable: true),
                    DonVi = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DinhKem = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhiLePhis", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "QuyTrinhXuLys",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TruongHopId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenBuocXuLy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ThoiGianXuLy = table.Column<int>(type: "int", nullable: false),
                    LoaiThoiGian = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LoaiBuoc = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    TenNhomNguoiDung = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    NhomNguoiDungId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TenTrangThaiHoSo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TrangThaiHoSoId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    YeuCauCoKetQuaBuocTruoc = table.Column<bool>(type: "bit", nullable: true),
                    ChoPhepChuyenLaiBuocTruoc = table.Column<bool>(type: "bit", nullable: true),
                    GuiLienThongQLVB = table.Column<bool>(type: "bit", nullable: true),
                    GuiEmail = table.Column<bool>(type: "bit", nullable: true),
                    BieuMauEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GuiSMS = table.Column<bool>(type: "bit", nullable: true),
                    BieuMauSMS = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuyTrinhXuLys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ScreenActions",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ScreenId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScreenActions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Screens",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Ma = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Screens", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ThanhPhanThuTucs",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Ma = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    ThuTucId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TruongHopId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaGiayToKhoQuocGia = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    DinhKem = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false),
                    BatBuoc = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThanhPhanThuTucs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ThongBaos",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TieuDe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NoiDung = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TepDinhKem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DonViId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ToanHeThong = table.Column<bool>(type: "bit", nullable: false),
                    QuanTrong = table.Column<bool>(type: "bit", nullable: false),
                    SuDung = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThongBaos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ThuTucs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IDQG = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    MaTTHC = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    TenTTHC = table.Column<string>(type: "nvarchar(1700)", maxLength: 1700, nullable: false),
                    GoiTinThuTucQG = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LoaiTTHC = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TrangThai = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    SuDung = table.Column<bool>(type: "bit", nullable: true),
                    LinhVucChinh = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    MaLinhVucChinh = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CoQuanThucHienChinh = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    MaKetQuaChinh = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TenKetQuaChinh = table.Column<string>(type: "nvarchar(600)", maxLength: 600, nullable: false),
                    ThoiGianGiaiQuyet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuyetDinhCongBo = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    NgayCapNhat = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LinhVucId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TrangThaiPhiLePhi = table.Column<bool>(type: "bit", nullable: true),
                    MucDo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LienThong = table.Column<bool>(type: "bit", nullable: true),
                    HoSoPhatSinhTrongNam = table.Column<int>(type: "int", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThuTucs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrangThaiHoSos",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Ma = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    MoTa = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrangThaiHoSos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TruongHopThuTucs",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Ma = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    ThuTucId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    ThoiGianThucHien = table.Column<int>(type: "int", nullable: true),
                    LoaiThoiGianThucHien = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BatBuocDinhKemKetQua = table.Column<bool>(type: "bit", nullable: true),
                    YeuCauNopPhiTrucTuyen = table.Column<bool>(type: "bit", nullable: true),
                    DonViTiepNhanRieng = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EForm = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EFormTemplate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NodeQuyTrinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EdgeQuyTrinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TruongHopThuTucs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_Action",
                schema: "Business",
                table: "Actions",
                column: "Ten");

            migrationBuilder.CreateIndex(
                name: "Idx_BuocXuLy",
                schema: "Catalog",
                table: "BuocXuLys",
                column: "TenBuoc");

            migrationBuilder.CreateIndex(
                name: "Idx_Config_Config",
                schema: "Catalog",
                table: "Configs",
                columns: new[] { "Ten", "Code", "Module", "Active" });

            migrationBuilder.CreateIndex(
                name: "Idx_DanhMucChung_DanhMucChung_Name",
                schema: "Catalog",
                table: "DanhMucChungs",
                columns: new[] { "TenDanhMuc", "Code" });

            migrationBuilder.CreateIndex(
                name: "Idx_DiaBan_DiaBan_Name",
                schema: "Catalog",
                table: "DiaBans",
                columns: new[] { "TenDiaBan", "MaDiaBan" });

            migrationBuilder.CreateIndex(
                name: "Idx_DonViThuTuc",
                schema: "Catalog",
                table: "DonViThuTucs",
                columns: new[] { "DonViId", "ThuTucId" });

            migrationBuilder.CreateIndex(
                name: "Idx_Group_Search",
                schema: "Catalog",
                table: "Groups",
                columns: new[] { "GroupCode", "GroupName", "OfGroupCode" });

            migrationBuilder.CreateIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "MaHoSo", "ThuTucId", "DonViId", "LinhVucId" });

            migrationBuilder.CreateIndex(
                name: "Idx_LinhVuc_LinhVuc_Active",
                schema: "Catalog",
                table: "LinhVucs",
                columns: new[] { "Ma", "Ten", "MaNganh" });

            migrationBuilder.CreateIndex(
                name: "Idx_LoaiPhiLePhi_LoaiLephi_Name",
                schema: "Business",
                table: "LoaiPhiLePhis",
                columns: new[] { "Ma", "SuDung" });

            migrationBuilder.CreateIndex(
                name: "Idx_NgayNghi_NgayNghi_Name",
                schema: "Catalog",
                table: "NgayNghis",
                columns: new[] { "Date", "Description" });

            migrationBuilder.CreateIndex(
                name: "Idx_NhomNguoiDung",
                schema: "Catalog",
                table: "NhomNguoiDungs",
                column: "Ten");

            migrationBuilder.CreateIndex(
                name: "Idx_PhiLePhi",
                schema: "Business",
                table: "PhiLePhis",
                columns: new[] { "ThuTucId", "Loai", "DonVi" });

            migrationBuilder.CreateIndex(
                name: "Idx_QuyTrinhXuLy",
                schema: "Business",
                table: "QuyTrinhXuLys",
                column: "TruongHopId");

            migrationBuilder.CreateIndex(
                name: "Idx_ScreenAction",
                schema: "Business",
                table: "ScreenActions",
                column: "ScreenId");

            migrationBuilder.CreateIndex(
                name: "Idx_Screen",
                schema: "Business",
                table: "Screens",
                column: "Ma");

            migrationBuilder.CreateIndex(
                name: "Idx_ThanhPhanThuTuc_thuTucId",
                schema: "Business",
                table: "ThanhPhanThuTucs",
                column: "ThuTucId");

            migrationBuilder.CreateIndex(
                name: "Idx_ThongBao",
                schema: "Catalog",
                table: "ThongBaos",
                column: "DonViId");

            migrationBuilder.CreateIndex(
                name: "Idx_ThuTuc_MaTTHC",
                schema: "Catalog",
                table: "ThuTucs",
                columns: new[] { "MaTTHC", "LoaiTTHC", "MaLinhVucChinh" });

            migrationBuilder.CreateIndex(
                name: "Idx_TrangThaiHoSo",
                schema: "Business",
                table: "TrangThaiHoSos",
                column: "Ten");

            migrationBuilder.CreateIndex(
                name: "Idx_TruongHopThuTuc_ThuTuc",
                schema: "Business",
                table: "TruongHopThuTucs",
                column: "ThuTucId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Actions",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "BuocXuLys",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "Configs",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "DanhMucChungs",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "DiaBans",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "DonViThuTucs",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "Groups",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "HoSos",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "LinhVucs",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "LoaiPhiLePhis",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "Menus",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "NgayNghis",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "NhomNguoiDungs",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "PhiLePhis",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "QuyTrinhXuLys",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "ScreenActions",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "Screens",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "ThanhPhanThuTucs",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "ThongBaos",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "ThuTucs",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "TrangThaiHoSos",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "TruongHopThuTucs",
                schema: "Business");

            migrationBuilder.DropColumn(
                name: "GroupCode",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsSystemAccount",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "OfficeCode",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PositionCode",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserOrder",
                schema: "Identity",
                table: "Users");
        }
    }
}
