using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class kysoneac : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KySoNEACs",
                schema: "Catalog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SoGiayTo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CaName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DuongDanFile = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    NgayKy = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KySoNEACs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KySoNEACs_SoGiayTo_NgayKy",
                schema: "Catalog",
                table: "KySoNEACs",
                columns: new[] { "SoGiayTo", "NgayKy" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KySoNEACs",
                schema: "Catalog");
        }
    }
}
