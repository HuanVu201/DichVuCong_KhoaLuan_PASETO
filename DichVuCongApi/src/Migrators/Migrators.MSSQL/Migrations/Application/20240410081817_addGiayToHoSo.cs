using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class addGiayToHoSo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GiayToHoSos",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaHoSo = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    LoaiGiayTo = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    NguoiXuatPhieu = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    NgayXuatPhieu = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SuDung = table.Column<bool>(type: "bit", nullable: true),
                    MaGiayTo = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    HTMLPhieu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PDFPhieu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HinhAnhChuKyCongDan = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    NgayKySo = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiKySo = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    NgayGuiCongDan = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TrangThaiGuiCongDan = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    NguoiGuiCongDan = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiayToHoSos", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_GiayToHoSo",
                schema: "Business",
                table: "GiayToHoSos",
                columns: new[] { "MaGiayTo", "MaHoSo", "LoaiGiayTo" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GiayToHoSos",
                schema: "Business");
        }
    }
}
