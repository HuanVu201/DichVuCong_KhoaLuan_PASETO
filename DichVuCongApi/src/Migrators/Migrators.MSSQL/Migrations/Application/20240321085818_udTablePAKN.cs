using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class udTablePAKN : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TieuDeTraLoi",
                schema: "Portal",
                table: "PhanAnhKienNghis");

            migrationBuilder.AlterColumn<string>(
                name: "NoiDungTraLoi",
                schema: "Portal",
                table: "PhanAnhKienNghis",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "NoiDungTraLoi",
                schema: "Portal",
                table: "PhanAnhKienNghis",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(2000)",
                oldMaxLength: 2000,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TieuDeTraLoi",
                schema: "Portal",
                table: "PhanAnhKienNghis",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);
        }
    }
}
