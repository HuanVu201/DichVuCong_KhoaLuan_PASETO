using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_hoso_add_tuchoi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DinhKemTuChoi",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LyDoTuChoi",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DinhKemTuChoi",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "LyDoTuChoi",
                schema: "Business",
                table: "HoSos");
        }
    }
}
