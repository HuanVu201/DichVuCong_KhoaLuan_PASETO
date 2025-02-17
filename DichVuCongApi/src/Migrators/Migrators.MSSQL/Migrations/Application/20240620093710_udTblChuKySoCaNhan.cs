using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class udTblChuKySoCaNhan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SoDinhDanh",
                schema: "Business",
                table: "ChuKySoCaNhans",
                newName: "UserName");

            migrationBuilder.AddColumn<string>(
                name: "MoTa",
                schema: "Business",
                table: "ChuKySoCaNhans",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MoTa",
                schema: "Business",
                table: "ChuKySoCaNhans");

            migrationBuilder.RenameColumn(
                name: "UserName",
                schema: "Business",
                table: "ChuKySoCaNhans",
                newName: "SoDinhDanh");
        }
    }
}
