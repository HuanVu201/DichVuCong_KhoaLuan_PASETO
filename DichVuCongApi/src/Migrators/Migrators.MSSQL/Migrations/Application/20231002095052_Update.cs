using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Portal");

            migrationBuilder.RenameTable(
                name: "Footers",
                schema: "Catalog",
                newName: "Footers",
                newSchema: "Portal");

            migrationBuilder.RenameTable(
                name: "Banners",
                schema: "Catalog",
                newName: "Banners",
                newSchema: "Portal");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "Footers",
                schema: "Portal",
                newName: "Footers",
                newSchema: "Catalog");

            migrationBuilder.RenameTable(
                name: "Banners",
                schema: "Portal",
                newName: "Banners",
                newSchema: "Catalog");
        }
    }
}
