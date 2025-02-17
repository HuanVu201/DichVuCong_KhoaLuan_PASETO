using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class update_nguoiKyChungTHuc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NguoiKy",
                schema: "Business",
                table: "HoSoChungThucs");

            migrationBuilder.AddColumn<Guid>(
                name: "NguoiKyChungThuc",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "uniqueidentifier",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NguoiKyChungThuc",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.AddColumn<string>(
                name: "NguoiKy",
                schema: "Business",
                table: "HoSoChungThucs",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true);
        }
    }
}
