using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class UdMaThamChieuGiaoDichTT : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DuongDanBienLaiPaymentPlatform",
                schema: "Business",
                table: "YeuCauThanhToans",
                newName: "MaThamChieuGiaoDich");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MaThamChieuGiaoDich",
                schema: "Business",
                table: "YeuCauThanhToans",
                newName: "DuongDanBienLaiPaymentPlatform");
        }
    }
}
