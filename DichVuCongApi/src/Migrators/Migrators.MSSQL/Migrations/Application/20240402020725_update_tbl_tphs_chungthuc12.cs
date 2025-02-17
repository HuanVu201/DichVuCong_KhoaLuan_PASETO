using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class update_tbl_tphs_chungthuc12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NguoiKy",
                schema: "Business",
                table: "HoSoChungThucs",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ThanhPhanHoSoId",
                schema: "Business",
                table: "HoSoChungThucs",
                type: "uniqueidentifier",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NguoiKy",
                schema: "Business",
                table: "HoSoChungThucs");

            migrationBuilder.DropColumn(
                name: "ThanhPhanHoSoId",
                schema: "Business",
                table: "HoSoChungThucs");
        }
    }
}
