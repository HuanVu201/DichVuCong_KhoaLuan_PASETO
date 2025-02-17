using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_tbl_menuketquathutuc_catalog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_MenuKetQuaThuTuc",
                schema: "Catalog",
                table: "MenuKetQuaThuTucs");

            migrationBuilder.AlterColumn<string>(
                name: "MaTTHC",
                schema: "Catalog",
                table: "MenuKetQuaThuTucs",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<string>(
                name: "Catalog",
                schema: "Catalog",
                table: "MenuKetQuaThuTucs",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_MenuKetQuaThuTuc",
                schema: "Catalog",
                table: "MenuKetQuaThuTucs",
                columns: new[] { "MaDonVi", "MaTTHC" },
                unique: true,
                filter: "[MaDonVi] IS NOT NULL AND [MaTTHC] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_MenuKetQuaThuTuc",
                schema: "Catalog",
                table: "MenuKetQuaThuTucs");

            migrationBuilder.DropColumn(
                name: "Catalog",
                schema: "Catalog",
                table: "MenuKetQuaThuTucs");

            migrationBuilder.AlterColumn<string>(
                name: "MaTTHC",
                schema: "Catalog",
                table: "MenuKetQuaThuTucs",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_MenuKetQuaThuTuc",
                schema: "Catalog",
                table: "MenuKetQuaThuTucs",
                columns: new[] { "MaDonVi", "MaTTHC" },
                unique: true,
                filter: "[MaDonVi] IS NOT NULL");
        }
    }
}
