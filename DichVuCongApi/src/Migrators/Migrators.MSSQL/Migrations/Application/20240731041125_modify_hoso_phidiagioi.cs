using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_hoso_phidiagioi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "LaPhiDiaGioi",
                schema: "Catalog",
                table: "ThuTucs",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DonViPhiDiaGioi",
                schema: "Business",
                table: "HoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayGuiPhiDiaGioi",
                schema: "Business",
                table: "HoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayNhanPhiDiaGioi",
                schema: "Business",
                table: "HoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayTraPhiDiaGioi",
                schema: "Business",
                table: "HoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiNhanPhiDiaGioi",
                schema: "Business",
                table: "HoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrangThaiPhiDiaGioi",
                schema: "Business",
                table: "HoSos",
                type: "varchar(3)",
                maxLength: 3,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ThuTucs_LaPhiDiaGioi",
                schema: "Catalog",
                table: "ThuTucs",
                column: "LaPhiDiaGioi");

            migrationBuilder.CreateIndex(
                name: "IX_ThuTucs_LaThuTucChungThuc",
                schema: "Catalog",
                table: "ThuTucs",
                column: "LaThuTucChungThuc");

            migrationBuilder.CreateIndex(
                name: "IX_HoSos_TrangThaiPhiDiaGioi_DonViPhiDiaGioi",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "TrangThaiPhiDiaGioi", "DonViPhiDiaGioi" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ThuTucs_LaPhiDiaGioi",
                schema: "Catalog",
                table: "ThuTucs");

            migrationBuilder.DropIndex(
                name: "IX_ThuTucs_LaThuTucChungThuc",
                schema: "Catalog",
                table: "ThuTucs");

            migrationBuilder.DropIndex(
                name: "IX_HoSos_TrangThaiPhiDiaGioi_DonViPhiDiaGioi",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "LaPhiDiaGioi",
                schema: "Catalog",
                table: "ThuTucs");

            migrationBuilder.DropColumn(
                name: "DonViPhiDiaGioi",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "NgayGuiPhiDiaGioi",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "NgayNhanPhiDiaGioi",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "NgayTraPhiDiaGioi",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "NguoiNhanPhiDiaGioi",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "TrangThaiPhiDiaGioi",
                schema: "Business",
                table: "HoSos");
        }
    }
}
