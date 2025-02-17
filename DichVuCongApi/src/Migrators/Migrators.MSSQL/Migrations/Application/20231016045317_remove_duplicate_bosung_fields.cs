using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class remove_duplicate_bosung_fields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DinhKemBoSung",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "NoiDungBoSung",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "DanhSachGiayToBoSung",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "ThongTinTiepNhanBoSung",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AddColumn<string>(
                name: "NoiDungBoSung",
                schema: "Business",
                table: "ThanhPhanHoSoBoSungs",
                type: "varchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NoiDungBoSung",
                schema: "Business",
                table: "ThanhPhanHoSoBoSungs");

            migrationBuilder.AddColumn<string>(
                name: "DinhKemBoSung",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "varchar(1200)",
                maxLength: 1200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NoiDungBoSung",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DanhSachGiayToBoSung",
                schema: "Business",
                table: "HoSos",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThongTinTiepNhanBoSung",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }
    }
}
