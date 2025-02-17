using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class updateDbHoSo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BanGocThuLai",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ChuKyNguoiNhanKetQua",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DinhKemNhanKetQua",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HoTenNguoiNhanKetQua",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LoaiNguoiNhanKetQua",
                schema: "Business",
                table: "HoSos",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoLuongBanGocThuLai",
                schema: "Business",
                table: "HoSos",
                type: "varchar(3)",
                maxLength: 3,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ViTriDeHoSo",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BanGocThuLai",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "ChuKyNguoiNhanKetQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "DinhKemNhanKetQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "HoTenNguoiNhanKetQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "LoaiNguoiNhanKetQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "SoLuongBanGocThuLai",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "ViTriDeHoSo",
                schema: "Business",
                table: "HoSos");
        }
    }
}
