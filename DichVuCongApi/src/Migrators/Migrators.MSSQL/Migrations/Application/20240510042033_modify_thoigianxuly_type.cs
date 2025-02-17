using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_thoigianxuly_type : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AlterColumn<double>(
                name: "ThoiGianThucHienTrucTuyen",
                schema: "Business",
                table: "TruongHopThuTucs",
                type: "float",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "ThoiGianThucHien",
                schema: "Business",
                table: "TruongHopThuTucs",
                type: "float",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "ThoiGianXuLy",
                schema: "Business",
                table: "QuyTrinhXuLys",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<double>(
                name: "ThoiGianThucHienTrucTuyen",
                schema: "Business",
                table: "QuyTrinhXuLys",
                type: "float",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "ThoiHanBuocXuLy",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                type: "float",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "ThoiGianThucHien",
                schema: "Business",
                table: "HoSos",
                type: "float",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "MaHoSo", "DonViId", "MaTTHC" },
                unique: true,
                filter: "[MaHoSo] IS NOT NULL AND [DonViId] IS NOT NULL AND [MaTTHC] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AlterColumn<int>(
                name: "ThoiGianThucHienTrucTuyen",
                schema: "Business",
                table: "TruongHopThuTucs",
                type: "int",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ThoiGianThucHien",
                schema: "Business",
                table: "TruongHopThuTucs",
                type: "int",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ThoiGianXuLy",
                schema: "Business",
                table: "QuyTrinhXuLys",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<int>(
                name: "ThoiGianThucHienTrucTuyen",
                schema: "Business",
                table: "QuyTrinhXuLys",
                type: "int",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ThoiHanBuocXuLy",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                type: "int",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ThoiGianThucHien",
                schema: "Business",
                table: "HoSos",
                type: "int",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "MaHoSo", "DonViId", "MaTTHC" });
        }
    }
}
