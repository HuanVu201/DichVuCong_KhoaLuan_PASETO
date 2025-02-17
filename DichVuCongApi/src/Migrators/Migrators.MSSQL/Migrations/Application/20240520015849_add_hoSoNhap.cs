using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_hoSoNhap : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_HoSoNhap",
                schema: "Business",
                table: "HoSoNhaps");

            migrationBuilder.DropColumn(
                name: "NgayCongDanBoSung",
                schema: "Business",
                table: "HoSoNhaps");

            migrationBuilder.DropColumn(
                name: "NgayHenTra",
                schema: "Business",
                table: "HoSoNhaps");

            migrationBuilder.DropColumn(
                name: "NgayHenTraCaNhan",
                schema: "Business",
                table: "HoSoNhaps");

            migrationBuilder.DropColumn(
                name: "NgayKetThucXuLy",
                schema: "Business",
                table: "HoSoNhaps");

            migrationBuilder.DropColumn(
                name: "NgayNopHoSo",
                schema: "Business",
                table: "HoSoNhaps");

            migrationBuilder.DropColumn(
                name: "NgayTiepNhan",
                schema: "Business",
                table: "HoSoNhaps");

            migrationBuilder.DropColumn(
                name: "NgayTiepNhanCaNhan",
                schema: "Business",
                table: "HoSoNhaps");

            migrationBuilder.DropColumn(
                name: "NgayTra",
                schema: "Business",
                table: "HoSoNhaps");

            migrationBuilder.DropColumn(
                name: "NgayTuChoi",
                schema: "Business",
                table: "HoSoNhaps");

            migrationBuilder.DropColumn(
                name: "NgayYeuCauBoSung",
                schema: "Business",
                table: "HoSoNhaps");

            migrationBuilder.CreateTable(
                name: "ThanhPhanHoSoNhaps",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    HoSoId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    SoBanChinh = table.Column<int>(type: "int", nullable: true),
                    SoBanSao = table.Column<int>(type: "int", nullable: true),
                    MaGiayToKhoQuocGia = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    DinhKem = table.Column<string>(type: "nvarchar(1200)", maxLength: 1200, nullable: true),
                    NhanBanGiay = table.Column<bool>(type: "bit", nullable: true),
                    MaGiayToSoHoa = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TrangThaiSoHoa = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    MaGiayTo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    DuocLayTuKhoDMQuocGia = table.Column<bool>(type: "bit", nullable: true),
                    MaKetQuaThayThe = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    NoiDungBoSung = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    SoTrang = table.Column<int>(type: "int", nullable: true),
                    SoBanGiay = table.Column<int>(type: "int", nullable: true),
                    KyDienTuBanGiay = table.Column<bool>(type: "bit", nullable: true),
                    DaChungThucDienTu = table.Column<bool>(type: "bit", nullable: true),
                    TrangThaiDuyet = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoChungThucGiay = table.Column<int>(type: "int", nullable: true),
                    NguoiKyChungThuc = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    SoChungThucG = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    SoChungThucDienTu = table.Column<int>(type: "int", nullable: true),
                    SoChungThucDT = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThanhPhanHoSoNhaps", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_HoSoNhap",
                schema: "Business",
                table: "HoSoNhaps",
                columns: new[] { "Id", "CreatedBy" });

            migrationBuilder.CreateIndex(
                name: "Idx_ThanhPhanHoSoNhap",
                schema: "Business",
                table: "ThanhPhanHoSoNhaps",
                columns: new[] { "Id", "CreatedBy" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ThanhPhanHoSoNhaps",
                schema: "Business");

            migrationBuilder.DropIndex(
                name: "Idx_HoSoNhap",
                schema: "Business",
                table: "HoSoNhaps");

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayCongDanBoSung",
                schema: "Business",
                table: "HoSoNhaps",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayHenTra",
                schema: "Business",
                table: "HoSoNhaps",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayHenTraCaNhan",
                schema: "Business",
                table: "HoSoNhaps",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayKetThucXuLy",
                schema: "Business",
                table: "HoSoNhaps",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayNopHoSo",
                schema: "Business",
                table: "HoSoNhaps",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayTiepNhan",
                schema: "Business",
                table: "HoSoNhaps",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayTiepNhanCaNhan",
                schema: "Business",
                table: "HoSoNhaps",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayTra",
                schema: "Business",
                table: "HoSoNhaps",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayTuChoi",
                schema: "Business",
                table: "HoSoNhaps",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayYeuCauBoSung",
                schema: "Business",
                table: "HoSoNhaps",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_HoSoNhap",
                schema: "Business",
                table: "HoSoNhaps",
                column: "Id");
        }
    }
}
