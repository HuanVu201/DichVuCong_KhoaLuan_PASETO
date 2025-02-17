using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class udColumn_DuThaoXuLyHoSo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NguoiKy",
                schema: "Business",
                table: "DuThaoXuLyHoSos",
                newName: "TenLanhDaoKy");

            migrationBuilder.AddColumn<string>(
                name: "TaiKhoanLanhDaoKy",
                schema: "Business",
                table: "DuThaoXuLyHoSos",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaiKhoanLanhDaoKy",
                schema: "Business",
                table: "DuThaoXuLyHoSos");

            migrationBuilder.RenameColumn(
                name: "TenLanhDaoKy",
                schema: "Business",
                table: "DuThaoXuLyHoSos",
                newName: "NguoiKy");
        }
    }
}
