using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class updateGiayToHoSoindex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameIndex(
                name: "IX_GiayToHoSos_MaHoSo",
                schema: "Business",
                table: "GiayToHoSos",
                newName: "Idx_MaHoSo");

            migrationBuilder.CreateIndex(
                name: "Idx_SuDungDeleteOn",
                schema: "Business",
                table: "GiayToHoSos",
                columns: new[] { "DeletedOn", "SuDung" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_SuDungDeleteOn",
                schema: "Business",
                table: "GiayToHoSos");

            migrationBuilder.RenameIndex(
                name: "Idx_MaHoSo",
                schema: "Business",
                table: "GiayToHoSos",
                newName: "IX_GiayToHoSos_MaHoSo");
        }
    }
}
