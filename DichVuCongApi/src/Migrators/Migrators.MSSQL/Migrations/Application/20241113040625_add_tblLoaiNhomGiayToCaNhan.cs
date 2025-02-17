using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tblLoaiNhomGiayToCaNhan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LoaiNhomGiayToCaNhans",
                schema: "Portal",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    SoDinhDanh = table.Column<string>(type: "varchar(35)", maxLength: 35, nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    Loai = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoaiNhomGiayToCaNhans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TaiLieuGiayToCaNhans",
                schema: "Portal",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenGiayTo = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    DuongDan = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LoaiNhomGiayToCaNhanId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaiLieuGiayToCaNhans", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_LoaiNhomGiayToCaNhan_LoaiNhomGiayToCaNhan_Name",
                schema: "Portal",
                table: "LoaiNhomGiayToCaNhans",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "Idx_TaiLieuGiayToCaNhan_TaiLieuGiayToCaNhan_Name",
                schema: "Portal",
                table: "TaiLieuGiayToCaNhans",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LoaiNhomGiayToCaNhans",
                schema: "Portal");

            migrationBuilder.DropTable(
                name: "TaiLieuGiayToCaNhans",
                schema: "Portal");
        }
    }
}
