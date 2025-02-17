using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_hoso_add_col_bcci : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "DangKyNhanHoSoQuaBCCI",
                schema: "Business",
                table: "HoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DangKyNhanHoSoQuaBCCIData",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(2121)",
                maxLength: 2121,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DangKyNhanHoSoQuaBCCI",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "DangKyNhanHoSoQuaBCCIData",
                schema: "Business",
                table: "HoSos");
        }
    }
}
