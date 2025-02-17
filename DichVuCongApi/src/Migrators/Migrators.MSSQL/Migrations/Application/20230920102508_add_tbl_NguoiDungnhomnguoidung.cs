using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tbl_NguoiDungnhomnguoidung : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NguoiDungNhomNguoiDungs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaiKhoan = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: false),
                    NhomNguoiDungId = table.Column<string>(type: "varchar(36)", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NguoiDungNhomNguoiDungs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_NguoiDungNhomNguoiDung",
                schema: "Catalog",
                table: "NguoiDungNhomNguoiDungs",
                columns: new[] { "NhomNguoiDungId", "TaiKhoan" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NguoiDungNhomNguoiDungs",
                schema: "Catalog");
        }
    }
}
