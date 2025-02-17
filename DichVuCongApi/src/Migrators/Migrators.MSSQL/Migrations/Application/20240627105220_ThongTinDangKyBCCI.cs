using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class ThongTinDangKyBCCI : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "NgayDangKyBuuDien",
                schema: "Business",
                table: "HoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NgayDangKyNhanKqQua",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayTraBuuDien",
                schema: "Business",
                table: "HoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrangThaiTraBuuDien",
                schema: "Business",
                table: "HoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NgayDangKyBuuDien",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "NgayDangKyNhanKqQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "NgayTraBuuDien",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "TrangThaiTraBuuDien",
                schema: "Business",
                table: "HoSos");
        }
    }
}
