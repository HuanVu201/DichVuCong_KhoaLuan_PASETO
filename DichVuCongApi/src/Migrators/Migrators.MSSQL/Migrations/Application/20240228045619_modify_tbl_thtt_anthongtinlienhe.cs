using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_tbl_thtt_anthongtinlienhe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AnThongTinLienHeNopTrucTuyen",
                schema: "Business",
                table: "TruongHopThuTucs",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnThongTinLienHeNopTrucTuyen",
                schema: "Business",
                table: "TruongHopThuTucs");
        }
    }
}
