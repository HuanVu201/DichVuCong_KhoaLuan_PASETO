using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tbl_quatrinhxuLyhoso1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuaTrinhXuLyHoSos",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaHoSo = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: false),
                    ThoiGian = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TrangThai = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    NodeQuyTrinh = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: false),
                    NguoiGui = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: false),
                    NguoiNhan = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: true),
                    ThoiHanBuocXuLy = table.Column<int>(type: "int", nullable: false),
                    LoaiThoiHanBuocXuLy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    NgayHetHanBuocXuLy = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ThaoTac = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    NoiDung = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DinhKem = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true),
                    TrangThaiDongBoDVCQuocGia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenNguoiGui = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: true),
                    TenNguoiNhan = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuaTrinhXuLyHoSos", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_QuaTrinhXuLyHoSo",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                column: "MaHoSo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuaTrinhXuLyHoSos",
                schema: "Business");
        }
    }
}
