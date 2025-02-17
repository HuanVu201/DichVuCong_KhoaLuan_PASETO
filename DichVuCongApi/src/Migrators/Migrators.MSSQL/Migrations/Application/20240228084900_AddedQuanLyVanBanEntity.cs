using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddedQuanLyVanBanEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuanLyVanBans",
                schema: "Portal",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SoKyHieu = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NgaybanHanh = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LoaiVanBan = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CongKhai = table.Column<bool>(type: "bit", nullable: true),
                    ThuTu = table.Column<int>(type: "int", nullable: true),
                    TrichYeu = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileDinhKem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaLinhVuc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CoQuanBanHanh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuanLyVanBans", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_QuanLyVanBan_DeletedOn",
                schema: "Portal",
                table: "QuanLyVanBans",
                column: "DeletedOn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuanLyVanBans",
                schema: "Portal");
        }
    }
}
