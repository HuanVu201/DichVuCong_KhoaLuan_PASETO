using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_hoso_dinhkemsohoa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DinhKemSoHoa",
                schema: "Business",
                table: "GiayToSoHoas");

            migrationBuilder.AddColumn<string>(
                name: "DinhKemSoHoa",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(1200)",
                maxLength: 1200,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DinhKemSoHoa",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AddColumn<string>(
                name: "DinhKemSoHoa",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "nvarchar(1200)",
                maxLength: 1200,
                nullable: true);
        }
    }
}
