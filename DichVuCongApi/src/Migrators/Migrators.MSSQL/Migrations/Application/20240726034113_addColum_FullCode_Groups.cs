using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class addColum_FullCode_Groups : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FullCode",
                schema: "Catalog",
                table: "Groups",
                type: "nvarchar(max)",
                nullable: true);
            migrationBuilder.Sql(@"
                UPDATE G1
                SET G1.FullCode = G1.GroupCode + '##' + ISNULL(STUFF(
                    (SELECT '##' + G2.GroupCode
                     FROM [Catalog].[Groups] G2
                     WHERE G2.OfGroupCode = G1.GroupCode
                     FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 2, ''), '')
                FROM [Catalog].[Groups] G1
                ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullCode",
                schema: "Catalog",
                table: "Groups");
        }
    }
}
