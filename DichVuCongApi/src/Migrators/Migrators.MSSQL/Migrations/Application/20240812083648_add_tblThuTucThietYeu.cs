using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tblThuTucThietYeu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ThuTucThietYeus",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaTTHC = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    TenTTHC = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    LinkDVC = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    SoThuTu = table.Column<int>(type: "int", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThuTucThietYeus", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_ThuTucThietYeu_MaTTHC",
                schema: "Catalog",
                table: "ThuTucThietYeus",
                column: "MaTTHC");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ThuTucThietYeus",
                schema: "Catalog");
        }
    }
}
