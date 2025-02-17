using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_idx_thanhphantt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ThanhPhanThuTucs_TruongHopId",
                schema: "Business",
                table: "ThanhPhanThuTucs",
                column: "TruongHopId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ThanhPhanThuTucs_TruongHopId",
                schema: "Business",
                table: "ThanhPhanThuTucs");
        }
    }
}
