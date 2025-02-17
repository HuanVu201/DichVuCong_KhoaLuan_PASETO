using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class huongdannophoso2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "HuongDanNopHoSos",
                schema: "Catalog",
                newName: "HuongDanNopHoSos",
                newSchema: "Business");

            migrationBuilder.CreateIndex(
                name: "Idx_HuongDanNopHoSo_Name",
                schema: "Business",
                table: "HuongDanNopHoSos",
                column: "MaHoSo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_HuongDanNopHoSo_Name",
                schema: "Business",
                table: "HuongDanNopHoSos");

            migrationBuilder.RenameTable(
                name: "HuongDanNopHoSos",
                schema: "Business",
                newName: "HuongDanNopHoSos",
                newSchema: "Catalog");
        }
    }
}
