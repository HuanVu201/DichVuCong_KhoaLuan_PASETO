using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class addTblsQuanLyTaiLieuDienTu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "DungLuong",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "KhoTaiLieuDienTuId",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayCapNhatKho",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "GiayToSoHoaChiaSes",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SoDinhDanh = table.Column<string>(type: "varchar(35)", maxLength: 35, nullable: false),
                    GiayToSoHoaId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    MaDinhDanhChiaSe = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    ThoiGianChiaSe = table.Column<DateTime>(type: "datetime2", maxLength: 2000, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiayToSoHoaChiaSes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KhoTaiLieuDienTus",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SoDinhDanh = table.Column<string>(type: "varchar(35)", maxLength: 35, nullable: false),
                    TenKhoTaiLieu = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    MoTa = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    DungLuong = table.Column<double>(type: "float", nullable: true),
                    SoLuong = table.Column<int>(type: "int", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhoTaiLieuDienTus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhienBanGiayToSoHoaKhoTaiLieuDienTus",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SoDinhDanh = table.Column<string>(type: "varchar(35)", maxLength: 35, nullable: false),
                    KhoTaiLieuDienTuId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    MaHoSo = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    DinhKem = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    MaGiayTo = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    DungLuong = table.Column<double>(type: "float", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhienBanGiayToSoHoaKhoTaiLieuDienTus", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_GiayToSoHoaChiaSe_Name",
                schema: "Business",
                table: "GiayToSoHoaChiaSes",
                column: "MaDinhDanhChiaSe");

            migrationBuilder.CreateIndex(
                name: "Idx_KhoTaiLieuDienTu_Name",
                schema: "Business",
                table: "KhoTaiLieuDienTus",
                column: "TenKhoTaiLieu");

            migrationBuilder.CreateIndex(
                name: "Idx_PhienBanGiayToSoHoaKhoTaiLieuDienTu_Name",
                schema: "Business",
                table: "PhienBanGiayToSoHoaKhoTaiLieuDienTus",
                column: "MaGiayTo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GiayToSoHoaChiaSes",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "KhoTaiLieuDienTus",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "PhienBanGiayToSoHoaKhoTaiLieuDienTus",
                schema: "Business");

            migrationBuilder.DropColumn(
                name: "DungLuong",
                schema: "Business",
                table: "GiayToSoHoas");

            migrationBuilder.DropColumn(
                name: "KhoTaiLieuDienTuId",
                schema: "Business",
                table: "GiayToSoHoas");

            migrationBuilder.DropColumn(
                name: "NgayCapNhatKho",
                schema: "Business",
                table: "GiayToSoHoas");
        }
    }
}
