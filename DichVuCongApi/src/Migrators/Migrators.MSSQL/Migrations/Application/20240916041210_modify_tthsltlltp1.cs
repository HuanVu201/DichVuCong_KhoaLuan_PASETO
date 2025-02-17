using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_tthsltlltp1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DinhKemThuHoi",
                schema: "Business",
                table: "TrangThaiDongBoHoSoLLTPs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TypeVneid",
                schema: "Business",
                table: "TrangThaiDongBoHoSoLLTPs",
                type: "varchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DinhKemThuHoi",
                schema: "Business",
                table: "TrangThaiDongBoHoSoLLTPs");

            migrationBuilder.DropColumn(
                name: "TypeVneid",
                schema: "Business",
                table: "TrangThaiDongBoHoSoLLTPs");
        }
    }
}
