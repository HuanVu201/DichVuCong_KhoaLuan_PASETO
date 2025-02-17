using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class udKyHieuBienLai : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoHieuBienLai",
                schema: "Business",
                table: "YeuCauThanhToans");

            migrationBuilder.RenameColumn(
                name: "SoHieuBienLai",
                schema: "Catalog",
                table: "Groups",
                newName: "KyHieuBienLai");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "KyHieuBienLai",
                schema: "Catalog",
                table: "Groups",
                newName: "SoHieuBienLai");

            migrationBuilder.AddColumn<string>(
                name: "SoHieuBienLai",
                schema: "Business",
                table: "YeuCauThanhToans",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }
    }
}
