using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class reindex_hoso_phidiagioi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HoSos_TrangThaiPhiDiaGioi_DonViPhiDiaGioi_TrangThaiHoSoId",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.CreateIndex(
                name: "IX_HoSos_NguoiNhanPhiDiaGioi_TrangThaiHoSoId",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "NguoiNhanPhiDiaGioi", "TrangThaiHoSoId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HoSos_NguoiNhanPhiDiaGioi_TrangThaiHoSoId",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.CreateIndex(
                name: "IX_HoSos_TrangThaiPhiDiaGioi_DonViPhiDiaGioi_TrangThaiHoSoId",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "TrangThaiPhiDiaGioi", "DonViPhiDiaGioi", "TrangThaiHoSoId" });
        }
    }
}
