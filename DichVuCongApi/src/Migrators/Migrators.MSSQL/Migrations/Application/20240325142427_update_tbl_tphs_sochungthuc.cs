using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class update_tbl_tphs_sochungthuc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SoChungThucG",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoChungThucGiay",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoChungThucG",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "SoChungThucGiay",
                schema: "Business",
                table: "ThanhPhanHoSos");
        }
    }
}
