using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class Group_info : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DiaChi",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoDienThoai",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThoiGianLamViec",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NguoiKy",
                schema: "Business",
                table: "GiayToSoHoas",
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
                name: "DiaChi",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "SoDienThoai",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "ThoiGianLamViec",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.AlterColumn<string>(
                name: "NguoiKy",
                schema: "Business",
                table: "GiayToSoHoas",
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
