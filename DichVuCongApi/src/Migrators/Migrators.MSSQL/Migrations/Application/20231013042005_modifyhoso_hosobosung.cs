using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modifyhoso_hosobosung : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DanhSachGiayToBoSung",
                schema: "Business",
                table: "HoSos",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayHenTraCaNhan",
                schema: "Business",
                table: "HoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThongTinTiepNhanBoSung",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DanhSachGiayToBoSung",
                schema: "Business",
                table: "HoSoBoSungs",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayHenTraMoi",
                schema: "Business",
                table: "HoSoBoSungs",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayTiepNhanBoSung",
                schema: "Business",
                table: "HoSoBoSungs",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiTiepNhanBoSung",
                schema: "Business",
                table: "HoSoBoSungs",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThongTinTiepNhan",
                schema: "Business",
                table: "HoSoBoSungs",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DanhSachGiayToBoSung",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "NgayHenTraCaNhan",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "ThongTinTiepNhanBoSung",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "DanhSachGiayToBoSung",
                schema: "Business",
                table: "HoSoBoSungs");

            migrationBuilder.DropColumn(
                name: "NgayHenTraMoi",
                schema: "Business",
                table: "HoSoBoSungs");

            migrationBuilder.DropColumn(
                name: "NgayTiepNhanBoSung",
                schema: "Business",
                table: "HoSoBoSungs");

            migrationBuilder.DropColumn(
                name: "NguoiTiepNhanBoSung",
                schema: "Business",
                table: "HoSoBoSungs");

            migrationBuilder.DropColumn(
                name: "ThongTinTiepNhan",
                schema: "Business",
                table: "HoSoBoSungs");
        }
    }
}
