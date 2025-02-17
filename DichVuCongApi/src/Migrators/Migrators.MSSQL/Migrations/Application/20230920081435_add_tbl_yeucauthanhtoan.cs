using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tbl_yeucauthanhtoan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SoBanChinh",
                schema: "Business",
                table: "ThanhPhanThuTucs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoBanSao",
                schema: "Business",
                table: "ThanhPhanThuTucs",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MaHoSo",
                schema: "Business",
                table: "HoSos",
                type: "varchar(36)",
                maxLength: 36,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(28)",
                oldMaxLength: 28,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "YeuCauThanhToans",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaHoSo = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: false),
                    Ma = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: false),
                    SoTien = table.Column<int>(type: "int", nullable: false),
                    Phi = table.Column<int>(type: "int", nullable: false),
                    LePhi = table.Column<int>(type: "int", nullable: false),
                    TrangThai = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    NgayYeuCau = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiYeuCau = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DonViThu = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    HinhThucThanhToan = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    HinhThucThu = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ChiTiet = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GhiChuThanhToan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MauSoBienLai = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    KyHieuBienLai = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    SoHieuBienLai = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    NguoiThuPhi = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    NgayThuPhi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DonViThuPhiMaSoThue = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    DonViMaSoThue = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    NgayHoanPhi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiHoanPhi = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    LyDoHoanPhi = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NgayHuy = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiHuy = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    LyDoHuy = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_YeuCauThanhToans", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_YeuCauThanhToan",
                schema: "Business",
                table: "YeuCauThanhToans",
                column: "MaHoSo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "YeuCauThanhToans",
                schema: "Business");

            migrationBuilder.DropColumn(
                name: "SoBanChinh",
                schema: "Business",
                table: "ThanhPhanThuTucs");

            migrationBuilder.DropColumn(
                name: "SoBanSao",
                schema: "Business",
                table: "ThanhPhanThuTucs");

            migrationBuilder.AlterColumn<string>(
                name: "MaHoSo",
                schema: "Business",
                table: "HoSos",
                type: "varchar(28)",
                maxLength: 28,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(36)",
                oldMaxLength: 36,
                oldNullable: true);
        }
    }
}
