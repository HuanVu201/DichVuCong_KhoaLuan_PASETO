using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class addHoSoIdx_SearchBoSung : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "Idx_SearchBoSung",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "TrangThaiHoSoId", "TrangThaiBoSung", "NguoiDangXuLy", "LaHoSoChungThuc", "TrangThaiTraKq", "DeletedOn" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_SearchBoSung",
                schema: "Business",
                table: "HoSos");
        }
    }
}
