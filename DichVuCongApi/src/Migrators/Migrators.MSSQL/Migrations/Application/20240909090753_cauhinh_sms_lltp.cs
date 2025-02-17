using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class cauhinh_sms_lltp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SmsConfig",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "HoSoLienThongLLTPs",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaHoSo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    DuongDanDuLieu = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoSoLienThongLLTPs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HoSoLienThongLLTPs_MaHoSo",
                schema: "Business",
                table: "HoSoLienThongLLTPs",
                column: "MaHoSo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HoSoLienThongLLTPs",
                schema: "Business");

            migrationBuilder.DropColumn(
                name: "SmsConfig",
                schema: "Catalog",
                table: "Groups");
        }
    }
}
