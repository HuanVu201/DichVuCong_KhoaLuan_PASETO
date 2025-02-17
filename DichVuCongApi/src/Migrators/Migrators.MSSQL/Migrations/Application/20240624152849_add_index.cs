using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_index : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ThuTucs_MaTTHC",
                schema: "Catalog",
                table: "ThuTucs",
                column: "MaTTHC");

            migrationBuilder.CreateIndex(
                name: "IX_ThanhPhanHoSoNhaps_HoSoId",
                schema: "Business",
                table: "ThanhPhanHoSoNhaps",
                column: "HoSoId");

            migrationBuilder.CreateIndex(
                name: "Idx_MaVanDonBuuDien",
                schema: "Catalog",
                table: "MaVanDonBuuDiens",
                column: "HoSo");

            migrationBuilder.CreateIndex(
                name: "IX_KetQuaLienQuans_MaHoSo",
                schema: "Business",
                table: "KetQuaLienQuans",
                column: "MaHoSo");

            migrationBuilder.CreateIndex(
                name: "IX_HoSos_MaHoSo",
                schema: "Business",
                table: "HoSos",
                column: "MaHoSo");

            migrationBuilder.CreateIndex(
                name: "IX_HoSoChungThucs_MaHoSo",
                schema: "Business",
                table: "HoSoChungThucs",
                column: "MaHoSo");

            migrationBuilder.CreateIndex(
                name: "IX_GiayToHoSos_MaHoSo",
                schema: "Business",
                table: "GiayToHoSos",
                column: "MaHoSo");

            migrationBuilder.CreateIndex(
                name: "IX_DonViThuTucs_DonViId",
                schema: "Catalog",
                table: "DonViThuTucs",
                column: "DonViId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ThuTucs_MaTTHC",
                schema: "Catalog",
                table: "ThuTucs");

            migrationBuilder.DropIndex(
                name: "IX_ThanhPhanHoSoNhaps_HoSoId",
                schema: "Business",
                table: "ThanhPhanHoSoNhaps");

            migrationBuilder.DropIndex(
                name: "Idx_MaVanDonBuuDien",
                schema: "Catalog",
                table: "MaVanDonBuuDiens");

            migrationBuilder.DropIndex(
                name: "IX_KetQuaLienQuans_MaHoSo",
                schema: "Business",
                table: "KetQuaLienQuans");

            migrationBuilder.DropIndex(
                name: "IX_HoSos_MaHoSo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "IX_HoSoChungThucs_MaHoSo",
                schema: "Business",
                table: "HoSoChungThucs");

            migrationBuilder.DropIndex(
                name: "IX_GiayToHoSos_MaHoSo",
                schema: "Business",
                table: "GiayToHoSos");

            migrationBuilder.DropIndex(
                name: "IX_DonViThuTucs_DonViId",
                schema: "Catalog",
                table: "DonViThuTucs");
        }
    }
}
