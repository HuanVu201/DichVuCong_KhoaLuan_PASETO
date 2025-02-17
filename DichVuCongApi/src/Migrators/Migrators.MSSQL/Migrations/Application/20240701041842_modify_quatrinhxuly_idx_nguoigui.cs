using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_quatrinhxuly_idx_nguoigui : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_QuaTrinhXuLyHoSos_NguoiGui",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                column: "NguoiGui");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_QuaTrinhXuLyHoSos_NguoiGui",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos");
        }
    }
}
