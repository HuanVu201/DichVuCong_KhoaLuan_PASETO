using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class udDiaBan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MaDiaBan",
                schema: "Catalog",
                table: "Groups",
                type: "varchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaHuyen",
                schema: "Catalog",
                table: "Groups",
                type: "varchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaTinh",
                schema: "Catalog",
                table: "Groups",
                type: "varchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaXa",
                schema: "Catalog",
                table: "Groups",
                type: "varchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaHuyen",
                schema: "Catalog",
                table: "DiaBans",
                type: "varchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MaTinh",
                schema: "Catalog",
                table: "DiaBans",
                type: "varchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MaXa",
                schema: "Catalog",
                table: "DiaBans",
                type: "varchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaDiaBan",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "MaHuyen",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "MaTinh",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "MaXa",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "MaHuyen",
                schema: "Catalog",
                table: "DiaBans");

            migrationBuilder.DropColumn(
                name: "MaTinh",
                schema: "Catalog",
                table: "DiaBans");

            migrationBuilder.DropColumn(
                name: "MaXa",
                schema: "Catalog",
                table: "DiaBans");
        }
    }
}
