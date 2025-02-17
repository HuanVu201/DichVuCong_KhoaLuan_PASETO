using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tblNhomThuTuc_LoaiThuTuc_ThuTucThuocLoai : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LoaiThuTucs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NhomThuTucId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ThuTu = table.Column<int>(type: "int", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoaiThuTucs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NhomThuTucs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    MauSac = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DoiTuong = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThuTu = table.Column<int>(type: "int", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NhomThuTucs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ThuTucThuocLoais",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ThuTucID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ThuTu = table.Column<int>(type: "int", nullable: false),
                    LoaiThuTucId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThuTucThuocLoais", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_LoaiThuTuc_LoaiThuTuc_Name",
                schema: "Catalog",
                table: "LoaiThuTucs",
                column: "Ten");

            migrationBuilder.CreateIndex(
                name: "Idx_NhomThuTuc_NhomThuTuc_Name",
                schema: "Catalog",
                table: "NhomThuTucs",
                column: "Ten");

            migrationBuilder.CreateIndex(
                name: "Idx_ThuTucThuocLoai_ThuTucThuocLoai_Name",
                schema: "Catalog",
                table: "ThuTucThuocLoais",
                column: "ThuTucID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LoaiThuTucs",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "NhomThuTucs",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "ThuTucThuocLoais",
                schema: "Catalog");
        }
    }
}
