using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tbl_qltn_modify_thoigianxulytructuyen : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ThoiGianThucHienTrucTuyen",
                schema: "Business",
                table: "TruongHopThuTucs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ThoiGianThucHienTrucTuyen",
                schema: "Business",
                table: "QuyTrinhXuLys",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "QuanLyTaiNguyens",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DinhKem = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Ten = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Mota = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Public = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("PK_QuanLyTaiNguyens", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuanLyTaiNguyens_CreatedBy",
                schema: "Catalog",
                table: "QuanLyTaiNguyens",
                column: "CreatedBy");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuanLyTaiNguyens",
                schema: "Catalog");

            migrationBuilder.DropColumn(
                name: "ThoiGianThucHienTrucTuyen",
                schema: "Business",
                table: "TruongHopThuTucs");

            migrationBuilder.DropColumn(
                name: "ThoiGianThucHienTrucTuyen",
                schema: "Business",
                table: "QuyTrinhXuLys");
        }
    }
}
