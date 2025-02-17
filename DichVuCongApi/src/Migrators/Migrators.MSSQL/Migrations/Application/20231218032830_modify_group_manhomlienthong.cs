using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_group_manhomlienthong : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaNhomLienThong",
                schema: "Catalog",
                table: "NhomNguoiDungs");

            migrationBuilder.AddColumn<string>(
                name: "MaNhomLienThong",
                schema: "Catalog",
                table: "Groups",
                type: "varchar(200)",
                maxLength: 200,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaNhomLienThong",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.AddColumn<string>(
                name: "MaNhomLienThong",
                schema: "Catalog",
                table: "NhomNguoiDungs",
                type: "varchar(750)",
                maxLength: 750,
                nullable: true);
        }
    }
}
