using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_sohoaketqua : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "DaSoHoaKetQua",
                schema: "Business",
                table: "HoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "JsonOcr",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DaSoHoaKetQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "JsonOcr",
                schema: "Business",
                table: "GiayToSoHoas");
        }
    }
}
