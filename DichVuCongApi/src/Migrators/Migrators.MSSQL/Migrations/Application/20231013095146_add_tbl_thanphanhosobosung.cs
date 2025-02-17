using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tbl_thanphanhosobosung : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DinhKemBoSung",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "varchar(1200)",
                maxLength: 1200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NoiDungBoSung",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ThanhPhanHoSoBoSungs",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HoSoBoSungId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    ThanhPhanHoSoId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    FileDinhKemCu = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false),
                    FileDinhKemMoi = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThanhPhanHoSoBoSungs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_ThanhPhanHoSoBoSung_HoSoBoSungId",
                schema: "Business",
                table: "ThanhPhanHoSoBoSungs",
                column: "HoSoBoSungId");

            migrationBuilder.CreateIndex(
                name: "Idx_ThanhPhanHoSoBoSung_ThanhPhanHoSoId",
                schema: "Business",
                table: "ThanhPhanHoSoBoSungs",
                column: "ThanhPhanHoSoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ThanhPhanHoSoBoSungs",
                schema: "Business");

            migrationBuilder.DropColumn(
                name: "DinhKemBoSung",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "NoiDungBoSung",
                schema: "Business",
                table: "ThanhPhanHoSos");
        }
    }
}
