using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_screen : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ShowActionInModal",
                schema: "Business",
                table: "Screens",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ShowActionInTable",
                schema: "Business",
                table: "Screens",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShowActionInModal",
                schema: "Business",
                table: "Screens");

            migrationBuilder.DropColumn(
                name: "ShowActionInTable",
                schema: "Business",
                table: "Screens");
        }
    }
}
