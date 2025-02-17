using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class ThongKeDashboard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SoLieuBaoCaoHienTais",
                schema: "Portal",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LoaiThongKe = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    MaDinhDanh = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    SoLieu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SoLieuBaoCaoHienTais", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SoLieuBaoCaoTheoKys",
                schema: "Portal",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LoaiThoiGian = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Ky = table.Column<string>(type: "varchar(2)", maxLength: 2, nullable: false),
                    Nam = table.Column<string>(type: "varchar(4)", maxLength: 4, nullable: false),
                    LoaiThongKe = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    MaDinhDanh = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    SoLieu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SoLieuBaoCaoTheoKys", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_SoLieuBaoCaoHienTai_SoLieuBaoCaoHienTai_Name",
                schema: "Portal",
                table: "SoLieuBaoCaoHienTais",
                column: "MaDinhDanh");

            migrationBuilder.CreateIndex(
                name: "Idx_SoLieuBaoCaoTheoKy_SoLieuBaoCaoTheoKy_Name",
                schema: "Portal",
                table: "SoLieuBaoCaoTheoKys",
                column: "MaDinhDanh");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SoLieuBaoCaoHienTais",
                schema: "Portal");

            migrationBuilder.DropTable(
                name: "SoLieuBaoCaoTheoKys",
                schema: "Portal");
        }
    }
}
