using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_index_logcsdldoanhnghiep : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_LogCSDLDanCuDoanhNghieps_DonViId_TaiKhoan",
                schema: "Business",
                table: "LogCSDLDanCuDoanhNghieps",
                columns: new[] { "DonViId", "TaiKhoan" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_LogCSDLDanCuDoanhNghieps_DonViId_TaiKhoan",
                schema: "Business",
                table: "LogCSDLDanCuDoanhNghieps");
        }
    }
}
