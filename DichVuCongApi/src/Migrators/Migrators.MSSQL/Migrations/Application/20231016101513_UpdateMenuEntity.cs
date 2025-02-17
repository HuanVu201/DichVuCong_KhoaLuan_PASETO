using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class UpdateMenuEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Order",
                schema: "Catalog",
                table: "Menus",
                newName: "ThuTuMenu");

            migrationBuilder.RenameColumn(
                name: "Name",
                schema: "Catalog",
                table: "Menus",
                newName: "TenMenu");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ThuTuMenu",
                schema: "Catalog",
                table: "Menus",
                newName: "Order");

            migrationBuilder.RenameColumn(
                name: "TenMenu",
                schema: "Catalog",
                table: "Menus",
                newName: "Name");
        }
    }
}
