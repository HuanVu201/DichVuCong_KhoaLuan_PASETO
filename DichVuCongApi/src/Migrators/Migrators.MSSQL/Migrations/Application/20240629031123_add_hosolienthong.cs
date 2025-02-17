using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_hosolienthong : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HoSoLienThongs",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaHoSo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoSoLienThongs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrangThaiHoSoLienThongs",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaHoSo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    TrangThai = table.Column<string>(type: "varchar(4)", maxLength: 4, nullable: false),
                    TrangThaiDongBoDVC = table.Column<string>(type: "varchar(4)", maxLength: 4, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrangThaiHoSoLienThongs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HoSoLienThongs_MaHoSo",
                schema: "Business",
                table: "HoSoLienThongs",
                column: "MaHoSo");

            migrationBuilder.CreateIndex(
                name: "IX_TrangThaiHoSoLienThongs_MaHoSo",
                schema: "Business",
                table: "TrangThaiHoSoLienThongs",
                column: "MaHoSo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HoSoLienThongs",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "TrangThaiHoSoLienThongs",
                schema: "Business");
        }
    }
}
