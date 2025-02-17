using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class update_tbl_hoso_ketquachinh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LaKetQuaChinh",
                schema: "Business",
                table: "KetQuaLienQuans");

            migrationBuilder.AddColumn<string>(
                name: "CoQuanBanHanhKetQua",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LoaiVanBanKetQua",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayBanHanh",
                schema: "Business",
                table: "HoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiKyKetQua",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoKyHieuKetQua",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(60)",
                maxLength: 60,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoQuanBanHanhKetQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "LoaiVanBanKetQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "NgayBanHanh",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "NguoiKyKetQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "SoKyHieuKetQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AddColumn<bool>(
                name: "LaKetQuaChinh",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "bit",
                nullable: true);
        }
    }
}
