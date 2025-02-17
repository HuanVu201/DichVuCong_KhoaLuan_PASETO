using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddedPKSandDGCQEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AddColumn<string>(
                name: "TraLoi10",
                schema: "Business",
                table: "PhieuKhaoSats",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TraLoi11",
                schema: "Business",
                table: "PhieuKhaoSats",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ResponseDvcPayment",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(3000)",
                oldMaxLength: 3000);

            migrationBuilder.AlterColumn<string>(
                name: "DuongDanBienLai",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "varchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "BodyKetQua",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(3000)",
                oldMaxLength: 3000);

            migrationBuilder.AddColumn<string>(
                name: "ThamDinhTraLoi10",
                schema: "Business",
                table: "DanhGiaCoQuans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThamDinhTraLoi11",
                schema: "Business",
                table: "DanhGiaCoQuans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TraLoi10",
                schema: "Business",
                table: "DanhGiaCoQuans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TraLoi11",
                schema: "Business",
                table: "DanhGiaCoQuans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "MaHoSo", "DonViId", "MaTTHC" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "TraLoi10",
                schema: "Business",
                table: "PhieuKhaoSats");

            migrationBuilder.DropColumn(
                name: "TraLoi11",
                schema: "Business",
                table: "PhieuKhaoSats");

            migrationBuilder.DropColumn(
                name: "ThamDinhTraLoi10",
                schema: "Business",
                table: "DanhGiaCoQuans");

            migrationBuilder.DropColumn(
                name: "ThamDinhTraLoi11",
                schema: "Business",
                table: "DanhGiaCoQuans");

            migrationBuilder.DropColumn(
                name: "TraLoi10",
                schema: "Business",
                table: "DanhGiaCoQuans");

            migrationBuilder.DropColumn(
                name: "TraLoi11",
                schema: "Business",
                table: "DanhGiaCoQuans");

            migrationBuilder.AlterColumn<string>(
                name: "ResponseDvcPayment",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "nvarchar(3000)",
                maxLength: 3000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "DuongDanBienLai",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<string>(
                name: "BodyKetQua",
                schema: "Business",
                table: "GiaoDichThanhToans",
                type: "nvarchar(3000)",
                maxLength: 3000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "MaHoSo", "DonViId" });
        }
    }
}
