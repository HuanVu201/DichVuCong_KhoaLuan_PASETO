using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class add_log_csdl_dancu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NguoiGui",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "LogCSDLDanCuDoanhNghieps",
                schema: "Business",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaiKhoan = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true),
                    ThoiGian = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DonViId = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true),
                    Input = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Loai = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogCSDLDanCuDoanhNghieps", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LogCSDLDanCuDoanhNghieps",
                schema: "Business");

            migrationBuilder.DropColumn(
                name: "NguoiGui",
                schema: "Business",
                table: "HoSos");
        }
    }
}
