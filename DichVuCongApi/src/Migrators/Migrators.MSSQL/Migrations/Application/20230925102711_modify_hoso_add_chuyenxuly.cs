using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_hoso_add_chuyenxuly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DangKyNhanHoSoQuaBCCIData",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(1500)",
                maxLength: 1500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(2121)",
                oldMaxLength: 2121,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DinhKemKetQua",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DinhKemYKienNguoiChuyenXuLy",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrichYeuKetQua",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "YKienNguoiChuyenXuLy",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DinhKemKetQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "DinhKemYKienNguoiChuyenXuLy",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "TrichYeuKetQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "YKienNguoiChuyenXuLy",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AlterColumn<string>(
                name: "DangKyNhanHoSoQuaBCCIData",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(2121)",
                maxLength: 2121,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(1500)",
                oldMaxLength: 1500,
                oldNullable: true);
        }
    }
}
