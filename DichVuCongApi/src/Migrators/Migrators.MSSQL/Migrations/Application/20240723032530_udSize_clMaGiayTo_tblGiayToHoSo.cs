using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class udSize_clMaGiayTo_tblGiayToHoSo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_GiayToHoSo",
                schema: "Business",
                table: "GiayToHoSos");

            migrationBuilder.AlterColumn<string>(
                name: "MaGiayTo",
                schema: "Business",
                table: "GiayToHoSos",
                type: "nvarchar(4000)",
                maxLength: 4000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_GiayToHoSo",
                schema: "Business",
                table: "GiayToHoSos",
                columns: new[] { "MaHoSo", "LoaiGiayTo" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_GiayToHoSo",
                schema: "Business",
                table: "GiayToHoSos");

            migrationBuilder.AlterColumn<string>(
                name: "MaGiayTo",
                schema: "Business",
                table: "GiayToHoSos",
                type: "varchar(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(4000)",
                oldMaxLength: 4000,
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_GiayToHoSo",
                schema: "Business",
                table: "GiayToHoSos",
                columns: new[] { "MaGiayTo", "MaHoSo", "LoaiGiayTo" });
        }
    }
}
