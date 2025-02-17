using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class ud_tblApiChiaSe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HuongDanGoi",
                schema: "Portal",
                table: "APIChiaSes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThamSoDauRa",
                schema: "Portal",
                table: "APIChiaSes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThamSoDauVao",
                schema: "Portal",
                table: "APIChiaSes",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HuongDanGoi",
                schema: "Portal",
                table: "APIChiaSes");

            migrationBuilder.DropColumn(
                name: "ThamSoDauRa",
                schema: "Portal",
                table: "APIChiaSes");

            migrationBuilder.DropColumn(
                name: "ThamSoDauVao",
                schema: "Portal",
                table: "APIChiaSes");
        }
    }
}
