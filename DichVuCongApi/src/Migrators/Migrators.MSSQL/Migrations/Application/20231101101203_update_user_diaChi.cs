using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class update_user_diaChi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DiaChi",
                schema: "Identity",
                table: "Users",
                newName: "DiaChiThuongTru");

            migrationBuilder.AddColumn<string>(
                name: "DiaChiKhaiSinh",
                schema: "Identity",
                table: "Users",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EFormData",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiaChiKhaiSinh",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EFormData",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.RenameColumn(
                name: "DiaChiThuongTru",
                schema: "Identity",
                table: "Users",
                newName: "DiaChi");
        }
    }
}
