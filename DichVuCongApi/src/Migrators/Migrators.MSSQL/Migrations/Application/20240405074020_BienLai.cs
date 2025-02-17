using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class BienLai : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DiaChiBienLai",
                schema: "Business",
                table: "YeuCauThanhToans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaSoThueBienLai",
                schema: "Business",
                table: "YeuCauThanhToans",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiNopTienBienLai",
                schema: "Business",
                table: "YeuCauThanhToans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DiaChiBienLai",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaSoThueBienLai",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiNopTienBienLai",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiaChiBienLai",
                schema: "Business",
                table: "YeuCauThanhToans");

            migrationBuilder.DropColumn(
                name: "MaSoThueBienLai",
                schema: "Business",
                table: "YeuCauThanhToans");

            migrationBuilder.DropColumn(
                name: "NguoiNopTienBienLai",
                schema: "Business",
                table: "YeuCauThanhToans");

            migrationBuilder.DropColumn(
                name: "DiaChiBienLai",
                schema: "Business",
                table: "GiaoDichThanhToans");

            migrationBuilder.DropColumn(
                name: "MaSoThueBienLai",
                schema: "Business",
                table: "GiaoDichThanhToans");

            migrationBuilder.DropColumn(
                name: "NguoiNopTienBienLai",
                schema: "Business",
                table: "GiaoDichThanhToans");
        }
    }
}
