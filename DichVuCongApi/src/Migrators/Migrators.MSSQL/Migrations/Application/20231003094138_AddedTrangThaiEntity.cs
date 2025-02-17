using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddedTrangThaiEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KieuNoiDungs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenNoiDung = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ChoPhepNhapNoiDung = table.Column<bool>(type: "bit", nullable: true),
                    ChoPhepNhapLoaiLienKet = table.Column<bool>(type: "bit", nullable: true),
                    ChoPhepThemTinBai = table.Column<bool>(type: "bit", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KieuNoiDungs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrangThais",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenTrangThai = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ThuTu = table.Column<int>(type: "int", nullable: false),
                    HienThiTrangChu = table.Column<bool>(type: "bit", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrangThais", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KenhTins",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenKenhTin = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MaKenhTinCha = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TomTat = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ThuTu = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    KieuNoiDungId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HienThiMenuChinh = table.Column<bool>(type: "bit", nullable: true),
                    HienThiMenuDoc = table.Column<bool>(type: "bit", nullable: true),
                    HienThiMenuPhu = table.Column<bool>(type: "bit", nullable: true),
                    NoiDung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoaiMoLienKet = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    LienKetNgoai = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KenhTins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KenhTins_KenhTins_MaKenhTinCha",
                        column: x => x.MaKenhTinCha,
                        principalSchema: "Catalog",
                        principalTable: "KenhTins",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_KenhTins_KieuNoiDungs_KieuNoiDungId",
                        column: x => x.KieuNoiDungId,
                        principalSchema: "Catalog",
                        principalTable: "KieuNoiDungs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TinBais",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TieuDe = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    NgayBanHanh = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgayKetThuc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TrichYeu = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NoiDung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NguonTin = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    KenhTinId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrangThaiId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AnhDaiDien = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    FileDinhKem = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true),
                    Tacgia = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ChoPhepBinhLuan = table.Column<bool>(type: "bit", nullable: true),
                    HienThiLenTrangChu = table.Column<bool>(type: "bit", nullable: true),
                    TinNoiBat = table.Column<bool>(type: "bit", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TinBais", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TinBais_KenhTins_KenhTinId",
                        column: x => x.KenhTinId,
                        principalSchema: "Catalog",
                        principalTable: "KenhTins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TinBais_TrangThais_TrangThaiId",
                        column: x => x.TrangThaiId,
                        principalSchema: "Catalog",
                        principalTable: "TrangThais",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_KenhTin",
                schema: "Catalog",
                table: "KenhTins",
                columns: new[] { "TenKenhTin", "MaKenhTinCha", "TomTat", "HienThiMenuChinh", "HienThiMenuDoc", "HienThiMenuPhu", "DeletedOn" },
                unique: true,
                filter: "[MaKenhTinCha] IS NOT NULL AND [TomTat] IS NOT NULL AND [HienThiMenuChinh] IS NOT NULL AND [HienThiMenuDoc] IS NOT NULL AND [HienThiMenuPhu] IS NOT NULL AND [DeletedOn] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_KenhTins_KieuNoiDungId",
                schema: "Catalog",
                table: "KenhTins",
                column: "KieuNoiDungId");

            migrationBuilder.CreateIndex(
                name: "IX_KenhTins_MaKenhTinCha",
                schema: "Catalog",
                table: "KenhTins",
                column: "MaKenhTinCha");

            migrationBuilder.CreateIndex(
                name: "Idx_KieuNoiDung_DeletedOn",
                schema: "Catalog",
                table: "KieuNoiDungs",
                column: "DeletedOn");

            migrationBuilder.CreateIndex(
                name: "Idx_TinBai",
                schema: "Catalog",
                table: "TinBais",
                columns: new[] { "TieuDe", "TrichYeu", "TinNoiBat", "DeletedOn" },
                unique: true,
                filter: "[TrichYeu] IS NOT NULL AND [TinNoiBat] IS NOT NULL AND [DeletedOn] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_TinBais_KenhTinId",
                schema: "Catalog",
                table: "TinBais",
                column: "KenhTinId");

            migrationBuilder.CreateIndex(
                name: "IX_TinBais_TrangThaiId",
                schema: "Catalog",
                table: "TinBais",
                column: "TrangThaiId");

            migrationBuilder.CreateIndex(
                name: "Idx_TrangThai_DeletedOn",
                schema: "Catalog",
                table: "TrangThais",
                column: "DeletedOn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TinBais",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "KenhTins",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "TrangThais",
                schema: "Catalog");

            migrationBuilder.DropTable(
                name: "KieuNoiDungs",
                schema: "Catalog");
        }
    }
}
