using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class ud_TaiLieuKhoLuuTruCongDan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SoLuotTaiSuDung",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoLuotTaiSuDung",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans");
        }
    }
}
