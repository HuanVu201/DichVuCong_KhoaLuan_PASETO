using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_hoso : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "LinhVucId",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.DropColumn(
                name: "ThuTucId",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AlterColumn<string>(
                name: "DinhKem",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "MaHoSo", "DonViId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AlterColumn<string>(
                name: "DinhKem",
                schema: "Business",
                table: "QuaTrinhXuLyHoSos",
                type: "varchar(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LinhVucId",
                schema: "Business",
                table: "HoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThuTucId",
                schema: "Business",
                table: "HoSos",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "Idx_HoSo",
                schema: "Business",
                table: "HoSos",
                columns: new[] { "MaHoSo", "ThuTucId", "DonViId", "LinhVucId" });
        }
    }
}
