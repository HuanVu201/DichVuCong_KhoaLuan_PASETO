using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class soGiayToNguoiNopTienBienLai : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SoGiayToNguoiNopTienBienLai",
                schema: "Business",
                table: "YeuCauThanhToans",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoGiayToNguoiNopTienBienLai",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoGiayToNguoiNopTienBienLai",
                schema: "Business",
                table: "YeuCauThanhToans");

            migrationBuilder.DropColumn(
                name: "SoGiayToNguoiNopTienBienLai",
                schema: "Business",
                table: "GiaoDichThanhToans");
        }
    }
}
