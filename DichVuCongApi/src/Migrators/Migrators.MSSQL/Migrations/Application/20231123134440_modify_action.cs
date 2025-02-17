using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_action : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ColorCode",
                schema: "Business",
                table: "Actions",
                type: "varchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IconName",
                schema: "Business",
                table: "Actions",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ShowInModal",
                schema: "Business",
                table: "Actions",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ShowInTable",
                schema: "Business",
                table: "Actions",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ColorCode",
                schema: "Business",
                table: "Actions");

            migrationBuilder.DropColumn(
                name: "IconName",
                schema: "Business",
                table: "Actions");

            migrationBuilder.DropColumn(
                name: "ShowInModal",
                schema: "Business",
                table: "Actions");

            migrationBuilder.DropColumn(
                name: "ShowInTable",
                schema: "Business",
                table: "Actions");
        }
    }
}
