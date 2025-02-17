using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_eform : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EFormKetQua",
                schema: "Business",
                table: "TruongHopThuTucs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaNhanDienOCR",
                schema: "Business",
                table: "TruongHopThuTucs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EFormKetQuaData",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EFormKetQua",
                schema: "Business",
                table: "TruongHopThuTucs");

            migrationBuilder.DropColumn(
                name: "MaNhanDienOCR",
                schema: "Business",
                table: "TruongHopThuTucs");

            migrationBuilder.DropColumn(
                name: "EFormKetQuaData",
                schema: "Business",
                table: "HoSos");
        }
    }
}
