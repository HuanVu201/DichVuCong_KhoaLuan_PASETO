using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class modify_user_csdl_dancu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Cha",
                schema: "Identity",
                table: "Users",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ChuHo",
                schema: "Identity",
                table: "Users",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DanToc",
                schema: "Identity",
                table: "Users",
                type: "varchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GioiTinh",
                schema: "Identity",
                table: "Users",
                type: "varchar(2)",
                maxLength: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Me",
                schema: "Identity",
                table: "Users",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NamSinh",
                schema: "Identity",
                table: "Users",
                type: "varchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NgayThangNamSinh",
                schema: "Identity",
                table: "Users",
                type: "varchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguoiDaiDien",
                schema: "Identity",
                table: "Users",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NhomMau",
                schema: "Identity",
                table: "Users",
                type: "varchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NoiDangKyKhaiSinh",
                schema: "Identity",
                table: "Users",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NoiOHienTai",
                schema: "Identity",
                table: "Users",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QueQuan",
                schema: "Identity",
                table: "Users",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuocTich",
                schema: "Identity",
                table: "Users",
                type: "varchar(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoCMND",
                schema: "Identity",
                table: "Users",
                type: "varchar(16)",
                maxLength: 16,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoDinhDanh",
                schema: "Identity",
                table: "Users",
                type: "varchar(35)",
                maxLength: 35,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoSoHoKhau",
                schema: "Identity",
                table: "Users",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThuongTru",
                schema: "Identity",
                table: "Users",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TinhTrangHonNhan",
                schema: "Identity",
                table: "Users",
                type: "varchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TonGiao",
                schema: "Identity",
                table: "Users",
                type: "varchar(12)",
                maxLength: 12,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VoChong",
                schema: "Identity",
                table: "Users",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cha",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ChuHo",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DanToc",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "GioiTinh",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Me",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NamSinh",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NgayThangNamSinh",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NguoiDaiDien",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NhomMau",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NoiDangKyKhaiSinh",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NoiOHienTai",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "QueQuan",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "QuocTich",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SoCMND",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SoDinhDanh",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SoSoHoKhau",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ThuongTru",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TinhTrangHonNhan",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TonGiao",
                schema: "Identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "VoChong",
                schema: "Identity",
                table: "Users");
        }
    }
}
