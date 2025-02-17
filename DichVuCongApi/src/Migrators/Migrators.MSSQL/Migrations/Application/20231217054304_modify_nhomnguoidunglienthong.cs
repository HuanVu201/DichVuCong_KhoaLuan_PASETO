using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_nhomnguoidunglienthong : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MaNhomLienThong",
                schema: "Catalog",
                table: "NhomNguoiDungs",
                type: "varchar(750)",
                maxLength: 750,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaNhomLienThong",
                schema: "Catalog",
                table: "NhomNguoiDungs");
        }
    }
}
