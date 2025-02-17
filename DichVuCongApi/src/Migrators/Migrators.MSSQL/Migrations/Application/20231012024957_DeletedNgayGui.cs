using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class DeletedNgayGui : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NgayGui",
                schema: "Portal",
                table: "HoiDaps");

          
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
          

            migrationBuilder.AddColumn<string>(
                name: "NgayGui",
                schema: "Portal",
                table: "HoiDaps",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true);
        }
    }
}
