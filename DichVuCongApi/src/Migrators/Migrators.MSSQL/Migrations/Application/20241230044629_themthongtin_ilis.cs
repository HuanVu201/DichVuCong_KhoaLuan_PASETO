using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class themthongtin_ilis : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TenTieuMuc",
                schema: "Business",
                table: "ThongBaoThues",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000);

            migrationBuilder.AlterColumn<double>(
                name: "SoTien",
                schema: "Business",
                table: "ThongBaoThues",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<Guid>(
                name: "HoSoId",
                schema: "Business",
                table: "ThongBaoThues",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<string>(
                name: "DuongDanTBT",
                schema: "Business",
                table: "ThongBaoThues",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "HoTen",
                schema: "Business",
                table: "ThongBaoThues",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TrangThaiChiTiet",
                schema: "Business",
                table: "HoSos",
                type: "varchar(2)",
                maxLength: 2,
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "HoSoId",
                schema: "Business",
                table: "ChungTuThues",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<string>(
                name: "DienGiai",
                schema: "Business",
                table: "ChungTuThues",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MaGCN",
                schema: "Business",
                table: "ChungTuThues",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MaKetQua",
                schema: "Business",
                table: "ChungTuThues",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "TongConPhaiNop",
                schema: "Business",
                table: "ChungTuThues",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TongDaNop",
                schema: "Business",
                table: "ChungTuThues",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TongMienGiam",
                schema: "Business",
                table: "ChungTuThues",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TongPhaiNop",
                schema: "Business",
                table: "ChungTuThues",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DuongDanTBT",
                schema: "Business",
                table: "ThongBaoThues");

            migrationBuilder.DropColumn(
                name: "HoTen",
                schema: "Business",
                table: "ThongBaoThues");

            migrationBuilder.DropColumn(
                name: "TrangThaiChiTiet",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "DienGiai",
                schema: "Business",
                table: "ChungTuThues");

            migrationBuilder.DropColumn(
                name: "MaGCN",
                schema: "Business",
                table: "ChungTuThues");

            migrationBuilder.DropColumn(
                name: "MaKetQua",
                schema: "Business",
                table: "ChungTuThues");

            migrationBuilder.DropColumn(
                name: "TongConPhaiNop",
                schema: "Business",
                table: "ChungTuThues");

            migrationBuilder.DropColumn(
                name: "TongDaNop",
                schema: "Business",
                table: "ChungTuThues");

            migrationBuilder.DropColumn(
                name: "TongMienGiam",
                schema: "Business",
                table: "ChungTuThues");

            migrationBuilder.DropColumn(
                name: "TongPhaiNop",
                schema: "Business",
                table: "ChungTuThues");

            migrationBuilder.AlterColumn<string>(
                name: "TenTieuMuc",
                schema: "Business",
                table: "ThongBaoThues",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "SoTien",
                schema: "Business",
                table: "ThongBaoThues",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "HoSoId",
                schema: "Business",
                table: "ThongBaoThues",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "HoSoId",
                schema: "Business",
                table: "ChungTuThues",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");
        }
    }
}
