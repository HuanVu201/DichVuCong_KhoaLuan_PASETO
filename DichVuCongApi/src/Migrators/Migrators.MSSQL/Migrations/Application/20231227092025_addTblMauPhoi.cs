using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class addTblMauPhoi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MauPhois",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LoaiPhoi = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    TenMauPhoi = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    MaDonVi = table.Column<string>(type: "varchar", nullable: false),
                    MaLinhVuc = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    MaThuTuc = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MauPhois", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_MauPhoi_Name",
                schema: "Business",
                table: "MauPhois",
                column: "LoaiPhoi");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MauPhois",
                schema: "Business");
        }
    }
}
