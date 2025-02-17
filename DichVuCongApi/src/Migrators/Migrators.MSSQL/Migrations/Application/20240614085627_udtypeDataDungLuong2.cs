using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class udtypeDataDungLuong2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "DungLuong",
                schema: "Business",
                table: "PhienBanGiayToSoHoaKhoTaiLieuDienTus",
                type: "float",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "DungLuong",
                schema: "Business",
                table: "KhoTaiLieuDienTus",
                type: "float",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(20)",
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "DungLuong",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "float",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(20)",
                oldMaxLength: 20,
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DungLuong",
                schema: "Business",
                table: "PhienBanGiayToSoHoaKhoTaiLieuDienTus",
                type: "varchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DungLuong",
                schema: "Business",
                table: "KhoTaiLieuDienTus",
                type: "varchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DungLuong",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "varchar(20)",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);
        }
    }
}
