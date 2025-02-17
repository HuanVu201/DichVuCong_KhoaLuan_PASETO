using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class update_hoso_diaban : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QuanHuyenDiaBan",
                schema: "Business",
                table: "HoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TinhThanhDiaBan",
                schema: "Business",
                table: "HoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "XaPhuongDiaBan",
                schema: "Business",
                table: "HoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuanHuyenDiaBan",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "TinhThanhDiaBan",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "XaPhuongDiaBan",
                schema: "Business",
                table: "HoSos");
        }
    }
}
