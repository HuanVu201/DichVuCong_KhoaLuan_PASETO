using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class addTblChuKyDienTuCaNhan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ThoiGianChiaSe",
                schema: "Business",
                table: "GiayToSoHoaChiaSes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ThoiGianChiaSe",
                schema: "Business",
                table: "GiayToSoHoaChiaSes",
                type: "datetime2",
                maxLength: 2000,
                nullable: true);
        }
    }
}
