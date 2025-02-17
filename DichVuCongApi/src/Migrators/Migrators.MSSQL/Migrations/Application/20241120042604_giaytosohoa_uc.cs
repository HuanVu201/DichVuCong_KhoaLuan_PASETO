using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class giaytosohoa_uc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MaLinhVuc",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MaTTHC",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TrangThaiSoHoa",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "varchar(2)",
                maxLength: 2,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_GiayToSoHoas_MaLinhVuc_MaTTHC",
                schema: "Business",
                table: "GiayToSoHoas",
                columns: new[] { "MaLinhVuc", "MaTTHC" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_GiayToSoHoas_MaLinhVuc_MaTTHC",
                schema: "Business",
                table: "GiayToSoHoas");

            migrationBuilder.DropColumn(
                name: "MaLinhVuc",
                schema: "Business",
                table: "GiayToSoHoas");

            migrationBuilder.DropColumn(
                name: "MaTTHC",
                schema: "Business",
                table: "GiayToSoHoas");

            migrationBuilder.DropColumn(
                name: "TrangThaiSoHoa",
                schema: "Business",
                table: "GiayToSoHoas");
        }
    }
}
