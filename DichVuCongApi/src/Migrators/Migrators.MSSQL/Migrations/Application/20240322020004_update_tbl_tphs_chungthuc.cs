using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class update_tbl_tphs_chungthuc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DuThaoXuLyHoSos_MaHoSo_Loai",
                schema: "Business",
                table: "DuThaoXuLyHoSos");

            migrationBuilder.AddColumn<bool>(
                name: "DaChungThucDienTu",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "KyDienTuBanGiay",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoBanGiay",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoChungThucDT",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoChungThucDienTu",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "int",
                nullable: true);

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

            migrationBuilder.AddColumn<int>(
                name: "SoTrang",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Loai",
                schema: "Catalog",
                table: "SoChungThucs",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_DuThaoXuLyHoSos_Loai",
                schema: "Business",
                table: "DuThaoXuLyHoSos",
                column: "Loai");

            migrationBuilder.CreateIndex(
                name: "IX_DuThaoXuLyHoSos_MaHoSo",
                schema: "Business",
                table: "DuThaoXuLyHoSos",
                column: "MaHoSo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DuThaoXuLyHoSos_Loai",
                schema: "Business",
                table: "DuThaoXuLyHoSos");

            migrationBuilder.DropIndex(
                name: "IX_DuThaoXuLyHoSos_MaHoSo",
                schema: "Business",
                table: "DuThaoXuLyHoSos");

            migrationBuilder.DropColumn(
                name: "DaChungThucDienTu",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "KyDienTuBanGiay",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "SoBanGiay",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "SoChungThucDT",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "SoChungThucDienTu",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "SoChungThucG",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "SoChungThucGiay",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "SoTrang",
                schema: "Business",
                table: "ThanhPhanHoSos");

            migrationBuilder.DropColumn(
                name: "Loai",
                schema: "Catalog",
                table: "SoChungThucs");

            migrationBuilder.CreateIndex(
                name: "IX_DuThaoXuLyHoSos_MaHoSo_Loai",
                schema: "Business",
                table: "DuThaoXuLyHoSos",
                columns: new[] { "MaHoSo", "Loai" });
        }
    }
}
