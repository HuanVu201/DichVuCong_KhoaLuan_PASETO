using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddedPhieuKhaoSatEntityAndDanhGiaCoQuanEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DanhGiaCoQuans",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DonVi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DonViText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaNhomCha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaNhomChaText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DongBo = table.Column<bool>(type: "bit", nullable: true),
                    Quy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Nam = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi4 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi5 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi6 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi7 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi8 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi9 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoPhieu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TongDiem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhongBan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LyDoTruDiem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaHoSo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HinhThucDanhGia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MucDoRHL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MucDoHL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MucDoBT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MucDoKHL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MucDoRKHL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThamDinhTraLoi1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThamDinhTraLoi2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThamDinhTraLoi3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThamDinhTraLoi4 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThamDinhTraLoi5 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThamDinhTraLoi6 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThamDinhTraLoi7 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThamDinhTraLoi8 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThamDinhTraLoi9 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    XepLoai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    XepHang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TongDonViCon = table.Column<bool>(type: "bit", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhGiaCoQuans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhieuKhaoSats",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DonVi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DonViText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi4 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi5 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi6 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi7 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi8 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TraLoi9 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaHoSo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HinhThucDanhGia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MucDoRHL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MucDoHL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MucDoBT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MucDoKHL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MucDoRKHL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiNhapDanhGia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NguoiNhapDanhGiaText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoaiNhom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhongBan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhongBanText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhieuKhaoSats", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DanhGiaCoQuans_DeletedOn",
                schema: "Business",
                table: "DanhGiaCoQuans",
                column: "DeletedOn");

            migrationBuilder.CreateIndex(
                name: "IX_PhieuKhaoSats_DeletedOn",
                schema: "Business",
                table: "PhieuKhaoSats",
                column: "DeletedOn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DanhGiaCoQuans",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "PhieuKhaoSats",
                schema: "Business");
        }
    }
}
