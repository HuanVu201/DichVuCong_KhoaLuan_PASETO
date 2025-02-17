using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_index_hoso : Migration
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
                columns: new[] { "MaHoSo", "DonViId" },
                unique: true,
                filter: "[MaHoSo] IS NOT NULL AND [DonViId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_HoSos_MaTTHC",
                schema: "Business",
                table: "HoSos",
                column: "MaTTHC");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "IX_HoSos_MaTTHC",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.CreateIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "MaHoSo", "DonViId", "MaTTHC" },
                unique: true,
                filter: "[MaHoSo] IS NOT NULL AND [DonViId] IS NOT NULL AND [MaTTHC] IS NOT NULL");
        }
    }
}
