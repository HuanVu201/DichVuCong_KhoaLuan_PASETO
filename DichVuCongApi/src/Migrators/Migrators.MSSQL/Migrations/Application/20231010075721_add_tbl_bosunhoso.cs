using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tbl_bosunhoso : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DinhKemBoSung",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LyDoBoSung",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayYeuCauBoSung",
                schema: "Business",
                table: "HoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThanhPhanBoSung",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(1200)",
                maxLength: 1200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrangThaiTruoc",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "HoSoBoSungs",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaHoSo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    NoiDungBoSung = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DinhKemNoiDungBoSung = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    NgayBoSung = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiYeuCauBoSung = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    NgayHenTraTruoc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TrangThaiBoSung = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ThanhPhanBoSung = table.Column<string>(type: "nvarchar(1200)", maxLength: 1200, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoSoBoSungs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_HoSoBoSung",
                schema: "Business",
                table: "HoSoBoSungs",
                column: "MaHoSo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HoSoBoSungs",
                schema: "Business");

            migrationBuilder.DropColumn(
                name: "DinhKemBoSung",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "LyDoBoSung",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "NgayYeuCauBoSung",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "ThanhPhanBoSung",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "TrangThaiTruoc",
                schema: "Business",
                table: "HoSos");
        }
    }
}
