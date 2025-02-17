using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class UpdatePortal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "TrangThais",
                schema: "Catalog",
                newName: "TrangThais",
                newSchema: "Portal");

            migrationBuilder.RenameTable(
                name: "TinBais",
                schema: "Catalog",
                newName: "TinBais",
                newSchema: "Portal");

            migrationBuilder.RenameTable(
                name: "KieuNoiDungs",
                schema: "Catalog",
                newName: "KieuNoiDungs",
                newSchema: "Portal");

            migrationBuilder.RenameTable(
                name: "KenhTins",
                schema: "Catalog",
                newName: "KenhTins",
                newSchema: "Portal");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "TrangThais",
                schema: "Portal",
                newName: "TrangThais",
                newSchema: "Catalog");

            migrationBuilder.RenameTable(
                name: "TinBais",
                schema: "Portal",
                newName: "TinBais",
                newSchema: "Catalog");

            migrationBuilder.RenameTable(
                name: "KieuNoiDungs",
                schema: "Portal",
                newName: "KieuNoiDungs",
                newSchema: "Catalog");

            migrationBuilder.RenameTable(
                name: "KenhTins",
                schema: "Portal",
                newName: "KenhTins",
                newSchema: "Catalog");
        }
    }
}
