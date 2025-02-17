using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class danhmucchung2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_GiayToSoHoas_MaLinhVuc_MaTTHC",
                schema: "Business",
                table: "GiayToSoHoas");

            migrationBuilder.DropIndex(
                name: "Idx_DanhMucChung_DanhMucChung_Name",
                schema: "Catalog",
                table: "DanhMucChungs");

            migrationBuilder.AddColumn<string>(
                name: "ParentCode",
                schema: "Catalog",
                table: "DanhMucChungs",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IDX_GiayToSoHoa_DinhKem_DeletedOn",
                schema: "Business",
                table: "GiayToSoHoas",
                column: "DinhKem",
                filter: "DeletedOn IS NULL AND LoaiSoHoa = '1'");

            migrationBuilder.CreateIndex(
                name: "IX_GiayToSoHoas_MaLinhVuc_MaTTHC_TrangThaiSoHoa",
                schema: "Business",
                table: "GiayToSoHoas",
                columns: new[] { "MaLinhVuc", "MaTTHC", "TrangThaiSoHoa" });

            migrationBuilder.CreateIndex(
                name: "Idx_DanhMucChung_DanhMucChung_TenDanhMuc_Type",
                schema: "Catalog",
                table: "DanhMucChungs",
                columns: new[] { "TenDanhMuc", "Type" });

            migrationBuilder.CreateIndex(
                name: "Idx_DanhMucChung_DanhMucChung_TenDanhMuc_Type_ParentCode",
                schema: "Catalog",
                table: "DanhMucChungs",
                columns: new[] { "TenDanhMuc", "Type", "ParentCode" });

            migrationBuilder.CreateIndex(
                name: "Idx_DanhMucChung_DanhMucChung_Type_ParentCode",
                schema: "Catalog",
                table: "DanhMucChungs",
                columns: new[] { "Type", "ParentCode" });

            migrationBuilder.CreateIndex(
                name: "Idx_DanhMucChung_Type",
                schema: "Catalog",
                table: "DanhMucChungs",
                column: "Type");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IDX_GiayToSoHoa_DinhKem_DeletedOn",
                schema: "Business",
                table: "GiayToSoHoas");

            migrationBuilder.DropIndex(
                name: "IX_GiayToSoHoas_MaLinhVuc_MaTTHC_TrangThaiSoHoa",
                schema: "Business",
                table: "GiayToSoHoas");

            migrationBuilder.DropIndex(
                name: "Idx_DanhMucChung_DanhMucChung_TenDanhMuc_Type",
                schema: "Catalog",
                table: "DanhMucChungs");

            migrationBuilder.DropIndex(
                name: "Idx_DanhMucChung_DanhMucChung_TenDanhMuc_Type_ParentCode",
                schema: "Catalog",
                table: "DanhMucChungs");

            migrationBuilder.DropIndex(
                name: "Idx_DanhMucChung_DanhMucChung_Type_ParentCode",
                schema: "Catalog",
                table: "DanhMucChungs");

            migrationBuilder.DropIndex(
                name: "Idx_DanhMucChung_Type",
                schema: "Catalog",
                table: "DanhMucChungs");

            migrationBuilder.DropColumn(
                name: "ParentCode",
                schema: "Catalog",
                table: "DanhMucChungs");

            migrationBuilder.CreateIndex(
                name: "IX_GiayToSoHoas_MaLinhVuc_MaTTHC",
                schema: "Business",
                table: "GiayToSoHoas",
                columns: new[] { "MaLinhVuc", "MaTTHC" });

            migrationBuilder.CreateIndex(
                name: "Idx_DanhMucChung_DanhMucChung_Name",
                schema: "Catalog",
                table: "DanhMucChungs",
                columns: new[] { "TenDanhMuc", "Code" });
        }
    }
}
