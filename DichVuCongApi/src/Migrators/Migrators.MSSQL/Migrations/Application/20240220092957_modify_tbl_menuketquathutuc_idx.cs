using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_tbl_menuketquathutuc_idx : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_MenuKetQuaThuTuc",
                schema: "Catalog",
                table: "MenuKetQuaThuTucs");

            migrationBuilder.CreateIndex(
                name: "Idx_MenuKetQuaThuTuc",
                schema: "Catalog",
                table: "MenuKetQuaThuTucs",
                columns: new[] { "MaDonVi", "MaTTHC", "MaKetQuaTTHC" },
                unique: true,
                filter: "[MaDonVi] IS NOT NULL AND [MaTTHC] IS NOT NULL AND [MaKetQuaTTHC] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_MenuKetQuaThuTuc",
                schema: "Catalog",
                table: "MenuKetQuaThuTucs");

            migrationBuilder.CreateIndex(
                name: "Idx_MenuKetQuaThuTuc",
                schema: "Catalog",
                table: "MenuKetQuaThuTucs",
                columns: new[] { "MaDonVi", "MaTTHC" },
                unique: true,
                filter: "[MaDonVi] IS NOT NULL AND [MaTTHC] IS NOT NULL");
        }
    }
}
