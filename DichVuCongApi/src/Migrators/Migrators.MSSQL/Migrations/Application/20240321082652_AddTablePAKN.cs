using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddTablePAKN : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PhanAnhKienNghis",
                schema: "Portal",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HoTen = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "varchar", nullable: true),
                    SoDienThoai = table.Column<string>(type: "varchar", nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TieuDe = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    NoiDung = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    NgayGui = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TrangThai = table.Column<string>(type: "varchar(1)", maxLength: 1, nullable: false),
                    NguoiTraLoi = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TieuDeTraLoi = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    NoiDungTraLoi = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    CongKhai = table.Column<string>(type: "varchar(1)", maxLength: 1, nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhanAnhKienNghis", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_PhanAnhKienNghi_DeletedOn",
                schema: "Portal",
                table: "PhanAnhKienNghis",
                column: "DeletedOn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PhanAnhKienNghis",
                schema: "Portal");
        }
    }
}
