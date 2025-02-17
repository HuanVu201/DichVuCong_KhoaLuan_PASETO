using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class DanhGiaHaiLong : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "LaTieuBieu",
                schema: "Catalog",
                table: "ThuTucs",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ThuTu",
                schema: "Catalog",
                table: "ThuTucs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DanhGiaHaiLongs",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaHoSo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LoaiDanhGia = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    NguoiDanhGia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThoiGianDanhGia = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DanhGia = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhGiaHaiLongs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_DanhGiaHaiLong_Name",
                schema: "Business",
                table: "DanhGiaHaiLongs",
                column: "MaHoSo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DanhGiaHaiLongs",
                schema: "Business");

            migrationBuilder.DropColumn(
                name: "LaTieuBieu",
                schema: "Catalog",
                table: "ThuTucs");

            migrationBuilder.DropColumn(
                name: "ThuTu",
                schema: "Catalog",
                table: "ThuTucs");
        }
    }
}
