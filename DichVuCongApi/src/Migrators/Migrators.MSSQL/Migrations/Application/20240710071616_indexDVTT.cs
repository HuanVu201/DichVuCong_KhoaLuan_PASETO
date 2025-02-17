using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class indexDVTT : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_DonViThuTuc",
                schema: "Catalog",
                table: "DonViThuTucs");

            migrationBuilder.CreateIndex(
                name: "Idx_DonViThuTuc",
                schema: "Catalog",
                table: "DonViThuTucs",
                columns: new[] { "DonViId", "MaTTHC", "NguoiTiepNhanId", "DeletedOn", "CreatedOn" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_DonViThuTuc",
                schema: "Catalog",
                table: "DonViThuTucs");

            migrationBuilder.CreateIndex(
                name: "Idx_DonViThuTuc",
                schema: "Catalog",
                table: "DonViThuTucs",
                columns: new[] { "DonViId", "MaTTHC", "NguoiTiepNhanId" });
        }
    }
}
