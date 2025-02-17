using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_kqlq : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "NguoiKy",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "nvarchar(70)",
                maxLength: 70,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<string>(
                name: "CoQuanBanHanh",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DinhKem",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "nvarchar(1200)",
                maxLength: 1200,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoQuanBanHanh",
                schema: "Business",
                table: "KetQuaLienQuans");

            migrationBuilder.DropColumn(
                name: "DinhKem",
                schema: "Business",
                table: "KetQuaLienQuans");

            migrationBuilder.AlterColumn<string>(
                name: "NguoiKy",
                schema: "Business",
                table: "KetQuaLienQuans",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(70)",
                oldMaxLength: 70,
                oldNullable: true);
        }
    }
}
