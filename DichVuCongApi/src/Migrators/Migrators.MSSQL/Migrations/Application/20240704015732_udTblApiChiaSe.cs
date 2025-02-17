using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class udTblApiChiaSe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SoLuotGuiTrongNgay",
                schema: "Portal",
                table: "APIChiaSes",
                newName: "SoLuotGoiTrongNgay");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SoLuotGoiTrongNgay",
                schema: "Portal",
                table: "APIChiaSes",
                newName: "SoLuotGuiTrongNgay");
        }
    }
}
