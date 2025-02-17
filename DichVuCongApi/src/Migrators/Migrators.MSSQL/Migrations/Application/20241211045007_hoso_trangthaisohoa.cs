using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class hoso_trangthaisohoa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TrangThaiSoHoa",
                schema: "Business",
                table: "HoSos",
                type: "varchar(3)",
                maxLength: 3,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_HoSos_TrangThaiSoHoa",
                schema: "Business",
                table: "HoSos",
                column: "TrangThaiSoHoa");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HoSos_TrangThaiSoHoa",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "TrangThaiSoHoa",
                schema: "Business",
                table: "HoSos");
        }
    }
}
