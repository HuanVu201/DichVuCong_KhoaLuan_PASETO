using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class IndexHoSo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.CreateIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "MaHoSo", "DonViId", "MaTTHC" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.CreateIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "MaHoSo", "DonViId" });
        }
    }
}
