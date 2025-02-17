using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class migrateDbTblHoSoAndTblGroup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ChoXacNhan",
                schema: "Business",
                table: "HoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DonViQuanLy",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DonViQuanLy",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "DonViQuanLyThuPhi",
                schema: "Catalog",
                table: "Groups",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "DonViQuanLyTraHoSo",
                schema: "Catalog",
                table: "Groups",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "YeuCauXacNhanCoKetQua",
                schema: "Catalog",
                table: "Groups",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChoXacNhan",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "DonViQuanLy",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "DonViQuanLy",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "DonViQuanLyThuPhi",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "DonViQuanLyTraHoSo",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "YeuCauXacNhanCoKetQua",
                schema: "Catalog",
                table: "Groups");
        }
    }
}
