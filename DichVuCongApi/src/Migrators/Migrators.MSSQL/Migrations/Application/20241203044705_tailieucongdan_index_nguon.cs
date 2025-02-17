using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class tailieucongdan_index_nguon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_LaGiayToDVCQG",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans");

            migrationBuilder.DropColumn(
                name: "LaGiayToDVCQG",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans");

            migrationBuilder.CreateIndex(
                name: "Idx_Nguon",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans",
                column: "Nguon");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_Nguon",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans");

            migrationBuilder.AddColumn<bool>(
                name: "LaGiayToDVCQG",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_LaGiayToDVCQG",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans",
                column: "LaGiayToDVCQG");
        }
    }
}
