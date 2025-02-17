using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class BienLaiDienTu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CauHinhBienLaiThanhToan",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LoaiBienLaiThanhToan",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CauHinhBienLaiThanhToan",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "LoaiBienLaiThanhToan",
                schema: "Catalog",
                table: "Groups");
        }
    }
}
