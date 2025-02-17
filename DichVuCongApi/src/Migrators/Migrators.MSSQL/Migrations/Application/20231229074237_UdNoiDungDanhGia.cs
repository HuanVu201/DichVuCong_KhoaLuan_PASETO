using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class UdNoiDungDanhGia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameIndex(
                name: "Idx_LinhVuc_LinhVuc_Active",
                schema: "Catalog",
                table: "LinhVucs",
                newName: "Idx_MauPhoi_LinhVuc_Active");

            migrationBuilder.AddColumn<string>(
                name: "NoiDungDanhGia",
                schema: "Business",
                table: "DanhGiaHaiLongs",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NoiDungDanhGia",
                schema: "Business",
                table: "DanhGiaHaiLongs");

            migrationBuilder.RenameIndex(
                name: "Idx_MauPhoi_LinhVuc_Active",
                schema: "Catalog",
                table: "LinhVucs",
                newName: "Idx_LinhVuc_LinhVuc_Active");
        }
    }
}
