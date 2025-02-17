using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tbl_menuketquathutuc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MenuKetQuaThuTucs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenMenu = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    ParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ThuTuMenu = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    IconName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    MaDonVi = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    MaTTHC = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    QueryStringParams = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuKetQuaThuTucs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_MenuKetQuaThuTuc",
                schema: "Catalog",
                table: "MenuKetQuaThuTucs",
                columns: new[] { "MaDonVi", "MaTTHC" },
                unique: true,
                filter: "[MaDonVi] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MenuKetQuaThuTucs",
                schema: "Catalog");
        }
    }
}
