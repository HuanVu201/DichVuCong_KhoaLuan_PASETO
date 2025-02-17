using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class updateindexhoso : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_DonViId",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_LoaiDuLieuKetNoi",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_MaTruongHop",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_NgayHenTra",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_NgayKetThucXuLy",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_NgayTiepNhan",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_NguoiDangXuLy",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_NguoiDaXuLy",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_NguoiNhanHoSo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_SearchBoSung",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_SearchCongDanPortal",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_SearchMain",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropIndex(
                name: "Idx_SearchTraKetQua",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AlterColumn<string>(
                name: "MaHoSo",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50,
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "MaHoSo",
                schema: "Business",
                table: "HoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_DonViId",
                schema: "Business",
                table: "HoSos",
                column: "DonViId");

            migrationBuilder.CreateIndex(
                name: "Idx_LoaiDuLieuKetNoi",
                schema: "Business",
                table: "HoSos",
                column: "LoaiDuLieuKetNoi");

            migrationBuilder.CreateIndex(
                name: "Idx_MaTruongHop",
                schema: "Business",
                table: "HoSos",
                column: "MaTruongHop");

            migrationBuilder.CreateIndex(
                name: "Idx_NgayHenTra",
                schema: "Business",
                table: "HoSos",
                column: "NgayHenTra");

            migrationBuilder.CreateIndex(
                name: "Idx_NgayKetThucXuLy",
                schema: "Business",
                table: "HoSos",
                column: "NgayKetThucXuLy");

            migrationBuilder.CreateIndex(
                name: "Idx_NgayTiepNhan",
                schema: "Business",
                table: "HoSos",
                column: "NgayTiepNhan");

            migrationBuilder.CreateIndex(
                name: "Idx_NguoiDangXuLy",
                schema: "Business",
                table: "HoSos",
                column: "NguoiDangXuLy");

            migrationBuilder.CreateIndex(
                name: "Idx_NguoiDaXuLy",
                schema: "Business",
                table: "HoSos",
                column: "NguoiDaXuLy");

            migrationBuilder.CreateIndex(
                name: "Idx_NguoiNhanHoSo",
                schema: "Business",
                table: "HoSos",
                column: "NguoiNhanHoSo");

            migrationBuilder.CreateIndex(
                name: "Idx_SearchBoSung",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "TrangThaiHoSoId", "TrangThaiBoSung", "NguoiDangXuLy", "LaHoSoChungThuc", "TrangThaiTraKq", "DeletedOn" });

            migrationBuilder.CreateIndex(
                name: "Idx_SearchCongDanPortal",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "NguoiGui", "LaHoSoChungThuc", "DeletedOn" });

            migrationBuilder.CreateIndex(
                name: "Idx_SearchMain",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "NguoiDangXuLy", "TrangThaiHoSoId", "LaHoSoChungThuc", "ChoBanHanh", "DeletedOn" });

            migrationBuilder.CreateIndex(
                name: "Idx_SearchTraKetQua",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "TrangThaiHoSoId", "HinhThucTra", "TrangThaiTraKq", "TrangThaiBoSung", "LaHoSoChungThuc", "DonViTraKq", "DeletedOn" });
        }
    }
}
