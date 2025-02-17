using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class maNganHangNopTien : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MaGiaoDich",
                schema: "Business",
                table: "YeuCauThanhToans",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaNganHangGiaoDich",
                schema: "Business",
                table: "YeuCauThanhToans",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaGiaoDich",
                schema: "Business",
                table: "YeuCauThanhToans");

            migrationBuilder.DropColumn(
                name: "MaNganHangGiaoDich",
                schema: "Business",
                table: "YeuCauThanhToans");
        }
    }
}
