using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class update_tbl_sochungthuc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_SoChungThuc",
                schema: "Catalog",
                table: "SoChungThucs");

            migrationBuilder.AlterColumn<int>(
                name: "SoHienTai",
                schema: "Catalog",
                table: "SoChungThucs",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SoBatDau",
                schema: "Catalog",
                table: "SoChungThucs",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DonVi",
                schema: "Catalog",
                table: "SoChungThucs",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_SoChungThuc",
                schema: "Catalog",
                table: "SoChungThucs",
                column: "DonVi");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_SoChungThuc",
                schema: "Catalog",
                table: "SoChungThucs");

            migrationBuilder.AlterColumn<string>(
                name: "SoHienTai",
                schema: "Catalog",
                table: "SoChungThucs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SoBatDau",
                schema: "Catalog",
                table: "SoChungThucs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DonVi",
                schema: "Catalog",
                table: "SoChungThucs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_SoChungThuc",
                schema: "Catalog",
                table: "SoChungThucs",
                column: "DeletedOn");
        }
    }
}
