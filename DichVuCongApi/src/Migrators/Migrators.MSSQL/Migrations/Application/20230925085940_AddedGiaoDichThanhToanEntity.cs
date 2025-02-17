using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddedGiaoDichThanhToanEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GiaoDichThanhToans",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HoSo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    YeuCauThanhToan = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MaThamChieu = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    SoTien = table.Column<int>(type: "int", nullable: false),
                    LoaiHinhThanhToan = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MaKenhThanhToan = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    ThongTinGiaoDich = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Ip = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    TKThuHuong = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    TenTKThuHuong = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LoaiPhiLePhi = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    MaPhiLePhi = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    TenPhiLePhi = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    MaDonVi = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TenDonVi = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MaThuTucDVCQG = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    MaDVCThuTucDVCQuocGia = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    TenThuTucDVCQG = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    TenDVCThuTucDVCQuocGia = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    HoTenNguoiNop = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SoCMNDNguoiNop = table.Column<string>(type: "varchar(25)", maxLength: 25, nullable: false),
                    DiaChiNguoiNop = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    TrangThai = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    ThoiGianGD = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MaGiaoDich = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    MaDoiTac = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    LoaiBanTin = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    MaLoi = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    MaNganHang = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    ThoiGianGDThanhCong = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgayCapNhatKetQua = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DuongDanBienLai = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    BodyKetQua = table.Column<string>(type: "nvarchar(3000)", maxLength: 3000, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiaoDichThanhToans", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_GiaoDichThanhToan",
                schema: "Business",
                table: "GiaoDichThanhToans",
                columns: new[] { "MaThamChieu", "MaKenhThanhToan", "MaPhiLePhi", "MaThuTucDVCQG", "MaDVCThuTucDVCQuocGia" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GiaoDichThanhToans",
                schema: "Business");
        }
    }
}
