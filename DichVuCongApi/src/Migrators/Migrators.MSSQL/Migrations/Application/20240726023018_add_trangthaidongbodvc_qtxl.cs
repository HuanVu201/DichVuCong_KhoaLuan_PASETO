using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_trangthaidongbodvc_qtxl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TrangThaiDongBoDVC",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                type: "varchar(3)",
                maxLength: 3,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuaTrinhXuLyHoSos_TrangThaiDongBoDVC",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                column: "TrangThaiDongBoDVC");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_QuaTrinhXuLyHoSos_TrangThaiDongBoDVC",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos");

            migrationBuilder.DropColumn(
                name: "TrangThaiDongBoDVC",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos");
        }
    }
}
