using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_qttdcd_kqlq : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "NguoiKy",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MaGiayTo",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MaDinhDanh",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoKyHieu",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "varchar(60)",
                maxLength: 60,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ThoiHanVinhVien",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "KetQuaLienQuans",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaHoSo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    LoaiKetQua = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    SoKyHieu = table.Column<string>(type: "varchar(60)", maxLength: 60, nullable: true),
                    TrichYeu = table.Column<string>(type: "varchar(2000)", maxLength: 2000, nullable: true),
                    NgayKy = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NguoiKy = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    NgayCoHieuLuc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgayHetHieuLuc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TrangThai = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KetQuaLienQuans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "QuaTrinhTraoDoiCongDans",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaHoSo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    NguoiGuiTraoDoi = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    NgayGui = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NoiDungTraoDoi = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    Email = table.Column<bool>(type: "bit", nullable: true),
                    SMS = table.Column<bool>(type: "bit", nullable: true),
                    Zalo = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuaTrinhTraoDoiCongDans", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KetQuaLienQuans_MaHoSo_NguoiKy_TrangThai",
                schema: "Business",
                table: "KetQuaLienQuans",
                columns: new[] { "MaHoSo", "NguoiKy", "TrangThai" });

            migrationBuilder.CreateIndex(
                name: "IX_QuaTrinhTraoDoiCongDans_MaHoSo",
                schema: "Business",
                table: "QuaTrinhTraoDoiCongDans",
                column: "MaHoSo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KetQuaLienQuans",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "QuaTrinhTraoDoiCongDans",
                schema: "Business");

            migrationBuilder.DropColumn(
                name: "BatBuocKySoKetQua",
                schema: "Business",
                table: "TruongHopThuTucs");

            migrationBuilder.DropColumn(
                name: "SoKyHieu",
                schema: "Business",
                table: "GiayToSoHoas");

            migrationBuilder.DropColumn(
                name: "ThoiHanVinhVien",
                schema: "Business",
                table: "GiayToSoHoas");

            migrationBuilder.AlterColumn<string>(
                name: "NguoiKy",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MaGiayTo",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MaDinhDanh",
                schema: "Business",
                table: "GiayToSoHoas",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50,
                oldNullable: true);
        }
    }
}
