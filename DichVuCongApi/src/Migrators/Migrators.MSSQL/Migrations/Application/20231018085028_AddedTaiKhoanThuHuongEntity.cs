using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddedTaiKhoanThuHuongEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaNHThuHuong",
                schema: "Catalog",
                table: "DonViThuTucs");

            migrationBuilder.DropColumn(
                name: "TKThuHuong",
                schema: "Catalog",
                table: "DonViThuTucs");

            migrationBuilder.DropColumn(
                name: "TenTKThuHuong",
                schema: "Catalog",
                table: "DonViThuTucs");

            migrationBuilder.AddColumn<Guid>(
                name: "TaiKhoanThuHuongId",
                schema: "Catalog",
                table: "DonViThuTucs",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "TaiKhoanThuHuongs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TKThuHuong = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    MaNHThuHuong = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    TenTKThuHuong = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    DonViId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaiKhoanThuHuongs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_TaiKhoanThuHuong_DeletedOn",
                schema: "Catalog",
                table: "TaiKhoanThuHuongs",
                column: "DeletedOn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaiKhoanThuHuongs",
                schema: "Catalog");

            migrationBuilder.DropColumn(
                name: "TaiKhoanThuHuongId",
                schema: "Catalog",
                table: "DonViThuTucs");

            migrationBuilder.AddColumn<string>(
                name: "MaNHThuHuong",
                schema: "Catalog",
                table: "DonViThuTucs",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TKThuHuong",
                schema: "Catalog",
                table: "DonViThuTucs",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TenTKThuHuong",
                schema: "Catalog",
                table: "DonViThuTucs",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }
    }
}
