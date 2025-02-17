using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class index_hoso_phidiagioi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HoSos_TrangThaiPhiDiaGioi_DonViPhiDiaGioi",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.CreateIndex(
                name: "IX_HoSos_TrangThaiPhiDiaGioi_DonViPhiDiaGioi_TrangThaiHoSoId",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "TrangThaiPhiDiaGioi", "DonViPhiDiaGioi", "TrangThaiHoSoId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HoSos_TrangThaiPhiDiaGioi_DonViPhiDiaGioi_TrangThaiHoSoId",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.CreateIndex(
                name: "IX_HoSos_TrangThaiPhiDiaGioi_DonViPhiDiaGioi",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "TrangThaiPhiDiaGioi", "DonViPhiDiaGioi" });
        }
    }
}
