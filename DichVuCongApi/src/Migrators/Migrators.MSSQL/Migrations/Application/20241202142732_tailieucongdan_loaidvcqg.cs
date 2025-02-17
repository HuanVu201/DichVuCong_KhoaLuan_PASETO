using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class tailieucongdan_loaidvcqg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_LaGiayToDVCQG",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans");

            migrationBuilder.DropColumn(
                name: "LaGiayToDVCQG",
                schema: "Business",
                table: "TaiLieuKhoLuuTruCongDans");
        }
    }
}
