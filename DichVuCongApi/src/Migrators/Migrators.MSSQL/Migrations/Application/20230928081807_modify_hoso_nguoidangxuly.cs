using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_hoso_nguoidangxuly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DangKyNhanHoSoQuaBCCI",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AddColumn<string>(
                name: "NguoiDangXuLy",
                schema: "Business",
                table: "HoSos",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NguoiDangXuLy",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AddColumn<bool>(
                name: "DangKyNhanHoSoQuaBCCI",
                schema: "Business",
                table: "HoSos",
                type: "bit",
                nullable: true);
        }
    }
}
