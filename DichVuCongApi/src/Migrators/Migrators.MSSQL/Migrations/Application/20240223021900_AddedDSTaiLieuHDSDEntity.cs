using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddedDSTaiLieuHDSDEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DSTaiLieuHDSDs",
                schema: "Portal",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ThuTu = table.Column<int>(type: "int", nullable: true),
                    TenTaiLieu = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TepDinhKem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NgayDang = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DSTaiLieuHDSDs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_DSTaiLieuHDSD_DeletedOn",
                schema: "Portal",
                table: "DSTaiLieuHDSDs",
                column: "DeletedOn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DSTaiLieuHDSDs",
                schema: "Portal");
        }
    }
}
