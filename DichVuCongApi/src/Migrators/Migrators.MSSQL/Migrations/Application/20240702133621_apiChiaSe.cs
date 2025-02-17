using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class apiChiaSe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "APIChiaSes",
                schema: "Portal",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaApiChiaSe = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    TenApiChiaSe = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    NoiDung = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    GioiHan = table.Column<int>(type: "int", nullable: true),
                    DuongDan = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true),
                    NgayGui = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    SoLuotGuiTrongNgay = table.Column<int>(type: "int", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_APIChiaSes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LichSuAPIChiaSes",
                schema: "Portal",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApiChiaSe = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    IP = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LichSuAPIChiaSes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_APIChiaSe_Id",
                schema: "Portal",
                table: "APIChiaSes",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "Idx_LichSuAPIChiaSe_Id",
                schema: "Portal",
                table: "LichSuAPIChiaSes",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "APIChiaSes",
                schema: "Portal");

            migrationBuilder.DropTable(
                name: "LichSuAPIChiaSes",
                schema: "Portal");
        }
    }
}
