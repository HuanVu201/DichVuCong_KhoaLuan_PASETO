using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class rmv_trangthaidongbodvc_qtxl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_QuaTrinhXuLyHoSos_TrangThaiDongBoDVC",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos");

            migrationBuilder.DropColumn(
                name: "TrangThaiDongBoDVC",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos");

            migrationBuilder.AlterColumn<string>(
                name: "TrangThaiDongBoDVCQuocGia",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                type: "varchar(3)",
                maxLength: 3,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuaTrinhXuLyHoSos_TrangThaiDongBoDVCQuocGia",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                column: "TrangThaiDongBoDVCQuocGia");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_QuaTrinhXuLyHoSos_TrangThaiDongBoDVCQuocGia",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos");

            migrationBuilder.AlterColumn<string>(
                name: "TrangThaiDongBoDVCQuocGia",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(3)",
                oldMaxLength: 3,
                oldNullable: true);

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
    }
}
