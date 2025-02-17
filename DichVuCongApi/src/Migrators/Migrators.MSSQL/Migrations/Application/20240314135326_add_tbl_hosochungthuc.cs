using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_tbl_hosochungthuc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HoSoChungThucs",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaHoSo = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    SoChungThucId = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    So = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LoaiKetQuaId = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    NgayChungThuc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DinhKem = table.Column<string>(type: "nvarchar(1200)", maxLength: 1200, nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoSoChungThucs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HoSoChungThucs_MaHoSo_SoChungThucId_LoaiKetQuaId",
                schema: "Business",
                table: "HoSoChungThucs",
                columns: new[] { "MaHoSo", "SoChungThucId", "LoaiKetQuaId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HoSoChungThucs",
                schema: "Business");
        }
    }
}
