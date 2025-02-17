using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class addSuDung_tblLinhVucs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "SuDung",
                schema: "Catalog",
                table: "LinhVucs",
                type: "bit",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MaHoSo",
                schema: "Business",
                table: "DanhGiaCoQuans",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50,
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SuDung",
                schema: "Catalog",
                table: "LinhVucs");

            migrationBuilder.AlterColumn<string>(
                name: "MaHoSo",
                schema: "Business",
                table: "DanhGiaCoQuans",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);
        }
    }
}
