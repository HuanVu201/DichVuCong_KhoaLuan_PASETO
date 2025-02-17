using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class UpdateTblMauPhoi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TenMauPhoi",
                schema: "Business",
                table: "MauPhois",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "MaThuTuc",
                schema: "Business",
                table: "MauPhois",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MaLinhVuc",
                schema: "Business",
                table: "MauPhois",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LoaiPhoi",
                schema: "Business",
                table: "MauPhois",
                type: "varchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AddColumn<string>(
                name: "HtmlPhoi",
                schema: "Business",
                table: "MauPhois",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "LaPhoiEmail",
                schema: "Business",
                table: "MauPhois",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "LaPhoiMacDinh",
                schema: "Business",
                table: "MauPhois",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UrlMauPhoi",
                schema: "Business",
                table: "MauPhois",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HtmlPhoi",
                schema: "Business",
                table: "MauPhois");

            migrationBuilder.DropColumn(
                name: "LaPhoiEmail",
                schema: "Business",
                table: "MauPhois");

            migrationBuilder.DropColumn(
                name: "LaPhoiMacDinh",
                schema: "Business",
                table: "MauPhois");

            migrationBuilder.DropColumn(
                name: "UrlMauPhoi",
                schema: "Business",
                table: "MauPhois");

            migrationBuilder.AlterColumn<string>(
                name: "TenMauPhoi",
                schema: "Business",
                table: "MauPhois",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<string>(
                name: "MaThuTuc",
                schema: "Business",
                table: "MauPhois",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MaLinhVuc",
                schema: "Business",
                table: "MauPhois",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LoaiPhoi",
                schema: "Business",
                table: "MauPhois",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldMaxLength: 200);
        }
    }
}
