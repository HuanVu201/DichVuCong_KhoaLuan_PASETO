using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tbl_danhmucgiaytochungthuc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoChungThucG",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "SoChungThucGiay",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.AlterColumn<string>(
                name: "SoChungThucDT",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "DanhMucGiayToChungThucs",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ma = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    SuDung = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhMucGiayToChungThucs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ThanhPhanHoSos_SoChungThucDT_SoChungThucDienTu",
                schema: "Business",
                table: "ThanhPhanHoSos",
                columns: new[] { "SoChungThucDT", "SoChungThucDienTu" },
                unique: true,
                filter: "[SoChungThucDT] IS NOT NULL AND [SoChungThucDienTu] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_DanhMucGiayToChungThucs_Ma",
                schema: "Business",
                table: "DanhMucGiayToChungThucs",
                column: "Ma");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DanhMucGiayToChungThucs",
                schema: "Business");

            migrationBuilder.DropIndex(
                name: "IX_ThanhPhanHoSos_SoChungThucDT_SoChungThucDienTu",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.AlterColumn<string>(
                name: "SoChungThucDT",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoChungThucG",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoChungThucGiay",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "int",
                nullable: true);
        }
    }
}
