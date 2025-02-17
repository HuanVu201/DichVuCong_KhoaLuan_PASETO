using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class update_tbl_ketquachinh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TrichYeu",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(2000)",
                oldMaxLength: 2000,
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "LaKetQuaChinh",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SuDung",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LaKetQuaChinh",
                schema: "Business",
                table: "KetQuaLienQuans");

            migrationBuilder.DropColumn(
                name: "SuDung",
                schema: "Business",
                table: "KetQuaLienQuans");

            migrationBuilder.AlterColumn<string>(
                name: "TrichYeu",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "varchar(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(2000)",
                oldMaxLength: 2000,
                oldNullable: true);
        }
    }
}
