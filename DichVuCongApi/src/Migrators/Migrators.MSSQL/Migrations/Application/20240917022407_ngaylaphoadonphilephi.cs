using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class ngaylaphoadonphilephi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NgayLapHoaDon",
                schema: "Business",
                table: "YeuCauThanhToans",
                newName: "NgayLapHoaDonPhi");

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayLapHoaDonLePhi",
                schema: "Business",
                table: "YeuCauThanhToans",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NgayLapHoaDonLePhi",
                schema: "Business",
                table: "YeuCauThanhToans");

            migrationBuilder.RenameColumn(
                name: "NgayLapHoaDonPhi",
                schema: "Business",
                table: "YeuCauThanhToans",
                newName: "NgayLapHoaDon");
        }
    }
}
