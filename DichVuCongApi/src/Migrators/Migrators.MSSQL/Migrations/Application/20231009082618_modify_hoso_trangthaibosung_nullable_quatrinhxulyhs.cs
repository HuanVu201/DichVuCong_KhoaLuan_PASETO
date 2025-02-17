using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_hoso_trangthaibosung_nullable_quatrinhxulyhs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ThoiHanBuocXuLy",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "NgayHetHanBuocXuLy",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "LoaiThoiHanBuocXuLy",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<bool>(
                name: "ChuyenNoiBo",
                schema: "Business",
                table: "HoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayTiepNhanCaNhan",
                schema: "Business",
                table: "HoSos",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrangThaiBoSung",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChuyenNoiBo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "NgayTiepNhanCaNhan",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "TrangThaiBoSung",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AlterColumn<int>(
                name: "ThoiHanBuocXuLy",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "NgayHetHanBuocXuLy",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LoaiThoiHanBuocXuLy",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);
        }
    }
}
