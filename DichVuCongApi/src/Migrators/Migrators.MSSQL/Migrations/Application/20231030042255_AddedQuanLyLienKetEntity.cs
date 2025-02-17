using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddedQuanLyLienKetEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuanLyLienKets",
                schema: "Portal",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ma = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LinkLienKet = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SuDung = table.Column<bool>(type: "bit", nullable: true),
                    ThuTu = table.Column<int>(type: "int", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuanLyLienKets", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_QuanLyLienKet_DeletedOn",
                schema: "Portal",
                table: "QuanLyLienKets",
                column: "DeletedOn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuanLyLienKets",
                schema: "Portal");
        }
    }
}
