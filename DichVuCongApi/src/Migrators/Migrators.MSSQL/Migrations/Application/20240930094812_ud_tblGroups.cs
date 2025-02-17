using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class ud_tblGroups : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GID_1",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GID_2",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GID_3",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NAME_1",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NAME_2",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NAME_3",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TYPE_1",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TYPE_2",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TYPE_3",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GID_1",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "GID_2",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "GID_3",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "NAME_1",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "NAME_2",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "NAME_3",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "TYPE_1",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "TYPE_2",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "TYPE_3",
                schema: "Catalog",
                table: "Groups");
        }
    }
}
