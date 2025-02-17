using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class TaiLieuLuuTruCongDan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChiaSeTaiLieuKhoLuuTruCongDans",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SoDinhDanhChiaSe = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    SoDinhDanhNhan = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    TaiLieuLuuTruId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiaSeTaiLieuKhoLuuTruCongDans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KhoLuuTruCongDans",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SoDinhDanh = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    TongDungLuong = table.Column<double>(type: "float", nullable: true),
                    SoLuong = table.Column<int>(type: "int", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhoLuuTruCongDans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TaiLieuKhoLuuTruCongDans",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    KhoLuuTruId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TenGiayTo = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    DuongDan = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    DungLuong = table.Column<double>(type: "float", nullable: true),
                    Nguon = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaiLieuKhoLuuTruCongDans", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_ChiaSeTaiLieuKhoLuuTruCongDan_Name",
                schema: "Business",
                table: "ChiaSeTaiLieuKhoLuuTruCongDans",
                column: "TaiLieuLuuTruId");

            migrationBuilder.CreateIndex(
                name: "Idx_KhoLuuTruCongDan_Name",
                schema: "Business",
                table: "KhoLuuTruCongDans",
                column: "SoDinhDanh");

            migrationBuilder.CreateIndex(
                name: "Idx_TaiLieuKhoLuuTruCongDan_Name",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans",
                column: "KhoLuuTruId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChiaSeTaiLieuKhoLuuTruCongDans",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "KhoLuuTruCongDans",
                schema: "Business");

            migrationBuilder.DropTable(
                name: "TaiLieuKhoLuuTruCongDans",
                schema: "Business");
        }
    }
}
