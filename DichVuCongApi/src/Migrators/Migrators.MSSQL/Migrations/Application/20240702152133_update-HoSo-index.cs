using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class updateHoSoindex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "Idx_LoaiDuLieuKetNoi",
                schema: "Business",
                table: "HoSos",
                column: "LoaiDuLieuKetNoi");

            migrationBuilder.CreateIndex(
                name: "Idx_NgayHenTra",
                schema: "Business",
                table: "HoSos",
                column: "NgayHenTra");

            migrationBuilder.CreateIndex(
                name: "Idx_NgayKetThucXuLy",
                schema: "Business",
                table: "HoSos",
                column: "NgayKetThucXuLy");

            migrationBuilder.CreateIndex(
                name: "Idx_NgayTiepNhan",
                schema: "Business",
                table: "HoSos",
                column: "NgayTiepNhan");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_LoaiDuLieuKetNoi",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_NgayHenTra",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_NgayKetThucXuLy",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_NgayTiepNhan",
                schema: "Business",
                table: "HoSos");
        }
    }
}
