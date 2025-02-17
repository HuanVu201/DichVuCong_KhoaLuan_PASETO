using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_maketquathutuc_ocr : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaNhanDienOCR",
                schema: "Business",
                table: "TruongHopThuTucs");

            migrationBuilder.AlterColumn<string>(
                name: "DinhKem",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "nvarchar(1200)",
                maxLength: 1200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(1200)",
                oldMaxLength: 1200,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DinhKemSoHoa",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "nvarchar(1200)",
                maxLength: 1200,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "KetQuaThuTucs",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaNhanDienOCR = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    MaKetQua = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TenKetQua = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    TenTep = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    MaTTHC = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KetQuaThuTucs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KetQuaThuTucs_MaTTHC",
                schema: "Business",
                table: "KetQuaThuTucs",
                column: "MaTTHC");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KetQuaThuTucs",
                schema: "Business");

            migrationBuilder.DropColumn(
                name: "DinhKemSoHoa",
                schema: "Business",
                table: "GiayToSoHoas");

            migrationBuilder.AddColumn<string>(
                name: "MaNhanDienOCR",
                schema: "Business",
                table: "TruongHopThuTucs",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DinhKem",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "varchar(1200)",
                maxLength: 1200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(1200)",
                oldMaxLength: 1200,
                oldNullable: true);
        }
    }
}
