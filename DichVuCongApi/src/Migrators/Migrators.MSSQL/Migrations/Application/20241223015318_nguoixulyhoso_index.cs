using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class nguoixulyhoso_index : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_NguoiXuLyHoSos_HoSoId_NguoiXuLy_TrangThai",
                schema: "Business",
                table: "NguoiXuLyHoSos");

            migrationBuilder.CreateIndex(
                name: "NguoiXuLyHoSo_HoSoId",
                schema: "Business",
                table: "NguoiXuLyHoSos",
                column: "HoSoId");

            migrationBuilder.CreateIndex(
                name: "NguoiXuLyHoSo_NguoiXuLy_TrangThai",
                schema: "Business",
                table: "NguoiXuLyHoSos",
                columns: new[] { "NguoiXuLy", "TrangThai" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "NguoiXuLyHoSo_HoSoId",
                schema: "Business",
                table: "NguoiXuLyHoSos");

            migrationBuilder.DropIndex(
                name: "NguoiXuLyHoSo_NguoiXuLy_TrangThai",
                schema: "Business",
                table: "NguoiXuLyHoSos");

            migrationBuilder.CreateIndex(
                name: "IX_NguoiXuLyHoSos_HoSoId_NguoiXuLy_TrangThai",
                schema: "Business",
                table: "NguoiXuLyHoSos",
                columns: new[] { "HoSoId", "NguoiXuLy", "TrangThai" });
        }
    }
}
