using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_user_sodinhdanh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_Group_Search",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.AddColumn<string>(
                name: "MaDinhDanhOfficeCode",
                schema: "Identity",
                table: "Users",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_Group_Search",
                schema: "Catalog",
                table: "Groups",
                columns: new[] { "GroupCode", "GroupName", "OfGroupCode", "MaDinhDanh", "MaNhomLienThong" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_Group_Search",
                schema: "Catalog",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "MaDinhDanhOfficeCode",
                schema: "Identity",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "Idx_Group_Search",
                schema: "Catalog",
                table: "Groups",
                columns: new[] { "GroupCode", "GroupName", "OfGroupCode" });
        }
    }
}
