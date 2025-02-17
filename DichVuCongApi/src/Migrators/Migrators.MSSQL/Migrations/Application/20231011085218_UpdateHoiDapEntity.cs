using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class UpdateHoiDapEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TieuDe",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "NoiDung",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "HoTen",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                schema: "Portal",
                table: "HoiDaps",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(70)",
                oldMaxLength: 70,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DiaChi",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AddColumn<string>(
                name: "CongKhai",
                schema: "Portal",
                table: "HoiDaps",
                type: "varchar(2)",
                maxLength: 2,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DinhKem",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Ma",
                schema: "Portal",
                table: "HoiDaps",
                type: "varchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NgayGui",
                schema: "Portal",
                table: "HoiDaps",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiTraLoi",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NoiDungTraLoi",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TieuDeTraLoi",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TraLoi",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TrangThai",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CongKhai",
                schema: "Portal",
                table: "HoiDaps");

            migrationBuilder.DropColumn(
                name: "DinhKem",
                schema: "Portal",
                table: "HoiDaps");

            migrationBuilder.DropColumn(
                name: "Ma",
                schema: "Portal",
                table: "HoiDaps");

            migrationBuilder.DropColumn(
                name: "NgayGui",
                schema: "Portal",
                table: "HoiDaps");

            migrationBuilder.DropColumn(
                name: "NguoiTraLoi",
                schema: "Portal",
                table: "HoiDaps");

            migrationBuilder.DropColumn(
                name: "NoiDungTraLoi",
                schema: "Portal",
                table: "HoiDaps");

            migrationBuilder.DropColumn(
                name: "TieuDeTraLoi",
                schema: "Portal",
                table: "HoiDaps");

            migrationBuilder.DropColumn(
                name: "TraLoi",
                schema: "Portal",
                table: "HoiDaps");

            migrationBuilder.DropColumn(
                name: "TrangThai",
                schema: "Portal",
                table: "HoiDaps");

            migrationBuilder.AlterColumn<string>(
                name: "TieuDe",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000);

            migrationBuilder.AlterColumn<string>(
                name: "NoiDung",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000);

            migrationBuilder.AlterColumn<string>(
                name: "HoTen",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                schema: "Portal",
                table: "HoiDaps",
                type: "varchar(70)",
                maxLength: 70,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DiaChi",
                schema: "Portal",
                table: "HoiDaps",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);
        }
    }
}
