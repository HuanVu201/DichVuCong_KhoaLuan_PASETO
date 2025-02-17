using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class ud_tblTaiLieuCaNhanCongDan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LoaiNhomGiayToCaNhanId",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LoaiNhomGiayToCaNhanId",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans");

            migrationBuilder.DropColumn(
                name: "Type",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans");
        }
    }
}
