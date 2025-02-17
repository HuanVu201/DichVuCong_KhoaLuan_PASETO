using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_sohientai_group : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DuLieuBTP",
                schema: "Business",
                table: "TrangThaiHoSoLienThongs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayHienTai",
                schema: "Catalog",
                table: "Groups",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "SoHienTai",
                schema: "Catalog",
                table: "Groups",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DuLieuBTP",
                schema: "Business",
                table: "TrangThaiHoSoLienThongs");

            migrationBuilder.DropColumn(
                name: "NgayHienTai",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "SoHienTai",
                schema: "Catalog",
                table: "Groups");
        }
    }
}
