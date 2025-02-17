using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class ThongTinHoanPhi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SoTaiKhoanHoanPhi",
                schema: "Business",
                table: "YeuCauThanhToans",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TenNganHangHoanPhi",
                schema: "Business",
                table: "YeuCauThanhToans",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TenTaiKhoanHoanPhi",
                schema: "Business",
                table: "YeuCauThanhToans",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoTaiKhoanHoanPhi",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TenNganHangHoanPhi",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TenTaiKhoanHoanPhi",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoTaiKhoanHoanPhi",
                schema: "Business",
                table: "YeuCauThanhToans");

            migrationBuilder.DropColumn(
                name: "TenNganHangHoanPhi",
                schema: "Business",
                table: "YeuCauThanhToans");

            migrationBuilder.DropColumn(
                name: "TenTaiKhoanHoanPhi",
                schema: "Business",
                table: "YeuCauThanhToans");

            migrationBuilder.DropColumn(
                name: "SoTaiKhoanHoanPhi",
                schema: "Business",
                table: "GiaoDichThanhToans");

            migrationBuilder.DropColumn(
                name: "TenNganHangHoanPhi",
                schema: "Business",
                table: "GiaoDichThanhToans");

            migrationBuilder.DropColumn(
                name: "TenTaiKhoanHoanPhi",
                schema: "Business",
                table: "GiaoDichThanhToans");
        }
    }
}
