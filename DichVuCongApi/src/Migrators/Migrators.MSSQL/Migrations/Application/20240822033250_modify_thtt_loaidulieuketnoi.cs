using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_thtt_loaidulieuketnoi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LoaiBaoTroXaHoi",
                schema: "Business",
                table: "TruongHopThuTucs",
                newName: "LoaiDuLieuKetNoi");

            migrationBuilder.AddColumn<bool>(
                name: "KhongNopTrucTuyen",
                schema: "Business",
                table: "TruongHopThuTucs",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TruongHopThuTucs_KhongNopTrucTuyen",
                schema: "Business",
                table: "TruongHopThuTucs",
                column: "KhongNopTrucTuyen");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TruongHopThuTucs_KhongNopTrucTuyen",
                schema: "Business",
                table: "TruongHopThuTucs");

            migrationBuilder.DropColumn(
                name: "KhongNopTrucTuyen",
                schema: "Business",
                table: "TruongHopThuTucs");

            migrationBuilder.RenameColumn(
                name: "LoaiDuLieuKetNoi",
                schema: "Business",
                table: "TruongHopThuTucs",
                newName: "LoaiBaoTroXaHoi");
        }
    }
}
