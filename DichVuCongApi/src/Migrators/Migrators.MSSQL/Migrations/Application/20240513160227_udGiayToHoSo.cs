using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class udGiayToHoSo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HTMLPhieu",
                schema: "Business",
                table: "GiayToHoSos",
                newName: "Blob");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Blob",
                schema: "Business",
                table: "GiayToHoSos",
                newName: "HTMLPhieu");
        }
    }
}
