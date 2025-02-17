using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class UpdatedActionEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UuTien",
                schema: "Business",
                table: "Actions",
                newName: "ThuTu");

            migrationBuilder.AddColumn<string>(
                name: "MoTa",
                schema: "Business",
                table: "Actions",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MoTa",
                schema: "Business",
                table: "Actions");

            migrationBuilder.RenameColumn(
                name: "ThuTu",
                schema: "Business",
                table: "Actions",
                newName: "UuTien");
        }
    }
}
