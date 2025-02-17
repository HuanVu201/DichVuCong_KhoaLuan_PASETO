using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tbl_duthaoxulyhoso : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuThaoXuLyHoSos",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaHoSo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    Loai = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    FileDinhKem = table.Column<string>(type: "nvarchar(1500)", maxLength: 1500, nullable: false),
                    NguoiXuLy = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    TrichYeu = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TrangThai = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false),
                    TrangThaiLienThongQLVB = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuThaoXuLyHoSos", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DuThaoXuLyHoSos_MaHoSo_Loai",
                schema: "Business",
                table: "DuThaoXuLyHoSos",
                columns: new[] { "MaHoSo", "Loai" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuThaoXuLyHoSos",
                schema: "Business");
        }
    }
}
