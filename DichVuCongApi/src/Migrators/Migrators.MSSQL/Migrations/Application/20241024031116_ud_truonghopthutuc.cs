using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class ud_truonghopthutuc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NoteNgayLamViec",
                schema: "Business",
                table: "TruongHopThuTucs",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NoteTraKetQua",
                schema: "Business",
                table: "TruongHopThuTucs",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NoteNgayLamViec",
                schema: "Business",
                table: "TruongHopThuTucs");

            migrationBuilder.DropColumn(
                name: "NoteTraKetQua",
                schema: "Business",
                table: "TruongHopThuTucs");
        }
    }
}
