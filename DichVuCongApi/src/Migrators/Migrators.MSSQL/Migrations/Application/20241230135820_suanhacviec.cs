using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class suanhacviec : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HoSos_NguoiNhanPhiDiaGioi_TrangThaiHoSoId",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.CreateIndex(
                name: "IX_HoSos_TrangThaiHoSoId_LaHoSoChungThuc",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "TrangThaiHoSoId", "LaHoSoChungThuc" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HoSos_TrangThaiHoSoId_LaHoSoChungThuc",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.CreateIndex(
                name: "IX_HoSos_NguoiNhanPhiDiaGioi_TrangThaiHoSoId",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "NguoiNhanPhiDiaGioi", "TrangThaiHoSoId" });
        }
    }
}
