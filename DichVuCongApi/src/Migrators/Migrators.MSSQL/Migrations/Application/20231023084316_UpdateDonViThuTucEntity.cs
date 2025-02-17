using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class UpdateDonViThuTucEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_DonViThuTuc",
                schema: "Catalog",
                table: "DonViThuTucs");

            migrationBuilder.DropColumn(
                name: "ThuTucId",
                schema: "Catalog",
                table: "DonViThuTucs");

            migrationBuilder.AlterColumn<string>(
                name: "TaiKhoanThuHuongId",
                schema: "Catalog",
                table: "DonViThuTucs",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "MucDo",
                schema: "Catalog",
                table: "DonViThuTucs",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "DonViMaSoThue",
                schema: "Catalog",
                table: "DonViThuTucs",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(150)",
                oldMaxLength: 150);

            migrationBuilder.AddColumn<string>(
                name: "MaTTHC",
                schema: "Catalog",
                table: "DonViThuTucs",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "Idx_DonViThuTuc",
                schema: "Catalog",
                table: "DonViThuTucs",
                columns: new[] { "DonViId", "MaTTHC" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_DonViThuTuc",
                schema: "Catalog",
                table: "DonViThuTucs");

            migrationBuilder.DropColumn(
                name: "MaTTHC",
                schema: "Catalog",
                table: "DonViThuTucs");

            migrationBuilder.AlterColumn<Guid>(
                name: "TaiKhoanThuHuongId",
                schema: "Catalog",
                table: "DonViThuTucs",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "MucDo",
                schema: "Catalog",
                table: "DonViThuTucs",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "DonViMaSoThue",
                schema: "Catalog",
                table: "DonViThuTucs",
                type: "varchar(150)",
                maxLength: 150,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150);

            migrationBuilder.AddColumn<Guid>(
                name: "ThuTucId",
                schema: "Catalog",
                table: "DonViThuTucs",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "Idx_DonViThuTuc",
                schema: "Catalog",
                table: "DonViThuTucs",
                columns: new[] { "DonViId", "ThuTucId" });
        }
    }
}
