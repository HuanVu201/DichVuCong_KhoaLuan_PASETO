using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MSSQL.Migrations.Application
{
    /// <inheritdoc />
    public partial class update_nvarchar_dinhkem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DinhKem",
                schema: "Business",
                table: "ThanhPhanThuTucs",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<string>(
                name: "DinhKem",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "nvarchar(1200)",
                maxLength: 1200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(1200)",
                oldMaxLength: 1200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FileDinhKemMoi",
                schema: "Business",
                table: "ThanhPhanHoSoBoSungs",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FileDinhKemCu",
                schema: "Business",
                table: "ThanhPhanHoSoBoSungs",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThongTinTiepNhanBoSung",
                schema: "Business",
                table: "HoSos",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ThongTinTiepNhanBoSung",
                schema: "Business",
                table: "HoSos");

            migrationBuilder.AlterColumn<string>(
                name: "DinhKem",
                schema: "Business",
                table: "ThanhPhanThuTucs",
                type: "varchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<string>(
                name: "DinhKem",
                schema: "Business",
                table: "ThanhPhanHoSos",
                type: "varchar(1200)",
                maxLength: 1200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(1200)",
                oldMaxLength: 1200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FileDinhKemMoi",
                schema: "Business",
                table: "ThanhPhanHoSoBoSungs",
                type: "varchar(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FileDinhKemCu",
                schema: "Business",
                table: "ThanhPhanHoSoBoSungs",
                type: "varchar(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true);
        }
    }
}
