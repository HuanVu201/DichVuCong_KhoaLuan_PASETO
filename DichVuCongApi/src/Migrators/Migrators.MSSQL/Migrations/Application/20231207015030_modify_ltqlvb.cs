using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_ltqlvb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "TaiKhoanHeThongQLVB",
                schema: "Identity",
                table: "Users",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ChoBanHanh",
                schema: "Business",
                table: "HoSos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KetQuaDaySangQLVB",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaiKhoanHeThongQLVB",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ChoBanHanh",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "KetQuaDaySangQLVB",
                schema: "Business",
                table: "HoSos");
        }
    }
}
