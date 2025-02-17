using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class nguoixulyhoso : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NguoiXuLyHoSos",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NguoiXuLy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HoSoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrangThai = table.Column<string>(type: "VARCHAR(2)", maxLength: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NguoiXuLyHoSos", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NguoiXuLyHoSos_HoSoId_NguoiXuLy_TrangThai",
                schema: "Business",
                table: "NguoiXuLyHoSos",
                columns: new[] { "HoSoId", "NguoiXuLy", "TrangThai" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NguoiXuLyHoSos",
                schema: "Business");
        }
    }
}
