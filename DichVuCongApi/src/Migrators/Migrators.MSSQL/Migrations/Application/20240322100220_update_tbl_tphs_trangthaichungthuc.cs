using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class update_tbl_tphs_trangthaichungthuc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TrangThaiDuyet",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "LaGiayToThongDung",
                schema: "Business",
                table: "KetQuaThuTucs",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrangThaiDuyet",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "LaGiayToThongDung",
                schema: "Business",
                table: "KetQuaThuTucs");
        }
    }
}
