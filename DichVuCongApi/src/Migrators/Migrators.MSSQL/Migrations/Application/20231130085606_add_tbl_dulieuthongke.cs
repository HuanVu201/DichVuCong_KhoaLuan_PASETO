using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tbl_dulieuthongke : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DuLieuThongKeHoSos",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TongSoHoSo = table.Column<int>(type: "int", nullable: false),
                    HoSoTuKyTruoc = table.Column<int>(type: "int", nullable: false),
                    HoSoMoiTiepNhan = table.Column<int>(type: "int", nullable: false),
                    TongSoHoSoDaXuLy = table.Column<int>(type: "int", nullable: false),
                    HoSoDaXuLyDungHan = table.Column<int>(type: "int", nullable: false),
                    HoSoDaXuLyQuaHan = table.Column<int>(type: "int", nullable: false),
                    Thang = table.Column<int>(type: "int", nullable: false),
                    Nam = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuLieuThongKeHoSos", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DuLieuThongKeHoSos",
                schema: "Business");
        }
    }
}
