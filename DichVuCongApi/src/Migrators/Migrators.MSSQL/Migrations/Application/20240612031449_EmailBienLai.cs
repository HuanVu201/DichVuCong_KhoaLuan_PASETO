using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class EmailBienLai : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailNguoiNopTienBienLai",
                schema: "Business",
                table: "YeuCauThanhToans",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmailNguoiNopTienBienLai",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailNguoiNopTienBienLai",
                schema: "Business",
                table: "YeuCauThanhToans");

            migrationBuilder.DropColumn(
                name: "EmailNguoiNopTienBienLai",
                schema: "Business",
                table: "GiaoDichThanhToans");
        }
    }
}
