using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class AddedThayDoiMucDoThuTucEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_ThayDoiMucDoThuTuc",
                schema: "Catalog",
                table: "ThayDoiMucDoThuTucs");

            migrationBuilder.CreateIndex(
                name: "Idx_ThayDoiMucDoThuTuc",
                schema: "Catalog",
                table: "ThayDoiMucDoThuTucs",
                column: "DeletedOn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_ThayDoiMucDoThuTuc",
                schema: "Catalog",
                table: "ThayDoiMucDoThuTucs");

            migrationBuilder.CreateIndex(
                name: "Idx_ThayDoiMucDoThuTuc",
                schema: "Catalog",
                table: "ThayDoiMucDoThuTucs",
                column: "DeletedOn",
                unique: true,
                filter: "[DeletedOn] IS NOT NULL");
        }
    }
}
