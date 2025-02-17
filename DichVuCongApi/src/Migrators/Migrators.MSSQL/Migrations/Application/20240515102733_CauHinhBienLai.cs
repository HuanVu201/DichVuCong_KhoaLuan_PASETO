using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class CauHinhBienLai : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LoaiBienLai",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MauSoBienLai",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoBienLai",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoHieuBienLai",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LoaiBienLai",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "MauSoBienLai",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "SoBienLai",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "SoHieuBienLai",
                schema: "Catalog",
                table: "Groups");
        }
    }
}
