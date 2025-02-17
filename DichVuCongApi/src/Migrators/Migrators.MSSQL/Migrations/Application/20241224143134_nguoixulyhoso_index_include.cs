using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class nguoixulyhoso_index_include : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "NguoiXuLyHoSo_NguoiXuLy_TrangThai",
                schema: "Business",
                table: "NguoiXuLyHoSos");

            migrationBuilder.CreateIndex(
                name: "NguoiXuLyHoSo_NguoiXuLy_TrangThai_include_hosoid",
                schema: "Business",
                table: "NguoiXuLyHoSos",
                columns: new[] { "NguoiXuLy", "TrangThai" })
                .Annotation("SqlServer:Include", new[] { "HoSoId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "NguoiXuLyHoSo_NguoiXuLy_TrangThai_include_hosoid",
                schema: "Business",
                table: "NguoiXuLyHoSos");

            migrationBuilder.CreateIndex(
                name: "NguoiXuLyHoSo_NguoiXuLy_TrangThai",
                schema: "Business",
                table: "NguoiXuLyHoSos",
                columns: new[] { "NguoiXuLy", "TrangThai" });
        }
    }
}
