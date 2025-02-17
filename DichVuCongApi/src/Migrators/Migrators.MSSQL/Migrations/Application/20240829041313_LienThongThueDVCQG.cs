using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class LienThongThueDVCQG : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChungTuThues",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HoSoId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    Nguon = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MaSoThue = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    SoTien = table.Column<double>(type: "float", nullable: false),
                    NoiDungThanhToan = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    ThoiGianThanhToan = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MaThongBaoThue = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    TrangThaiThanhToan = table.Column<bool>(type: "bit", nullable: false),
                    BienLai = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    SoCMTNguoiNopTien = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    HoTenNguoiNopTien = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TinhNguoiNopTien = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    HuyenNguoiNopTien = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    XaNguoiNopTien = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DiaChiNguoiNopTien = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChungTuThues", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LienThongNVTCDVCQuocGias",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    File = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TrangThai = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Loai = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LienThongNVTCDVCQuocGias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ThongBaoThues",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HoSoId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    Nguon = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MaSoThue = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    SoTien = table.Column<double>(type: "float", nullable: false),
                    SoQuyetDinh = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    NgayQuyetDinh = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TenTieuMuc = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThongBaoThues", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_ChungTuThue_Name",
                schema: "Business",
                table: "ChungTuThues",
                column: "HoSoId");

            migrationBuilder.CreateIndex(
                name: "Idx_LienThongNVTCDVCQuocGia_Name",
                schema: "Business",
                table: "LienThongNVTCDVCQuocGias",
                column: "Loai");

            migrationBuilder.CreateIndex(
                name: "Idx_ThongBaoThue_Name",
                schema: "Business",
                table: "ThongBaoThues",
                column: "HoSoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChungTuThues",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "LienThongNVTCDVCQuocGias",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "ThongBaoThues",
                schema: "Business");
        }
    }
}
