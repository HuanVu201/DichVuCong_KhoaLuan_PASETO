using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class UpdatedHoSoEntity1309 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "NgayLuuViTriHoSo",
                schema: "Business",
                table: "HoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiLuuViTriHoSo",
                schema: "Business",
                table: "HoSos",
                type: "varchar",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NgayLuuViTriHoSo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "NguoiLuuViTriHoSo",
                schema: "Business",
                table: "HoSos");
        }
    }
}
